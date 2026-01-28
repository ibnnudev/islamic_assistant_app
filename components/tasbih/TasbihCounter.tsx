'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Target, List, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TasbihPreset {
    id: string;
    name: string;
    target: number;
}

const PRESETS: TasbihPreset[] = [
    { id: 'pagi', name: 'Dzikir Pagi', target: 100 },
    { id: 'petang', name: 'Dzikir Petang', target: 100 },
    { id: 'fatimah', name: 'Tasbih Fatimah', target: 33 },
    { id: 'free', name: 'Free Mode', target: 0 },
];

export default function TasbihCounter() {
    const [count, setCount] = useState(0);
    const [activePreset, setActivePreset] = useState<TasbihPreset | null>(null);
    const [showCounter, setShowCounter] = useState(false);

    const handleIncrement = useCallback(() => {
        setCount((prev) => prev + 1);
        if ('vibrate' in navigator) navigator.vibrate(50);
    }, []);

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCount(0);
    };

    const startPreset = (preset: TasbihPreset) => {
        setActivePreset(preset);
        setCount(0);
        setShowCounter(true);
    };

    const progress = activePreset?.target ? (count / activePreset.target) * 100 : 0;

    if (!showCounter) {
        return (
            <div className="p-6 space-y-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Tasbih</h2>
                    <p className="text-sm text-muted-foreground">Select a preset to begin counting</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {PRESETS.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => startPreset(preset)}
                            className="flex flex-col items-start p-4 bg-card border rounded-2xl text-left hover:bg-accent/50 transition-all active:scale-95 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 fill-current" />
                            </div>
                            <span className="font-bold text-sm">{preset.name}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                {preset.target > 0 ? `Target: ${preset.target}` : 'No Target'}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center animate-in fade-in duration-300"
            onClick={handleIncrement}
        >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-background to-transparent z-10 pt-[env(safe-area-inset-top)]">
                <button
                    onClick={(e) => { e.stopPropagation(); setShowCounter(false); }}
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                    <List className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {activePreset?.name}
                </span>
                <button
                    onClick={handleReset}
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            {/* Progress Ring */}
            <div className="relative w-80 h-80 flex items-center justify-center">
                {activePreset?.target ? (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="160"
                            cy="160"
                            r="150"
                            className="stroke-muted-foreground/10"
                            strokeWidth="4"
                            fill="transparent"
                        />
                        <motion.circle
                            cx="160"
                            cy="160"
                            r="150"
                            className="stroke-primary"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="942.48"
                            animate={{ strokeDashoffset: 942.48 - (942.48 * Math.min(progress, 100)) / 100 }}
                            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                        />
                    </svg>
                ) : (
                    <div className="absolute inset-0 border-4 border-dashed border-muted-foreground/10 rounded-full animate-spin-slow" />
                )}

                {/* Counter Display */}
                <div className="flex flex-col items-center">
                    <motion.span
                        key={count}
                        initial={{ scale: 0.9, opacity: 0.8 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        className="text-8xl font-black tracking-tight tabular-nums"
                    >
                        {count}
                    </motion.span>
                    {activePreset?.target ? (
                        <span className="text-sm font-bold text-muted-foreground mt-4">
                            of {activePreset.target}
                        </span>
                    ) : (
                        <span className="text-sm font-bold text-muted-foreground mt-4 italic">
                            Free Mode
                        </span>
                    )}
                </div>
            </div>

            {/* Hint */}
            <div className="absolute bottom-12 text-xs font-medium text-muted-foreground animate-pulse text-center px-10 leading-relaxed uppercase tracking-[0.2em]">
                Tap anywhere to count
            </div>
        </div>
    );
}
