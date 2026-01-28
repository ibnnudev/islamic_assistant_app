import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';

// API Response Types
export interface QuranPageResponse {
    code: number;
    status: string;
    data: {
        number: number;
        ayahs: PageAyah[];
        surahs: { [key: string]: PageSurah };
        edition: {
            identifier: string;
            language: string;
            name: string;
            englishName: string;
            format: string;
            type: string;
            direction: string;
        };
    };
}

export interface PageAyah {
    number: number;
    text: string;
    surah: PageSurah;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface PageSurah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
}

const fetchQuranPage = async (pageNumber: number): Promise<QuranPageResponse> => {
    const res = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`);
    if (!res.ok) {
        throw new Error('Failed to fetch Quran page');
    }
    return res.json();
};

export const useQuranPage = (pageNumber: number) => {
    const queryClient = useQueryClient();

    // Validate Page Number
    const validPage = Math.max(1, Math.min(604, pageNumber));

    const query = useQuery({
        queryKey: ['quran-page', validPage],
        queryFn: () => fetchQuranPage(validPage),
        staleTime: Infinity,
        placeholderData: keepPreviousData,
    });

    // Prefetch Next & Previous Pages
    useEffect(() => {
        // Prefetch Next
        if (validPage < 604) {
            const nextPage = validPage + 1;
            queryClient.prefetchQuery({
                queryKey: ['quran-page', nextPage],
                queryFn: () => fetchQuranPage(nextPage),
                staleTime: Infinity,
            });
        }

        // Prefetch Prev
        if (validPage > 1) {
            const prevPage = validPage - 1;
            queryClient.prefetchQuery({
                queryKey: ['quran-page', prevPage],
                queryFn: () => fetchQuranPage(prevPage),
                staleTime: Infinity,
            });
        }
    }, [validPage, queryClient]);

    return query;
};
