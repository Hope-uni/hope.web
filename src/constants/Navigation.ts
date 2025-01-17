export const RoutesName = {
  login: {
    index: '/login',
  },
  forgotPassword: {
    index: '/forgot-password',
  },
  resetPassword: {
    index: '/reset-password',
  },
  patient: {
    index: '/admin/patients',
    create: '/admin/patients/create',
  },
  tutor: {
    index: '/admin/tutors',
    create: '/admin/tutors/create',
  },
  therapist: {
    index: '/admin/therapists',
    create: '/admin/therapists/create',
  },
  pictogram: {
    index: '/admin/pictograms',
    create: '/admin/pictograms/create',
  },
  category: {
    index: '/admin/categories',
    create: '/admin/categories/create',
  },
  activity: {
    index: '/admin/activities',
    create: '/admin/activities/create',
  },
  achievement: {
    index: '/admin/achievements',
    create: '/admin/achievements/create',
  },
  phase: {
    index: '/admin/phases',
  },
  user: {
    index: '/admin/users',
    create: '/admin/users/create',
    edit: '/admin/users/edit',
  },
  role: {
    index: '/admin/roles',
    create: '/admin/roles/create',
  },
};

export const ProtectedRoutes = ['/admin/*'];

export const AuthRoutes = [
  RoutesName.login.index,
  RoutesName.forgotPassword.index,
  RoutesName.resetPassword.index,
];

export const DEFAULT_REDIRECT_LOGIN_URL = RoutesName.login.index;
export const DEFAULT_REDIRECT_HOME_URL = '/admin/dashboard';
