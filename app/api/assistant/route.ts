import { NextRequest, NextResponse } from 'next/server';
import { generateAICoachResponse } from '@/lib/ai';
import { generateWithGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Missing message parameter' }, { status: 400 });
    }

    if (process.env.GEMINI_API_KEY) {
      try {
        const historyContext = (history || [])
          .map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`)
          .join('\n');

        const assistantPrompt = `You are the BrandPilot AI personal brand strategist coach.
        You help founders, creators, and developers build their online presence, write posts, structure articles, and optimize reach.
        
        Recent Conversation History:
        ${historyContext}
        
        User Prompt: ${message}
        
        Provide a concise, direct, actionable, and encouraging response under 100 words.`;

        const reply = await generateWithGemini(assistantPrompt);
        return NextResponse.json({ reply });
      } catch (err: any) {
        console.warn("Gemini chatbot API call failed, falling back to simulated answers:", err.message);
      }
    }

    const reply = generateAICoachResponse(message, history || []);
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
