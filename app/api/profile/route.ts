import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { generateBrandProfile } from '@/lib/ai';
import { generateWithGemini } from '@/lib/gemini';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id"; // fallback for convenience

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    const session = token ? verifyJWT(token) : null;
    const userId = session?.userId || "demo-user-id";

    const body = await req.json();
    const { profession, industry, niche, targetAudience, platforms, goals, postingFrequency, preferredTone } = body;

    if (!profession || !industry || !niche || !targetAudience || !platforms || !goals) {
      return NextResponse.json({ error: 'Missing onboarding parameters' }, { status: 400 });
    }

    let brandScore = Math.floor(Math.random() * 15) + 70; // 70 to 85 default
    let brandSummary = `As an expert in "${industry}", focused on the niche of "${niche}", your content is targeted directly towards "${targetAudience}".`;
    let recommendations = [
      `Establish a 3-pillar content system: 50% Educational, 30% Industry Analysis, 20% Personal Journey.`,
      `Post on ${platforms[0] || 'LinkedIn'} during peak morning hours (8 AM - 10 AM EST) for max reach.`
    ];

    // If key exists, run real Gemini API call
    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `Analyze this personal branding onboarding profile.
        Profession: ${profession}
        Industry: ${industry}
        Niche: ${niche}
        Target Audience: ${targetAudience}
        Preferred platforms: ${platforms.join(', ')}
        Tone: ${preferredTone}
        Goals: ${goals}
        
        Format output strictly as a JSON object with the following fields:
        {
          "brandScore": 82, // integer between 40 and 99
          "brandSummary": "Short paragraph analyzing their current position clarity.",
          "recommendations": ["Action tip 1", "Action tip 2"]
        }
        Return ONLY the raw JSON block without markdown wrappers.`;

        const responseText = await generateWithGemini(prompt, true);
        const parsed = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());
        brandScore = parsed.brandScore;
        brandSummary = parsed.brandSummary;
        recommendations = parsed.recommendations;
      } catch (err: any) {
        console.warn("Gemini profile analysis failed, falling back to simulation:", err.message);
      }
    }

    const profile = await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        profession,
        industry,
        niche,
        targetAudience,
        platforms: platforms.join(','),
        goals,
        postingFrequency,
        preferredTone,
        brandScore,
        brandSummary
      },
      update: {
        profession,
        industry,
        niche,
        targetAudience,
        platforms: platforms.join(','),
        goals,
        postingFrequency,
        preferredTone,
        brandScore,
        brandSummary
      }
    });

    return NextResponse.json({ 
      success: true, 
      profile, 
      aiAnalysis: {
        brandScore,
        brandSummary,
        recommendations
      } 
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
