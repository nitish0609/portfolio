import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Spotlight = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] select-none overflow-hidden">
            <motion.div
                style={{
                    position: 'absolute',
                    left: springX,
                    top: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(191, 255, 0, 0.1) 0%, transparent 70%)',
                }}
            />
        </div>
    );
};
