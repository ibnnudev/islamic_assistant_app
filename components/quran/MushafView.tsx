'use client';

import { useState, useEffect } from 'react';
import { PageAyah, QuranPageResponse } from '@/hooks/useQuranPage';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface MushafViewProps {
    pageNumber: number;
    data?: QuranPageResponse;
    isLoading: boolean;
    isError: boolean;
    onNextPage?: () => void;
    onPrevPage?: () => void;
}

const toArabicNumerals = (n: number) => {
    return n.toLocaleString('ar-EG');
};

const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";

export default function MushafView({
    pageNumber,
    data,
    isLoading,
    isError,
    onNextPage,
    onPrevPage
}: MushafViewProps) {
    const [activeAyahId, setActiveAyahId] = useState<number | null>(null);

    // Reset active ayah on page change
    useEffect(() => {
        setActiveAyahId(null);
    }, [pageNumber]);

    // Swipe Handlers
    const handlers = useSwipeable({
        onSwipedRight: () => onPrevPage?.(),
        onSwipedLeft: () => onNextPage?.(),
        trackMouse: true
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !data || !data.data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <AlertCircle className="w-10 h-10 mb-2 text-destructive" />
                <h3 className="text-lg font-semibold">Waduh, gagal buka Mushaf</h3>
                <p className="text-sm text-muted-foreground">Cek koneksi internetmu bentar, terus coba lagi ya.</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">Muat Ulang</Button>
            </div>
        );
    }

    const { ayahs } = data.data;

    // Group Ayahs by Surah
    const surahGroups: { surah: any; ayahs: PageAyah[] }[] = [];
    ayahs.forEach(ayah => {
        const lastGroup = surahGroups[surahGroups.length - 1];
        if (lastGroup && lastGroup.surah.number === ayah.surah.number) {
            lastGroup.ayahs.push(ayah);
        } else {
            surahGroups.push({ surah: ayah.surah, ayahs: [ayah] });
        }
    });

    return (
        <div {...handlers} className="w-full flex flex-col relative bg-white min-h-screen">
            {/* Sticky Header */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center transition-all">
                <div className="flex flex-col">
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">
                        {ayahs[0].surah.englishName}
                    </h2>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Surah {ayahs[0].surah.number}</span>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest border border-emerald-100">
                    Juz {ayahs[0].juz}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={pageNumber}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center"
                >
                    {/* Main Reading Area */}
                    <div className="w-full max-w-2xl bg-white min-h-[80vh]">
                        <div className="p-6 sm:p-10">
                            {surahGroups.map((group, groupIndex) => (
                                <div key={group.surah.number} className={cn("mb-12", groupIndex > 0 && "mt-16")}>

                                    {/* Surah Title Banner */}
                                    {group.ayahs[0].numberInSurah === 1 && (
                                        <div className="text-center mb-10">
                                            <div className="inline-block px-10 py-3 border-b-2 border-emerald-100 bg-emerald-50/30 rounded-t-3xl">
                                                <h3 className="text-3xl font-black font-arabic text-emerald-900">
                                                    سورة {group.surah.name}
                                                </h3>
                                            </div>

                                            {group.surah.number !== 9 && group.surah.number !== 1 && (
                                                <div className="mt-10 text-4xl font-arabic text-slate-800 leading-relaxed">
                                                    {BISMILLAH}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Quran Text Flow */}
                                    <div
                                        className="text-right dir-rtl leading-[4.5rem] py-4 font-arabic text-slate-900 selection:bg-emerald-100"
                                        style={{ fontSize: '2.25rem' }} // text-4xl equivalent for better readability
                                    >
                                        {group.ayahs.map((ayah) => {
                                            const isNewSurahStart = ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayah.surah.number !== 9;
                                            let text = ayah.text;

                                            if (isNewSurahStart) {
                                                text = text.replace(BISMILLAH, '').trim();
                                            }

                                            const isActive = activeAyahId === ayah.number;

                                            return (
                                                <span
                                                    key={ayah.number}
                                                    onClick={() => setActiveAyahId(isActive ? null : ayah.number)}
                                                    className={cn(
                                                        "cursor-pointer transition-all duration-300 box-decoration-clone inline rounded-xl px-2 py-2",
                                                        isActive
                                                            ? "bg-[#d1fae5] shadow-sm shadow-emerald-200/50"
                                                            : "hover:bg-slate-50"
                                                    )}
                                                >
                                                    {text}
                                                    {/* Ayah Marker */}
                                                    <span className="inline-flex items-center justify-center w-10 h-10 mx-2 relative select-none align-middle translate-y-[-4px]">
                                                        <span className="text-emerald-300 text-3xl">۝</span>
                                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-emerald-700 font-sans">
                                                            {toArabicNumerals(ayah.numberInSurah)}
                                                        </span>
                                                    </span>
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Page Decoration Footer */}
                        <div className="py-10 text-center flex flex-col items-center gap-4 opacity-40">
                            <div className="w-16 h-1 bg-slate-100 rounded-full" />
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">
                                Halaman {pageNumber}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
