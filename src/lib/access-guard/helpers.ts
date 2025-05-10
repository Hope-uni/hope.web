export const MethodGuardValidation = {
  PERMISSION: 'permission',
  ROLE: 'role',
} as const;

export type MethodGuardValidationType =
  (typeof MethodGuardValidation)[keyof typeof MethodGuardValidation];
