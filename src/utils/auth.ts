import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { Role } from '@prisma/client';

export async function isLoggedIn() {
  const session = await getServerSession(authOptions);
  return session && session.user;
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && session.user.role === Role.ADMIN;
}
