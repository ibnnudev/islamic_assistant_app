'use client';

import { useState, useEffect } from 'react';
import { PageAyah, QuranPageResponse } from '@/hooks/useQuranPage';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';

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
                <h3 className="text-lg font-semibold">Failed to load page</h3>
                <p className="text-sm text-muted-foreground">Please check your connection and try again.</p>
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
        <div {...handlers} className="w-full flex flex-col relative bg-background">
            {/* Sticky Header */}
            <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b px-4 py-3 flex justify-between items-center transition-all">
                <h2 className="text-sm font-bold text-primary uppercase tracking-tighter sm:tracking-widest">
                    {ayahs[0].surah.englishName}
                </h2>
                <div className="px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    JUZ {ayahs[0].juz}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={pageNumber}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 flex flex-col items-center"
                >
                    {/* Card Container */}
                    <div className="w-full bg-card text-card-foreground border shadow-sm rounded-xl overflow-hidden min-h-[70vh]">
                        <div className="p-6 sm:p-8">
                            {surahGroups.map((group, groupIndex) => (
                                <div key={group.surah.number} className={cn("mb-6", groupIndex > 0 && "mt-10 pt-6 border-t")}>

                                    {/* Surah Title Banner */}
                                    {group.ayahs[0].numberInSurah === 1 && (
                                        <div className="text-center mb-6">
                                            <div className="inline-block px-8 py-2 border-2 border-primary/20 rounded-lg bg-primary/5">
                                                <h3 className="text-xl font-bold font-arabic text-primary">
                                                    سورة {group.surah.name}
                                                </h3>
                                            </div>

                                            {group.surah.number !== 9 && group.surah.number !== 1 && (
                                                <div className="mt-6 text-2xl font-arabic text-foreground opacity-90">
                                                    {BISMILLAH}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Quran Text Flow */}
                                    <div
                                        className="text-right dir-rtl leading-[3.5rem] py-2 font-arabic"
                                        style={{ fontSize: '1.75rem' }}
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
                                                        "cursor-pointer transition-all duration-200 box-decoration-clone inline rounded-md px-1 py-1",
                                                        isActive
                                                            ? "bg-primary/20 text-primary font-medium"
                                                            : "hover:bg-accent/50"
                                                    )}
                                                >
                                                    {text}
                                                    {/* Ayah Marker */}
                                                    <span className="inline-flex items-center justify-center w-8 h-8 mx-1 relative select-none align-middle translate-y-[-2px]">
                                                        <span className="text-primary/40 text-2xl">۝</span>
                                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary font-sans">
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

                        {/* Page Footer */}
                        <div className="py-4 text-center border-t bg-muted/30">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                Page {pageNumber}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
