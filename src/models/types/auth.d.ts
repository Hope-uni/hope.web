import { MeResponse, Role } from '@/models/schema';
import type { JWT as DefaultJWT } from 'next-auth/jwt';

export interface UserSession extends Omit<MeResponse, 'roles'> {
  id: string;
  email: string;
  userVerified: boolean;
  accessToken: string;
  refreshToken: string;
  role: Role;
}

export interface UserTokenJWT extends DefaultJWT {
  user: UserSession;
}
