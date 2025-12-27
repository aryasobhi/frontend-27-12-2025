import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function getIconByName(name: string): LucideIcon {
  const icon = (Icons as any)[name];
  return icon || Icons.HelpCircle;
}
