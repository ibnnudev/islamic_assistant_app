'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, SkipForward, SkipBack } from 'lucide-react';
import { useAudioStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';

export default function AudioPlayer() {
    const { isPlaying, currentTrack, showPlayer, pause, resume, close } = useAudioStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Handle Audio Logic
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => console.log('Audio play error:', e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.url;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log('Audio play error:', e));
            }
        }
    }, [currentTrack]); // isPlaying dependency removed to prevent re-triggering on pause/play toggle alone, managed by above effect

    if (!currentTrack) return null;

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onEnded={() => pause()} // Simple auto-stop for now
                className="hidden"
            />

            {/* Floating Player UI */}
            <AnimatePresence>
                {showPlayer && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed left-0 right-0 z-40 px-4 pointer-events-none"
                        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 5rem)' }} // Above BottomNav
                    >
                        <div className="max-w-md mx-auto pointer-events-auto">
                            <div className="glass-dark rounded-2xl p-3 flex items-center gap-3 shadow-lg border border-white/10 relative overflow-hidden">
                                {/* Progress Bar (Mock) */}
                                <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full">
                                    <div className="h-full bg-primary w-1/3" />
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0 ml-2">
                                    <p className="text-sm font-semibold text-foreground truncate">
                                        {currentTrack.title}
                                    </p>
                                    <p className="text-xs text-muted truncate">
                                        {currentTrack.artist || 'Sakinah Audio'}
                                    </p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-muted hover:text-foreground">
                                        <SkipBack className="w-5 h-5" />
                                    </button>

                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="w-10 h-10 rounded-full p-0 flex items-center justify-center shrink-0"
                                        onClick={() => isPlaying ? pause() : resume()}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 fill-current" />
                                        ) : (
                                            <Play className="w-5 h-5 fill-current ml-0.5" />
                                        )}
                                    </Button>

                                    <button className="p-2 text-muted hover:text-foreground">
                                        <SkipForward className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={close}
                                        className="p-2 text-muted hover:text-red-500 ml-1"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
