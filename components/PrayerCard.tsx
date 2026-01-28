'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, MapPinIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import type { PrayerTime } from '@/types';
import { cn } from '@/lib/utils';

interface PrayerCardProps {
    nextPrayer: PrayerTime | null;
    timeRemaining: string;
}

export default function PrayerCard({ nextPrayer, timeRemaining }: PrayerCardProps) {
    if (!nextPrayer) return null;

    const formattedTime = nextPrayer.time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <Card className="relative overflow-hidden border-none bg-primary text-primary-foreground shadow-2xl shadow-primary/20 rounded-[40px]">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] -mr-32 -mt-32 rounded-full" />

            <CardContent className="p-8 space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Waktu Shalat</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            {new Date().toLocaleDateString('id-ID', { weekday: 'long' })}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h2 className="text-5xl font-black tracking-tighter italic">
                            {nextPrayer.name === 'Fajr' ? 'Subuh' :
                                nextPrayer.name === 'Dhuhr' ? 'Zuhur' :
                                    nextPrayer.name === 'Asr' ? 'Ashar' :
                                        nextPrayer.name === 'Maghrib' ? 'Maghrib' :
                                            nextPrayer.name === 'Isha' ? 'Isya' : nextPrayer.name}
                        </h2>
                        <p className="text-xl font-arabic opacity-80">
                            {nextPrayer.arabicName}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold tabular-nums tracking-tighter">
                            {formattedTime}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                            Waktu Masuk
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center py-4 bg-white/10 rounded-[32px] backdrop-blur-sm border border-white/5 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-1">Dikit Lagi Adzan</span>
                    <motion.p
                        key={timeRemaining}
                        initial={{ opacity: 0.5, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl font-black tracking-tighter tabular-nums"
                    >
                        {timeRemaining}
                    </motion.p>
                </div>
            </CardContent>
        </Card>
    );
}
