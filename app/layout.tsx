import type { Metadata, Viewport } from "next";
import { AudioFeedback } from "@/components/system/AudioFeedback";
import { RegisterServiceWorker } from "@/components/pwa/RegisterServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrightSpark",
  description: "Playful learning for early-primary learners",
  manifest: "/manifest.webmanifest",
  applicationName: "BrightSpark",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BrightSpark",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#6f5bd3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AudioFeedback />
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
