import { useEffect, useRef } from 'react';

export const NoiseBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Subtle mesh-like noise patterns
            for (let i = 0; i < 50; i++) {
                const x = Math.sin(time + i) * canvas.width * 0.5 + canvas.width * 0.5;
                const y = Math.cos(time * 0.5 + i) * canvas.height * 0.5 + canvas.height * 0.5;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, canvas.width * 0.4);
                gradient.addColorStop(0, 'rgba(191, 255, 0, 0.03)'); // Acccent color very subtle
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-pure-black">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-40 blur-3xl pointer-events-none"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
        </div>
    );
};
