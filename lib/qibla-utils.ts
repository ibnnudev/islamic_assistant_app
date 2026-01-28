import type { Location, QiblaData } from '@/types';

/**
 * Kaaba coordinates in Mecca
 */
export const KAABA_LOCATION: Location = {
    latitude: 21.4225,
    longitude: 39.8262,
};

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
function toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

/**
 * Calculate the bearing (direction) from one location to another using Haversine formula
 */
export function calculateQiblaDirection(userLocation: Location): number {
    const lat1 = toRadians(userLocation.latitude);
    const lon1 = toRadians(userLocation.longitude);
    const lat2 = toRadians(KAABA_LOCATION.latitude);
    const lon2 = toRadians(KAABA_LOCATION.longitude);

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = toDegrees(Math.atan2(y, x));

    // Normalize to 0-360
    bearing = (bearing + 360) % 360;

    return bearing;
}

/**
 * Calculate distance to Kaaba in kilometers
 */
export function calculateDistanceToKaaba(userLocation: Location): number {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = toRadians(userLocation.latitude);
    const lon1 = toRadians(userLocation.longitude);
    const lat2 = toRadians(KAABA_LOCATION.latitude);
    const lon2 = toRadians(KAABA_LOCATION.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Get Qibla data (direction and distance)
 */
export function getQiblaData(userLocation: Location): QiblaData {
    return {
        direction: calculateQiblaDirection(userLocation),
        distance: calculateDistanceToKaaba(userLocation),
    };
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
    return ((angle % 360) + 360) % 360;
}

/**
 * Check if device is aligned with Qibla (within tolerance)
 */
export function isAlignedWithQibla(
    deviceHeading: number,
    qiblaDirection: number,
    tolerance: number = 5
): boolean {
    const diff = Math.abs(normalizeAngle(deviceHeading) - normalizeAngle(qiblaDirection));
    return diff <= tolerance || diff >= 360 - tolerance;
}
