import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useDebug } from '../context/DebugContext';

export const CustomCursor = () => {
    const { isDebugMode } = useDebug();
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('cursor-hover') ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Jelly Cursor Main */}
            <motion.div
                ref={cursorRef}
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="fixed top-0 left-0 mix-blend-difference"
            >
                <motion.div
                    animate={{
                        width: isHovering ? 80 : 12,
                        height: isHovering ? 80 : 12,
                        backgroundColor: isDebugMode ? 'rgba(0, 0, 0, 0.8)' : (isHovering ? 'rgba(191, 255, 0, 0.4)' : '#BFFF00'),
                        borderRadius: isDebugMode ? '2px' : '50%',
                    }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 150,
                    }}
                    className={`flex items-center justify-center border ${isDebugMode ? 'border-accent text-accent' : 'border-accent/30'}`}
                >
                    {isHovering && !isDebugMode && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-accent rounded-full"
                        />
                    )}
                    {isDebugMode && (
                        <div className="font-mono text-[6px] tabular-nums flex flex-col items-center">
                            <span>{Math.round(mouseX.get())}</span>
                            <div className="w-4 h-[1px] bg-accent/30 my-[1px]" />
                            <span>{Math.round(mouseY.get())}</span>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Subtle trailing dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full opacity-40"
            />
        </div>
    );
};
