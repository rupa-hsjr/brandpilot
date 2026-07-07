import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    const events = await prisma.calendarEvent.findMany({
      where: { userId },
      orderBy: { startAt: 'asc' }
    });

    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    const body = await req.json();
    const { title, type, description, startAt, endAt } = body;

    if (!title || !type || !startAt || !endAt) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Auto-generate AI post ideas based on event properties
    let suggestedIdea = `Write a post sharing insights about "${title}".`;
    if (type === 'launch') {
      suggestedIdea = `Draft a high-engagement post detailing the product story of "${title}", emphasizing what pain points it solves and launching link.`;
    } else if (type === 'webinar') {
      suggestedIdea = `Create a teaser inviting people to register for "${title}" with key takeaways they will learn.`;
    } else if (type === 'hackathon') {
      suggestedIdea = `Share live updates, photos, or behind-the-scenes thoughts on "${title}" to build community engagement.`;
    } else if (type === 'meeting') {
      suggestedIdea = `Discuss a key lesson or quote learned after wrapping up "${title}".`;
    }

    const event = await prisma.calendarEvent.create({
      data: {
        userId,
        title,
        type,
        description,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        suggestedIdea
      }
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
