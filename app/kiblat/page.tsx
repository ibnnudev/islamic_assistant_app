'use client';

import { useQibla } from '@/hooks/useQibla';
import Compass from '@/components/qibla/Compass';

export default function QiblaPage() {
    const { location, loading, error } = useQibla();

    return (
        <div className="p-6 space-y-8 pb-32">
            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-primary uppercase italic">Qibla Finder</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Locate the direction of the Kaaba (Mecca) from your current position.
                </p>
            </div>

            <div className="flex justify-center py-4">
                {loading ? (
                    <div className="w-72 h-72 rounded-full bg-muted animate-pulse" />
                ) : error ? (
                    <div className="text-center p-8 border border-destructive/20 bg-destructive/5 rounded-3xl">
                        <p className="text-destructive font-medium">{error}</p>
                        <p className="text-xs text-muted-foreground mt-2">Please ensure location services are enabled.</p>
                    </div>
                ) : (
                    <Compass userLocation={location} />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Latitude</span>
                    <p className="font-mono text-sm">{location?.latitude.toFixed(4) || '--'}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Longitude</span>
                    <p className="font-mono text-sm">{location?.longitude.toFixed(4) || '--'}</p>
                </div>
            </div>
        </div>
    );
}
