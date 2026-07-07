import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import ClientLayoutShell from './ClientLayoutShell';

export const metadata: Metadata = {
  title: 'BrandPilot AI - AI-Powered Personal Brand Marketing Engine',
  description: 'Build your personal brand, generate viral posts, automate content calendars, and track analytics using state-of-the-art AI recommendations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          * {
            font-family: 'Outfit', sans-serif;
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-zinc-950 text-white selection:bg-violet-600/30 selection:text-violet-200">
        <ThemeProvider>
          <ClientLayoutShell>{children}</ClientLayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
