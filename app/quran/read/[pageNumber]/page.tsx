'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuranPage } from '@/hooks/useQuranPage';
import MushafView from '@/components/quran/MushafView';
import { Button } from '@/components/ui/Button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { CommandPalette } from '@/components/CommandPalette';

interface ReadPageProps {
    params: { pageNumber: string };
}

export default function ReadPage({ params }: ReadPageProps) {
    const router = useRouter();
    const pageNum = parseInt(params.pageNumber);

    const [currentPage, setCurrentPage] = useState(isNaN(pageNum) ? 1 : pageNum);
    const [searchOpen, setSearchOpen] = useState(false);

    // Fetch Data
    const { data, isLoading, isError } = useQuranPage(currentPage);

    useEffect(() => {
        if (!isNaN(pageNum)) {
            setCurrentPage(pageNum);
        }
    }, [pageNum]);

    const goToPage = (p: number) => {
        if (p >= 1 && p <= 604) {
            router.push(`/quran/read/${p}`);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Command Palette */}
            <CommandPalette open={searchOpen} setOpen={setSearchOpen} />

            {/* View */}
            <MushafView
                pageNumber={currentPage}
                data={data}
                isLoading={isLoading}
                isError={isError}
                onNextPage={() => goToPage(currentPage + 1)}
                onPrevPage={() => goToPage(currentPage - 1)}
            />

            {/* Floating Search Trigger in Quran Section */}
            <div className="fixed bottom-24 right-6 z-40 max-w-[480px]">
                <Button
                    onClick={() => setSearchOpen(true)}
                    className="w-14 h-14 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center p-0"
                >
                    <Search className="w-6 h-6" />
                </Button>
            </div>

            {/* Pagination Controls */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t z-20 safe-bottom">
                <div className="max-w-[480px] mx-auto flex items-center justify-between gap-4">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-11"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage >= 604}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Berikutnya
                    </Button>

                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-11"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        Sebelumnya
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
