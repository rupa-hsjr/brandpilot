// Ambient declaration to satisfy TypeScript compilation
declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: any);
  }
}

let globalPrisma: any = null;

// Check runtime environment and load dynamically to avoid crashes before client generation
if (typeof require !== 'undefined') {
  try {
    const { PrismaClient: RealPrisma } = require('@prisma/client');
    globalPrisma = new RealPrisma();
  } catch (e) {
    console.warn("Prisma Client is not generated yet. Defaulting to mock database mode.");
  }
}

// In-Memory Database Fallback to allow previewing and building without errors
class MockPrismaClient {
  private store: Record<string, any[]> = {
    user: [],
    profile: [],
    content: [],
    analytics: [],
    calendarEvent: [],
    notification: [],
    socialAccount: [],
    aiReport: [],
    settings: [],
  };

  constructor() {
    this.seedMockData();
  }

  private seedMockData() {
    // Seed initial admin and demo user
    this.store.user.push({
      id: "demo-user-id",
      email: "demo@brandpilot.ai",
      passwordHash: "$2b$10$9Gv/cphd6a0pG.w8sJc0tuf5Yx/eXm08Tz0LDrrXN7rF8K2V5t4x.", 
      name: "Alex Mercer",
      role: "user",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.store.settings.push({
      id: "demo-settings-id",
      userId: "demo-user-id",
      theme: "dark",
      language: "en",
      emailUpcoming: true,
      emailWeeklyReport: true,
    });

    this.store.profile.push({
      id: "demo-profile-id",
      userId: "demo-user-id",
      profession: "AI Solutions Architect & Tech Creator",
      industry: "Technology / AI",
      niche: "Explainable AI, LLM Agents & Tech Career Growth",
      targetAudience: "Software Engineers, CTOs, Tech Product Managers",
      platforms: "linkedin,x,youtube",
      goals: "Establish thought leadership, build audience, grow newsletter subscribers",
      postingFrequency: "3 times a week",
      preferredTone: "Professional, educational, slightly witty",
      brandScore: 78,
      brandSummary: "Strong technical foundation and clear niche. Growth opportunity lies in adding personal stories and visual threads.",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.store.content.push(
      {
        id: "post-1",
        userId: "demo-user-id",
        title: "AI Agents Article",
        body: "The future of software is agentic. We are moving from chatbots that answer questions to autonomous agents that execute multi-step workflows. Are you ready?",
        platform: "linkedin",
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - 86400000 * 2),
        scheduledFor: null,
        hashtags: "#ai #softwareengineering #productivity",
        tone: "professional",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "post-2",
        userId: "demo-user-id",
        title: "Prompt Engineering Hook",
        body: "Prompt engineering is not about writing long stories. It is about constraint setting. Here are the 3 constraints that will make your LLM outputs 10x better.",
        platform: "x",
        status: "SCHEDULED",
        publishedAt: null,
        scheduledFor: new Date(Date.now() + 86400000),
        hashtags: "#ai #programming",
        tone: "educational",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    this.store.analytics.push(
      { id: "an-1", userId: "demo-user-id", platform: "all", followers: 12500, engagementRate: 4.8, reach: 45000, likes: 1200, comments: 340, shares: 120, recordedAt: new Date() },
      { id: "an-2", userId: "demo-user-id", platform: "linkedin", followers: 8200, engagementRate: 5.2, reach: 28000, likes: 800, comments: 210, shares: 90, recordedAt: new Date() },
      { id: "an-3", userId: "demo-user-id", platform: "x", followers: 4300, engagementRate: 3.9, reach: 17000, likes: 400, comments: 130, shares: 30, recordedAt: new Date() }
    );

    this.store.calendarEvent.push(
      {
        id: "cal-1",
        userId: "demo-user-id",
        title: "BrandPilot AI Tool Launch",
        type: "launch",
        description: "Launching the product on ProductHunt and tech channels.",
        startAt: new Date(Date.now() + 86400000 * 2),
        endAt: new Date(Date.now() + 86400000 * 2 + 3600000),
        suggestedIdea: "Write a high-energy post explaining the problem we solve, our founding story, and link to the ProductHunt page.",
      },
      {
        id: "cal-2",
        userId: "demo-user-id",
        title: "Webinar: Building Agentic Workflows",
        type: "webinar",
        description: "Hands-on demo of LangGraph and Gemini models.",
        startAt: new Date(Date.now() + 86400000 * 4),
        endAt: new Date(Date.now() + 86400000 * 4 + 7200000),
        suggestedIdea: "Post a teaser video or code snippet showing the multi-agent graph architecture, highlighting registration is open.",
      }
    );

    this.store.socialAccount.push(
      { id: "acc-1", userId: "demo-user-id", platform: "linkedin", username: "alex-mercer-tech", avatarUrl: null, isConnected: true },
      { id: "acc-2", userId: "demo-user-id", platform: "x", username: "alex_mercer_ai", avatarUrl: null, isConnected: true },
      { id: "acc-3", userId: "demo-user-id", platform: "youtube", username: "Alex Mercer AI", avatarUrl: null, isConnected: false }
    );
  }

  private getHelper(model: string) {
    return {
      findUnique: async (args: any) => {
        const key = Object.keys(args.where)[0];
        const val = args.where[key];
        return this.store[model].find(item => item[key] === val) || null;
      },
      findFirst: async (args: any) => {
        if (!args || !args.where) return this.store[model][0] || null;
        return this.store[model].find(item => {
          return Object.entries(args.where).every(([k, v]) => item[k] === v);
        }) || null;
      },
      findMany: async (args: any) => {
        let list = [...this.store[model]];
        if (args?.where) {
          list = list.filter(item => {
            return Object.entries(args.where).every(([k, v]) => item[k] === v);
          });
        }
        if (args?.orderBy) {
          const field = Object.keys(args.orderBy)[0];
          const dir = args.orderBy[field];
          list.sort((a, b) => {
            if (a[field] < b[field]) return dir === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return dir === 'asc' ? 1 : -1;
            return 0;
          });
        }
        return list;
      },
      create: async (args: any) => {
        const newItem = {
          id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
          updatedAt: new Date(),
          ...args.data
        };
        this.store[model].push(newItem);
        return newItem;
      },
      update: async (args: any) => {
        const key = Object.keys(args.where)[0];
        const val = args.where[key];
        const idx = this.store[model].findIndex(item => item[key] === val);
        if (idx !== -1) {
          this.store[model][idx] = {
            ...this.store[model][idx],
            ...args.data,
            updatedAt: new Date()
          };
          return this.store[model][idx];
        }
        throw new Error(`Record not found to update in ${model}`);
      },
      upsert: async (args: any) => {
        try {
          return await this.update(args);
        } catch {
          return await this.create({ data: { ...args.where, ...args.create } });
        }
      },
      delete: async (args: any) => {
        const key = Object.keys(args.where)[0];
        const val = args.where[key];
        const idx = this.store[model].findIndex(item => item[key] === val);
        if (idx !== -1) {
          const removed = this.store[model].splice(idx, 1);
          return removed[0];
        }
        throw new Error(`Record not found to delete in ${model}`);
      },
      count: async () => {
        return this.store[model].length;
      }
    };
  }

  get user() { return this.getHelper('user'); }
  get profile() { return this.getHelper('profile'); }
  get content() { return this.getHelper('content'); }
  get analytics() { return this.getHelper('analytics'); }
  get calendarEvent() { return this.getHelper('calendarEvent'); }
  get notification() { return this.getHelper('notification'); }
  get socialAccount() { return this.getHelper('socialAccount'); }
  get aiReport() { return this.getHelper('aiReport'); }
  get settings() { return this.getHelper('settings'); }
}

export const prisma = globalPrisma || (new MockPrismaClient() as any);
