export const API = {
  Login: 'auth/login',
  Me: 'auth/me',
  Forgot_Password: 'auth/forgot-password',
  Reset_Password: 'auth/reset-password',
  User: {
    List: '/user',
    Create: '/user',
    Role: {
      List: '/role',
    },
  },
  Patient: {
    List: '/patient',
    Create: '/patient',
  },
  Tutor: {
    List: '/tutor',
    Create: '/therapist',
  },
  Therapist: {
    List: '/therapist',
    Create: '/therapist',
  },
  PECS: {
    ListPhase: '/phase',
    ListDegree: '/teaDegree',
  },
};
