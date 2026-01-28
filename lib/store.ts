import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Audio Player Store
interface AudioTrack {
    id: string;
    url: string;
    title: string;
    artist?: string;
}

interface AudioState {
    isPlaying: boolean;
    currentTrack: AudioTrack | null;
    showPlayer: boolean;
    play: (track: AudioTrack) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    close: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
    isPlaying: false,
    currentTrack: null,
    showPlayer: false,
    play: (track) => set({ isPlaying: true, currentTrack: track, showPlayer: true }),
    pause: () => set({ isPlaying: false }),
    resume: () => set({ isPlaying: true }),
    stop: () => set({ isPlaying: false, currentTrack: null, showPlayer: false }),
    close: () => set({ showPlayer: false }), // Keep playing but hide (audio stops in this simple logic, or purely hide UI)
}));

// Settings Store (Persisted)
interface SettingsState {
    fontSize: number;
    fontStyle: 'uthmani' | 'indopak';
    setFontSize: (size: number) => void;
    setFontStyle: (style: 'uthmani' | 'indopak') => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            fontSize: 24, // Default px
            fontStyle: 'uthmani',
            setFontSize: (size) => set({ fontSize: size }),
            setFontStyle: (style) => set({ fontStyle: style }),
        }),
        {
            name: 'sakinah-settings-storage',
        }
    )
);

// Search Store
interface SearchState {
    isOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    isOpen: false,
    openSearch: () => set({ isOpen: true }),
    closeSearch: () => set({ isOpen: false }),
}));
