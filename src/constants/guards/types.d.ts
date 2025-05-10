import { ACTION_GUARD_KEYS, SUBJECT_GUARD_KEYS, RolesGuardMap } from './source';

export type RoleKeyType = keyof typeof RolesGuardMap;
export type RoleType = (typeof RolesGuardMap)[keyof typeof RolesGuardMap];

export type ActionGuardKeysType = keyof typeof ACTION_GUARD_KEYS;
export type ActionGuardType =
  (typeof ACTION_GUARD_KEYS)[keyof typeof ACTION_GUARD_KEYS];

export type SubjectGuardKeysType = keyof typeof SUBJECT_GUARD_KEYS;
export type subjectGuardType =
  (typeof SUBJECT_GUARD_KEYS)[keyof typeof SUBJECT_GUARD_KEYS];

export type PermissionKey = `${ActionGuardKeysType}_${SubjectGuardKeysType}`;

export type ItemPermissionsMatrix = {
  subject: subjectGuardType;
  group?: string;
  actions: ActionGuardType[];
};
