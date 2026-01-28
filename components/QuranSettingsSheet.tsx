'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Settings2, X, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';

export default function QuranSettingsSheet() {
    const { fontSize, fontStyle, setFontSize, setFontStyle } = useSettingsStore();
    const [open, setOpen] = React.useState(false);

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
                <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
                    <Settings2 className="w-5 h-5 text-foreground" />
                </button>
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                <DialogPrimitive.Content
                    className={cn(
                        "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                        "inset-x-0 bottom-0 border-t rounded-t-[32px] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom pb-10 safe-bottom"
                    )}
                >
                    <div className="flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <DialogPrimitive.Title className="text-lg font-semibold">
                                Reading Settings
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Close asChild>
                                <button className="p-2 -mr-2 rounded-full hover:bg-black/5 opacity-70 hover:opacity-100">
                                    <X className="w-5 h-5" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </DialogPrimitive.Close>
                        </div>

                        {/* Font Size Slider */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-muted flex items-center gap-2">
                                    <Type className="w-4 h-4" /> Font Size
                                </label>
                                <span className="text-sm font-semibold">{fontSize}px</span>
                            </div>

                            <SliderPrimitive.Root
                                className="relative flex w-full touch-none select-none items-center"
                                value={[fontSize]}
                                max={40}
                                min={18}
                                step={1}
                                onValueChange={(val) => setFontSize(val[0])}
                            >
                                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                                    <SliderPrimitive.Range className="absolute h-full bg-primary" />
                                </SliderPrimitive.Track>
                                <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md" />
                            </SliderPrimitive.Root>
                        </div>

                        {/* Font Style Toggle */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted">Font Style</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setFontStyle('uthmani')}
                                    className={cn(
                                        "px-4 py-3 rounded-xl border text-center transition-all",
                                        fontStyle === 'uthmani'
                                            ? "bg-primary/5 border-primary text-primary font-semibold"
                                            : "bg-transparent border-gray-200 text-muted hover:border-gray-300"
                                    )}
                                >
                                    Uthmani
                                    <span className="block text-2xl mt-1 font-[family-name:var(--font-arabic)]">بِسْمِ</span>
                                </button>
                                <button
                                    onClick={() => setFontStyle('indopak')}
                                    className={cn(
                                        "px-4 py-3 rounded-xl border text-center transition-all",
                                        fontStyle === 'indopak'
                                            ? "bg-primary/5 border-primary text-primary font-semibold"
                                            : "bg-transparent border-gray-200 text-muted hover:border-gray-300"
                                    )}
                                >
                                    IndoPak
                                    <span className="block text-2xl mt-1 font-serif">بِسْمِ</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
