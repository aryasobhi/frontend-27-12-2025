import 'react-i18next';

// Loosen react-i18next translation key typing for the workspace.
// Many call sites use dynamic/generated keys; defining resources as `any`
// lets `t('some.key')` accept string literals without expanding a large union.
declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: Record<string, any>;
  }
}
