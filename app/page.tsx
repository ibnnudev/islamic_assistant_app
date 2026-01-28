'use client';

import Link from 'next/link';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import PrayerCard from '@/components/PrayerCard';
import MonthlyPrayerView from '@/components/MonthlyPrayerView';
import { Skeleton } from '@/components/ui/Skeleton';
import { Search, Sparkles, BookOpen, Compass, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { nextPrayer, timeRemaining, allPrayers, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full rounded-3xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-primary uppercase italic flex items-center gap-2">
            Sakinah
            <Sparkles className="w-6 h-6 fill-primary" />
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Your digital sanctuary</p>
        </div>
      </header>

      {/* Next Prayer Card */}
      <section>
        <PrayerCard nextPrayer={nextPrayer} timeRemaining={timeRemaining} />
      </section>

      {/* Quick Access Menu */}
      <section className="grid grid-cols-2 gap-4">
        <Link href="/asmaul-husna" className="group">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-card border rounded-3xl space-y-3 hover:border-primary/50 transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <span className="font-bold text-lg">99</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-bold text-sm">Asmaul Husna</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Holy Names</p>
            </div>
          </motion.div>
        </Link>

        <Link href="/quran" className="group">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-card border rounded-3xl space-y-3 hover:border-primary/50 transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-bold text-sm">Al-Quran</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Read Mushaf</p>
            </div>
          </motion.div>
        </Link>
      </section>

      {/* Prayer Schedule */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Today's Schedule</h2>
        </div>
        <MonthlyPrayerView prayers={allPrayers} />
      </section>
    </div>
  );
}
