import type { Location } from '@/types';

/**
 * Get user's current location using Geolocation API
 */
export async function getUserLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            // Fallback to Mecca coordinates
            resolve({ latitude: 21.4225, longitude: 39.8262 });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.warn('Geolocation error:', error);
                // Fallback to Mecca coordinates
                resolve({ latitude: 21.4225, longitude: 39.8262 });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    });
}

/**
 * Mock location for testing (Jakarta, Indonesia)
 */
export const MOCK_LOCATION: Location = {
    latitude: -6.2088,
    longitude: 106.8456,
};

/**
 * Check if geolocation is available
 */
export function isGeolocationAvailable(): boolean {
    return 'geolocation' in navigator;
}
