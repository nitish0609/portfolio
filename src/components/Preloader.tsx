import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<'boot' | 'name' | 'exit'>('boot');
    const [progress, setProgress] = useState(0);
    const [bootLines, setBootLines] = useState<string[]>([]);

    const lines = [
        '> INITIALIZING_SYSTEM...',
        '> LOADING_MODULES: [React, TypeScript, Framer]',
        '> MOUNTING_PORTFOLIO_v3.0...',
        '> COFFEE_LEVEL: OPTIMAL ☕',
        '> ALL_SYSTEMS_NOMINAL — NITISH.EXE READY',
    ];

    useEffect(() => {
        let lineIndex = 0;
        let prog = 0;

        const lineInterval = setInterval(() => {
            if (lineIndex < lines.length) {
                setBootLines(prev => [...prev, lines[lineIndex]]);
                lineIndex++;
            }
        }, 150);

        const progressInterval = setInterval(() => {
            prog += 8;
            setProgress(Math.min(prog, 100));
            if (prog >= 100) {
                clearInterval(progressInterval);
            }
        }, 40);

        const timer = setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 500);
        }, 1100);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'exit' ? (
                <motion.div
                    key="preloader"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[999] bg-pure-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Grid bg */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(191,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(191,255,0,1) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Boot phase */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="boot"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-lg px-8 space-y-2"
                        >
                            {bootLines.map((line, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`font-mono text-xs ${i === bootLines.length - 1 ? 'text-accent' : 'text-light-grey/60'} leading-relaxed`}
                                >
                                    {line}
                                </motion.p>
                            ))}

                            {/* Progress bar */}
                            <div className="mt-8 w-full h-[1px] bg-mid-grey/50">
                                <motion.div
                                    className="h-full bg-accent"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.05 }}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="font-mono text-[10px] text-mid-grey uppercase tracking-widest">Loading</span>
                                <span className="font-mono text-[10px] text-accent tabular-nums">{progress}%</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
