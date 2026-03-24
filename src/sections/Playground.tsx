import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import { GlitchHeader } from '../components/GlitchHeader';

/* ─── Interactive Particle Canvas ─── */
const ParticlePlayground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0, active: false });
    const particlesRef = useRef<Array<{
        x: number; y: number; vx: number; vy: number;
        size: number; baseX: number; baseY: number; density: number;
    }>>([]);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);
            initParticles();
        };

        const initParticles = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const particles: typeof particlesRef.current = [];
            const spacing = 28;
            for (let x = spacing; x < w; x += spacing) {
                for (let y = spacing; y < h; y += spacing) {
                    particles.push({
                        x, y, baseX: x, baseY: y,
                        vx: 0, vy: 0, size: 1.5,
                        density: (Math.random() * 30) + 1,
                    });
                }
            }
            particlesRef.current = particles;
        };

        const animate = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            particlesRef.current.forEach((p) => {
                if (mouse.current.active) {
                    const dx = mouse.current.x - p.x;
                    const dy = mouse.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const force = (120 - dist) / 120;
                    if (dist < 120) {
                        const angle = Math.atan2(dy, dx);
                        p.vx -= Math.cos(angle) * force * p.density * 0.6;
                        p.vy -= Math.sin(angle) * force * p.density * 0.6;
                    }
                }
                p.vx += (p.baseX - p.x) * 0.05;
                p.vy += (p.baseY - p.y) * 0.05;
                p.vx *= 0.85;
                p.vy *= 0.85;
                p.x += p.vx;
                p.y += p.vy;

                const distFromBase = Math.sqrt((p.x - p.baseX) ** 2 + (p.y - p.baseY) ** 2);
                const intensity = Math.min(distFromBase / 50, 1);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size + intensity * 2, 0, Math.PI * 2);
                ctx.fillStyle = intensity > 0.3
                    ? `rgba(191, 255, 0, ${0.3 + intensity * 0.7})`
                    : `rgba(250, 250, 250, ${0.15 + intensity * 0.3})`;
                ctx.fill();
            });

            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 35) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(191, 255, 0, ${0.08 * (1 - dist / 35)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
            mouse.current.active = true;
        };
        const handleMouseLeave = () => { mouse.current.active = false; };

        resize();
        animate();
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(animRef.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="relative border border-mid-grey overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-60">
                Move your mouse around
            </div>
            <canvas ref={canvasRef} className="w-full h-[400px] md:h-[500px] bg-pure-black cursor-crosshair" />
        </div>
    );
};

/* ─── Gravity Balls ─── */
const GravityBalls = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [balls, setBalls] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: string }>>([]);
    const ballsRef = useRef(balls);
    const animRef = useRef<number>(0);
    const colors = ['#BFFF00', '#FAFAFA', '#B0B0B0', '#BFFF00', '#BFFF00'];

    const addBall = useCallback((e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const newBall = {
            id: Date.now() + Math.random(),
            x: e.clientX - rect.left, y: e.clientY - rect.top,
            vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 4,
            size: 12 + Math.random() * 24,
            color: colors[Math.floor(Math.random() * colors.length)],
        };
        const updated = [...ballsRef.current, newBall].slice(-30);
        ballsRef.current = updated;
        setBalls(updated);
    }, []);

    useEffect(() => {
        const animate = () => {
            const container = containerRef.current;
            if (!container) { animRef.current = requestAnimationFrame(animate); return; }
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            ballsRef.current = ballsRef.current.map(b => {
                let { x, y, vx, vy, size } = b;
                vy += 0.25;
                x += vx; y += vy;
                if (y + size > h) { y = h - size; vy *= -0.65; vx *= 0.98; }
                if (x + size > w) { x = w - size; vx *= -0.8; }
                if (x < 0) { x = 0; vx *= -0.8; }
                ballsRef.current.forEach(other => {
                    if (other.id === b.id) return;
                    const dx = other.x - x, dy = other.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = (size + other.size) / 2;
                    if (dist < minDist && dist > 0) {
                        const angle = Math.atan2(dy, dx);
                        const force = (minDist - dist) * 0.05;
                        vx -= Math.cos(angle) * force;
                        vy -= Math.sin(angle) * force;
                    }
                });
                return { ...b, x, y, vx, vy };
            });
            setBalls([...ballsRef.current]);
            animRef.current = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    return (
        <div ref={containerRef} onClick={addBall} className="relative border border-mid-grey bg-pure-black h-[400px] md:h-[500px] cursor-pointer overflow-hidden">
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-60">Click to spawn balls</div>
            {balls.map(b => (
                <div key={b.id} className="absolute rounded-full" style={{
                    left: b.x - b.size / 2, top: b.y - b.size / 2, width: b.size, height: b.size,
                    backgroundColor: b.color, opacity: 0.8,
                    boxShadow: b.color === '#BFFF00' ? '0 0 16px rgba(191,255,0,0.4)' : 'none',
                }} />
            ))}
            {balls.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-sm text-mid-grey">Click anywhere to drop balls ↓</span>
                </div>
            )}
        </div>
    );
};

/* ─── Matrix Rain ─── */
const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let w = canvas.parentElement?.offsetWidth || 800;
        let h = canvas.parentElement?.offsetHeight || 600;

        canvas.width = w * 2;
        canvas.height = h * 2;
        ctx.scale(2, 2);

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
        const fontSize = 14;
        const columns = w / fontSize;
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Start off-screen randomly
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#BFFF00';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            w = canvas.parentElement?.offsetWidth || 800;
            h = canvas.parentElement?.offsetHeight || 600;
            canvas.width = w * 2;
            canvas.height = h * 2;
            ctx.scale(2, 2);
        };

        window.addEventListener('resize', handleResize);
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative border border-mid-grey overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-60">
                The Matrix has you
            </div>
            <canvas
                ref={canvasRef}
                className="w-full h-[400px] md:h-[500px] bg-[#0A0A0A]"
            />
        </div>
    );
};

