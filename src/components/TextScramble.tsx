import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

export const TextScramble = ({ text, className = '' }: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const frameRef = useRef<number>();

    const scramble = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        let iteration = 0;
        const maxIterations = text.length;

        const animate = () => {
            setDisplayText(
                text
                    .split('')
                    .map((_, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration < maxIterations) {
                iteration += 1 / 3;
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
                setIsAnimating(false);
            }
        };

        frameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Auto-scramble on mount
        const timer = setTimeout(scramble, 500);
        return () => {
            clearTimeout(timer);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    return (
        <span
            className={`${className} cursor-hover`}
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
};
