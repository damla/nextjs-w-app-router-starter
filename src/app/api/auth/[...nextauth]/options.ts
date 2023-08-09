import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
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
        const users = await prisma.user.findMany();
        const user = users.find(u => u.email === credentials.email);

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return user;
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    }
  }
};
