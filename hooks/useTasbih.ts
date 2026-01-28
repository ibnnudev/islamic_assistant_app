'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TasbihState } from '@/types';
import { triggerHaptic, triggerSuccessHaptic } from '@/lib/haptics';

const STORAGE_KEY = 'sakinah_tasbih_state';
const MILESTONES = [33, 99, 100];

export function useTasbih() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);
    const [isComplete, setIsComplete] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const state: TasbihState = JSON.parse(stored);
                setCount(state.count);
                setTarget(state.target);
            } catch (err) {
                console.error('Failed to load tasbih state:', err);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        const state: TasbihState = {
            count,
            target,
            lastUpdated: new Date(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [count, target]);

    // Check if milestone reached
    useEffect(() => {
        if (MILESTONES.includes(count)) {
            triggerSuccessHaptic();
            setIsComplete(true);
            setTimeout(() => setIsComplete(false), 2000);
        }
    }, [count]);

    const increment = useCallback(() => {
        setCount(prev => prev + 1);
        triggerHaptic('light');
    }, []);

    const reset = useCallback(() => {
        setCount(0);
        triggerHaptic('medium');
    }, []);

    const setCustomTarget = useCallback((newTarget: number) => {
        setTarget(newTarget);
    }, []);

    const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0;

    return {
        count,
        target,
        progress,
        isComplete,
        increment,
        reset,
        setCustomTarget,
    };
}
