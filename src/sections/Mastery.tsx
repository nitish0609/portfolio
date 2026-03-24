import { ScrollReveal } from '../components/ScrollReveal';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { GlitchHeader } from '../components/GlitchHeader';
import { MouseEvent } from 'react';

/* ─── Tech Ecosystem Data ─── */
const techEcosystem = [
    {
        category: 'Core Languages',
        icon: '⚡',
        color: '#61DAFB', // React Blue
        span: 'col-span-1',
        description: 'The logical foundation. From scripting to low-level execution.',
        nodes: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'Java'],
    },
    {
        category: 'Frontend & UI',
        icon: '🎨',
        color: '#BFFF00', // Accent
        span: 'col-span-1',
        description: 'Building interactive and hyper-responsive user interfaces.',
        nodes: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'HTML/CSS'],
    },
    {
        category: 'Backend & APIs',
        icon: '⚙️',
        color: '#339933', // Node Green
        span: 'col-span-1',
        description: 'Architecting scalable server logic and data flow.',
        nodes: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'],
    },
    {
        category: 'Database & Cloud',
        icon: '☁️',
        color: '#FF9900', // AWS Orange
        span: 'col-span-1',
        description: 'Storing data natively and deploying systems reliably.',
        nodes: ['MongoDB', 'MySQL', 'Redis', 'AWS', 'Docker', 'CI/CD'],
    },
    {
        category: 'AI & Intelligence',
        icon: '🧠',
        color: '#8B5CF6', // Purple
        span: 'col-span-1',
        description: 'Integrating LLMs and building agentic systems into production.',
        nodes: ['LangChain', 'RAG Pipelines', 'Prompt Eng', 'Agentic Workflows'],
    },
    {
        category: 'Product & Strategy',
        icon: '🚀',
        color: '#E11D48', // Rose
        span: 'col-span-1',
        description: 'Guiding features from conceptualization to successful launch.',
        nodes: ['Agile', 'Jira', 'Sprint Planning', 'System Design', 'Analytics'],
    },
];

/* ─── Premium Bento Card with Glowing Hover Effect ─── */
const BentoCard = ({ section }: { section: typeof techEcosystem[0] }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div
            className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-mid-grey/40 bg-dark-grey p-8 transition-all hover:border-mid-grey/80 ${section.span}`}
            onMouseMove={handleMouseMove}
        >
            {/* Glowing gradient effect that follows the cursor */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            ${section.color}15,
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{section.icon}</span>
                    <h3 className="font-display text-2xl text-off-white group-hover:text-accent transition-colors duration-300">
                        {section.category}
                    </h3>
                </div>

                <p className="font-body text-sm text-light-grey/80 mb-8 max-w-sm">
                    {section.description}
                </p>

                {/* Nodes Grid */}
                <div className="mt-auto flex flex-wrap gap-2">
                    {section.nodes.map(node => (
                        <span
                            key={node}
                            className="font-mono text-[10px] text-off-white/90 bg-pure-black/50 border border-mid-grey/30 px-3 py-1.5 rounded-md uppercase tracking-widest hover:border-accent hover:text-accent transition-colors duration-300 backdrop-blur-sm cursor-default"
                        >
                            {node}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─── Main Mastery Section ─── */
export const Mastery = () => {
    return (
        <section id="mastery" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-pure-black relative overflow-hidden flex flex-col items-center">
            
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#BFFF0005_1px,transparent_1px),linear-gradient(to_bottom,#BFFF0005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <ScrollReveal>
                    <div className="mb-16">
                        <GlitchHeader title="MASTERY" subtitle="Tech_Ecosystem" />
                        <p className="font-body text-lg text-light-grey mt-6 max-w-2xl">
                            The full technical stack I use daily to build, automate, and deploy systems. Constantly evolving.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
                    {techEcosystem.map((section, i) => (
                        <ScrollReveal key={section.category} delay={i * 0.1}>
                            <BentoCard section={section} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
