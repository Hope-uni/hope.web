import { MeResponse, Role, RoleWithPermissions } from '@/models/schema';
import type { JWT as DefaultJWT } from 'next-auth/jwt';

export interface UserSession extends Omit<MeResponse, 'roles'> {
  id: string;
  email: string;
  userVerified: boolean;
  accessToken: string;
  refreshToken: string;
  role: Role;
  roles?: RoleWithPermissions[];
}

export interface UserTokenJWT extends DefaultJWT {
  user: UserSession;
}
