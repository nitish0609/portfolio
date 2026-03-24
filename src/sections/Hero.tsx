import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const MagneticCharacter = ({ char }: { char: string; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < 150) {
                mouseX.set(distanceX * 0.3);
                mouseY.set(distanceY * 0.3);
            } else {
                mouseX.set(0);
                mouseY.set(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.span
            ref={ref}
            style={{ x: springX, y: springY, display: 'inline-block' }}
            className="select-none"
        >
            {char}
        </motion.span>
    );
};

export const Hero = () => {
    const [activeEffect, setActiveEffect] = useState<'none' | 'cars' | 'code' | 'coffee'>('none');
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
        hour12: false,
    });

    const firstCharArr = 'NITISH'.split('');
    const secondCharArr = 'PANDEY'.split('');

    const carsLines = useRef(
        [...Array(20)].map(() => ({
            top: Math.random() * 100,
            delay: Math.random() * 0.4,
        }))
    );

    const codeTraces = useRef(
        [...Array(20)].map(() => ({
            marginLeft: Math.random() * 80,
            marginTop: Math.random() * 5,
            delay: Math.random() * 4,
        }))
    );

    const coffeeSteam = useRef(
        [...Array(15)].map(() => ({
            left: Math.random() * 100,
            x: Math.random() * 100 - 50,
            delay: Math.random() * 5,
        }))
    );

    return (
        <section
            id="hero"
            className="min-h-[85svh] md:min-h-screen flex flex-col justify-start md:items-center md:justify-center pt-20 md:pt-0 px-6 md:px-12 relative overflow-hidden bg-pure-black"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {activeEffect === 'cars' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0"
                        >
                            {carsLines.current.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '300%' }}
                                    transition={{
                                        duration: 0.3,
                                        repeat: Infinity,
                                        delay: line.delay,
                                        ease: 'linear',
                                    }}
                                    className="absolute h-[1px] bg-accent/30 w-96 shadow-[0_0_10px_rgba(191,255,0,0.5)]"
                                    style={{ top: `${line.top}%` }}
                                />
                            ))}
                        </motion.div>
                    )}

                    {activeEffect === 'code' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 font-mono text-[10px] text-accent/20 p-12 leading-tight z-0"
                        >
                            {codeTraces.current.map((trace, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        x: [0, 20, 0],
                                        opacity: [0.1, 0.4, 0.1],
                                        y: [0, 10, 0],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, delay: trace.delay }}
                                    className="mb-2 whitespace-nowrap"
                                    style={{
                                        marginLeft: `${trace.marginLeft}%`,
                                        marginTop: `${trace.marginTop}%`,
                                    }}
                                >
                                    {`system_trace >> node_${i}: OK [0x${Math.random().toString(16).slice(2, 6)}]`}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeEffect === 'coffee' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex justify-center items-end z-0"
                        >
                            {coffeeSteam.current.map((steam, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                    animate={{
                                        y: -1000,
                                        opacity: [0, 0.5, 0],
                                        x: [steam.x, -steam.x, steam.x],
                                        scale: [1, 3, 5],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: steam.delay,
                                        ease: 'easeOut',
                                    }}
                                    className="absolute w-40 h-40 bg-accent/5 rounded-full blur-[80px]"
                                    style={{ left: `${steam.left}%` }}
                                />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Unified Responsive Header */}
            <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 z-20 pointer-events-none flex flex-row items-center justify-between">
                {/* Left Side: Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 border border-accent/20 md:border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm w-fit pointer-events-auto"
                >
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-accent" />
                    </span>
                    <span className="font-mono text-[8px] md:text-[10px] text-accent uppercase tracking-widest whitespace-nowrap">
                        Available <span className="hidden md:inline">for work</span>
                    </span>
                </motion.div>

                {/* Right Side: Clock + Location (Clock only on mobile/tablet, Both on desktop) */}
                <div className="flex flex-col items-end gap-0.5 md:gap-1 mr-12 lg:mr-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="font-mono text-base md:text-3xl text-accent tabular-nums opacity-60 md:opacity-80"
                    >
                        {istTime}
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="hidden md:block font-mono text-[10px] text-mid-grey uppercase tracking-[0.3em] whitespace-nowrap"
                    >
                        Node_Mumbai_IN
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl">
                {/* Personality Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 md:mb-12 flex items-center relative z-20"
                >
                    <div className="flex gap-4 font-mono text-tiny text-light-grey tracking-widest uppercase items-center">
                        <motion.span
                            onMouseEnter={() => setActiveEffect('cars')}
                            onMouseLeave={() => setActiveEffect('none')}
                            className={`${activeEffect === 'cars' ? 'text-accent' : 'text-light-grey'} transition-colors cursor-hover py-2`}
                        >
                            Cars
                        </motion.span>
                        <span className="opacity-30">×</span>
                        <motion.span
                            onMouseEnter={() => setActiveEffect('code')}
                            onMouseLeave={() => setActiveEffect('none')}
                            className={`${activeEffect === 'code' ? 'text-accent' : 'text-light-grey'} transition-colors cursor-hover py-2`}
                        >
                            Code
                        </motion.span>
                        <span className="opacity-30">×</span>
                        <motion.span
                            onMouseEnter={() => setActiveEffect('coffee')}
                            onMouseLeave={() => setActiveEffect('none')}
                            className={`${activeEffect === 'coffee' ? 'text-accent' : 'text-light-grey'} transition-colors cursor-hover py-2`}
                        >
                            Coffee
                        </motion.span>
                    </div>
                </motion.div>

                {/* Massive Kinetic Typography */}
                <div className="mb-3 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-7xl sm:text-8xl md:text-8xl lg:text-[10rem] xl:text-[14rem] leading-none text-off-white flex gap-2 md:gap-4 overflow-visible"
                    >
                        {firstCharArr.map((c, i) => (
                            <MagneticCharacter key={i} char={c} index={i} />
                        ))}
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display text-7xl sm:text-8xl md:text-8xl lg:text-[10rem] xl:text-[14rem] leading-none text-outline ml-0 md:ml-4 lg:ml-24 flex gap-2 md:gap-4 overflow-visible"
                    >
                        {secondCharArr.map((c, i) => (
                            <MagneticCharacter key={i} char={c} index={i} />
                        ))}
                    </motion.h1>
                </div>

                {/* Human Copy */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-start md:items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p className="font-body text-2xl md:text-3xl text-off-white leading-tight font-light max-w-xl">
                                Build AI products, optimize architectures, shoot cars for fun, and take my coffee{' '}
                                <span className="italic text-accent">way</span> too seriously.
                            </p>
                        </motion.div>
    
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-col gap-4 md:gap-6"
                        >
                            <p className="font-mono text-sm text-light-grey leading-relaxed max-w-md">
                                Building AI-driven products and heavily pushing code daily. For my formal professional history as a Technical Product Manager, you can <a href="https://www.linkedin.com/in/nitish-pandey-70a21016a/" target="_blank" rel="noreferrer" className="text-accent hover:underline">check my LinkedIn</a>. Currently open to collaborate on cool projects.
                            </p>

                        <div className="flex gap-6 mt-1 md:mt-0">
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] text-mid-grey uppercase tracking-widest">
                                    Stack
                                </span>
                                <span className="font-mono text-[10px] text-off-white">M.E.R.N</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] text-mid-grey uppercase tracking-widest">
                                    Focus
                                </span>
                                <span className="font-mono text-[10px] text-off-white">AI Products</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] text-mid-grey uppercase tracking-widest">
                                    Base
                                </span>
                                <span className="font-mono text-[10px] text-off-white">Mumbai</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* System Status + Scroll CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-6 md:mt-24 flex justify-between items-center border-t border-mid-grey/30 pt-4 md:pt-8"
                >
                    <div className="font-mono text-[10px] text-mid-grey flex items-center gap-4">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        SYSTEM_ACTIVE / MEMORY_READY
                    </div>

                    {/* Scroll Down CTA */}
                    <motion.button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex flex-col items-center gap-2 group cursor-hover"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="font-mono text-[10px] text-light-grey uppercase tracking-widest group-hover:text-accent transition-colors">
                            Scroll
                        </span>
                        <ChevronDown className="w-4 h-4 text-accent" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
