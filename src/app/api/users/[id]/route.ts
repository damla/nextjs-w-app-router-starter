import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { corsHeaders } from '../../helpers';

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Returns the user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: No user with ID found
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });

  if (!user) {
    return new NextResponse('No user with ID found', {
      status: 404,
      headers: corsHeaders
    });
  }

  return NextResponse.json(user, {
    headers: corsHeaders
  });
}

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     description: Update the user data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: No user with ID found
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  const updated_user = await prisma.user.update({
    where: { id },
    data: json
  });

  if (!updated_user) {
    return new NextResponse('No user with ID found', { status: 404 });
  }

  return NextResponse.json(updated_user);
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     description: Delete the user data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Success
 *       404:
 *         description: No user with ID found
 *       500:
 *        description: Internal Server Error
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.user.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return new NextResponse('No user with ID found', { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
