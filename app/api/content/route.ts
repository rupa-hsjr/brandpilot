import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { generateContent } from '@/lib/ai';
import { generateWithGemini } from '@/lib/gemini';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    const contents = await prisma.content.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ contents });
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
    const { action } = body;

    // AI Generation
    if (action === 'generate') {
      const { platform, topic, tone, length } = body;
      if (!platform || !topic) {
        return NextResponse.json({ error: 'Missing platform or topic' }, { status: 400 });
      }

      // If key exists, run real Gemini API call
      if (process.env.GEMINI_API_KEY) {
        try {
          const aiPrompt = `Write a high-performance, engaging social media post for ${platform}.
          Topic: ${topic}
          Tone: ${tone || 'professional'}
          Length: ${length || 'medium'}
          
          Format the output strictly as a JSON object with the following fields:
          {
            "body": "The complete post text, formatted with double line breaks for readability",
            "hashtags": ["tag1", "tag2"],
            "variations": ["Alternate hook line 1", "Alternate hook line 2"]
          }
          Return ONLY the raw JSON block without markdown wrappers.`;

          const responseText = await generateWithGemini(aiPrompt, true);
          const parsed = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
          
          return NextResponse.json({
            post: {
              platform,
              body: parsed.body + "\n\n" + parsed.hashtags.map((h: string) => h.startsWith('#') ? h : '#' + h).join(' '),
              hashtags: parsed.hashtags,
              tone,
              variations: parsed.variations
            }
          });
        } catch (apiError: any) {
          console.warn("Gemini API call failed, falling back to simulated generation:", apiError.message);
        }
      }

      // Fallback
      const generated = generateContent(platform, topic, tone || 'professional', length || 'medium');
      return NextResponse.json({ post: generated });
    }

    // Schedule / Save Post
    if (action === 'save') {
      const { id, body: postBody, platform, status, scheduledFor } = body;
      if (!postBody || !platform || !status) {
        return NextResponse.json({ error: 'Missing post parameters' }, { status: 400 });
      }

      const saved = await prisma.content.upsert({
        where: { id: id || 'temp-id-doesnt-exist' },
        create: {
          userId,
          body: postBody,
          platform,
          status,
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        },
        update: {
          body: postBody,
          platform,
          status,
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        }
      });

      return NextResponse.json({ success: true, post: saved });
    }

    // Delete post
    if (action === 'delete') {
      const { id } = body;
      if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
      await prisma.content.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
