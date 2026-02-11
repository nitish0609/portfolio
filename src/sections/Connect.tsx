import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

const contacts = [
    {
        icon: Mail,
        label: 'Email',
        value: 'nitishpandey234@gmail.com',
        href: 'mailto:nitishpandey234@gmail.com',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'Connect professionally',
        href: 'https://www.linkedin.com/in/nitish-pandey-70a21016a/',
    },
    {
        icon: Instagram,
        label: 'Instagram',
        value: '@nitishxpandey',
        href: 'https://www.instagram.com/nitishxpandey/',
    },
];

export const Connect = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Formspree is activated with your ID: mojnjbep
        const response = await fetch('https://formspree.io/f/mojnjbep', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        } else {
            setStatus('error');
        }
    };

    return (
        <section className="min-h-screen flex items-center px-6 md:px-12 py-20">
            <div className="max-w-6xl mx-auto w-full">
                <ScrollReveal>
                    <div className="mb-16">
                        <span className="font-mono text-tiny text-light-grey tracking-widest uppercase">Let's Talk</span>
                        <h2 className="font-display text-giant md:text-massive text-off-white mt-4">
                            CONNECT
                        </h2>
                        <p className="font-body text-lg text-light-grey mt-6 max-w-2xl">
                            Got a cool project? Want to chat about tech, AI, cars, or coffee? Hit me up.
                            I'm always down for interesting conversations.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Quick contact cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {contacts.map((contact, index) => {
                        const Icon = contact.icon;
                        return (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <motion.a
                                    href={contact.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.3 }}
                                    className="block p-6 bg-dark-grey border border-mid-grey hover:border-accent transition-colors group cursor-hover"
                                >
                                    <Icon className="w-6 h-6 text-light-grey mb-3 group-hover:text-accent transition-colors" />
                                    <h3 className="font-display text-xl text-off-white mb-1">
                                        {contact.label}
                                    </h3>
                                    <p className="font-mono text-tiny text-light-grey">{contact.value}</p>
                                </motion.a>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Contact form */}
                <ScrollReveal delay={0.4}>
                    <div className="max-w-2xl">
                        <h3 className="font-display text-3xl text-off-white mb-6">
                            Or just write me here
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="px-4 py-3 bg-dark-grey border border-mid-grey text-off-white font-body focus:border-accent focus:outline-none transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="px-4 py-3 bg-dark-grey border border-mid-grey text-off-white font-body focus:border-accent focus:outline-none transition-colors"
                                />
                            </div>
                            <textarea
                                placeholder="What's on your mind?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-dark-grey border border-mid-grey text-off-white font-body focus:border-accent focus:outline-none transition-colors resize-none"
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status === 'sending'}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-pure-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-off-white transition-colors disabled:opacity-50 cursor-hover"
                            >
                                <Send className="w-4 h-4" />
                                <span>{status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent! ✓' : 'Send Message'}</span>
                            </motion.button>
                            {status === 'error' && (
                                <p className="text-sm text-accent">Oops! Something went wrong. Try emailing me directly.</p>
                            )}
                        </form>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                    <div className="border-t border-mid-grey pt-12 mt-20 text-center">
                        <p className="font-mono text-tiny text-light-grey mb-2">
                            Built with React, TypeScript, Tailwind & Framer Motion
                        </p>
                        <p className="font-mono text-tiny text-mid-grey">
                            © 2026 Nitish Pandey • Cars × Code × Coffee
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
