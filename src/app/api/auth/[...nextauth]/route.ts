import { AuthConfig } from '@/config/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(AuthConfig);
export { handler as GET, handler as POST };
