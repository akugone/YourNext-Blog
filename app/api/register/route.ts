import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // VALIDATION
    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Missing parameter' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // MAPPING
    const dataMapped = {
      email: email,
      name: name,
      hashedPassword: hashedPassword,
    };

    // PERSISTENCE
    const user = await prisma.user.create({
      data: dataMapped,
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name }, { status: 201 });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
