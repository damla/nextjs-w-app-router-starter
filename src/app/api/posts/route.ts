import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/posts:
 *   get:
 *     description: Returns the posts list
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET(request: Request) {
  const posts = await prisma.post.findMany();

  return NextResponse.json(posts);
}

/**
 * @swagger
 * /api/posts:
 *   post:
 *     description: Creates a new post
 *     responses:
 *       201:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
export async function POST(request: Request) {
  try {
    const json = await request.json();

    const post = await prisma.post.create({
      data: json
    });

    return new NextResponse(JSON.stringify(post), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
