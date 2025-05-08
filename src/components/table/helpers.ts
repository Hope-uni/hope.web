export const RENDER_MODE_ACTION = {
  POPUP: 'popup',
  DELETE: 'delete',
  NEXT_PHASE: 'next_phase',
  ADD_OBSERVATION: 'add_observation',
  ADD_CATEGORY: 'add_category',
  ASSIGN_ACHIEVEMENT: 'assign_achievement',
  UNASSIGN_ACHIEVEMENT: 'unassign_achievement',
  ASSIGN_PATIENT: 'assign_patient',
  ADD_ACTIVITY: 'add_activity',
  ADD_PICTOGRAM: 'add_pictogram',
  ADD_ACHIEVEMENT: 'add_achievement',
  CHANGE_MONOCHROME: 'change_monochrome',
} as const;

export type RenderModeActionTypes =
  (typeof RENDER_MODE_ACTION)[keyof typeof RENDER_MODE_ACTION];
