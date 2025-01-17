import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginPayloadSchema } from '@/models/schema';

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

          /* const response = await LoginService(validateCredentials);
    
              console.log(validateCredentials, 'validateCredentials'); */

          const { email_username, password } = validateCredentials;

          // Simulación: Verificar credenciales estáticas
          if (email_username === 'admin' && password === 'password') {
            return {
              id: '1',
              name: 'Admin User test',
              email: 'admin@example.com',
            };
          }

          // Si las credenciales son inválidas, devuelve null
          return null;

          /* const res = await serviceLogin(credentials);
        
                        if (res.error) {
                            throw new Error(res.message);
                        }
        
                        const resMe = await serviceMe(res.token);
        
                        if (resMe.error) {
                            throw new Error(resMe.error);
                        }
        
                        return {
                            ...resMe.data,
                            tokenUser: res.token,
                        }; */
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /* async session({ session, token }) {
                session.user = token.user;
    
                if (token?.user?.id) {
                    const resMe = await serviceMe(session.user.tokenUser);
    
                    if (resMe.error) {
                        throw new Error(resMe.error);
                    }
    
                    const resNotification = await serviceNotification(session.user.tokenUser);
    
                    session.user = {
                        ...resMe.data,
                        tokenUser: session.user.tokenUser,
                        notifications: !resNotification.error ? resNotification.data : []
                    };
                }
    
                return session;
            },
            async jwt({ token, user }) {
    
                if (user) {
                    token.user = user;
                }
                return token;
            }, */
  },
} satisfies NextAuthOptions;
