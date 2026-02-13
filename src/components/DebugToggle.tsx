import { motion } from 'framer-motion';
import { useDebug } from '../context/DebugContext';
import { Terminal } from 'lucide-react';

export const DebugToggle = () => {
    const { isDebugMode, toggleDebugMode } = useDebug();

    return (
        <motion.button
            onClick={toggleDebugMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`fixed bottom-8 left-8 z-[1000] p-4 rounded-full border transition-all duration-300 backdrop-blur-md ${isDebugMode
                    ? 'bg-accent text-pure-black border-accent shadow-[0_0_20px_rgba(191,255,0,0.5)]'
                    : 'bg-mid-grey/50 text-light-grey border-mid-grey hover:border-accent hover:text-accent'
                }`}
            title="Toggle Debug Mode"
        >
            <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                <span className="font-mono text-[10px] uppercase tracking-widest hidden md:block">
                    {isDebugMode ? 'Mode: Dev' : 'Mode: User'}
                </span>
            </div>

            {/* Tooltip for mobile */}
            <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-mid-grey px-2 py-1 rounded text-[8px] font-mono text-off-white opacity-0 group-hover:opacity-100 transition-opacity">
                DEBUG
            </div>
        </motion.button>
    );
};
