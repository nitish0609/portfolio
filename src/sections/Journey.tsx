import { ScrollReveal } from '../components/ScrollReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlitchHeader } from '../components/GlitchHeader';
import { useRef } from 'react';

const timeline = [
    {
        version: 'v0.1_Origin',
        year: 'College',
        role: 'Intern',
        company: 'C-DAC',
        description: 'Where it all started. Learning to code, breaking things, fixing them, and repeating the cycle.',
        accent: false,
    },
    {
        version: 'v1.0_Foundation',
        year: '2021-22',
        role: 'Project Engineer',
        company: 'Wipro',
        description: 'First real professional deployment. Learned what "production scale" really looks like in the enterprise world.',
        accent: false,
    },
    {
        version: 'v2.0_Optimization',
        year: 'Sep 2022',
        role: 'Fullstack Dev',
        company: 'The Hosteller',
        description: 'Joined the startup grind. Built features, shipped at velocity, and fell in love with product execution.',
        accent: false,
    },
    {
        version: 'v2.4_Senior_Scale',
        year: 'Dec 2023',
        role: 'Senior Engineer',
        company: 'The Hosteller',
        description: 'Scaled systems and took ownership of core features. Managed the bridge between code and product.',
        accent: false,
    },
    {
        version: 'v3.0_TPM_Protocol',
        year: 'Jan 2025',
        role: 'Technical Product Manager',
        company: 'The Hosteller',
        description: 'Managing the digital roadmap while still pushing code daily. The perfect hybrid protocol.',
        accent: true,
    },
];

const TimelineItem = ({ item, index }: { item: typeof timeline[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <ScrollReveal delay={index * 0.08}>
            <motion.div
                ref={ref}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
                className="relative pl-8 md:pl-16 group"
            >
                {/* Animated fill line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-mid-grey/30">
                    <motion.div
                        className="absolute left-0 top-0 w-full bg-accent"
                        style={{ height: lineHeight }}
                    />
                </div>

                {/* Dot */}
                <div className={`absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full border-2 border-pure-black transition-colors duration-500 ${
                    item.accent ? 'bg-accent shadow-[0_0_12px_rgba(191,255,0,0.5)]' : 'bg-mid-grey group-hover:bg-accent'
                }`} />

                <div className="pb-10 md:pb-14">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                        <span className="text-accent font-mono text-[10px] tracking-widest uppercase">
                            {item.version}
                        </span>
                        <h3 className={`text-3xl md:text-5xl font-display ${item.accent ? 'text-accent' : 'text-off-white'}`}>
                            {item.role}
                        </h3>
                        <span className="text-light-grey font-mono text-xs opacity-60 md:ml-auto">{item.year}</span>
                    </div>
                    <p className="text-lg text-accent/80 font-mono mb-4">{item.company}</p>
                    <p className="text-light-grey text-lg max-w-3xl leading-relaxed font-body font-light">
                        {item.description}
                    </p>
                </div>
            </motion.div>
        </ScrollReveal>
    );
};

export const Journey = () => {
    return (
        <section id="journey" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-dark-grey relative overflow-hidden">
            {/* Background version watermarks */}
            <div className="absolute top-20 right-0 font-display text-[20rem] text-mid-grey opacity-[0.02] select-none pointer-events-none leading-none">
                V3
            </div>

            <div className="max-w-7xl mx-auto w-full">
                <ScrollReveal>
                    <GlitchHeader title="JOURNEY" subtitle="The_Roadmap" />
                </ScrollReveal>

                <div className="mt-16 space-y-0">
                    {timeline.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>

                <ScrollReveal delay={0.6}>
                    <div className="mt-20 p-10 bg-pure-black border border-mid-grey relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <p className="font-display text-3xl md:text-4xl text-off-white leading-tight">
                                Still coding. Still building.<br />
                                <span className="text-accent italic font-light text-2xl md:text-3xl">The hybrid mindset never stops.</span>
                            </p>
                            <div className="font-mono text-[10px] text-light-grey uppercase tracking-widest flex items-center gap-3">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                Status: Active_Development
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 font-display text-8xl text-mid-grey opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity uppercase">
                            Roadmap
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
