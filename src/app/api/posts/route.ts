import { NextRequest, NextResponse } from 'next/server';

import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/posts:
 *   get:
 *     description: Returns the posts list
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *        description: Internal Server Error
 */
export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

/**
 * @swagger
 * /api/posts:
 *   post:
 *     description: Creates a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/initPostApi'
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *        description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (token?.role === Role.ADMIN) {
      const json = await request.json();
      const post = await prisma.post.create({
        data: { authorId: token.id, ...json }
      });

      return new NextResponse(JSON.stringify(post), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new NextResponse('Unauthorized', { status: 401 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
