'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SURAHS } from '@/lib/quran-data';
import { Search, Book, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function QuranPage() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const filtered = SURAHS.filter(s =>
        s.englishName.toLowerCase().includes(query.toLowerCase()) ||
        s.name.includes(query)
    );

    return (
        <div className="p-6 space-y-8 pb-32">
            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-primary uppercase italic">The Quran</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Read and study the Noble Quran in Mushaf view.
                </p>
            </div>

            {/* Quick Search */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search Surah..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-muted/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                />
            </div>

            {/* List */}
            <div className="space-y-4">
                {filtered.map((surah, index) => (
                    <motion.div
                        key={surah.number}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => router.push(`/quran/read/${surah.number * 2}`)} // Mock page routing
                        className="flex items-center gap-4 p-4 bg-card border rounded-2xl hover:bg-accent/50 cursor-pointer active:scale-[0.98] transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {surah.number}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">
                                {surah.englishName}
                            </h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                                {surah.revelationType} • {surah.numberOfAyahs} Ayahs
                            </p>
                        </div>

                        <div className="text-right">
                            <span className="text-lg font-arabic text-foreground/80 group-hover:text-primary transition-colors">
                                {surah.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
