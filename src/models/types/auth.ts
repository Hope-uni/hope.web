import { MeResponse, Role } from '@/models/schema';

export interface UserSession extends Omit<MeResponse, 'roles'> {
  accessToken: string;
  refreshToken: string;
  role: Role;
}
