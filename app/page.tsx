'use client';

import Link from 'next/link';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import PrayerHeroCard from '@/components/PrayerHeroCard';
import MonthlyPrayerView from '@/components/MonthlyPrayerView';
import { Skeleton } from '@/components/ui/Skeleton';
import { Search, Sparkles, BookOpen, Compass, Circle, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { nextPrayer, timeRemaining, allPrayers, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-[2.5rem]" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-28 rounded-[1.5rem]" />
          <Skeleton className="h-28 rounded-[1.5rem]" />
        </div>
        <Skeleton className="h-80 w-full rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#F8F9FA]">
      {/* Dynamic Background Header for mobile app feel */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-emerald-700 -z-10" />

      <div className="p-6 space-y-8">
        <header className="flex items-center justify-between py-2">
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic flex items-center gap-2">
            Sakinah
            <Sparkles className="w-6 h-6 fill-white" />
          </h1>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
            <Search className="w-5 h-5 text-white" />
          </div>
        </header>

        {/* Next Prayer Card */}
        <div className="-mx-2">
          <PrayerHeroCard nextPrayer={nextPrayer} timeRemaining={timeRemaining} />
        </div>

        {/* Quick Access Menu */}
        <section className="grid grid-cols-2 gap-4 px-1">
          <Link href="/asmaul-husna" className="group">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="p-5 bg-white border border-slate-100 rounded-[2rem] space-y-4 shadow-sm hover:border-primary/30 hover:bg-emerald-50/20 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="font-bold text-xl">99</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-800 text-sm">Asmaul Husna</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none font-bold">Nama Allah</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/quran" className="group">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="p-5 bg-white border border-slate-100 rounded-[2rem] space-y-4 shadow-sm hover:border-primary/30 hover:bg-emerald-50/20 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-800 text-sm">Al-Quran</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none font-bold">Lanjut Baca</p>
              </div>
            </motion.div>
          </Link>
        </section>

        {/* Integrated Features Grid from reference */}
        <section className="px-1 py-4">
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Jadwal Shalat</h2>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
              </div>
            </div>
            <MonthlyPrayerView prayers={allPrayers} />
          </div>
        </section>
      </div>
    </div>
  );
}
