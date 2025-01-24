import { MeResponse, User } from '@/models/schema';
import { UserSession } from '@/models/types/auth';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSession & DefaultSession['user'];
  }

  interface User {
    error?: string;
  }
}
