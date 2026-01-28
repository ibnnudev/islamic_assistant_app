'use client';

import { useState, useEffect } from 'react';
import type { Location, PrayerTimes, PrayerTime } from '@/types';
import { getUserLocation } from '@/lib/geolocation';
import { calculatePrayerTimes, getNextPrayer, formatTimeRemaining, getPrayersArray } from '@/lib/prayer-utils';

export function usePrayerTimes() {
    const [location, setLocation] = useState<Location | null>(null);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get user location and calculate prayer times
    useEffect(() => {
        async function initializePrayerTimes() {
            try {
                const userLocation = await getUserLocation();
                setLocation(userLocation);

                const times = calculatePrayerTimes(userLocation);
                setPrayerTimes(times);

                const next = getNextPrayer(times);
                setNextPrayer(next);

                setLoading(false);
            } catch (err) {
                setError('Failed to load prayer times');
                setLoading(false);
            }
        }

        initializePrayerTimes();
    }, []);

    // Update time remaining every second
    useEffect(() => {
        if (!nextPrayer) return;

        const updateTimeRemaining = () => {
            const remaining = formatTimeRemaining(nextPrayer.time);
            setTimeRemaining(remaining);
        };

        updateTimeRemaining();
        const interval = setInterval(updateTimeRemaining, 1000);

        return () => clearInterval(interval);
    }, [nextPrayer]);

    // Recalculate prayer times at midnight
    useEffect(() => {
        if (!location) return;

        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const timeUntilMidnight = tomorrow.getTime() - now.getTime();

        const timeout = setTimeout(() => {
            const times = calculatePrayerTimes(location);
            setPrayerTimes(times);
            const next = getNextPrayer(times);
            setNextPrayer(next);
        }, timeUntilMidnight);

        return () => clearTimeout(timeout);
    }, [location, prayerTimes]);

    const allPrayers = prayerTimes ? getPrayersArray(prayerTimes) : [];

    return {
        location,
        prayerTimes,
        nextPrayer,
        timeRemaining,
        allPrayers,
        loading,
        error,
    };
}
