'use client';

import { motion } from 'framer-motion';

interface TasbihCounterProps {
    count: number;
    target: number;
    progress: number;
    isComplete: boolean;
    onIncrement: () => void;
}

export default function TasbihCounter({
    count,
    target,
    progress,
    isComplete,
    onIncrement
}: TasbihCounterProps) {
    return (
        <motion.button
            onClick={onIncrement}
            className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            {/* Circular Progress */}
            <div className="relative mb-12">
                <svg className="w-64 h-64 transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                        cx="128"
                        cy="128"
                        r="120"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-primary/10"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="128"
                        cy="128"
                        r="120"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-primary"
                        initial={{ strokeDasharray: '0 753.98' }}
                        animate={{
                            strokeDasharray: `${(progress / 100) * 753.98} 753.98`
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </svg>

                {/* Count Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        key={count}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-center"
                    >
                        <p className="text-8xl font-bold text-primary tabular-nums">
                            {count}
                        </p>
                        {isComplete && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-lg font-medium text-primary mt-2"
                            >
                                ✨ Milestone!
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Target Info */}
            <div className="text-center">
                <p className="text-muted text-lg mb-2">
                    Target: {target}
                </p>
                <p className="text-sm text-muted/70">
                    Tap anywhere to count
                </p>
            </div>

            {/* Ripple Effect on Tap */}
            <motion.div
                key={`ripple-${count}`}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-primary/20 pointer-events-none"
            />
        </motion.button>
    );
}
