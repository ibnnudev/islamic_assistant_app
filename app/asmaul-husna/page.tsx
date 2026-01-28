'use client';

import { motion } from 'framer-motion';

const NAMES = [
    { id: 1, name: 'Ar-Rahman', arabic: 'الرحمن', meaning: 'Maha Pengasih' },
    { id: 2, name: 'Ar-Rahim', arabic: 'الرحيم', meaning: 'Maha Penyayang' },
    { id: 3, name: 'Al-Malik', arabic: 'الملك', meaning: 'Maha Merajai' },
    { id: 4, name: 'Al-Quddus', arabic: 'القدوس', meaning: 'Maha Suci' },
    { id: 5, name: 'As-Salam', arabic: 'السلام', meaning: 'Maha Penyelamat' },
    { id: 6, name: 'Al-Mu\'min', arabic: 'المؤمن', meaning: 'Maha Pemberi Keamanan' },
    { id: 7, name: 'Al-Muhaimin', arabic: 'المهيمن', meaning: 'Maha Pemelihara' },
    { id: 8, name: 'Al-Aziz', arabic: 'العزيز', meaning: 'Maha Perkasa' },
    { id: 9, name: 'Al-Jabbar', arabic: 'الجبار', meaning: 'Maha Berkehendak' },
    { id: 10, name: 'Al-Mutakabbir', arabic: 'المتكber', meaning: 'Maha Megah' },
];

export default function AsmaulHusnaPage() {
    return (
        <div className="p-6 space-y-8 pb-32">
            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-primary uppercase italic">Asmaul Husna</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    The 99 Beautiful Names of Allah (SWT)
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {NAMES.map((name, index) => (
                    <motion.div
                        key={name.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col items-center justify-center p-6 bg-card border rounded-3xl text-center space-y-4 shadow-sm hover:shadow-md transition-all active:scale-95 group"
                    >
                        <div className="text-4xl font-arabic text-primary mb-2 group-hover:scale-110 transition-transform">
                            {name.arabic}
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-sm tracking-tight">{name.name}</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                                {name.meaning}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
