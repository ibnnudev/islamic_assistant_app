'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, Book, Sidebar, Hash, FileText } from 'lucide-react';
import { SURAHS } from '@/lib/quran-data';
import { cn } from '@/lib/utils';

export function CommandPalette({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, setOpen]);

    const runCommand = React.useCallback(
        (command: () => void) => {
            setOpen(false);
            command();
        },
        [setOpen]
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Command
                className="w-full max-w-[480px] bg-background border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onKeyDown={(e) => {
                    if (e.key === 'Escape') setOpen(false);
                }}
            >
                <div className="flex items-center border-b px-4 py-3 gap-3">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <Command.Input
                        autoFocus
                        placeholder="Search Surah, Page, or Juz..."
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
                    />
                    <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2 pb-4">
                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Surahs" className="px-2 mb-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Surahs</div>
                        {SURAHS.map((surah) => (
                            <Command.Item
                                key={`surah-${surah.number}`}
                                onSelect={() => runCommand(() => router.push(`/quran/read/${surah.number * 2}`))} // Mock mapping to page
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent text-sm transition-colors"
                            >
                                <Book className="w-4 h-4 text-primary/60" />
                                <span className="flex-1">{surah.englishName}</span>
                                <span className="text-xs text-muted-foreground font-arabic">{surah.name}</span>
                            </Command.Item>
                        ))}
                    </Command.Group>

                    <Command.Group heading="Navigation" className="px-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Shortcuts</div>
                        <Command.Item onSelect={() => runCommand(() => router.push('/quran/read/1'))} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent text-sm transition-colors">
                            <FileText className="w-4 h-4 text-primary/60" />
                            <span>Go to Page 1</span>
                        </Command.Item>
                        <Command.Item onSelect={() => runCommand(() => router.push('/quran/read/604'))} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent text-sm transition-colors">
                            <FileText className="w-4 h-4 text-primary/60" />
                            <span>Go to Page 604</span>
                        </Command.Item>
                        <Command.Item onSelect={() => runCommand(() => router.push('/quran/read/1'))} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-accent text-sm transition-colors">
                            <Hash className="w-4 h-4 text-primary/60" />
                            <span>Go to Juz 30</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>

            <div
                className="absolute inset-0 -z-10"
                onClick={() => setOpen(false)}
            />
        </div>
    );
}
