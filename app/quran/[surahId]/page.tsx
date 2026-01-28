'use client';

import Link from 'next/link';
import { getSurahByNumber } from '@/lib/quran-data';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import VerseRenderer from '@/components/VerseRenderer';
import QuranSettingsSheet from '@/components/QuranSettingsSheet';

// Sample Ayahs with Tajwid Segments for Al-Fatihah
// In a real app, this would come from an API
const SAMPLE_TAJWID: Record<number, any[]> = {
    1: [
        [
            { text: "بِسْمِ ٱللَّهِ ", type: "normal" },
            { text: "ٱلرَّحْمَـٰنِ ", type: "normal" },
            { text: "ٱلرَّحِيمِ", type: "mad" }
        ],
        [
            { text: "ٱلْحَمْدُ ", type: "normal" },
            { text: "لِلَّهِ ", type: "normal" },
            { text: "رَبِّ ", type: "normal" },
            { text: "ٱلْعَـٰلَمِينَ", type: "mad" }
        ],
        [
            { text: "ٱلرَّحْمَـٰنِ ", type: "normal" },
            { text: "ٱلرَّحِيمِ", type: "mad" }
        ],
        [
            { text: "مَـٰلِكِ ", type: "normal" },
            { text: "يَوْمِ ", type: "normal" },
            { text: "ٱلدِّينِ", type: "mad" }
        ],
        [
            { text: "إِيَّاكَ ", type: "normal" },
            { text: "نَعْبُدُ ", type: "normal" },
            { text: "وَإِيَّاكَ ", type: "normal" },
            { text: "نَسْتَعِينُ", type: "mad" }
        ],
        [
            { text: "ٱهْدِنَا ", type: "normal" },
            { text: "ٱلصِّرَٰطَ ", type: "normal" },
            { text: "ٱلْمُسْتَقِيمَ", type: "mad" }
        ],
        [
            { text: "صِرَٰطَ ", type: "normal" },
            { text: "ٱلَّذِينَ ", type: "normal" },
            { text: "أَنْعَمْتَ ", type: "normal" },
            { text: "عَلَيْهِمْ ", type: "normal" },
            { text: "غَيْرِ ", type: "normal" },
            { text: "ٱلْمَغْضُوبِ ", type: "normal" },
            { text: "عَلَيْهِمْ ", type: "ghunnah" },
            { text: "وَلَا ", type: "normal" },
            { text: "ٱلضَّآلِّينَ", type: "mad" }
        ]
    ]
};

interface SurahPageProps {
    params: { surahId: string };
}

export default function SurahPage({ params }: SurahPageProps) {
    const { surahId } = params;
    const surahNumber = parseInt(surahId);
    const surah = getSurahByNumber(surahNumber);

    if (!surah) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-muted">Surah not found</p>
                    <Link href="/quran">
                        <Button variant="secondary" className="mt-4">
                            Back to Quran
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Get sample ayahs or show placeholder
    const ayahs = SAMPLE_TAJWID[surahNumber] || [];
    const hasSampleData = ayahs.length > 0;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 glass border-b border-white/30 safe-top">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Link href="/quran">
                                <button className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-foreground" />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-lg font-bold text-foreground leading-tight">
                                    {surah.englishName}
                                </h1>
                                <p className="text-xs text-muted">
                                    {surah.englishNameTranslation}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <QuranSettingsSheet />
                        </div>
                    </div>

                    <div className="flex items-center justify-center -mt-2">
                        <p className="text-xl arabic text-primary">
                            {surah.arabicName}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pb-32">
                {/* Bismillah */}
                {surahNumber !== 1 && surahNumber !== 9 && (
                    <div className="text-center mb-10">
                        <p className="text-2xl arabic text-primary">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                    </div>
                )}

                {/* Ayahs */}
                {hasSampleData ? (
                    <div className="space-y-6">
                        {ayahs.map((segments, index) => (
                            <div key={index} className="glass rounded-2xl p-6 relative">
                                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                                    {index + 1}
                                </div>
                                <VerseRenderer
                                    segments={segments}
                                    className="mt-8 text-foreground"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass rounded-2xl p-8 text-center">
                        <p className="text-muted mb-4">
                            📖 Full Tajwid support for this Surah coming soon.
                        </p>
                        <Link href="/quran">
                            <Button variant="secondary" className="mt-6">
                                Back to Surah List
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
