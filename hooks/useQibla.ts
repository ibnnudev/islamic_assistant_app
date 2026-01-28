'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Location, QiblaData } from '@/types';
import { getUserLocation } from '@/lib/geolocation';
import { getQiblaData, normalizeAngle, isAlignedWithQibla } from '@/lib/qibla-utils';
import { triggerSuccessHaptic } from '@/lib/haptics';

export function useQibla() {
    const [location, setLocation] = useState<Location | null>(null);
    const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);
    const [deviceHeading, setDeviceHeading] = useState<number>(0);
    const [isAligned, setIsAligned] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get user location and calculate Qibla
    useEffect(() => {
        async function initializeQibla() {
            try {
                const userLocation = await getUserLocation();
                setLocation(userLocation);

                const data = getQiblaData(userLocation);
                setQiblaData(data);

                setLoading(false);
            } catch (err) {
                setError('Failed to get location');
                setLoading(false);
            }
        }

        initializeQibla();
    }, []);

    // Request device orientation permission (iOS 13+)
    const requestPermission = useCallback(async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    setPermissionGranted(true);
                    return true;
                } else {
                    setError('Permission denied');
                    return false;
                }
            } catch (err) {
                setError('Failed to request permission');
                return false;
            }
        } else {
            // Permission not required (Android or older iOS)
            setPermissionGranted(true);
            return true;
        }
    }, []);

    // Handle device orientation
    useEffect(() => {
        if (!permissionGranted) return;

        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                // alpha is the compass heading (0-360)
                const heading = normalizeAngle(360 - event.alpha);
                setDeviceHeading(heading);
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [permissionGranted]);

    // Check alignment and trigger haptic feedback
    useEffect(() => {
        if (!qiblaData) return;

        const aligned = isAlignedWithQibla(deviceHeading, qiblaData.direction);

        // Trigger haptic when becoming aligned
        if (aligned && !isAligned) {
            triggerSuccessHaptic();
        }

        setIsAligned(aligned);
    }, [deviceHeading, qiblaData, isAligned]);

    const relativeAngle = qiblaData
        ? normalizeAngle(qiblaData.direction - deviceHeading)
        : 0;

    return {
        location,
        qiblaData,
        deviceHeading,
        relativeAngle,
        isAligned,
        permissionGranted,
        loading,
        error,
        requestPermission,
    };
}
