import type { Metadata, Viewport } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import AudioPlayer from "@/components/AudioPlayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Sakinah - Your Digital Sanctuary",
  description: "A beautiful Muslim companion app for prayer times, Qibla direction, Quran reading, and Tasbih counting",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sakinah",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${amiri.variable} antialiased bg-stone-100`}>
        <QueryProvider>
          {/* Mobile First Wrapper */}
          <div className="min-h-screen flex justify-center bg-stone-100">
            {/* App Container - Max Width 480px */}
            <div className="w-full max-w-[480px] min-h-screen bg-background shadow-2xl border-x border-input relative overflow-hidden">
              {/* Main Content */}
              <main className="pb-28 safe-top">
                {children}
              </main>

              {/* Global Player */}
              <AudioPlayer />

              {/* Bottom Navigation */}
              <BottomNav />
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
