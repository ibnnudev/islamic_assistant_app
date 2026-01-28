'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Compass, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const tabs = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Al-Quran', href: '/quran', icon: BookOpen },
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
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-[calc(env(safe-area-inset-bottom)+1.5rem)] px-6 pointer-events-none">
            <div className="w-full max-w-[440px] pointer-events-auto">
                <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-2 py-2 transition-all duration-500">
                    <div className="flex items-center justify-between">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = isActive(tab.href);

                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={cn(
                                        "flex items-center justify-center gap-2 py-3 px-5 rounded-full transition-all duration-500 min-w-[64px]",
                                        active
                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                            : "text-slate-400 hover:bg-slate-50"
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5", active && "fill-current")} />
                                    {active && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            className="text-xs font-black uppercase tracking-tighter whitespace-nowrap overflow-hidden"
                                        >
                                            {tab.name}
                                        </motion.span>
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
