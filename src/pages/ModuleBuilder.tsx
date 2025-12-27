// @ts-nocheck
// MDM Registry (formerly ModuleBuilder)
/*
  Status: SKELETON
  Reason: MDM Registry UI (metadata-only authoring tool).
  This page is metadata-only: it lets authors define entities, fields and relationships and export the
  registry as JSON. No runtime behavior or backend wiring is implemented here.
  Allowed actions: authoring-only (define entities, fields, relationships, import/export JSON).
*/

import React, { useState, useRef } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

type FieldDef = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  multi: boolean;
  description?: string;
};

type RelationshipDef = {
  id: string;
  name: string;
  target: string; // entity id
  cardinality: '1:1' | '1:n' | 'n:m';
  required: boolean;
  description?: string;
};

type EntityDef = {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'published' | 'retired';
  description?: string;
  externalIds?: string[];
  fields: FieldDef[];
  relationships: RelationshipDef[];
  createdAt: string;
  changeLog?: { id: string; who?: string; when: string; reason?: string; snapshot: any }[];
};

const uuid = () => (typeof crypto !== 'undefined' && (crypto as any).randomUUID ? (crypto as any).randomUUID() : Math.random().toString(36).slice(2, 10));

export default function MDMRegistry() {
  const [entities, setEntities] = useState<EntityDef[]>([]);
  const [draft, setDraft] = useState<Partial<EntityDef>>({ status: 'draft', fields: [], relationships: [] });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [versionNote, setVersionNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selected = entities.find((e) => e.id === selectedId) || null;

  function addEntity() {
    const id = uuid();
    const now = new Date().toISOString();
    const e: EntityDef = {
      id,
      name: (draft.name || `Entity-${id}`).trim(),
      type: draft.type || 'custom',
      status: (draft.status as any) || 'draft',
      description: draft.description || '',
      externalIds: draft.externalIds || [],
      fields: (draft.fields || []) as FieldDef[],
      relationships: (draft.relationships || []) as RelationshipDef[],
      createdAt: now,
      changeLog: [],
    };
    setEntities((s) => [...s, e]);
    setDraft({ status: 'draft', fields: [], relationships: [] });
    setSelectedId(id);
  }

  function updateEntity(id: string, patch: Partial<EntityDef>) {
    setEntities((s) => s.map((en) => (en.id === id ? { ...en, ...patch } : en)));
  }

  function removeEntity(id: string) {
    setEntities((s) => s.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function addFieldToEntity(entityId: string) {
    const f: FieldDef = { id: uuid(), name: 'newField', type: 'string', required: false, multi: false };
    const ent = entities.find((e) => e.id === entityId);
    if (!ent) return;
    updateEntity(entityId, { fields: [...ent.fields, f] });
  }

  function addRelationshipToEntity(entityId: string) {
    const r: RelationshipDef = { id: uuid(), name: 'rel', target: '', cardinality: '1:n', required: false };
    const ent = entities.find((e) => e.id === entityId);
    if (!ent) return;
    updateEntity(entityId, { relationships: [...ent.relationships, r] });
  }

  function saveVersion(entityId: string, who = 'author') {
    const ent = entities.find((e) => e.id === entityId);
    if (!ent) return;
    const when = new Date().toISOString();
    const note = versionNote || 'Versioned from UI';
    const snapshot = JSON.parse(JSON.stringify(ent));
    const entry = { id: uuid(), who, when, reason: note, snapshot };
    updateEntity(entityId, { changeLog: [...(ent.changeLog || []), entry] });
    setVersionNote('');
  }

  function exportJSON() {
    return JSON.stringify({ generatedAt: new Date().toISOString(), entities }, null, 2);
  }

  function downloadJSON() {
    const blob = new Blob([exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mdm-registry.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSONText(text: string) {
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed.entities)) throw new Error('Invalid registry format');
      // We accept the imported entities as-is (metadata-only). IDs are preserved.
      setEntities(parsed.entities.map((e: any) => ({ ...e, fields: e.fields || [], relationships: e.relationships || [], changeLog: e.changeLog || [], createdAt: e.createdAt || new Date().toISOString() })));
    } catch (err) {
      // keep it silent (SKELETON), UI will not crash
      // In a full integration we'd surface the error to the user
    }
  }

  // --- Schema generation (JSON Schema Draft 2020-12) ---------------------------------
  function mapFieldToSchemaProperty(f) {
    // Base mapping
    const prop = {};
    const ui = {};

    switch (f.type) {
      case 'string':
      case 'text':
        prop.type = 'string';
        ui['x-ui.widget'] = f.type === 'text' ? 'textarea' : 'text';
        break;
      case 'number':
        prop.type = 'number';
        ui['x-ui.widget'] = 'number';
        break;
      case 'date':
        prop.type = 'string';
        ui['x-ui.widget'] = 'date';
        ui['x-ui.format'] = 'date-time';
        break;
      case 'enum':
        prop.type = 'string';
        if (Array.isArray(f.options)) prop.enum = f.options;
        ui['x-ui.widget'] = 'select';
        break;
      case 'relation':
        // relations stored as reference id strings in schema
        prop.type = 'string';
        prop.description = (prop.description || '') + (f.description ? ' ' + f.description : '');
        ui['x-ui.widget'] = 'select';
        ui['x-ui.placeholder'] = 'Select reference id';
        break;
      case 'image':
      case 'document':
        // reference shared $defs for media metadata (metadata-only)
        const defName = f.type === 'image' ? 'ImageMeta' : 'DocumentMeta';
        return { $ref: `#/$defs/${defName}`, 'x-ui': { 'x-ui.widget': f.type === 'image' ? 'image' : 'document', 'x-ui.placeholder': f.description || '' } };
      case 'contact':
        // reference shared Contact def
        return { $ref: '#/$defs/Contact', 'x-ui': { 'x-ui.widget': 'contact', 'x-ui.placeholder': f.description || '' } };
      case 'address':
        // reference shared Address def
        return { $ref: '#/$defs/Address', 'x-ui': { 'x-ui.widget': 'address', 'x-ui.placeholder': f.description || '' } };
      case 'structure':
        prop.type = 'object';
        prop.description = f.description || 'Structured JSON metadata';
        ui['x-ui.widget'] = 'json';
        break;
      default:
        prop.type = 'string';
        ui['x-ui.widget'] = 'text';
    }

    // Common UI hints
    if (f.description) ui['x-ui.placeholder'] = f.description;
    if (f.multi) ui['x-ui.multi'] = true;
    if (f.required) ui['x-ui.required'] = true;
    if (f.name && /date|createdAt|updatedAt/i.test(f.name)) ui['x-ui.widget'] = 'date';
    // audit fields readOnly
    if (/createdAt|updatedAt|version/.test(f.name)) ui['x-ui.readOnly'] = true;

    // group heuristics
    if (/name|fullName|legalName|title/i.test(f.name)) ui['x-ui.group'] = 'identity';
    if (/contact|phone|email|addresses|address/i.test(f.name)) ui['x-ui.group'] = 'contact';
    if (/bom|formula|allergen|shelfLife|requiredMachines|requiredManpower/i.test(f.name)) ui['x-ui.group'] = 'production';
    if (/registration|documents|license|certificate/i.test(f.name)) ui['x-ui.group'] = 'compliance';

    // attach order hint
    if (typeof f._order === 'number') ui['x-ui.order'] = f._order;

    // merge descriptions
    if (f.description) prop.description = (prop.description ? prop.description + ' ' : '') + f.description;

    // attach x-ui to prop
    if (Object.keys(ui).length) prop['x-ui'] = ui;

    return prop;
  }

  function generateJSONSchemas() {
    const schemas = {};
    entities.forEach((ent) => {
      // Build JSON Schema draft 2020-12 for each entity
      const schema = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        $id: `urn:mdm:${ent.type}`,
        title: ent.name || ent.type,
        type: 'object',
        properties: {},
        required: [],
        description: ent.description || '',
        $defs: {},
      };

      // shared definitions
      const shared = {
        Address: {
          type: 'object',
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            postalCode: { type: 'string' },
            country: { type: 'string' },
          },
          required: [],
        },
        Contact: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            label: { type: 'string' },
            value: { type: 'string' },
          },
          required: [],
        },
        AuditMetadata: {
          type: 'object',
          properties: {
            createdAt: { type: 'string', format: 'date-time', description: 'Record creation timestamp (audit)' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Record last updated timestamp (audit)' },
            version: { type: 'number', description: 'Record version (audit)' },
          },
          required: ['createdAt'],
        },
        ImageMeta: {
          type: 'object',
          properties: { url: { type: 'string' }, alt: { type: 'string' }, metadata: { type: 'object' } },
          required: [],
        },
        DocumentMeta: {
          type: 'object',
          properties: { url: { type: 'string' }, title: { type: 'string' }, metadata: { type: 'object' } },
          required: [],
        }
      };
      schema.$defs = shared;

      // Map fields
      (ent.fields || []).forEach((f, idx) => {
        // ensure ordering hint
        if (f && typeof f === 'object') f._order = idx + 1;
        let prop = mapFieldToSchemaProperty(f || {});
        // support multi-valued fields as arrays
        if (f.multi) {
          prop = { type: 'array', items: prop };
        }
        schema.properties[f.name] = prop;
        if (f.required) schema.required.push(f.name);
      });

      // Ensure audit fields present as required minimal set
      // Reference AuditMetadata properties via $defs (createdAt/updatedAt/version)
      if (!schema.properties['createdAt']) {
        schema.properties['createdAt'] = { $ref: '#/$defs/AuditMetadata/properties/createdAt' };
        schema.required.push('createdAt');
      }
      if (!schema.properties['updatedAt']) {
        schema.properties['updatedAt'] = { $ref: '#/$defs/AuditMetadata/properties/updatedAt' };
      }
      if (!schema.properties['version']) {
        schema.properties['version'] = { $ref: '#/$defs/AuditMetadata/properties/version' };
      }

      // remove duplicates in required
      schema.required = Array.from(new Set(schema.required));

      schemas[ent.type || ent.id] = schema;
    });
    return schemas;
  }

  function exportSchemasJSON() {
    return JSON.stringify({ generatedAt: new Date().toISOString(), schemas: generateJSONSchemas() }, null, 2);
  }

  function downloadSchemas() {
    const blob = new Blob([exportSchemasJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mdm-json-schemas.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- TypeScript generation (lightweight, no external deps) -----------------------
  function resolveRef(ref, schema) {
    // support local refs like '#/$defs/Address' or '#/$defs/AuditMetadata/properties/createdAt'
    if (!ref || typeof ref !== 'string') return null;
    if (!ref.startsWith('#/')) return null;
    const parts = ref.replace(/^#\//, '').split('/');
    let cur = schema;
    for (const p of parts) {
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
      else return null;
    }
    return cur;
  }

  function schemaTypeToTs(schemaPart, rootSchema, indent = 0) {
    if (!schemaPart) return 'any';
    if (schemaPart.$ref) {
      const resolved = resolveRef(schemaPart.$ref, rootSchema);
      if (!resolved) return 'any';
      // if resolved points to a property (has type) render that
      return schemaTypeToTs(resolved, rootSchema, indent);
    }
    if (schemaPart.type === 'string') return 'string';
    if (schemaPart.type === 'number' || schemaPart.type === 'integer') return 'number';
    if (schemaPart.type === 'boolean') return 'boolean';
    if (schemaPart.type === 'array') {
      const items = schemaPart.items ? schemaTypeToTs(schemaPart.items, rootSchema, indent) : 'any';
      return `${items}[]`;
    }
    if (schemaPart.type === 'object') {
      const props = schemaPart.properties || {};
      const lines: string[] = ['{'];
      for (const [k, v] of Object.entries(props)) {
        const optional = (schemaPart.required || []).includes(k) ? '' : '?';
        const ts = schemaTypeToTs(v as any, rootSchema, indent + 2);
        lines.push(`${' '.repeat(indent + 2)}${k}${optional}: ${ts};`);
      }
      lines.push(`${' '.repeat(indent)}}`);
      return lines.join('\n');
    }
    return 'any';
  }

  function generateTypeScriptForSchema(schema, typeName) {
    const root = schema;
    const props = schema.properties || {};
    const lines: string[] = [];
    lines.push(`// Auto-generated TypeScript types for ${typeName}`);
    lines.push('');
    lines.push(`export interface ${typeName} {`);
    for (const [k, v] of Object.entries(props)) {
      const optional = (schema.required || []).includes(k) ? '' : '?';
      const ts = schemaTypeToTs(v as any, root, 0);
      // inline object types may contain newlines; indent them
      const tsIndented = ts.includes('\n') ? ts.split('\n').map((l, i) => (i === 0 ? l : '  ' + l)).join('\n') : ts;
      lines.push(`  ${k}${optional}: ${tsIndented};`);
    }
    lines.push('}');
    // append defs as separate interfaces if present
    if (schema.$defs) {
      for (const [defName, defVal] of Object.entries(schema.$defs)) {
        if ((defVal as any).type === 'object') {
          const defInterfaceName = defName;
          lines.push('');
          lines.push(`export interface ${defInterfaceName} ${schemaTypeToTs(defVal as any, root, 0)}`);
        }
      }
    }
    return lines.join('\n');
  }

  function downloadEntityFiles(typeKey) {
    const schemas = generateJSONSchemas();
    const schema = schemas[typeKey];
    if (!schema) return;
    // download schema json
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${typeKey}.schema.json`;
    a.click();
    URL.revokeObjectURL(url);

    // download typescript d.ts
    const ts = generateTypeScriptForSchema(schema, (schema.title || typeKey).replace(/\W+/g, ''));
    const blobTs = new Blob([ts], { type: 'text/typescript' });
    const urlTs = URL.createObjectURL(blobTs);
    const b = document.createElement('a');
    b.href = urlTs;
    b.download = `${typeKey}.d.ts`;
    b.click();
    URL.revokeObjectURL(urlTs);
  }

  function downloadAllPerEntity() {
    const schemas = generateJSONSchemas();
    for (const k of Object.keys(schemas)) {
      // small pause to avoid browser blocking many clicks; still user-initiated
      try {
        downloadEntityFiles(k);
      } catch (e) {
        // ignore per-file errors
      }
    }
  }

  function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') importJSONText(reader.result);
    };
    reader.readAsText(f);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // Simple ISO alignment note: we include common audit/version metadata (createdAt, changeLog)
  // A full ISO 22000 alignment would require a mapping document and backend validation —
  // this UI focuses on metadata authoring and export only.

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">MDM Registry</h1>
          <p className="text-sm text-rosary/50 mt-1">Author master data entity types, fields, relationships and export the registry as JSON. (Metadata-only SKELETON)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigator.clipboard?.writeText(exportJSON())}>Copy JSON</Button>
          <Button size="sm" onClick={downloadJSON}>Download</Button>
          <Button variant="outline" size="sm" onClick={() => {
            // Insert a curated set of core MDM schemas (Person, Organization, Product, Machine)
            // This is metadata-only: no persistence, no file uploads, no runtime wiring.
            const insertCoreSchemas = () => {
              const now = new Date().toISOString();
              const makeId = () => uuid();

              // create base ids first so relationships can reference them
              const personId = makeId();
              const orgId = makeId();
              const productId = makeId();
              const machineId = makeId();

              const core: EntityDef[] = [
                {
                  id: personId,
                  name: 'Person',
                  type: 'person',
                  status: 'published',
                  description: 'Master record for any person (customers, suppliers, employees, drivers, managers).',
                  fields: [
                    { id: makeId(), name: 'fullName', type: 'string', required: true, multi: false, description: 'Full legal name' },
                    { id: makeId(), name: 'personType', type: 'enum', required: true, multi: false, description: 'Person category (customer, employee, driver, manager, supplier, contractor)', options: ['customer','employee','driver','manager','supplier','contractor','other'] },
                    { id: makeId(), name: 'nationalId', type: 'string', required: false, multi: false, description: 'National ID or official identifier' },
                    { id: makeId(), name: 'dateOfBirth', type: 'date', required: false, multi: false, description: 'Date of birth' },
                    { id: makeId(), name: 'gender', type: 'enum', required: false, multi: false, description: 'Gender', options: ['male','female','other','unknown'] },
                    { id: makeId(), name: 'contacts', type: 'contact', required: false, multi: true, description: 'Phone, email and other contact points' },
                    { id: makeId(), name: 'addresses', type: 'address', required: false, multi: true, description: 'One or more postal addresses' },
                    { id: makeId(), name: 'profileImage', type: 'image', required: false, multi: false, description: 'Identity or profile image (metadata only)' },
                    { id: makeId(), name: 'relatedOrganizations', type: 'relation', required: false, multi: true, description: 'References to organizations the person is affiliated with', target: orgId },
                    { id: makeId(), name: 'status', type: 'enum', required: true, multi: false, description: 'Active status', options: ['active','inactive','suspended'] },
                    { id: makeId(), name: 'notes', type: 'text', required: false, multi: false, description: 'Freeform notes' },
                    // audit metadata fields are included but flagged as read-only in description
                    { id: makeId(), name: 'createdAt', type: 'date', required: true, multi: false, description: 'Record creation timestamp (audit)' },
                    { id: makeId(), name: 'updatedAt', type: 'date', required: false, multi: false, description: 'Record last updated timestamp (audit)' },
                    { id: makeId(), name: 'version', type: 'number', required: false, multi: false, description: 'Record version for optimistic concurrency (audit)' },
                  ],
                  relationships: [
                    { id: makeId(), name: 'employer', target: orgId, cardinality: '1:1', required: false, description: 'Primary employer or organization' }
                  ],
                  createdAt: now,
                  changeLog: [],
                },

                {
                  id: orgId,
                  name: 'Organization',
                  type: 'organization',
                  status: 'published',
                  description: 'Legal entity, department or authority',
                  fields: [
                    { id: makeId(), name: 'legalName', type: 'string', required: true, multi: false, description: 'Registered legal name' },
                    { id: makeId(), name: 'registrationNumber', type: 'string', required: false, multi: false, description: 'Official registration number' },
                    { id: makeId(), name: 'businessScope', type: 'text', required: false, multi: false, description: 'Business scope and activities' },
                    { id: makeId(), name: 'organizationType', type: 'enum', required: true, multi: false, description: 'Organization category', options: ['company','department','authority','ngo','other'] },
                    { id: makeId(), name: 'addresses', type: 'address', required: false, multi: true, description: 'Registered and operational addresses' },
                    { id: makeId(), name: 'contacts', type: 'contact', required: false, multi: true, description: 'Primary phone/email/points of contact' },
                    { id: makeId(), name: 'documents', type: 'document', required: false, multi: true, description: 'Licenses, certificates and supporting documents (metadata only)' },
                    { id: makeId(), name: 'status', type: 'enum', required: true, multi: false, description: 'Operational status', options: ['active','inactive','deregistered'] },
                    { id: makeId(), name: 'createdAt', type: 'date', required: true, multi: false, description: 'Record creation timestamp (audit)' },
                    { id: makeId(), name: 'updatedAt', type: 'date', required: false, multi: false, description: 'Record last updated timestamp (audit)' },
                    { id: makeId(), name: 'version', type: 'number', required: false, multi: false, description: 'Record version (audit)' },
                  ],
                  relationships: [
                    { id: makeId(), name: 'keyContacts', target: personId, cardinality: '1:n', required: false, description: 'Persons associated with this organization' }
                  ],
                  createdAt: now,
                  changeLog: [],
                },

                {
                  id: productId,
                  name: 'Product',
                  type: 'product',
                  status: 'published',
                  description: 'Master record for finished goods, ingredients or materials',
                  fields: [
                    { id: makeId(), name: 'productName', type: 'string', required: true, multi: false, description: 'Human readable product name' },
                    { id: makeId(), name: 'productCode', type: 'string', required: true, multi: false, description: 'Canonical product code / SKU' },
                    { id: makeId(), name: 'productImage', type: 'image', required: false, multi: false, description: 'Representative product image (metadata only)' },
                    { id: makeId(), name: 'bom', type: 'relation', required: false, multi: true, description: 'Bill of Materials (relations to component products or materials)', target: productId },
                    { id: makeId(), name: 'formula', type: 'text', required: false, multi: false, description: 'Formula or recipe (structural definition only)' },
                    { id: makeId(), name: 'requiredMachines', type: 'relation', required: false, multi: true, description: 'Machines/Equipment required for production', target: machineId },
                    { id: makeId(), name: 'requiredManpower', type: 'structure', required: false, multi: false, description: 'Required roles and counts (e.g. [{role:"operator",count:2}]) - metadata only' },
                    { id: makeId(), name: 'allergens', type: 'text', required: false, multi: true, description: 'Allergen declarations' },
                    { id: makeId(), name: 'shelfLifeDays', type: 'number', required: false, multi: false, description: 'Shelf life in days' },
                    { id: makeId(), name: 'status', type: 'enum', required: true, multi: false, description: 'Product lifecycle status', options: ['active','inactive','discontinued'] },
                    { id: makeId(), name: 'createdAt', type: 'date', required: true, multi: false, description: 'Record creation timestamp (audit)' },
                    { id: makeId(), name: 'updatedAt', type: 'date', required: false, multi: false, description: 'Record last updated timestamp (audit)' },
                    { id: makeId(), name: 'version', type: 'number', required: false, multi: false, description: 'Record version (audit)' },
                  ],
                  relationships: [
                    { id: makeId(), name: 'components', target: productId, cardinality: 'n:m', required: false, description: 'Component items referenced by BOM' }
                  ],
                  createdAt: now,
                  changeLog: [],
                },

                {
                  id: machineId,
                  name: 'Machine',
                  type: 'machine',
                  status: 'published',
                  description: 'Machine or equipment master record',
                  fields: [
                    { id: makeId(), name: 'machineName', type: 'string', required: true, multi: false, description: 'Machine / equipment name' },
                    { id: makeId(), name: 'machineCode', type: 'string', required: false, multi: false, description: 'Internal machine code' },
                    { id: makeId(), name: 'serialNumber', type: 'string', required: false, multi: false, description: 'Manufacturer serial number' },
                    { id: makeId(), name: 'machineImage', type: 'image', required: false, multi: false, description: 'Machine photo (metadata only)' },
                    { id: makeId(), name: 'capacity', type: 'structure', required: false, multi: false, description: 'Capacity description (e.g. {unit:"kg/hr",value:1200})' },
                    { id: makeId(), name: 'relatedProducts', type: 'relation', required: false, multi: true, description: 'Products this machine is used to produce', target: productId },
                    { id: makeId(), name: 'requiredOperators', type: 'structure', required: false, multi: false, description: 'Required operator roles and counts' },
                    { id: makeId(), name: 'maintenanceCategory', type: 'enum', required: false, multi: false, description: 'Maintenance category', options: ['preventive','corrective','predictive'] },
                    { id: makeId(), name: 'status', type: 'enum', required: true, multi: false, description: 'Operational status', options: ['operational','out-of-service','decommissioned'] },
                    { id: makeId(), name: 'createdAt', type: 'date', required: true, multi: false, description: 'Record creation timestamp (audit)' },
                    { id: makeId(), name: 'updatedAt', type: 'date', required: false, multi: false, description: 'Record last updated timestamp (audit)' },
                    { id: makeId(), name: 'version', type: 'number', required: false, multi: false, description: 'Record version (audit)' },
                  ],
                  relationships: [],
                  createdAt: now,
                  changeLog: [],
                }
              ];

              // Avoid duplicate insertion by checking existing entity types
              setEntities((prev) => {
                const existingTypes = new Set(prev.map((p) => p.type));
                const toAdd = core.filter((c) => !existingTypes.has(c.type));
                return [...prev, ...toAdd];
              });
            };
            insertCoreSchemas();
          }}>Insert Core Schemas</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-1">
          <h3 className="font-bold">Entities</h3>
          <div className="mt-4 space-y-2">
            {entities.map((e) => (
              <div key={e.id} className="flex items-center justify-between">
                <div className="cursor-pointer" onClick={() => setSelectedId(e.id)}>
                  <div className="font-semibold">{e.name || e.id}</div>
                  <div className="text-xs text-rosary/40">{e.type} • {e.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => removeEntity(e.id)}>Delete</Button>
                </div>
              </div>
            ))}

            <div className="mt-4 space-y-2">
              <Label>New Entity</Label>
              <Input placeholder="Name" value={draft.name || ''} onChange={(ev) => setDraft({ ...draft, name: ev.target.value })} />
              <div className="flex gap-2 mt-2">
                <Input placeholder="Type (e.g. Product)" value={draft.type || ''} onChange={(ev) => setDraft({ ...draft, type: ev.target.value })} />
                <Input placeholder="External IDs (comma)" value={(draft.externalIds || []).join?.(', ') || ''} onChange={(ev) => setDraft({ ...draft, externalIds: ev.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
              </div>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => setDraft({ ...draft, fields: [...(draft.fields || [])] })}>Edit Draft</Button>
                <Button onClick={addEntity}>Create</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="col-span-2">
          <h3 className="font-bold">Editor</h3>
          {!selected && <div className="text-sm text-rosary/40 mt-4">Select or create an entity to edit its fields and relationships.</div>}

          {selected && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={selected.name} onChange={(ev) => updateEntity(selected.id, { name: ev.target.value })} />
                </div>
                <div>
                  <Label>Type / Status</Label>
                  <div className="flex gap-2">
                    <Input value={selected.type} onChange={(ev) => updateEntity(selected.id, { type: ev.target.value })} />
                    <Input value={selected.status} onChange={(ev) => updateEntity(selected.id, { status: ev.target.value as any })} />
                  </div>
                </div>
              </div>

              <div>
                <Label>Fields</Label>
                <div className="space-y-2 mt-2">
                  {selected.fields.map((f, idx) => (
                    <div key={f.id} className="flex items-center gap-2">
                      <Input value={f.name} onChange={(ev) => { const nf = [...selected.fields]; nf[idx] = { ...nf[idx], name: ev.target.value }; updateEntity(selected.id, { fields: nf }); }} />
                      <select value={f.type} onChange={(ev) => { const nf = [...selected.fields]; nf[idx] = { ...nf[idx], type: ev.target.value }; updateEntity(selected.id, { fields: nf }); }} className="h-10 px-2">
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="date">date</option>
                        <option value="boolean">boolean</option>
                        <option value="text">text</option>
                      </select>
                      <label className="text-sm"><input type="checkbox" checked={f.required} onChange={(ev) => { const nf = [...selected.fields]; nf[idx] = { ...nf[idx], required: ev.target.checked }; updateEntity(selected.id, { fields: nf }); }} /> required</label>
                      <label className="text-sm"><input type="checkbox" checked={f.multi} onChange={(ev) => { const nf = [...selected.fields]; nf[idx] = { ...nf[idx], multi: ev.target.checked }; updateEntity(selected.id, { fields: nf }); }} /> multi</label>
                    </div>
                  ))}
                  <div className="mt-2">
                    <Button onClick={() => addFieldToEntity(selected.id)}>Add field</Button>
                  </div>
                </div>
              </div>

              <div>
                <Label>Relationships</Label>
                <div className="space-y-2 mt-2">
                  {selected.relationships.map((r, idx) => (
                    <div key={r.id} className="flex items-center gap-2">
                      <Input value={r.name} onChange={(ev) => { const nr = [...selected.relationships]; nr[idx] = { ...nr[idx], name: ev.target.value }; updateEntity(selected.id, { relationships: nr }); }} />
                      <select value={r.target} onChange={(ev) => { const nr = [...selected.relationships]; nr[idx] = { ...nr[idx], target: ev.target.value }; updateEntity(selected.id, { relationships: nr }); }}>
                        <option value="">-- target entity --</option>
                        {entities.map((en) => <option key={en.id} value={en.id}>{en.name || en.id}</option>)}
                      </select>
                      <select value={r.cardinality} onChange={(ev) => { const nr = [...selected.relationships]; nr[idx] = { ...nr[idx], cardinality: ev.target.value as any }; updateEntity(selected.id, { relationships: nr }); }}>
                        <option>1:1</option>
                        <option>1:n</option>
                        <option>n:m</option>
                      </select>
                      <label className="text-sm"><input type="checkbox" checked={r.required} onChange={(ev) => { const nr = [...selected.relationships]; nr[idx] = { ...nr[idx], required: ev.target.checked }; updateEntity(selected.id, { relationships: nr }); }} /> required</label>
                    </div>
                  ))}
                  <div className="mt-2">
                    <Button onClick={() => addRelationshipToEntity(selected.id)}>Add relationship</Button>
                  </div>
                </div>
              </div>

              <div>
                <Label>Versioning / Change log</Label>
                <div className="flex gap-2 mt-2">
                  <Input placeholder="Who" onChange={() => {}} />
                  <Input placeholder="Reason / note" value={versionNote} onChange={(ev) => setVersionNote(ev.target.value)} />
                  <Button onClick={() => saveVersion(selected.id)}>Save Version</Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <h3 className="font-bold">Export / Import</h3>
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <Button onClick={() => navigator.clipboard?.writeText(exportJSON())}>Copy JSON</Button>
            <Button onClick={downloadJSON}>Download JSON</Button>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileImport} />
          </div>
          <div>
            <Textarea value={exportJSON()} readOnly rows={14} />
          </div>
        </div>
      </Card>
      
      <Card>
        <h3 className="font-bold">Export JSON Schemas (Draft 2020-12)</h3>
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <Button onClick={() => navigator.clipboard?.writeText(exportSchemasJSON())}>Copy Schemas</Button>
            <Button onClick={downloadSchemas}>Download Schemas</Button>
            <Button variant="ghost" onClick={() => { /* Intentionally no runtime wiring */ }}>View UI Hints Only</Button>
            <Button onClick={downloadAllPerEntity}>Download per-entity files</Button>
          </div>
          {entities.length > 0 && (
            <div className="mt-3 space-y-2">
              {entities.map((e) => (
                <div key={e.id} className="flex items-center justify-between">
                  <div className="text-sm">{e.name} <span className="text-rosary/40">({e.type})</span></div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => downloadEntityFiles(e.type)}>Download files</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            <Textarea value={exportSchemasJSON()} readOnly rows={18} />
          </div>
        </div>
      </Card>
    </div>
  );
}
