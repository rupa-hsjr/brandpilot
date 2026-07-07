# 🧭 BrandPilot AI
> **An AI-powered Personal Brand Marketing Engine built for Hackathons & Launch Events.**

BrandPilot AI is a premium SaaS application designed to help founders, developers, and creators build, measure, and automate their personal brand presence across LinkedIn, X (Twitter), Instagram, and YouTube.

---

## 🚀 Key Features

* **AI Content Studio**: Write high-performance posts, select custom tones (Professional, Friendly, Motivational, Educational), optimize lengths, and save drafts instantly.
* **Interactive Content Planner**: Manage upcoming launches and webinars with smart AI-generated hooks and custom visual milestones.
* **Growth Strategy Diagnostics**: Fetch personalized brand recommendations, trending topics, and optimized posting hours weekly.
* **Real-time Analytics**: Track follower growth index, engagement rate patterns, and best posting times in responsive performance dashboards.
* **Interactive AI Coach**: Get instant strategic suggestions, tag optimizations, and hooks brainstorming via the floating coach assistant panel.
* **Live Gemini API Integration**: Connect a free Google Gemini key directly to swap from simulated preview data to live AI generation.

---

## 🛠️ Technology Stack

* **Frontend Framework**: Next.js 15.5 (App Router) + React 19
* **Styling**: TailwindCSS (Modern glassmorphic dark theme)
* **Database**: Prisma ORM with local SQLite backend (easily upgradeable to PostgreSQL)
* **AI Engine**: Google Gemini 1.5 Flash (via standard Web REST connector)
* **Icons & Visuals**: Lucide Icons + Recharts for responsive analytics

---

## 💻 How to Run Locally

### 1. Pre-requisites
Ensure Node.js and npm are installed. If Node is not on your global PATH system, prepend it temporarily in your terminal:
```powershell
$env:PATH += ";C:\Program Files\nodejs"
```

### 2. Install Dependencies
Run the package installation:
```bash
npm install
```

### 3. Sync SQLite Database
Push the Prisma schemas to sync and generate the local SQLite database (`dev.db`):
```bash
npx prisma db push
```

### 4. Configure your Gemini API Key (Optional)
To switch the platform to live AI generation, open the `.env` file in the root directory and add your key:
```env
GEMINI_API_KEY="AIzaSyYourRealGeminiKeyHere"
```
*(Alternatively, you can paste the key directly inside the **Settings & Integrations** panel on the web app).*

### 5. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

### 6. Build and Run Production Server
To run the optimized production package:
```bash
npm run build
npm run start
```
