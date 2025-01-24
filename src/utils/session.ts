import { UserSession } from '@/models/types/auth';

export const getCurrentUser = (session: UserSession) => {
  const defaultUser = {
    image: undefined,
    fullName: session?.username || '',
    role: session?.role,
  };

  if (!session?.superAdmin && !session?.admin) {
    return {
      image: session?.profile?.image || undefined,
      fullName:
        `${session?.profile?.firstName} ${session?.profile?.surname}`.trim(),
      role: defaultUser.role,
    };
  }

  return defaultUser;
};
