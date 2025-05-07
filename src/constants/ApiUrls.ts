export const API = {
  Auth: {
    Login: 'auth/login',
    Me: 'auth/me',
    Forgot_Password: 'auth/forgot-password',
    Reset_Password: 'auth/reset-password',
    Change_Password: 'auth/change-password',
  },
  User: {
    Index: '/user',
    Role: {
      Index: '/role',
    },
  },
  Patient: {
    Index: '/patient',
    WithoutTherapist: '/patient/patients-therapist',
    AvailableForActivity: '/patient/availableForActivity',
    AddObservation: '/observation/id-patient',
    ChangeTherapist: '/patient/change-therapist/',
  },
  Tutor: {
    Index: '/tutor',
  },
  Therapist: {
    Index: '/therapist',
    Assign: 'therapist/assignPatient/',
  },
  PECS: {
    Phase: {
      index: '/phase',
      PhaseShift: '/phase/phase-shift',
    },
    Degree: {
      index: '/teaDegree',
    },
  },
  Activity: {
    Index: 'activity',
    Assign: '/activity/assign',
    Unassign: '/activity/unassign',
  },
  Pictogram: {
    Index: 'pictogram',
  },
  CategoryPictogram: {
    Index: 'category',
  },
  Achievement: {
    Index: 'achievements',
    Assign: '/achievements/assign-achievement',
    Unassign: '/achievements/unassign-achievement',
  },
};
