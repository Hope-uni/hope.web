export const ROLES = {
  ADMIN: 'Admin',
  PATIENT: 'Paciente',
  TUTOR: 'Tutor',
  THERAPIST: 'Terapeuta',
};

export type RoleType = keyof typeof ROLES;
