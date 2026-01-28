'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AzkarListItemProps {
    title: string;
    subtitle?: string;
    icon: ReactNode;
    onClick?: () => void;
    className?: string;
    rightContent?: ReactNode;
}

export default function AzkarListItem({
    title,
    subtitle,
    icon,
    onClick,
    className,
    rightContent
}: AzkarListItemProps) {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "bg-white border border-slate-100 shadow-sm rounded-[1.25rem] p-4 flex items-center gap-4 cursor-pointer hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group",
                className
            )}
        >
            {/* Icon Container */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-sm text-slate-500 truncate">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Right Content */}
            <div className="flex items-center gap-2">
                {rightContent}
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
        </motion.div>
    );
}
