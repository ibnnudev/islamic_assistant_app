import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes } from 'adhan';
import type { Location, PrayerTimes, PrayerTime } from '@/types';

/**
 * Calculate prayer times for a given location and date
 */
export function calculatePrayerTimes(location: Location, date: Date = new Date()): PrayerTimes {
    const coordinates = new Coordinates(location.latitude, location.longitude);
    const params = CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);

    return {
        fajr: prayerTimes.fajr,
        sunrise: prayerTimes.sunrise,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
        date: date,
    };
}

/**
 * Get the next prayer time from current time
 */
export function getNextPrayer(prayerTimes: PrayerTimes, currentTime: Date = new Date()): PrayerTime | null {
    const prayers: PrayerTime[] = [
        { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
        { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
        { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
        { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
        { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' },
    ];

    // Find the next prayer
    for (const prayer of prayers) {
        if (prayer.time > currentTime) {
            return prayer;
        }
    }

    // If no prayer found today, return Fajr of tomorrow
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayers = calculatePrayerTimes(
        { latitude: 0, longitude: 0 }, // Will be replaced with actual location
        tomorrow
    );

    return {
        name: 'Fajr',
        time: tomorrowPrayers.fajr,
        arabicName: 'الفجر',
    };
}

/**
 * Get current prayer (the last prayer that has passed)
 */
export function getCurrentPrayer(prayerTimes: PrayerTimes, currentTime: Date = new Date()): PrayerTime | null {
    const prayers: PrayerTime[] = [
        { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
        { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
        { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
        { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
        { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' },
    ];

    // Find the current prayer (last one that has passed)
    for (let i = prayers.length - 1; i >= 0; i--) {
        if (prayers[i].time <= currentTime) {
            return prayers[i];
        }
    }

    return null;
}

/**
 * Format time remaining until next prayer
 */
export function formatTimeRemaining(targetTime: Date, currentTime: Date = new Date()): string {
    const diff = targetTime.getTime() - currentTime.getTime();

    if (diff <= 0) {
        return 'Now';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

/**
 * Format prayer time to readable string
 */
export function formatPrayerTime(time: Date): string {
    return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

/**
 * Get all prayers as array
 */
export function getPrayersArray(prayerTimes: PrayerTimes): PrayerTime[] {
    return [
        { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
        { name: 'Sunrise', time: prayerTimes.sunrise, arabicName: 'الشروق' },
        { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
        { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
        { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
        { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' },
    ];
}
