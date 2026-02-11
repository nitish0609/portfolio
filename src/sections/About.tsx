import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { motion } from 'framer-motion';

const whatIDo = [
    {
        category: 'Product',
        emoji: '🚀',
        items: ['Product Strategy', 'Roadmaps', 'User Research', 'PRDs', 'Stakeholder Management', 'AI Integration'],
        description: 'Building products that bridge the gap between business goals and technical feasibility'
    },
    {
        category: 'Tech',
        emoji: '💻',
        items: ['Fullstack', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'Python', 'Node.js', 'MongoDB', 'APIs'],
        description: 'Still shipping code every single day like a proper engineer'
    },
    {
        category: 'Creative',
        emoji: '📸',
        items: ['Automotive Photography', 'Content Creation', 'Storytelling', 'UI/UX Design'],
        description: 'Cars aren\'t just machines, they\'re art on wheels'
    },
];

export const About = () => {
    return (
        <section className="min-h-screen flex items-center px-6 md:px-12 py-20 bg-dark-grey">
            <div className="max-w-6xl mx-auto w-full">
                {/* Section label */}
                <ScrollReveal>
                    <div className="mb-16">
                        <span className="font-mono text-tiny text-light-grey tracking-widest uppercase">What I Actually Do</span>
                        <h2 className="font-display text-giant md:text-massive text-off-white mt-4">
                            THE WHOLE PACKAGE
                        </h2>
                    </div>
                </ScrollReveal>

                {/* What I Do cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {whatIDo.map((item, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="p-8 bg-pure-black border border-mid-grey hover:border-accent transition-colors cursor-hover group"
                            >
                                <div className="text-4xl mb-4">{item.emoji}</div>
                                <h3 className="font-display text-3xl text-off-white mb-3 group-hover:text-accent transition-colors">
                                    {item.category}
                                </h3>
                                <p className="font-body text-sm text-light-grey mb-4 italic">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.items.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="font-mono text-tiny text-light-grey px-3 py-1.5 bg-dark-grey border border-mid-grey"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* About text - FUN PERSONALITY */}
                <ScrollReveal delay={0.4}>
                    <div className="max-w-3xl">
                        <p className="font-body text-lg md:text-xl text-off-white leading-relaxed mb-6">
                            I'm a <span className="text-accent font-medium">Technical Product Manager</span> at The Hosteller,
                            but here's the thing—I never stopped being an engineer.
                        </p>
                        <p className="font-body text-lg md:text-xl text-light-grey leading-relaxed mb-6">
                            I do product strategy, tech ideation, and execution. I work with AI and LLMs.
                            I code in multiple languages and frameworks. I ship features. I debug at 2 AM.
                            <span className="text-off-white"> That's just how I operate.</span>
                        </p>
                        <p className="font-body text-lg md:text-xl text-light-grey leading-relaxed mb-6">
                            Born and raised in <span className="text-off-white font-medium">Mumbai</span>.
                            The city taught me hustle, chaos, and how to find parking spots that don't exist.
                        </p>
                        <p className="font-body text-lg md:text-xl text-light-grey leading-relaxed">
                            When I'm not building products or writing code, I'm out shooting cars with my camera.
                            There's something about capturing a machine at the perfect angle that just <span className="italic">hits different</span>.
                            And yes, I take my coffee seriously. Like, <span className="text-accent">really</span> seriously.
                        </p>
                    </div>
                </ScrollReveal>

                {/* CTA */}
                <ScrollReveal delay={0.6}>
                    <div className="mt-12">
                        <MagneticButton
                            href="https://www.instagram.com/nitishxpandey/"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-off-white text-pure-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-accent transition-colors"
                        >
                            <span>Check Out My Car Shots</span>
                            <span>→</span>
                        </MagneticButton>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
