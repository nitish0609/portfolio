import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const MagneticCharacter = ({ char }: { char: string, index: number }) => {
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
        hour12: false
    });

    const firstCharArr = "NITISH".split("");
    const secondCharArr = "PANDEY".split("");

    // Stabilize random positions to prevent jumping on every re-render (since clock updates every second)
    const carsLines = useRef([...Array(20)].map(() => ({
        top: Math.random() * 100,
        delay: Math.random() * 0.4
    })));

    const codeTraces = useRef([...Array(20)].map(() => ({
        marginLeft: Math.random() * 80,
        marginTop: Math.random() * 5,
        delay: Math.random() * 4
    })));

    const coffeeSteam = useRef([...Array(15)].map(() => ({
        left: Math.random() * 100,
        x: Math.random() * 100 - 50,
        delay: Math.random() * 5
    })));

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden bg-pure-black">
            {/* Global Background Effects layer - Moved to top for depth */}
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
                                        ease: "linear"
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
                                        y: [0, 10, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, delay: trace.delay }}
                                    className="mb-2 whitespace-nowrap"
                                    style={{
                                        marginLeft: `${trace.marginLeft}%`,
                                        marginTop: `${trace.marginTop}%`
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
                                        scale: [1, 3, 5]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: steam.delay,
                                        ease: "easeOut"
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

            {/* Real-time clock - absolute info layer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute top-8 right-8 md:right-12 z-20 pointer-events-none"
            >
                <div className="text-right">
                    <div className="font-mono text-[10px] text-mid-grey uppercase tracking-[0.3em] mb-1">
                        Node_Mumbai_IN
                    </div>
                    <div className="font-mono text-3xl text-accent tabular-nums opacity-60">
                        {istTime}
                    </div>
                </div>
            </motion.div>
            <div className="relative z-10 w-full max-w-7xl">
                {/* Personality Tagline with Global Vibe Sync */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex items-center relative z-20"
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
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-7xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none text-off-white flex gap-2 md:gap-4 overflow-visible"
                    >
                        {firstCharArr.map((c, i) => (
                            <MagneticCharacter key={i} char={c} index={i} />
                        ))}
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display text-7xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none text-outline ml-0 md:ml-24 flex gap-2 md:gap-4 overflow-visible"
                    >
                        {secondCharArr.map((c, i) => (
                            <MagneticCharacter key={i} char={c} index={i} />
                        ))}
                    </motion.h1>
                </div>

                {/* Human Copy - No Corporate Jargon */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p className="font-body text-2xl md:text-3xl text-off-white leading-tight font-light max-w-xl">
                            Build AI products, write code daily, shoot cars for fun, and take my coffee <span className="italic text-accent">way</span> too seriously.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        <p className="font-mono text-sm text-light-grey leading-relaxed max-w-md">
                            I lead the digital roadmap at The Hosteller by day, and push code by night. Currently open to collaborate on cool projects.
                        </p>

                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-mid-grey uppercase tracking-widest">Stack</span>
                                <span className="font-mono text-xs text-off-white">M.E.R.N</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-mid-grey uppercase tracking-widest">Focus</span>
                                <span className="font-mono text-xs text-off-white">AI Products</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-mid-grey uppercase tracking-widest">Base</span>
                                <span className="font-mono text-xs text-off-white">Mumbai</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tech indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-24 flex justify-between items-center border-t border-mid-grey/30 pt-8"
                >
                    <div className="font-mono text-[10px] text-mid-grey flex items-center gap-4">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        SYSTEM_ACTIVE / MEMORY_READY
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
