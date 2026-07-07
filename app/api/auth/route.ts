import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword, signJWT } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'register') {
      const parsed = registerSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid input. Password must be at least 6 characters.' }, { status: 400 });
      }

      const { email, password, name } = parsed.data;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      const passwordHash = hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name: name || email.split('@')[0],
          isVerified: true, // Auto-verified for local/hackathon convenience
        }
      });

      // Create settings record
      await prisma.settings.create({
        data: {
          userId: user.id,
          theme: 'dark',
        }
      });

      const token = signJWT({ userId: user.id, email: user.email, role: user.role });
      
      const response = NextResponse.json({ 
        message: 'Registration successful',
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
      response.cookies.set('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
      return response;
    } 

    if (action === 'login') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
      }

      const valid = verifyPassword(password, user.passwordHash);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
      }

      const token = signJWT({ userId: user.id, email: user.email, role: user.role });
      const response = NextResponse.json({ 
        message: 'Login successful',
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
      response.cookies.set('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
