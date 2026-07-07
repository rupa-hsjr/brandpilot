import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { generateWithGemini } from '@/lib/gemini';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    const reports = await prisma.aiReport.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const mockReport = {
      id: "report-1",
      userId,
      type: "weekly",
      contentStrategy: "Double down on 'How-to' carousel lists for LinkedIn. For X, write short 3-post threads breaking down recent software launch failures. Focus your tone on professional educational advice.",
      growthSuggestions: "Publish on Tuesdays between 8-9am EST. Add questions at the end of each post to drive comment count up. Reply to at least 5 industry peers daily to build algorithmic visibility.",
      trendingTopics: "Multi-agent systems, Next.js 15 routing optimizations, Developer productivity tips",
      postingTimeSuggest: "LinkedIn: Tue 8:30 AM | X: Wed 12:00 PM",
      createdAt: new Date()
    };

    return NextResponse.json({
      reports: reports.length > 0 ? reports : [mockReport]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    // Try finding user profile to feed context to Gemini
    const profile = await prisma.profile.findUnique({ where: { userId } });

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are a personal brand consultant. Generate a weekly strategic diagnostic report for a creator.
        Creator Details:
        - Profession: ${profile?.profession || 'Tech founder'}
        - Niche: ${profile?.niche || 'Software engineering'}
        - Target Audience: ${profile?.targetAudience || 'Developers'}
        - Goals: ${profile?.goals || 'Build thought leadership'}
        
        Format the output strictly as a JSON object with the following fields:
        {
          "contentStrategy": "Detailed analysis of what type of content they should produce this week.",
          "growthSuggestions": "Actionable visibility steps (e.g. peer engagement, spaces, commenting).",
          "trendingTopics": "Comma-separated list of 3 topics currently trending in their niche.",
          "postingTimeSuggest": "Optimized day & time suggestions for their primary platforms (e.g. LinkedIn: Tue 8:30 AM | X: Wed 12:00 PM)"
        }
        Return ONLY the raw JSON block without markdown wrappers.`;

        const responseText = await generateWithGemini(prompt, true);
        const parsed = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());

        const report = await prisma.aiReport.create({
          data: {
            userId,
            type: 'weekly',
            contentStrategy: parsed.contentStrategy,
            growthSuggestions: parsed.growthSuggestions,
            trendingTopics: parsed.trendingTopics,
            postingTimeSuggest: parsed.postingTimeSuggest
          }
        });

        return NextResponse.json({ success: true, report });
      } catch (err: any) {
        console.warn("Gemini strategy generation failed, falling back to simulation:", err.message);
      }
    }

    const body = await req.json();
    const { type, contentStrategy, growthSuggestions, trendingTopics, postingTimeSuggest } = body;

    const report = await prisma.aiReport.create({
      data: {
        userId,
        type: type || 'weekly',
        contentStrategy: contentStrategy || 'Focus on detailed breakdowns.',
        growthSuggestions: growthSuggestions || 'Optimize posting schedule.',
        trendingTopics: trendingTopics || 'AI agentic workflows',
        postingTimeSuggest: postingTimeSuggest || 'Tue 8:30 AM'
      }
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
