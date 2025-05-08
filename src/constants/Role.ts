export const ROLES_KEYS = {
  ADMIN: 'ADMIN',
  PATIENT: 'PATIENT',
  TUTOR: 'TUTOR',
  THERAPIST: 'THERAPIST',
} as const;

export const ROLES = {
  ADMIN: 'Admin',
  PATIENT: 'Paciente',
  TUTOR: 'Tutor',
  THERAPIST: 'Terapeuta',
} as const;

export type RoleKeyType = keyof typeof ROLES_KEYS;

export type RoleType = (typeof ROLES_KEYS)[keyof typeof ROLES_KEYS];
