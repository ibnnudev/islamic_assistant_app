'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, MapPinIcon, Bell } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import type { PrayerTime } from '@/types';
import { cn } from '@/lib/utils';

interface PrayerHeroCardProps {
    nextPrayer: PrayerTime | null;
    timeRemaining: string;
    locationName?: string;
}

export default function PrayerHeroCard({ nextPrayer, timeRemaining, locationName = 'Dubai' }: PrayerHeroCardProps) {
    if (!nextPrayer) return null;

    const formattedTime = nextPrayer.time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const prayerDisplayName = nextPrayer.name === 'Fajr' ? 'Subuh' :
        nextPrayer.name === 'Dhuhr' ? 'Zuhur' :
            nextPrayer.name === 'Asr' ? 'Ashar' :
                nextPrayer.name === 'Maghrib' ? 'Maghrib' :
                    nextPrayer.name === 'Isha' ? 'Isya' : nextPrayer.name;

    return (
        <div className="relative group px-4">
            {/* Main Card */}
            <Card className="relative overflow-hidden border-none bg-emerald-700 text-white shadow-2xl rounded-[2.5rem] transition-all duration-500">

                {/* Visual Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 opacity-90" />

                {/* Islamic Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Ambient Glows */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-400/20 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-900/40 blur-[80px] rounded-full" />

                <CardContent className="p-8 relative z-10 space-y-8">
                    {/* Top Row: Location & Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-emerald-100" />
                            <span className="text-xs font-bold tracking-tight">{locationName}</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/5">
                                <Bell className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Middle: Current Prayer Main Title */}
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">{prayerDisplayName}</span>
                        <h2 className="text-7xl font-black tracking-tighter tabular-nums drop-shadow-md">
                            {formattedTime.split(' ')[0]}
                            <span className="text-2xl ml-1 font-medium opacity-60 uppercase">{formattedTime.split(' ')[1]}</span>
                        </h2>
                    </div>

                    {/* Bottom: Sub-Info & Countdown */}
                    <div className="flex flex-col items-center gap-6">
                        {/* Countdown Pill */}
                        <div className="bg-white/15 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg">
                            <Clock className="w-4 h-4 text-emerald-200" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">Selanjutnya</span>
                                <span className="text-lg font-black tracking-tight tabular-nums leading-none italic">{timeRemaining}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer decoration */}
                    <div className="flex justify-between items-end opacity-40">
                        <div className="w-12 h-1 bg-white/30 rounded-full" />
                        <span className="text-2xl font-arabic">{nextPrayer.arabicName}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Card Shadow/Depth Enhancement */}
            <div className="absolute inset-x-12 -bottom-2 h-12 bg-emerald-900/20 blur-2xl rounded-[2.5rem] -z-10" />
        </div>
    );
}
