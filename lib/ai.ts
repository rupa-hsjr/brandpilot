// Simulation engine for AI Brand Strategy, content generation, and brand calculations

export interface OnboardingData {
  name: string;
  profession: string;
  industry: string;
  niche: string;
  targetAudience: string;
  platforms: string[];
  goals: string;
  postingFrequency: string;
  preferredTone: string;
}

export interface GeneratedPost {
  platform: string;
  body: string;
  hashtags: string[];
  tone: string;
  hook: string;
  cta: string;
  variations: string[];
}

export function generateBrandProfile(data: OnboardingData) {
  const brandScore = Math.floor(Math.random() * 15) + 70; // 70 to 85
  
  const brandSummary = `As an expert in "${data.industry}", focused on the niche of "${data.niche}", your content is targeted directly towards "${data.targetAudience}". Writing in a "${data.preferredTone}" voice, you have high potential to stand out. Your primary platform matches (${data.platforms.join(', ')}) align well with your target market. Core recommendation: Enhance engagement by ending posts with polarizing or educational questions, and structure posts into clear bite-sized headers.`;

  return {
    brandScore,
    brandSummary,
    strengths: [
      `Highly specific niche selection: "${data.niche}"`,
      `Clear alignment with target audience of "${data.targetAudience}"`,
      `Tailored platform focus on ${data.platforms.join(' & ')}`,
      `Defined, consistent tone ("${data.preferredTone}")`
    ],
    weaknesses: [
      "Low initial visual asset utilization (mostly text)",
      "Lack of structured content pillars (needs educational vs personal narrative split)",
      "Irregular posting rhythm"
    ],
    recommendations: [
      `Establish a 3-pillar content system: 50% Educational, 30% Industry Analysis, 20% Personal Journey.`,
      `Post on ${data.platforms[0] || 'LinkedIn'} during peak morning hours (8 AM - 10 AM EST) for max reach.`,
      `Implement visual carousels for complex concepts twice a month.`
    ]
  };
}

export function generateAICoachResponse(message: string, history: { role: string; content: string }[]): string {
  const msg = message.toLowerCase();

  if (msg.includes('linkedin') || msg.includes('post') || msg.includes('idea')) {
    return `Here are 3 custom LinkedIn content frameworks for you:
1. **The contrarian hook**: "Most people think [common belief] is true. But here is why they're wrong about [your niche]..."
2. **The lesson learned**: "I spent the last 6 months building [project]. Here are the 3 major pitfalls we hit, and how you can avoid them..."
3. **The quick wins checklist**: "A simple guide to master [topic] in under 5 minutes. (Save this for later)..."

Which one would you like me to draft for you?`;
  }

  if (msg.includes('rewrite') || msg.includes('tone')) {
    return `I can definitely rewrite that for you! Could you paste the text you want modified, and let me know if you want it more **professional**, **witty**, or **conversational**?`;
  }

  if (msg.includes('hashtag')) {
    return `Based on your AI brand profile, here are high-conversion hashtags:
- **LinkedIn**: #technology #artificialintelligence #careers #productivity
- **X / Twitter**: #AI #BuildInPublic #solopreneur #tech
- **Instagram**: #growthmindset #worksmart #developerlife #aimarketing`;
  }

  return `Hey there! I am your BrandPilot AI Strategist. I can help you:
- Write custom social media content posts
- Generate X threads or LinkedIn carousel scripts
- Rewrite content to adjust length, hook, or tone
- Analyze your current brand statistics and predict optimization times

What are you working on today?`;
}

export function generateContent(platform: string, topic: string, tone: string, length: string): GeneratedPost {
  const cleanPlatform = platform.toLowerCase();
  
  let body = "";
  let hook = "";
  let cta = "";
  let hashtags: string[] = [];
  let variations: string[] = [];

  if (cleanPlatform === 'linkedin') {
    hook = `I've analyzed over 500 tech companies, and they all make the exact same mistake with ${topic || 'brand strategy'}.`;
    body = `${hook}\n\nIt isn't a lack of resources.\nIt's a lack of focus.\n\nHere's the pattern:\n1. Over-promising features early\n2. Ignoring user-feedback loops\n3. Copying competitors instead of listening to the niche.\n\nTo build a real brand, you need to own a specific angle. Don't be everything to everyone. Be the absolute best for one group.`;
    cta = "What's the biggest bottleneck you're facing right now? Drop it in the comments.";
    hashtags = ["#branding", "#growth", "#productivity"];
    variations = [
      `How most people fail at ${topic || 'branding'}: they talk about themselves instead of their customer. Here is a better framework...`,
      `3 cold truths about ${topic || 'growth'} that most 'experts' won't tell you. Thread style:`
    ];
  } else if (cleanPlatform === 'x' || cleanPlatform === 'twitter') {
    hook = `Building in public is a cheat code for ${topic || 'growth'}.`;
    body = `${hook}\n\n1/ You get instant validation.\n2/ Your users feel like co-founders.\n3/ You build a distribution channel before the product is even finished.\n\nHere is how to start today:`;
    cta = "Follow for daily execution frameworks.";
    hashtags = ["#buildinpublic", "#solopreneur"];
    variations = [
      `Most startups fail because they build in a cave. Build in the light instead. Here's how:`,
      `If you aren't talking about ${topic || 'your niche'} every day, you don't exist online. Let's fix that.`
    ];
  } else {
    hook = `Let's talk about ${topic || 'your strategy'}.`;
    body = `${hook}\n\nSuccess isn't about working 80-hour weeks. It is about setting correct constraints. When you focus on a single core outcome, everything shifts.`;
    cta = "Double-tap if you agree!";
    hashtags = ["#mindset", "#productivity", "#success"];
    variations = [
      `Quick tip: stop complicating your process. Simplify your workflow.`,
      `3 habits that saved me 20 hours this week.`
    ];
  }

  const fullPost = `${body}\n\n${cta}\n\n${hashtags.join(' ')}`;

  return {
    platform,
    body: fullPost,
    hashtags,
    tone,
    hook,
    cta,
    variations
  };
}

export function getBestPostingTimes(platform: string) {
  if (platform === 'linkedin') {
    return [
      { day: "Mon", time: "09:00 AM", score: 85 },
      { day: "Tue", time: "08:30 AM", score: 95 },
      { day: "Wed", time: "09:00 AM", score: 92 },
      { day: "Thu", time: "08:30 AM", score: 90 },
      { day: "Fri", time: "11:00 AM", score: 72 }
    ];
  }
  if (platform === 'x') {
    return [
      { day: "Mon", time: "12:00 PM", score: 80 },
      { day: "Tue", time: "01:00 PM", score: 88 },
      { day: "Wed", time: "12:00 PM", score: 91 },
      { day: "Thu", time: "02:00 PM", score: 87 },
      { day: "Fri", time: "05:00 PM", score: 79 }
    ];
  }
  return [
    { day: "Sat", time: "10:00 AM", score: 85 },
    { day: "Sun", time: "11:00 AM", score: 88 }
  ];
}
