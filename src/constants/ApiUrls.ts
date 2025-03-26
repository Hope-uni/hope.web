export const API = {
  Login: 'auth/login',
  Me: 'auth/me',
  Forgot_Password: 'auth/forgot-password',
  Reset_Password: 'auth/reset-password',
  User: {
    Index: '/user',
    Role: {
      Index: '/role',
    },
  },
  Patient: {
    Index: '/patient',
    AddObservation: '/observation/id-patient',
  },
  Tutor: {
    Index: '/tutor',
  },
  Therapist: {
    Index: '/therapist',
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
  },
  Pictogram: {
    Index: 'pictogram',
  },
  CategoryPictogram: {
    Index: 'category',
  },
};
