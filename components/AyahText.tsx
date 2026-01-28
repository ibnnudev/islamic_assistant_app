'use client';


import { motion } from 'framer-motion';

interface AyahTextProps {
    number: number;
    text: string;
    index: number;
}

export default function AyahText({ number, text, index }: AyahTextProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="mb-6"
        >
            <div className="glass rounded-2xl p-6">
                {/* Ayah Number Badge */}
                <div className="flex justify-end mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                            {number}
                        </span>
                    </div>
                </div>

                {/* Arabic Text */}
                <p className="arabic text-foreground leading-loose">
                    {text}
                </p>
            </div>
        </motion.div>
    );
}
