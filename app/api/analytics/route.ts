import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { getBestPostingTimes } from '@/lib/ai';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    // Grab platform specific values
    const analytics = await prisma.analytics.findMany({
      where: { userId }
    });

    const bestTimes = {
      linkedin: getBestPostingTimes('linkedin'),
      x: getBestPostingTimes('x'),
      youtube: getBestPostingTimes('youtube')
    };

    // Return mockup engagement trend for charts
    const engagementTrend = [
      { name: 'Mon', Reach: 4000, Engagement: 2400, Followers: 12000 },
      { name: 'Tue', Reach: 5000, Engagement: 3100, Followers: 12100 },
      { name: 'Wed', Reach: 6200, Engagement: 4500, Followers: 12250 },
      { name: 'Thu', Reach: 5800, Engagement: 4000, Followers: 12380 },
      { name: 'Fri', Reach: 7500, Engagement: 5600, Followers: 12500 },
      { name: 'Sat', Reach: 4500, Engagement: 2100, Followers: 12550 },
      { name: 'Sun', Reach: 4800, Engagement: 2900, Followers: 12600 }
    ];

    const platformComparison = [
      { platform: 'LinkedIn', Engagement: 65, Growth: 40, color: '#0A66C2' },
      { platform: 'X / Twitter', Engagement: 45, Growth: 25, color: '#000000' },
      { platform: 'YouTube', Engagement: 30, Growth: 15, color: '#FF0000' }
    ];

    const topPosts = [
      { id: '1', title: 'Why I left Big Tech to build AI tools', platform: 'linkedin', reach: 18500, engagement: '12.4%', status: 'Published' },
      { id: '2', title: 'The breakdown of OpenAI model API costs', platform: 'x', reach: 12200, engagement: '8.9%', status: 'Published' },
      { id: '3', title: 'How to build LLM Agents from scratch', platform: 'youtube', reach: 9800, engagement: '15.1%', status: 'Published' }
    ];

    return NextResponse.json({
      analytics,
      bestTimes,
      engagementTrend,
      platformComparison,
      topPosts
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
