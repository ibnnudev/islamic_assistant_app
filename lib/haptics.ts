/**
 * Trigger haptic feedback on supported devices
 */
export function triggerHaptic(pattern: 'light' | 'medium' | 'heavy' = 'light'): void {
    if (!('vibrate' in navigator)) {
        return;
    }

    const patterns = {
        light: 10,
        medium: 20,
        heavy: 30,
    };

    try {
        navigator.vibrate(patterns[pattern]);
    } catch (error) {
        console.warn('Haptic feedback not supported:', error);
    }
}

/**
 * Trigger a success haptic pattern
 */
export function triggerSuccessHaptic(): void {
    if ('vibrate' in navigator) {
        navigator.vibrate([10, 50, 10]);
    }
}

/**
 * Trigger an error haptic pattern
 */
export function triggerErrorHaptic(): void {
    if ('vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]);
    }
}

/**
 * Check if haptic feedback is available
 */
export function isHapticAvailable(): boolean {
    return 'vibrate' in navigator;
}
