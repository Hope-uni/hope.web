import { Role } from '@/models/schema';
import { UserSession } from '@/models/types/auth';

export const getCurrentUser = (session: UserSession) => {
  const defaultUser = {
    imageUrl: undefined,
    fullName: session?.username || '',
    role: session?.role,
  };

  if (!session?.superAdmin && !session?.admin) {
    return {
      imageUrl: session?.profile?.imageUrl || undefined,
      fullName:
        `${session?.profile?.firstName} ${session?.profile?.surname}`.trim(),
      role: defaultUser.role,
    };
  }

  return defaultUser;
};

export const validateRole = (
  userRole: string | undefined | null,
  targetRole: string | string[],
): boolean => {
  if (!userRole || !targetRole) {
    return false;
  }

  if (Array.isArray(targetRole)) {
    return targetRole.some(
      (role) => role.toLowerCase() === userRole.toLowerCase(),
    );
  }

  return userRole.toLowerCase() === targetRole.toLowerCase();
};

export const getFirstRole = (roles: Role[]) => {
  return roles?.length > 0 ? roles[0] : null;
};
