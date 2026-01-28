'use client';

import { formatPrayerTime } from '@/lib/prayer-utils';
import type { PrayerTime } from '@/types';
import { cn } from '@/lib/utils';
import { Card } from './ui/Card';

interface MonthlyPrayerViewProps {
    prayers: PrayerTime[];
}

export default function MonthlyPrayerView({ prayers }: MonthlyPrayerViewProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {prayers.map((prayer, index) => (
                <Card
                    key={index}
                    className="p-5 bg-white border border-slate-100 rounded-[1.75rem] shadow-sm hover:border-emerald-200 hover:bg-emerald-50/20 transition-all group"
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                {prayer.name === 'Fajr' ? 'Subuh' :
                                    prayer.name === 'Dhuhr' ? 'Zuhur' :
                                        prayer.name === 'Asr' ? 'Ashar' :
                                            prayer.name === 'Maghrib' ? 'Maghrib' :
                                                prayer.name === 'Isha' ? 'Isya' : prayer.name}
                            </span>
                            <span className="text-xl font-arabic text-emerald-600/20 group-hover:text-emerald-600/60 transition-colors leading-none">{prayer.arabicName}</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="text-xl font-black tracking-tighter tabular-nums text-slate-800">
                                {formatPrayerTime(prayer.time)}
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
