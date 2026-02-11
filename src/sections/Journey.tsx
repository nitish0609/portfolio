import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';

const timeline = [
    {
        year: 'College',
        role: 'Intern',
        company: 'C-DAC',
        description: 'Where it all started. Learning to code, breaking things, fixing them, repeat.',
    },
    {
        year: '2021-22',
        role: 'Project Engineer',
        company: 'Wipro',
        description: 'First real job. Enterprise scale. Learned what "production" really means.',
    },
    {
        year: 'Sep 2022',
        role: 'Fullstack Dev',
        company: 'The Hosteller',
        description: 'Joined a startup. Built features. Shipped fast. Loved every minute.',
    },
    {
        year: 'Dec 2023',
        role: 'Senior Engineer',
        company: 'The Hosteller',
        description: 'Promotion #1. More responsibility. Still coding. Still learning.',
    },
    {
        year: 'Jan 2025',
        role: 'Technical Product Manager',
        company: 'The Hosteller',
        description: 'Promotion #2. Now I manage products AND code. Living the dream.',
    },
];

export const Journey = () => {
    return (
        <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20">
            <div className="max-w-6xl mx-auto w-full">
                <ScrollReveal>
                    <div className="mb-16">
                        <span className="text-racing-red font-mono text-sm tracking-wider">THE STORY</span>
                        <h2 className="font-display text-6xl md:text-8xl font-bold mt-4">
                            How I Got <span className="text-gradient">Here</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-8">
                    {timeline.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.3 }}
                                className="relative pl-12 border-l-2 border-racing-red/30 hover:border-racing-red transition-colors group"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-2 w-4 h-4 -ml-[9px] bg-racing-red rounded-full group-hover:scale-125 transition-transform" />

                                <div className="pb-8">
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <span className="text-sm font-mono text-gray-500">{item.year}</span>
                                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                                            {item.role}
                                        </h3>
                                    </div>
                                    <p className="text-lg text-racing-red font-medium mb-3">{item.company}</p>
                                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.6}>
                    <div className="mt-16 p-8 bg-gradient-to-r from-racing-red/10 to-accent-orange/10 border border-racing-red/20 rounded-lg">
                        <p className="text-2xl md:text-3xl font-display text-white leading-relaxed">
                            <span className="text-gradient font-bold">Still coding. Still creating.</span>
                            <br />
                            <span className="text-gray-300 text-xl">
                                Being a TPM doesn't mean I stopped being an engineer. I just got better at both.
                            </span>
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
