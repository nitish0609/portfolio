import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Mastery', href: '#mastery' },
    { label: 'Playground', href: '#playground' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Connect', href: '#connect' },
];

export const Navigation = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
            // Find active section
            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (const id of sections.reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNav = (href: string) => {
        setOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Desktop nav — top right pill */}
            <motion.nav
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-500 ${scrolled
                    ? 'bg-pure-black/90 border-mid-grey/60 backdrop-blur-md shadow-[0_0_30px_rgba(191,255,0,0.06)]'
                    : 'bg-transparent border-transparent'
                    }`}
            >
                {navLinks.map(link => (
                    <button
                        key={link.href}
                        onClick={() => handleNav(link.href)}
                        className={`font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 cursor-hover ${activeSection === link.href.replace('#', '')
                            ? 'text-pure-black bg-accent'
                            : 'text-light-grey hover:text-off-white hover:bg-mid-grey/40'
                            }`}
                    >
                        {link.label}
                    </button>
                ))}
            </motion.nav>

            {/* Mobile hamburger */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setOpen(v => !v)}
                className="fixed top-6 right-6 z-[200] md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] cursor-hover group"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="block w-6 h-[1.5px] bg-off-white origin-center"
                />
                <motion.span
                    animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="block w-4 h-[1.5px] bg-accent origin-center self-end"
                />
                <motion.span
                    animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="block w-6 h-[1.5px] bg-off-white origin-center"
                />
            </motion.button>

            {/* Mobile full-screen menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[150] bg-pure-black flex flex-col items-start justify-center px-10 md:hidden"
                    >
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(191,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(191,255,0,1) 1px, transparent 1px)',
                                backgroundSize: '60px 60px',
                            }}
                        />
                        <div className="relative z-10 space-y-2 w-full">
                            <p className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] mb-8">Navigation</p>
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07 + 0.1 }}
                                    onClick={() => handleNav(link.href)}
                                    className="block w-full text-left font-display text-5xl text-off-white hover:text-accent transition-colors py-2 cursor-hover"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-10 left-10 font-mono text-[10px] text-mid-grey uppercase tracking-widest"
                        >
                            Cars × Code × Coffee
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
