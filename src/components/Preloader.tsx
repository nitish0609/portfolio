import { motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';

const BOOT_LINES = [
    '> INITIALIZING_SYSTEM...',
    '> LOADING_MODULES: [React, TypeScript, Framer]',
    '> MOUNTING_PORTFOLIO_v3.0...',
    '> COFFEE_LEVEL: OPTIMAL ☕',
    '> ALL_SYSTEMS_NOMINAL . NITISH.EXE READY',
];

const EmojiAnimation = ({ children }: { children: ReactNode }) => (
    <motion.span
        animate={{ 
            y: [0, -3, 0],
            scale: [1, 1.1, 1],
        }}
        transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
        style={{ display: 'inline-block', marginLeft: '4px' }}
    >
        {children}
    </motion.span>
);

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let lineIndex = 0;
        let p = 0;

        const interval = setInterval(() => {
            if (lineIndex < BOOT_LINES.length) {
                setBootLines(prev => [...prev, BOOT_LINES[lineIndex]]);
                lineIndex++;
            }
            p += 20;
            if (p <= 100) setProgress(p);
            
            if (lineIndex >= BOOT_LINES.length && p >= 100) {
                clearInterval(interval);
                onComplete();
            }
        }, 25);

        return () => clearInterval(interval);
    }, []); // Empty deps to keep it single-run and stable

    return (
        <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999] bg-pure-black flex items-center justify-center overflow-hidden"
        >
            <div className="w-full max-w-lg px-8 space-y-2">
                {bootLines.map((line, i) => {
                    if (!line) return null;
                    return (
                        <p
                            key={i}
                            className={`font-mono text-xs ${i === bootLines.length - 1 ? 'text-accent' : 'text-light-grey/60'}`}
                        >
                            {line.includes('☕') ? (
                                <>
                                    {line.replace('☕', '')}
                                    <EmojiAnimation>☕</EmojiAnimation>
                                </>
                            ) : (
                                line
                            )}
                        </p>
                    );
                })}

                <div className="mt-8 w-full h-[1px] bg-mid-grey/20">
                    <motion.div
                        className="h-full bg-accent"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <span className="font-mono text-[9px] text-mid-grey uppercase">System_Active</span>
                    <span className="font-mono text-[9px] text-accent">{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};
