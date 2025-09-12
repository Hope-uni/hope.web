import {
  LoginPayloadSchema,
  MeResponse,
  userNotVerifiedResponse,
} from '@/models/schema';
import { UserSession } from '@/models/types/auth';
import { LoginService, serviceMe } from '@/services/auth/auth.service';
import { AxiosError } from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';

const MESSAGE_USER_NOT_VERIFIED = 'Usuario no verificado';

type GetDataMeSuccess = {
  success: boolean;
  data: unknown;
};

const getDataMe = async (accessToken: string): Promise<GetDataMeSuccess> => {
  try {
    const resMe = await serviceMe({ accessToken });

    if (resMe.message === MESSAGE_USER_NOT_VERIFIED) {
      return {
        success: false,
        data: resMe.data,
      };
    }

    return {
      success: true,
      data: resMe.data,
    };
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 401 &&
      error.response?.data?.message === MESSAGE_USER_NOT_VERIFIED
    ) {
      return {
        success: true,
        data: error.response.data,
      };
    }
    throw error as Error;
  }
};

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

          const serviceMe = await getDataMe(accessToken);

          if (!serviceMe.success) {
            const resUserNotVerified =
              serviceMe.data as userNotVerifiedResponse;
            return {
              id: resUserNotVerified?.id,
              email: validateCredentials.email_username,
              userVerified: false,
              accessToken,
              refreshToken,
            };
          }

          const resMe = serviceMe.data as MeResponse;

          const userData = {
            id: resMe?.id,
            email: resMe?.email,
          };

          if (!resMe.superAdmin && !resMe.admin) {
            return {
              ...userData,
              error: 'unauthorized',
            };
          }

          return {
            ...userData,
            roles: resMe.roles.map((role) => role.name),
            userVerified: resMe.userVerified,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          if (error instanceof AxiosError && error.response?.data?.message) {
            throw new Error(error.response?.data?.message);
          }
          throw new Error(
            (error as Error).message || (error as any).errorMessage,
          );
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
      const user = session.user as UserSession;

      if (token?.user && user.userVerified) {
        const resMe = await serviceMe({
          accessToken: session.user.accessToken,
        });

        if (!resMe?.data || resMe?.error) {
          if (resMe?.statusCode === 401) {
            await signOut();
          }

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
