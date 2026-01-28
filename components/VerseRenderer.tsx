'use client';

import { useSettingsStore } from '@/lib/store';

// Mock Tajwid Types
type TajwidType = 'normal' | 'ghunnah' | 'idgham_with_ghunnah' | 'ikhfa' | 'qalgalah';

interface Segment {
    text: string;
    type: TajwidType;
}

interface VerseRendererProps {
    segments: Segment[];
    className?: string;
}

const TAJWID_COLORS: Record<TajwidType, string> = {
    normal: 'text-foreground',
    ghunnah: 'text-green-600 dark:text-green-400',
    idgham_with_ghunnah: 'text-blue-600 dark:text-blue-400',
    ikhfa: 'text-orange-500 dark:text-orange-400',
    qalgalah: 'text-red-500 dark:text-red-400',
};

export default function VerseRenderer({ segments, className }: VerseRendererProps) {
    const { fontSize, fontStyle } = useSettingsStore();

    const fontFamily = fontStyle === 'uthmani' ? 'var(--font-arabic)' : 'Traditional Arabic, serif';

    return (
        <div
            className={`leading-[2.5] text-right dir-rtl ${className}`}
            style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily
            }}
        >
            {segments.map((segment, index) => (
                <span
                    key={index}
                    className={TAJWID_COLORS[segment.type] || TAJWID_COLORS.normal}
                >
                    {segment.text}
                </span>
            ))}
        </div>
    );
}
