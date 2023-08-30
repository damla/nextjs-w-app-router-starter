import { Role } from '@prisma/client';
import { Session } from 'next-auth';

export function isLoggedIn(session: Session) {
  return session;
}

export function isUser(session: Session) {
  return session.user.role === Role.USER;
}

export function isAdmin(session: Session) {
  return session.user.role === Role.ADMIN;
}
