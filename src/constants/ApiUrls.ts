export const API = {
  Login: 'auth/login',
  Me: 'auth/me',
  Forgot_Password: 'auth/forgot-password',
  Reset_Password: 'auth/reset-password',
  User: {
    List: '/user',
    Create: '/user',
    find: '/user',
    Role: {
      List: '/role',
    },
  },
  Patient: {
    List: '/patient',
    Create: '/patient',
    find: '/patient',
  },
  Tutor: {
    List: '/tutor',
    Create: '/tutor',
    find: '/tutor',
  },
  Therapist: {
    List: '/therapist',
    Create: '/therapist',
    find: '/therapist',
  },
  PECS: {
    ListPhase: '/phase',
    ListDegree: '/teaDegree',
  },
};
