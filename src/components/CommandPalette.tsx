import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Search, Clock, Zap, MapPin } from 'lucide-react';

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };

        const timer = setInterval(() => setTime(new Date()), 1000);

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(timer);
        };
    }, []);

    const istTime = time.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const suggestions = [
        { label: 'Jump to Hero', id: 'hero' },
        { label: 'What I Actually Do', id: 'about' },
        { label: 'The Automotive Gallery', id: 'gallery' },
        { label: 'Drop a Message', id: 'connect' },
    ];

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[10000] bg-pure-black/80 backdrop-blur-sm cursor-pointer"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[10001] p-4"
                    >
                        <div className="bg-dark-grey border border-mid-grey shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-mid-grey flex items-center gap-3">
                                <Search className="w-5 h-5 text-light-grey" />
                                <input
                                    autoFocus
                                    placeholder="Type to navigate..."
                                    className="bg-transparent border-none outline-none text-off-white font-mono text-sm w-full"
                                />
                                <div className="p-1 px-2 border border-mid-grey rounded text-[10px] font-mono text-light-grey uppercase">ESC</div>
                            </div>

                            {/* Suggestions */}
                            <div className="p-2">
                                <span className="p-3 block font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-50">Navigation Shortcuts</span>
                                {suggestions.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => scrollTo(s.id)}
                                        className="w-full text-left p-3 flex items-center justify-between group hover:bg-pure-black transition-colors"
                                    >
                                        <span className="font-mono text-sm text-off-white group-hover:text-accent transition-colors">{s.label}</span>
                                        <Zap className="w-4 h-4 text-mid-grey group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </div>

                            {/* System Status / Footer */}
                            <div className="p-4 bg-pure-black border-t border-mid-grey flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 font-mono text-[10px] text-light-grey">
                                        <Clock className="w-3 h-3 text-accent" />
                                        <span>IST: {istTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[10px] text-light-grey">
                                        <MapPin className="w-3 h-3 text-off-white" />
                                        <span>MUMBAI</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Command className="w-3 h-3 text-mid-grey" />
                                    <span className="font-mono text-[10px] text-mid-grey">SYSTEM_v2.0</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
