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
                    className="p-4 bg-muted/30 border-none rounded-3xl hover:bg-muted/50 transition-all group"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{prayer.name}</span>
                            <span className="text-xl font-arabic text-primary/40 group-hover:text-primary transition-colors">{prayer.arabicName}</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="text-lg font-black tracking-tight tabular-nums">
                                {formatPrayerTime(prayer.time)}
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
