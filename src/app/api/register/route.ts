import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, address, password } = body.data;

    if (!name || !email || !address || !password) {
      return new NextResponse('Missing field found', {
        status: 422
      });
    }
    const exist = await prisma.user.findUnique({ where: { email: email } });

    if (exist) {
      return new NextResponse('User already exist', {
        status: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
        password: hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
