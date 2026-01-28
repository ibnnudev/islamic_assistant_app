'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LocateFixed, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';
import { calculateQiblaDirection, isAlignedWithQibla } from '@/lib/qibla-utils';

interface CompassProps {
    userLocation: { latitude: number; longitude: number } | null;
}

export default function Compass({ userLocation }: CompassProps) {
    const [heading, setHeading] = useState<number>(0);
    const [qiblaDir, setQiblaDir] = useState<number>(0);
    const [isIOS, setIsIOS] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [aligned, setAligned] = useState(false);

    useEffect(() => {
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
        if (userLocation) {
            setQiblaDir(calculateQiblaDirection(userLocation));
        }
    }, [userLocation]);

    const requestPermission = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation);
                }
            } catch (error) {
                console.error('Permission error:', error);
            }
        } else {
            // Non-iOS or older iOS
            window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            window.addEventListener('deviceorientation', handleOrientation, true);
            setPermissionGranted(true);
        }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
        let alpha = event.alpha;
        // For iOS, we use webkitCompassHeading
        if ((event as any).webkitCompassHeading !== undefined) {
            alpha = (event as any).webkitCompassHeading;
        }

        if (alpha !== null) {
            const currentHeading = alpha;
            setHeading(currentHeading);

            const isCurrentlyAligned = isAlignedWithQibla(currentHeading, qiblaDir, 5);
            if (isCurrentlyAligned && !aligned) {
                if ('vibrate' in navigator) navigator.vibrate(200);
            }
            setAligned(isCurrentlyAligned);
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
            window.removeEventListener('deviceorientationabsolute', handleOrientation);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-8 py-10">
            <div className="relative w-72 h-72">
                {/* Compass Ring */}
                <div className="absolute inset-0 border-[6px] border-muted rounded-full shadow-inner" />

                {/* Cardinal Directions */}
                <div className="absolute inset-4 flex flex-col justify-between items-center text-xs font-bold text-muted-foreground tabular-nums">
                    <span>N</span>
                    <div className="flex justify-between w-full"><span>W</span><span>E</span></div>
                    <span>S</span>
                </div>

                {/* Needle/SVG Compass */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: -heading }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                >
                    {/* Static Elements that rotate with device heading relative to North */}
                    <div className="relative w-full h-full flex items-center justify-center">

                        {/* Local North Pointer */}
                        <div className="absolute top-8 w-1 h-6 bg-destructive rounded-full" />

                        {/* Qibla Indicator (Fixed relative to compass north) */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ rotate: qiblaDir }}
                        >
                            <div className="relative mb-40 flex flex-col items-center">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                    aligned ? "bg-primary text-primary-foreground scale-125 shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
                                )}>
                                    <Navigation className="w-5 h-5" />
                                </div>
                                <div className={cn(
                                    "w-1 h-32 mt-2 rounded-full transition-colors duration-300",
                                    aligned ? "bg-primary" : "bg-muted"
                                )} />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Center Point */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-background border-4 border-primary rounded-full z-20 shadow-sm" />
                </div>
            </div>

            <div className="text-center space-y-2">
                <h3 className={cn(
                    "text-2xl font-bold transition-colors duration-300",
                    aligned ? "text-primary" : "text-foreground"
                )}>
                    {aligned ? "Aligned with Kaaba" : `${Math.round(qiblaDir)}° Qibla`}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {userLocation ? "Pointing towards Mecca, Saudi Arabia" : "Requesting location..."}
                </p>
            </div>

            {!permissionGranted && isIOS && (
                <button
                    onClick={requestPermission}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                    <ShieldCheck className="w-5 h-5" />
                    Calibrate Compass
                </button>
            )}

            {permissionGranted && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <LocateFixed className="w-3 h-3" />
                    Compass Active
                </div>
            )}
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
