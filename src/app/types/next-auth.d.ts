import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      address?: string;
      createdAt: Date;
      updatedAt: Date;
      role: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string;
  }
}
