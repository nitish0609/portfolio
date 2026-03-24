import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { GlitchHeader } from '../components/GlitchHeader';
import { useState, useRef, useEffect } from 'react';

/* ─── Animated counter ─── */
const AnimatedCounter = ({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <div ref={ref} className="text-center">
            <div className="font-display text-5xl md:text-6xl text-accent tabular-nums">{count}{suffix}</div>
            <div className="font-mono text-[10px] text-light-grey uppercase tracking-widest mt-2">{label}</div>
        </div>
    );
};

/* ─── Easter Egg: Konami-style secret message ─── */
const SecretMessage = () => {
    const [taps, setTaps] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const handleTap = () => {
        const next = taps + 1;
        setTaps(next);
        if (next >= 5) setRevealed(true);
    };

    return (
        <div className="absolute bottom-4 right-4 z-20">
            <div onClick={handleTap} className="cursor-pointer select-none">
                <span className="font-mono text-[10px] text-mid-grey/30 hover:text-mid-grey transition-colors">
                    {revealed ? '🤫 You found it: I debug in production sometimes' : '•'}
                </span>
            </div>
        </div>
    );
};

/* ─── Interest Card ─── */
const InterestCard = ({ title, icon, description, bgEffect, tags }: {
    title: string; icon: React.ReactNode; description: string;
    bgEffect: React.ReactNode; tags: string[];
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ y: -6, rotateX: 2, rotateY: -1 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="h-full p-8 md:p-10 bg-pure-black border border-mid-grey hover:border-accent transition-all duration-500 group relative overflow-hidden cursor-hover"
        >
            {/* Background effect on hover */}
            <AnimatePresence>
                {hovered && bgEffect}
            </AnimatePresence>

            <div className="relative z-10">
                <div className="mb-6">{icon}</div>
                <h3 className="font-display text-3xl md:text-4xl text-off-white mb-4 group-hover:text-accent transition-colors">{title}</h3>
                <p className="font-body text-base text-light-grey mb-6 leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                        <span key={t} className="font-mono text-[9px] text-accent/70 px-2 py-1 border border-accent/20 uppercase tracking-wider">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Ticker tape easter egg ─── */
const TickerTape = () => {
    const items = ['COFFEE_LEVEL: HIGH', '☕', 'COMMIT_STREAK: 147', '⚡', 'BUGS_SQUASHED: ∞', '🏎️', 'DARK_MODE_ONLY', '💻', 'AI_POWERED', '📸'];

    return (
        <div className="overflow-hidden py-4 border-y border-mid-grey/20 my-12 relative">
            <motion.div
                animate={{ x: [0, -1500] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="flex gap-12 whitespace-nowrap"
            >
                {[...items, ...items, ...items].map((item, i) => (
                    <span key={i} className="font-mono text-[10px] text-mid-grey uppercase tracking-widest">
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/* ─── Main About Section ─── */
export const About = () => {
    // Random code line easter egg
    const codeLines = useRef([
        'if (coffee.isEmpty()) { developer.crash(); }',
        'while(alive) { code(); sleep(maybe); }',
        '// TODO: become a morning person (never)',
        'git push --force // YOLO',
        'console.log("shipped at 3am, no regrets")',
    ]);
    const [codeIndex, setCodeIndex] = useState(0);

    return (
        <section id="about" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-dark-grey relative overflow-hidden">
            <SecretMessage />

            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <GlitchHeader title="CORE SYSTEMS" subtitle="Who_I_Am" />
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-12 border-y border-mid-grey/30">
                        <AnimatedCounter target={4} suffix="+" label="Years Coding" />
                        <AnimatedCounter target={10} suffix="+" label="Tech Stack" />
                        <AnimatedCounter target={500} suffix="+" label="Cups of Coffee" />
                        <AnimatedCounter target={1000} suffix="+" label="Photos Shot" />
                    </div>
                </ScrollReveal>

                {/* Interest Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    {/* AI & Code */}
                    <ScrollReveal>
                        <InterestCard
                            title="Code & AI"
                            icon={
                                <svg viewBox="0 0 48 48" className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <polyline points="16,12 4,24 16,36" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="32,12 44,24 32,36" strokeLinecap="round" strokeLinejoin="round" />
                                    <line x1="28" y1="8" x2="20" y2="40" strokeLinecap="round" />
                                </svg>
                            }
                            description="I live in the terminal. Building AI agents, writing full-stack apps, and automating everything that breathes. Code is not just work — it's how I think."
                            bgEffect={
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 font-mono text-xs text-accent/20 p-4 leading-relaxed pointer-events-none overflow-hidden"
                                >
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div key={i} animate={{ y: [20, -40], opacity: [0, 1, 0] }}
                                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
                                            {`const build_${i} = async () => { await ship() }`}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            }
                            tags={['AI Obsessed', 'Full-Stack', 'Always Shipping']}
                        />
                    </ScrollReveal>

                    {/* Cars & Photography */}
                    <ScrollReveal>
                        <InterestCard
                            title="Cars & Lens"
                            icon={
                                <svg viewBox="0 0 48 48" className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="8" y="14" width="32" height="22" rx="3" />
                                    <circle cx="24" cy="25" r="7" />
                                    <circle cx="24" cy="25" r="3" />
                                    <rect x="18" y="10" width="12" height="4" rx="1" />
                                </svg>
                            }
                            description="Cars are engineering as art. I shoot them to capture the lines, the light, and the soul that usually goes unnoticed. Low on edits, high on precision."
                            bgEffect={
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 pointer-events-none"
                                >
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div key={i} initial={{ x: '-100%' }} animate={{ x: '300%' }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: Math.random() * 1.5, ease: 'linear' }}
                                            className="absolute h-[2px] bg-accent/30 w-64 blur-[1px]"
                                            style={{ top: `${10 + i * 12}%` }} />
                                    ))}
                                </motion.div>
                            }
                            tags={['Automotive', 'Minimalism', 'Precision']}
                        />
                    </ScrollReveal>

                    {/* Coffee */}
                    <ScrollReveal>
                        <InterestCard
                            title="Coffee"
                            icon={
                                <svg viewBox="0 0 48 48" className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M8 20h24v16a6 6 0 01-6 6H14a6 6 0 01-6-6V20z" />
                                    <path d="M32 24h4a4 4 0 010 8h-4" />
                                    <path d="M14 12c0-2 2-4 2-6" strokeLinecap="round" />
                                    <path d="M20 12c0-2 2-4 2-6" strokeLinecap="round" />
                                    <path d="M26 12c0-2 2-4 2-6" strokeLinecap="round" />
                                </svg>
                            }
                            description="Not a personality trait, but close. Pour-over mornings, espresso debugging sessions, and late-night cold brews. The real fuel behind every commit."
                            bgEffect={
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 pointer-events-none flex justify-center items-end"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <motion.div key={i}
                                            initial={{ y: 50, opacity: 0, scale: 0.5 }}
                                            animate={{ y: -250, opacity: [0, 0.6, 0], scale: [0.5, 2, 4] }}
                                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: 'easeOut' }}
                                            className="absolute w-12 h-12 bg-accent/20 rounded-full blur-xl"
                                            style={{ left: `${10 + i * 10}%` }} />
                                    ))}
                                </motion.div>
                            }
                            tags={['Pour-Over', 'Espresso', 'Cold Brew']}
                        />
                    </ScrollReveal>
                </div>

                {/* Ticker tape easter egg */}
                <TickerTape />

                {/* Bio + clickable code line */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <ScrollReveal>
                        <div className="h-full p-10 md:p-12 bg-pure-black border border-mid-grey relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="font-body text-xl md:text-2xl text-off-white leading-relaxed mb-8">
                                    Based in Mumbai. I refuse to stop coding because that's what keeps the product vision real.
                                    I build tools that solve my own problems first.
                                </p>
                                <MagneticButton
                                    href="#connect"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-pure-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-off-white transition-colors"
                                >
                                    <span>Get in touch</span>
                                    <span>→</span>
                                </MagneticButton>
                            </div>
                            <div className="absolute -bottom-10 -right-10 font-display text-[12rem] text-mid-grey opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity uppercase">
                                Build
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Interactive console easter egg */}
                    <ScrollReveal>
                        <div className="h-full p-8 bg-pure-black border border-mid-grey relative overflow-hidden group">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                                <span className="font-mono text-[10px] text-mid-grey ml-2">nitish_console.sh</span>
                            </div>
                            <div className="font-mono text-xs text-light-grey/80 space-y-2 mb-6">
                                <p><span className="text-accent">$</span> whoami</p>
                                <p className="text-off-white pl-2">nitish — builder of things</p>
                                <p><span className="text-accent">$</span> cat interests.txt</p>
                                <p className="text-off-white pl-2">AI, full-stack dev, cars, photography, coffee</p>
                                <p><span className="text-accent">$</span> echo $MOOD</p>
                                <p className="text-off-white pl-2">caffeinated and shipping 🚀</p>
                            </div>

                            {/* Clickable rotating code line */}
                            <motion.div
                                onClick={() => setCodeIndex(i => (i + 1) % codeLines.current.length)}
                                className="flex items-center gap-2 px-3 py-2 bg-dark-grey border border-mid-grey/50 hover:border-accent/30 cursor-pointer transition-all group/line"
                                whileTap={{ scale: 0.97 }}
                            >
                                <span className="text-accent font-mono text-[10px]">{'>'}</span>
                                <motion.span
                                    key={codeIndex}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="font-mono text-[11px] text-light-grey group-hover/line:text-off-white transition-colors"
                                >
                                    {codeLines.current[codeIndex]}
                                </motion.span>
                                <span className="ml-auto font-mono text-[8px] text-mid-grey">click me</span>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};