/* ─── Drawing Canvas ─── */
const DrawingCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const [brushColor, setBrushColor] = useState('#BFFF00');
    const [brushSize, setBrushSize] = useState(3);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(2, 2);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        }
    }, []);

    const getPos = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const draw = (e: React.MouseEvent) => {
        if (!drawing.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.shadowBlur = brushSize * 3;
        ctx.shadowColor = brushColor;
        ctx.stroke();
        ctx.shadowBlur = 0;
        lastPos.current = pos;
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };

    const colors = ['#BFFF00', '#FAFAFA', '#FF4444', '#4488FF', '#FF44FF', '#44FFFF'];

    return (
        <div className="relative border border-mid-grey overflow-hidden bg-pure-black">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 relative z-10 bg-pure-black/80 backdrop-blur-sm border-b border-mid-grey/20">
                <span className="font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-60">Neon Draw</span>
                <div className="flex items-center gap-2 flex-wrap">
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => setBrushColor(c)}
                            className={`w-5 h-5 rounded-full border-2 transition-all ${brushColor === c ? 'border-white scale-125' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                    <input
                        type="range" min="1" max="20" value={brushSize}
                        onChange={e => setBrushSize(Number(e.target.value))}
                        className="w-16 h-1 ml-2 accent-accent"
                    />
                    <button onClick={clear} className="font-mono text-[10px] text-mid-grey hover:text-accent transition-colors ml-2 uppercase">
                        Clear
                    </button>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                className="w-full h-[400px] md:h-[500px] bg-pure-black cursor-crosshair touch-none"
                onMouseDown={e => { drawing.current = true; lastPos.current = getPos(e); }}
                onMouseMove={draw}
                onMouseUp={() => { drawing.current = false; }}
                onMouseLeave={() => { drawing.current = false; }}
                onTouchStart={e => {
                    drawing.current = true;
                    const touch = e.touches[0];
                    const rect = canvasRef.current!.getBoundingClientRect();
                    lastPos.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
                }}
                onTouchMove={e => {
                    if (!drawing.current) return;
                    const touch = e.touches[0];
                    const rect = canvasRef.current!.getBoundingClientRect();
                    const pos = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
                    const ctx = canvasRef.current?.getContext('2d');
                    if (ctx) {
                        ctx.beginPath();
                        ctx.moveTo(lastPos.current.x, lastPos.current.y);
                        ctx.lineTo(pos.x, pos.y);
                        ctx.strokeStyle = brushColor;
                        ctx.lineWidth = brushSize;
                        ctx.lineCap = 'round';
                        ctx.shadowBlur = brushSize * 3;
                        ctx.shadowColor = brushColor;
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                        lastPos.current = pos;
                    }
                }}
                onTouchEnd={() => { drawing.current = false; }}
            />
        </div>
    );
};

/* ─── Typing Speed Test ─── */
const TypingTest = () => {
    const sentences = [
        'the quick brown fox jumps over the lazy dog',
        'code is poetry written in logic',
        'every great developer was once a beginner',
        'coffee and code make the world go round',
        'the best ui is the one you want to touch',
        'ship fast break things learn faster',
    ];

    const [sentence, setSentence] = useState(sentences[0]);
    const [input, setInput] = useState('');
    const [started, setStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [done, setDone] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const start = () => {
        const s = sentences[Math.floor(Math.random() * sentences.length)];
        setSentence(s);
        setInput('');
        setStarted(true);
        setDone(false);
        setWpm(0);
        setStartTime(Date.now());
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleInput = (value: string) => {
        if (!started) return;
        setInput(value);
        if (value === sentence) {
            const elapsed = (Date.now() - startTime) / 1000 / 60;
            const words = sentence.split(' ').length;
            setWpm(Math.round(words / elapsed));
            setDone(true);
            setStarted(false);
        }
    };

    return (
        <div className="relative border border-mid-grey bg-pure-black h-[400px] md:h-[500px] flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-60">
                Test your speed
            </div>

            {!started && !done && (
                <motion.button
                    onClick={start}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-accent text-pure-black font-mono text-sm font-bold uppercase tracking-widest hover:bg-off-white transition-colors cursor-hover"
                >
                    Start Typing Test
                </motion.button>
            )}

            {started && (
                <div className="w-full max-w-2xl">
                    {/* Target sentence */}
                    <div className="font-mono text-lg md:text-xl mb-8 leading-relaxed">
                        {sentence.split('').map((char, i) => (
                            <span
                                key={i}
                                className={
                                    i < input.length
                                        ? input[i] === char ? 'text-accent' : 'text-red-500 bg-red-500/10'
                                        : i === input.length ? 'text-off-white underline underline-offset-4 decoration-accent' : 'text-mid-grey'
                                }
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={e => handleInput(e.target.value)}
                        className="w-full px-4 py-3 bg-dark-grey border border-mid-grey text-off-white font-mono focus:border-accent focus:outline-none transition-colors"
                        placeholder="Start typing..."
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>
            )}

            {done && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="font-display text-7xl text-accent mb-2">{wpm}</div>
                    <div className="font-mono text-xs text-light-grey uppercase tracking-widest mb-8">Words Per Minute</div>
                    <motion.button
                        onClick={start}
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 bg-accent text-pure-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-off-white transition-colors cursor-hover"
                    >
                        Try Again
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

import { getRandomTrivia } from '../utils/carTrivia';

/* ─── Gearhead Trivia ─── */
const GearheadQuiz = () => {
    // State: Selection Menu (null) or Active Quiz
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [qIndex, setQIndex] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showFact, setShowFact] = useState(false);
    const [finished, setFinished] = useState(false);

    // Initializer
    const startChallenge = (limit: number) => {
        const questions = getRandomTrivia(limit);
        setQuizQuestions(questions);
        setQIndex(0);
        setSelected(null);
        setScore(0);
        setShowFact(false);
        setFinished(false);
    };

    const handleAnswer = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === quizQuestions[qIndex].a) {
            setScore(s => s + 1);
        }
        setShowFact(true);
    };

    const nextQuestion = () => {
        if (qIndex < quizQuestions.length - 1) {
            setQIndex(qIndex + 1);
            setSelected(null);
            setShowFact(false);
        } else {
            setFinished(true);
        }
    };

    const resetToMenu = () => {
        setQuizQuestions([]);
        setFinished(false);
    };

    // Pre-Game Menu State
    if (quizQuestions.length === 0) {
        return (
            <div className="relative border border-mid-grey bg-[#0A0A0A] h-[550px] md:h-[500px] p-6 md:p-12 flex flex-col items-center justify-center text-center group overflow-hidden">
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-accent uppercase tracking-widest opacity-80">
                    Diagnostic System
                </div>
                
                <h2 className="font-display text-2xl md:text-5xl text-off-white mb-4 md:mb-6">Challenge Protocol</h2>
                <p className="font-body text-sm md:text-base text-light-grey mb-6 md:mb-10 max-w-sm">
                    How deep does your car knowledge go? From vintage Group B legends to hypercars.
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg">
                    {[
                        { label: 'Sprint', count: 5, color: 'text-off-white hover:text-pure-black' },
                        { label: 'Endurance', count: 10, color: 'text-off-white hover:text-pure-black' },
                        { label: 'Le Mans (Hard)', count: 20, color: 'text-accent hover:text-pure-black border-accent' }
                    ].map(btn => (
                        <button
                            key={btn.count}
                            onClick={() => startChallenge(btn.count)}
                            className={`flex-1 font-mono text-xs uppercase tracking-widest px-6 py-4 border border-mid-grey bg-transparent hover:bg-accent transition-all duration-300 ${btn.color}`}
                        >
                            <span className="block mb-1 opacity-50 text-[10px]">{btn.count} Questions</span>
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Post-Game Menu State
    if (finished) {
        const percentage = score / quizQuestions.length;
        let rank = '';
        if (percentage === 1) rank = 'Apex Predator. Legendary Status.';
        else if (percentage >= 0.8) rank = 'Podium Finish. Incredible knowledge.';
        else if (percentage >= 0.5) rank = 'Solid Run. You know your cars.';
        else rank = 'Engine Stalled. Time to hit the books.';

        return (
            <div className="relative border border-mid-grey bg-[#0A0A0A] h-[400px] md:h-[500px] flex flex-col items-center justify-center p-8 text-center group">
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-light-grey uppercase tracking-widest opacity-60">Diagnostic Complete</div>
                <h2 className="font-display text-5xl text-accent mb-4">
                    {score}/{quizQuestions.length}
                </h2>
                <p className="font-body text-xl text-off-white mb-8 max-w-sm">
                    {rank}
                </p>
                <button
                    onClick={resetToMenu}
                    className="font-mono text-xs uppercase tracking-widest px-8 py-3 bg-accent text-pure-black hover:bg-off-white transition-colors"
                >
                    Return to Paddock
                </button>
            </div>
        );
    }

    // Active Game State
    const { q, opts, a, fact } = quizQuestions[qIndex];

    return (
        <div className="relative border border-mid-grey bg-[#0A0A0A] h-[550px] md:h-[600px] p-6 md:p-12 flex flex-col group overflow-y-auto overflow-x-hidden">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-accent uppercase tracking-widest">
                Gearhead Diagnostic // Q:{qIndex + 1}/{quizQuestions.length}
            </div>
            
            <div className="mt-10 flex-1 flex flex-col pb-8">
                <h3 className="font-display text-xl md:text-3xl text-off-white mb-6 leading-tight">{q}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {opts.map((opt: string, idx: number) => {
                        let btnClass = "border border-mid-grey bg-dark-grey text-light-grey hover:border-accent hover:text-off-white";
                        if (selected !== null) {
                            if (idx === a) btnClass = "border-green-500 bg-green-500/10 text-green-500";
                            else if (idx === selected) btnClass = "border-red-500 bg-red-500/10 text-red-500";
                            else btnClass = "border-mid-grey/30 bg-pure-black/20 text-mid-grey/50 opacity-50";
                        }
                        return (
                            <button
                                key={idx}
                                disabled={selected !== null}
                                onClick={() => handleAnswer(idx)}
                                className={`font-mono text-xs p-3 text-left transition-all ${btnClass}`}
                            >
                                <span className="opacity-50 mr-2">{(idx + 1).toString().padStart(2, '0')}</span> 
                                {opt}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {showFact && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-accent/10 border-l-2 border-accent mb-4"
                        >
                            <p className="font-mono text-[10px] md:text-xs text-off-white leading-relaxed">
                                <span className="text-accent font-bold">FACT:</span> {fact}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {selected !== null && (
                    <div className="mt-auto self-end pb-4">
                        <button
                            onClick={nextQuestion}
                            className="font-mono text-xs uppercase tracking-widest px-6 py-2 bg-off-white text-pure-black hover:bg-accent transition-colors flex items-center gap-2"
                        >
                            {qIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'} &rarr;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── Experiments Tab Switcher ─── */
const experiments = [
    { id: 'particles', label: 'Particle Field' },
    { id: 'gravity', label: 'Gravity Balls' },
    { id: 'matrix', label: 'Matrix Rain' },
    { id: 'draw', label: 'Neon Draw' },
    { id: 'typing', label: 'Speed Test' },
    { id: 'quiz', label: 'Gearhead Quiz' },
];

export const Playground = () => {
    const [active, setActive] = useState('particles');

    return (
        <section id="playground" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-pure-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <GlitchHeader title="PLAYGROUND" subtitle="Interactive_Experiments" />
                    <p className="font-body text-lg text-light-grey mt-6 max-w-2xl mb-12">
                        I believe the best UI is the one you want to <span className="text-accent italic">touch</span>.
                        Here are some interactive experiments . go ahead, play around.
                    </p>
                </ScrollReveal>

                {/* Tab switcher */}
                <ScrollReveal>
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {experiments.map(exp => (
                            <button
                                key={exp.id}
                                onClick={() => setActive(exp.id)}
                                className={`font-mono text-xs uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 cursor-hover ${
                                    active === exp.id
                                        ? 'bg-accent text-pure-black border-accent'
                                        : 'bg-transparent text-light-grey border-mid-grey hover:border-accent/50 hover:text-off-white'
                                }`}
                            >
                                {exp.label}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Active experiment */}
                <ScrollReveal>
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {active === 'particles' && <ParticlePlayground />}
                        {active === 'gravity' && <GravityBalls />}
                        {active === 'matrix' && <MatrixRain />}
                        {active === 'draw' && <DrawingCanvas />}
                        {active === 'typing' && <TypingTest />}
                        {active === 'quiz' && <GearheadQuiz />}
                    </motion.div>
                </ScrollReveal>

                {/* Hint */}
                <ScrollReveal>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-mid-grey/30" />
                        <span className="font-mono text-[10px] text-mid-grey uppercase tracking-widest">
                            Built with Canvas API & Framer Motion . zero external libs
                        </span>
                        <div className="h-[1px] flex-1 bg-mid-grey/30" />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
