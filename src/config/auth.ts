import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginPayloadSchema } from '@/models/schema';
import { LoginService, serviceMe } from '@/services/auth/auth.service';
import { UserSession } from '@/models/types/auth';

export const AuthConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const validateCredentials = LoginPayloadSchema.parse(credentials);

          const response = await LoginService(validateCredentials);

          if (!response?.data || response?.error) {
            throw new Error(response?.message);
          }

          const { accessToken, refreshToken } = response.data;

          const resMe = await serviceMe({ accessToken });

          if (!resMe?.data || resMe?.error) {
            throw new Error(resMe?.message);
          }

          const userData = {
            id: resMe?.data.id,
            email: resMe?.data.email,
          };

          if (!resMe.data.superAdmin && !resMe.data.admin) {
            return {
              ...userData,
              error: 'unauthorized',
            };
          }

          return {
            ...userData,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.error === 'unauthorized') {
        throw new Error('unauthorized');
      }
      return true;
    },
    async session({ session, token }) {
      session.user = token.user as UserSession;

      if (token?.user) {
        const resMe = await serviceMe({
          accessToken: session.user.accessToken,
        });

        if (!resMe?.data || resMe?.error) {
          throw new Error(resMe?.message);
        }

        session.user = {
          ...session.user,
          ...resMe.data,
          role: resMe.data.roles[0],
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserSession;
      }
      return token;
    },
  },
} satisfies NextAuthOptions;
