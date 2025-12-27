/*
	Status: SKELETON
	Reason: API aggregator exists but many modules call fallback mocks; backend contract not fully implemented.
	Allowed actions: authoring-only (aggregation plumbing only)
*/

// Central API exports aggregator
export * from './products';
export { apiClient } from './client';
export { default } from './client';
