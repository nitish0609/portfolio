import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
    {
        title: 'AI Product Suite',
        description: 'Building intelligent features that enhance user experience at scale',
        tech: ['LLMs', 'Python', 'React', 'APIs'],
        year: '2025',
    },
    {
        title: 'Fullstack Platform',
        description: 'End-to-end development of core product features',
        tech: ['TypeScript', 'Node.js', 'PostgreSQL'],
        year: '2023-24',
    },
];

export const Work = () => {
    return (
        <section className="min-h-screen flex items-center px-6 md:px-12 py-20">
            <div className="max-w-6xl mx-auto w-full">
                <ScrollReveal>
                    <div className="mb-16">
                        <span className="font-mono text-tiny text-mid-grey tracking-widest uppercase">Selected Work</span>
                        <h2 className="font-display text-giant md:text-massive text-off-white mt-4">
                            PROJECTS
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-hover"
                            >
                                <div className="border-l-2 border-mid-grey hover:border-accent transition-colors pl-8 py-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-display text-4xl md:text-5xl text-off-white mb-2 group-hover:text-accent transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="font-body text-lg text-light-grey max-w-2xl">
                                                {project.description}
                                            </p>
                                        </div>
                                        <span className="font-mono text-tiny text-mid-grey">{project.year}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="font-mono text-tiny text-off-white px-3 py-1.5 bg-dark-grey border border-mid-grey"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* LinkedIn CTA */}
                <ScrollReveal delay={0.3}>
                    <div className="mt-16 p-8 border border-mid-grey">
                        <p className="font-body text-lg text-light-grey mb-4">
                            Want the full work history? Check LinkedIn.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/nitish-pandey-70a21016a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-off-white transition-colors cursor-hover"
                        >
                            <span>View LinkedIn</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
