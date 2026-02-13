import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchHeader } from '../components/GlitchHeader';
import { useState, useRef } from 'react';

const VibeCard = () => {
    const [activeVibe, setActiveVibe] = useState<'none' | 'cars' | 'code' | 'coffee'>('none');

    // Stabilizer for random values to prevent jitter on re-renders
    const randomVals = useRef({
        cars: [...Array(6)].map(() => ({ top: 15 + Math.random() * 70, delay: Math.random() * 0.5 })),
        code: [...Array(10)].map(() => ({ delay: Math.random() * 2 })),
        coffee: [...Array(6)].map(() => ({ left: 20 + Math.random() * 60, x: Math.random() * 40 - 20, delay: Math.random() * 2 }))
    });

    return (
        <div
            className="h-full p-10 bg-dark-grey border border-mid-grey relative overflow-hidden group flex flex-col justify-between"
            onMouseLeave={() => setActiveVibe('none')}
        >
            {/* Background Effects */}
            <AnimatePresence>
                {activeVibe === 'cars' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {randomVals.current.cars.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: '-100%' }}
                                animate={{ x: '200%' }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    delay: line.delay,
                                    ease: "linear"
                                }}
                                className="absolute h-[1px] bg-accent/20 w-32"
                                style={{ top: `${line.top}%` }}
                            />
                        ))}
                    </motion.div>
                )}

                {activeVibe === 'code' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 font-mono text-[8px] text-accent/10 p-4 leading-tight pointer-events-none overflow-hidden"
                    >
                        {randomVals.current.code.map((code, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: code.delay }}
                            >
                                {`0x${(i * 12345).toString(16).slice(0, 8)} >> init_stream_${i}`}
                                <br />
                                {`system_node_active: true (v1.0.${i})`}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {activeVibe === 'coffee' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none flex justify-center items-end pb-8"
                    >
                        {randomVals.current.coffee.map((steam, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0, scale: 0.5 }}
                                animate={{
                                    y: -200,
                                    opacity: [0, 0.4, 0],
                                    x: [0, steam.x, 0],
                                    scale: [0.5, 1.5, 2]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: steam.delay,
                                    ease: "easeOut"
                                }}
                                className="absolute w-12 h-12 bg-accent/10 rounded-full blur-xl"
                                style={{ left: `${steam.left}%` }}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10">
                <span className="font-mono text-tiny text-light-grey uppercase tracking-widest block mb-6 opacity-60">The Vibe</span>
                <div className="space-y-4">
                    {['Cars', 'Code', 'Coffee'].map((vibe) => (
                        <motion.h4
                            key={vibe}
                            onMouseEnter={() => setActiveVibe(vibe.toLowerCase() as any)}
                            className="font-display text-4xl text-off-white hover:text-accent cursor-default transition-colors"
                            whileHover={{ x: 10 }}
                        >
                            {vibe}
                        </motion.h4>
                    ))}
                </div>
            </div>

            <div className="relative z-10 mt-8">
                <p className="font-mono text-[10px] text-light-grey leading-tight">
                    [ SHIFT_GEARS ]<br />
                    [ PUSH_COMMITS ]<br />
                    [ BREW_REPEAT ]
                </p>
            </div>
        </div>
    );
};

export const About = () => {
    return (
        <section id="about" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-dark-grey relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <GlitchHeader title="CORE SYSTEMS" subtitle="Architecture_v1.0" />
                </ScrollReveal>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    {/* 01: Product & Strategy */}
                    <ScrollReveal>
                        <motion.div
                            whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="h-full p-10 bg-pure-black border border-mid-grey hover:border-accent transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-500">📈</span>
                                <h3 className="font-display text-4xl text-off-white mb-4">Product</h3>
                                <p className="font-body text-lg text-light-grey mb-8">
                                    I lead the digital roadmap at The Hosteller, figuring out what users actually need and how we can build it without the fluff.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Roadmaps', 'Discovery', 'PRDs', 'Stakeholder Management', 'Agile'].map(s => (
                                        <span key={s} className="font-mono text-[10px] text-light-grey px-2 py-1 bg-dark-grey border border-mid-grey/50">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>

                    {/* 02: Dev & AI Mix */}
                    <ScrollReveal>
                        <motion.div
                            whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="h-full p-10 bg-dark-grey border border-mid-grey hover:border-accent transition-all duration-500 group relative"
                        >
                            <div className="relative z-10">
                                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-500">💻</span>
                                <h3 className="font-display text-4xl text-off-white mb-4">Engineering</h3>
                                <p className="font-body text-lg text-light-grey mb-8">
                                    I still write code every single day. Full-stack development mixed with a deep dive into orchestrated AI systems.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['MERN Stack', 'AI Agentic Workflows', 'AWS/Cloud', 'System Design', 'DevOps', 'LangChain'].map(s => (
                                        <span key={s} className="font-mono text-[10px] text-light-grey px-2 py-1 bg-pure-black border border-mid-grey/30">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>

                    {/* 03: Photography */}
                    <ScrollReveal>
                        <motion.div
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="h-full p-10 bg-pure-black border border-mid-grey hover:border-accent transition-all duration-500 group"
                        >
                            <div className="relative z-10">
                                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-500">📸</span>
                                <h3 className="font-display text-4xl text-off-white mb-4">Lens</h3>
                                <p className="font-body text-lg text-light-grey mb-8">
                                    When I'm not behind a screen, I'm usually behind a camera shooting cars. It's how I balance the logic of code with something visual.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Automotive', 'Minimalism', 'Lighting', 'Precision'].map(s => (
                                        <span key={s} className="font-mono text-[10px] text-accent/70 px-2 py-1 border border-accent/20">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>

                    {/* Bio & Vibe - Span 3x1 on mobile, split on desktop */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4">

                        {/* 04: Refined Bio - Now 2/3 on desktop */}
                        <ScrollReveal className="md:col-span-2">
                            <div className="h-full p-10 md:p-12 bg-pure-black border border-mid-grey relative overflow-hidden group">
                                <div className="max-w-4xl relative z-10">
                                    <p className="font-body text-xl md:text-2xl text-off-white leading-relaxed">
                                        Based in Mumbai, I refuse to stop coding because that's what keeps the product vision real.
                                        I build tools that solve my own problems first.
                                    </p>
                                    <div className="mt-8 flex flex-col md:flex-row gap-6 md:items-center">
                                        <p className="font-body text-sm text-light-grey flex-1">
                                            I've found that the best products are built when the person leading them isn't afraid to dive into the code. I'm available for projects that need both a steady hand and a creative eye.
                                        </p>
                                        <MagneticButton
                                            href="#connect"
                                            className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-pure-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-off-white transition-colors h-fit"
                                        >
                                            <span>Get in touch</span>
                                            <span>→</span>
                                        </MagneticButton>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 font-display text-[12rem] text-mid-grey opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity uppercase">
                                    Execution
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 05: The "Vibe" Card - Interactive Accents */}
                        <ScrollReveal>
                            <VibeCard />
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};
