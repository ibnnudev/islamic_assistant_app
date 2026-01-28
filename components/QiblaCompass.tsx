'use client';

import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

interface QiblaCompassProps {
    relativeAngle: number;
    isAligned: boolean;
    distance?: number;
}

export default function QiblaCompass({ relativeAngle, isAligned, distance }: QiblaCompassProps) {
    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square">
            {/* Outer Circle - Compass Ring */}
            <div className="absolute inset-0 glass rounded-full border-2 border-primary/20">
                {/* Cardinal Directions */}
                <div className="absolute inset-0">
                    {['N', 'E', 'S', 'W'].map((direction, index) => {
                        const rotation = index * 90;
                        return (
                            <div
                                key={direction}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-140px)`,
                                }}
                            >
                                <span
                                    className="inline-block font-semibold text-foreground"
                                    style={{ transform: `rotate(-${rotation}deg)` }}
                                >
                                    {direction}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Degree Markers */}
                <div className="absolute inset-0">
                    {Array.from({ length: 36 }).map((_, index) => {
                        const angle = index * 10;
                        const isMajor = angle % 30 === 0;
                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 left-1/2 origin-center"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                                }}
                            >
                                <div
                                    className={`
                    ${isMajor ? 'w-0.5 h-4 bg-primary' : 'w-0.5 h-2 bg-primary/30'}
                  `}
                                    style={{ marginTop: '-150px' }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Center Circle - Kaaba */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`
          w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isAligned
                        ? 'bg-primary text-white scale-110'
                        : 'bg-white/80 text-primary'
                    }
        `}>
                    <div className="text-center">
                        <div className="text-3xl mb-1">🕋</div>
                        <p className="text-xs font-medium">
                            {isAligned ? 'Aligned!' : 'Kaaba'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Qibla Arrow */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: relativeAngle }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            >
                <div className="absolute" style={{ marginTop: '-80px' }}>
                    <Navigation
                        className={`
              w-16 h-16 transition-colors duration-300
              ${isAligned ? 'text-primary' : 'text-primary/60'}
            `}
                        fill={isAligned ? 'currentColor' : 'none'}
                        strokeWidth={2}
                    />
                </div>
            </motion.div>

            {/* Distance Info */}
            {distance && (
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                    <p className="text-sm text-muted">
                        Distance to Kaaba: <span className="font-semibold text-foreground">
                            {Math.round(distance).toLocaleString()} km
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
