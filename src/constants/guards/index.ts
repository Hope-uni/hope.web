import {
  ACTION_GUARD_KEYS,
  permissionsMatrix,
  RolesGuardMap,
  SUBJECT_GUARD_KEYS,
} from './source';
import { ActionGuardType, PermissionKey, subjectGuardType } from './types';

export const ROLES = RolesGuardMap;

export const PERMISSIONS = Object.fromEntries(
  permissionsMatrix.flatMap((item) =>
    item.actions.map((action) => {
      const actionKey = Object.entries(ACTION_GUARD_KEYS).find(
        ([, val]) => val === action,
      )?.[0]!;
      const subjectKey = Object.entries(SUBJECT_GUARD_KEYS).find(
        ([, val]) => val === item.subject,
      )?.[0]!;
      const key = `${actionKey}_${subjectKey}` as PermissionKey;
      const value = `${action}-${item.subject}`;
      return [key, value];
    }),
  ),
) as {
  [K in PermissionKey]: `${ActionGuardType}-${subjectGuardType}`;
};

export type PermissionType = (typeof PERMISSIONS)[PermissionKey];

export * from './source';
