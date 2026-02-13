import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';

const timeline = [
    {
        version: 'v0.1_Origin',
        year: 'College',
        role: 'Intern',
        company: 'C-DAC',
        description: 'Where it all started. Learning to code, breaking things, fixing them, and repeating the cycle.',
    },
    {
        version: 'v1.0_Foundation',
        year: '2021-22',
        role: 'Project Engineer',
        company: 'Wipro',
        description: 'First real professional deployment. Learned what "production scale" really looks like in the enterprise world.',
    },
    {
        version: 'v2.0_Optimization',
        year: 'Sep 2022',
        role: 'Fullstack Dev',
        company: 'The Hosteller',
        description: 'Joined the startup grind. Built features, shipped at velocity, and fell in love with product execution.',
    },
    {
        version: 'v2.4_Senior_Scale',
        year: 'Dec 2023',
        role: 'Senior Engineer',
        company: 'The Hosteller',
        description: 'Scaled systems and took ownership of core features. Managed the bridge between code and product.',
    },
    {
        version: 'v3.0_TPM_Protocol',
        year: 'Jan 2025',
        role: 'Technical Product Manager',
        company: 'The Hosteller',
        description: 'Managing the digital roadmap while still pushing code daily. The perfect hybrid protocol.',
    },
];

export const Journey = () => {
    return (
        <section id="journey" className="min-h-screen flex items-center px-6 md:px-12 py-20 bg-pure-black">
            <div className="max-w-7xl mx-auto w-full">
                <ScrollReveal>
                    <div className="mb-20">
                        <span className="text-accent font-mono text-xs uppercase tracking-widest">The Roadmap</span>
                        <h2 className="font-display text-7xl md:text-massive text-off-white mt-4">
                            JOURNEY
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-6 md:space-y-10">
                    {timeline.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.3 }}
                                className="relative pl-8 md:pl-16 border-l border-mid-grey hover:border-accent transition-all duration-500 group"
                            >
                                {/* Timeline accent */}
                                <div className="absolute left-0 top-0 w-[1px] h-0 group-hover:h-full bg-accent transition-all duration-500" />
                                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-mid-grey group-hover:bg-accent border border-pure-black rounded-full transition-colors" />

                                <div className="pb-8 md:pb-12">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                                        <span className="text-accent font-mono text-[10px] tracking-widest uppercase">{item.version}</span>
                                        <h3 className="text-3xl md:text-5xl font-display text-off-white">
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
                    ))}
                </div>

                <ScrollReveal delay={0.6}>
                    <div className="mt-20 p-10 bg-dark-grey border border-mid-grey relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <p className="font-display text-3xl md:text-4xl text-off-white leading-tight">
                                Still coding. Still building.<br />
                                <span className="text-accent italic font-light text-2xl md:text-3xl">The hybrid mindset never stops.</span>
                            </p>
                            <div className="font-mono text-[10px] text-light-grey uppercase tracking-widest">
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
