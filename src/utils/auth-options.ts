import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Routes } from '@/config/routes';
import bcrypt from 'bcrypt';
import { isDevelopment } from './env';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'E-mail',
      credentials: {
        email: { label: 'E-mail', type: 'email', placeholder: 'Enter e-mail' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) throw new Error('User not found');

        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordValid) {
          throw new Error('Invalid password');
        }

        return user;
      }
    })
  ],
  callbacks: {
    // JWT is triggered before session
    // returns the user only on sign in action
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address,
          role: user.role
        };
      }

      const newUser = await prisma.user.update({
        where: {
          id: token.id
        },
        data: {
          name: token.name
        }
      });

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address,
          name: token.name,
          role: token.role
        }
      };
    }
  },
  pages: {
    signIn: Routes.SIGN_IN
  },
  session: {
    strategy: 'jwt'
  },
  debug: isDevelopment,
  secret: process.env.NEXTAUTH_SECRET
};
