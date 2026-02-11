import { motion } from 'framer-motion';
import { TextScramble } from '../components/TextScramble';
import { useEffect, useState } from 'react';

export const Hero = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const istTime = time.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return (
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#FAFAFA 1px, transparent 1px), linear-gradient(90deg, #FAFAFA 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Real-time clock - top right */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-8 right-8 md:right-12"
            >
                <div className="text-right">
                    <div className="font-mono text-tiny text-mid-grey uppercase tracking-widest mb-1">
                        Mumbai, India
                    </div>
                    <div className="font-mono text-2xl text-accent tabular-nums">
                        {istTime}
                    </div>
                </div>
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl">
                {/* Small tag */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="font-mono text-tiny text-light-grey tracking-widest uppercase">
                        Cars × Code × Coffee
                    </span>
                </motion.div>

                {/* Massive name - experimental layout */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display text-huge md:text-[12rem] lg:text-[14rem] leading-none text-off-white"
                    >
                        <TextScramble text="NITISH" />
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-display text-huge md:text-[12rem] lg:text-[14rem] leading-none text-outline ml-0 md:ml-12"
                    >
                        PANDEY
                    </motion.h1>
                </div>

                {/* Tagline - FUN AND PERSONALITY */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="max-w-3xl"
                >
                    <p className="font-body text-xl md:text-2xl text-off-white leading-relaxed mb-4">
                        I build AI products, write code daily, shoot cars for fun, and take my coffee <span className="italic">way</span> too seriously.
                    </p>
                    <p className="font-body text-lg text-light-grey leading-relaxed mb-8">
                        Mumbai-based TPM who refuses to stop coding. That's just how I roll.
                    </p>

                    <div className="flex flex-wrap gap-4 font-mono text-tiny text-light-grey uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                            Available for cool projects
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-off-white rounded-full" />
                            Currently vibing in Mumbai
                        </span>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
};
