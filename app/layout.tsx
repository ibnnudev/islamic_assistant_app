import type { Metadata, Viewport } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import AudioPlayer from "@/components/AudioPlayer";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Sakinah - Teman Ibadahmu",
  description: "Bikin ibadah makin khusyuk dan simpel dengan Sakinah. Pantau jadwal shalat, baca Al-Quran, cari kiblat, sampe dzikir, semua ada!",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${amiri.variable} antialiased bg-stone-100 font-sans`}>
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
