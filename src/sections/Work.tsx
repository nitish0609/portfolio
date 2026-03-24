import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
    {
        title: 'AI Concierge',
        tech: ['LangChain', 'Python', 'React'],
        year: '2025',
    },
    {
        title: 'Booking Platform',
        tech: ['TypeScript', 'Node.js', 'MongoDB'],
        year: '2023–24',
    },
    {
        title: 'DevOps Pipeline',
        tech: ['Docker', 'AWS', 'CI/CD'],
        year: '2024',
    },
];

const timeline = [
    { role: 'Intern', company: 'C-DAC', year: 'College' },
    { role: 'Project Engineer', company: 'Wipro', year: '2021' },
    { role: 'Fullstack Dev', company: 'The Hosteller', year: '2022' },
    { role: 'Senior Engineer', company: 'The Hosteller', year: '2023' },
    { role: 'Tech PM', company: 'The Hosteller', year: '2025' },
];

export const Work = () => {
    return (
        <section id="work" className="px-6 md:px-12 py-20 md:py-28 bg-dark-grey">
            <div className="max-w-7xl mx-auto">
                {/* Compact project list */}
                <ScrollReveal>
                    <div className="flex items-baseline gap-6 mb-10">
                        <h2 className="font-display text-4xl md:text-5xl text-off-white">WORK</h2>
                        <div className="h-[1px] flex-1 bg-mid-grey/30" />
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {projects.map((p, i) => (
                        <ScrollReveal key={i} delay={i * 0.08}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="p-6 bg-pure-black border border-mid-grey hover:border-accent/50 transition-all duration-500 group cursor-hover"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-display text-xl text-off-white group-hover:text-accent transition-colors">{p.title}</h3>
                                    <span className="font-mono text-[10px] text-mid-grey">{p.year}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {p.tech.map((t, j) => (
                                        <span key={j} className="font-mono text-[9px] text-light-grey px-2 py-0.5 bg-dark-grey border border-mid-grey/30">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Compact inline timeline */}
                <ScrollReveal>
                    <div className="flex items-baseline gap-6 mb-8">
                        <h2 className="font-display text-4xl md:text-5xl text-off-white">JOURNEY</h2>
                        <div className="h-[1px] flex-1 bg-mid-grey/30" />
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="relative">
                        {/* Horizontal line */}
                        <div className="hidden md:block absolute top-4 left-0 right-0 h-[1px] bg-mid-grey/30">
                            <motion.div
                                className="h-full bg-accent origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pt-8 md:pr-6 group"
                                >
                                    {/* Dot */}
                                    <div className={`hidden md:block absolute top-[11px] left-0 w-2.5 h-2.5 rounded-full border-2 border-dark-grey transition-colors ${
                                        i === timeline.length - 1 ? 'bg-accent shadow-[0_0_10px_rgba(191,255,0,0.5)]' : 'bg-mid-grey group-hover:bg-accent'
                                    }`} />
                                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest">{item.year}</span>
                                    <h4 className={`font-display text-lg ${i === timeline.length - 1 ? 'text-accent' : 'text-off-white'} mt-1`}>
                                        {item.role}
                                    </h4>
                                    <span className="font-mono text-[10px] text-light-grey opacity-60">{item.company}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* LinkedIn link */}
                <ScrollReveal>
                    <div className="mt-12 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-mid-grey/30" />
                        <a
                            href="https://www.linkedin.com/in/nitish-pandey-70a21016a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-[10px] text-light-grey hover:text-accent transition-colors cursor-hover uppercase tracking-widest"
                        >
                            Full history on LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
