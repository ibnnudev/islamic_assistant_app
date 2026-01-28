'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Compass, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Quran', href: '/quran', icon: BookOpen },
    { name: 'Kiblat', href: '/kiblat', icon: Compass },
    { name: 'Tasbih', href: '/tasbih', icon: Circle },
];

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom)]">
            <div className="w-full max-w-[480px] px-6 pb-6 pointer-events-auto">
                <div className="bg-background/80 backdrop-blur-lg border rounded-full shadow-2xl px-2 py-2">
                    <div className="flex items-center justify-between">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = isActive(tab.href);

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center py-2.5 px-5 rounded-full transition-all duration-300",
                                        active
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                            : "text-muted-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5", active && "w-6 h-6")} />
                                    {active && (
                                        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
                                            {tab.name}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
