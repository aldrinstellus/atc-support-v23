import type { Metadata } from "next";
import "./globals.css";
import packageJson from "../../package.json";
import { ModeProvider } from "@/contexts/ModeContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
// import { FeedbackWidget } from "@/components/feedback";
// import { DemoModeIndicator } from "@/components/demo/DemoModeIndicator";
import { SessionProvider } from "@/components/auth/SessionProvider";

// Helper function to format version for display (14.0.0 → V14, 14.1.0 → V14.1)
function getVersionDisplay(version: string): string {
  const parts = version.split('.');
  const major = parts[0];
  const minor = parts[1];

  // If minor version is 0, show only major (14.0.0 → V14)
  // Otherwise show major.minor (14.1.0 → V14.1)
  if (minor === '0') {
    return `V${major}`;
  }
  return `V${major}.${minor}`;
}

const versionDisplay = getVersionDisplay(packageJson.version);

export const metadata: Metadata = {
  title: `Enterprise AI Support ${versionDisplay} - Demo | Multi-Persona Interface`,
  description: "Demo reference with mock data - Three personas: C-Level, CS Manager, Support Agent",
  keywords: ["support", "ticketing", "AI", "dashboard", "analytics", "demo", "multi-persona"],
  icons: {
    icon: [
      { url: '/ctis-logo-dark.png', type: 'image/png' },
    ],
    shortcut: '/ctis-logo-dark.png',
    apple: '/ctis-logo-dark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
      </head>
      <body className="h-screen overflow-hidden bg-background font-sans antialiased">
        <SessionProvider>
          <ThemeProvider>
            <ModeProvider>
              <FeedbackProvider>
                {children}
                {/* <FeedbackWidget /> - Hidden for demo, see docs/06-features/FEEDBACK-WIDGET.md */}
                {/* <DemoModeIndicator /> */}
              </FeedbackProvider>
            </ModeProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
