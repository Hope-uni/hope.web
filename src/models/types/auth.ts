import { MeResponse } from '@/models/schema';

export interface UserSession extends MeResponse {
  accessToken: string;
  refreshToken: string;
}
