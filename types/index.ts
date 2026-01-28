export interface Location {
    latitude: number;
    longitude: number;
}

export interface PrayerTime {
    name: string;
    time: Date;
    arabicName: string;
}

export interface PrayerTimes {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
    date: Date;
}

export interface Surah {
    number: number;
    name: string;
    arabicName: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    surah: number;
}

export interface TasbihState {
    count: number;
    target: number;
    lastUpdated: Date;
}

export interface QiblaData {
    direction: number;
    distance: number;
}

export type TabRoute = 'home' | 'quran' | 'kiblat' | 'tasbih';
