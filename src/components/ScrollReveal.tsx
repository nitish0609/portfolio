import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const ScrollReveal = ({ children, delay = 0, className = "", style = {} }: ScrollRevealProps) => {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};
