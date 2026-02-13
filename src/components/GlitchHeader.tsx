import { motion } from 'framer-motion';

interface GlitchHeaderProps {
    title: string;
    subtitle?: string;
}

export const GlitchHeader = ({ title, subtitle }: GlitchHeaderProps) => {
    return (
        <div className="mb-20">
            {subtitle && (
                <span className="font-mono text-tiny text-light-grey tracking-widest uppercase opacity-60 block mb-2">
                    {subtitle}
                </span>
            )}
            <motion.h2
                whileHover={{ skewX: -5 }}
                className="font-display text-5xl sm:text-giant md:text-massive text-off-white tracking-tighter cursor-hover group"
            >
                <span className="relative inline-block group-hover:text-accent transition-colors duration-300">
                    {title}
                    <span className="absolute top-0 left-0 -z-10 text-outline opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                        {title}
                    </span>
                </span>
            </motion.h2>
        </div>
    );
};
