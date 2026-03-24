import { ScrollReveal } from '../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { GlitchHeader } from '../components/GlitchHeader';

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

/* ─── Floating Label Input ─── */
const FloatingInput = ({
    type = 'text',
    name,
    label,
    value,
    onChange,
    required = false,
    textarea = false,
}: {
    type?: string;
    name: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    textarea?: boolean;
}) => {
    const [focused, setFocused] = useState(false);
    const active = focused || value.length > 0;
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const sharedClass = `w-full px-4 pt-6 pb-2 bg-dark-grey border text-off-white font-body transition-all duration-300 focus:outline-none resize-none ${
        focused ? 'border-accent shadow-[0_0_0_1px_rgba(191,255,0,0.3)]' : 'border-mid-grey hover:border-light-grey/30'
    }`;

    return (
        <div className="relative group" onClick={() => inputRef.current?.focus()}>
            {/* Floating label */}
            <motion.label
                animate={{
                    y: active ? 0 : 8,
                    scale: active ? 0.75 : 1,
                    opacity: active ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-4 top-2 origin-left font-mono text-xs text-light-grey pointer-events-none z-10 uppercase tracking-wider"
            >
                {label}
            </motion.label>

            {textarea ? (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    rows={6}
                    className={sharedClass}
                />
            ) : (
                <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    className={sharedClass}
                />
            )}

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
            />
        </div>
    );
};

/* ─── Draggable Easter Egg ─── */
const DraggableCoffee = () => {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            initial={{ rotate: -15 }}
            whileHover={{ rotate: 15 }}
            className="absolute bottom-10 right-10 md:bottom-20 md:right-20 z-50 cursor-grab opacity-50 hover:opacity-100 transition-opacity"
            title="Drag me!"
        >
            <div className="relative group">
                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(191,255,0,0.5)]">☕</span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Fuel gauge
                </span>
            </div>
        </motion.div>
    );
};

export const Connect = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'' | 'sending' | 'sent' | 'error'>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const response = await fetch('https://formspree.io/f/mojnjbep', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 4000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(''), 4000);
        }
    };

    return (
        <section id="connect" className="min-h-screen flex items-center px-6 md:px-12 py-16 md:py-32 bg-pure-black relative overflow-hidden">
            <DraggableCoffee />
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <ScrollReveal>
                    <GlitchHeader title="CONNECT" subtitle="Let's Talk" />
                    <p className="font-body text-lg text-light-grey mt-6 max-w-2xl">
                        Always down to talk about tech, AI, or cars.
                        Drop me a line if you've got a cool project in mind or just want to talk shop over a coffee.
                    </p>
                </ScrollReveal>

                {/* Contact cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-12">
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
                                    className="block p-6 bg-dark-grey border border-mid-grey hover:border-accent transition-all duration-500 group cursor-hover relative overflow-hidden"
                                >
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <Icon className="w-6 h-6 text-light-grey mb-3 group-hover:text-accent transition-colors" />
                                        <h3 className="font-display text-xl text-off-white mb-1">
                                            {contact.label}
                                        </h3>
                                        <p className="font-mono text-tiny text-light-grey">{contact.value}</p>
                                    </div>
                                </motion.a>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Contact form */}
                <ScrollReveal delay={0.4}>
                    <div className="max-w-2xl">
                        <h3 className="font-display text-3xl text-off-white mb-8">
                            Or just write me here
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FloatingInput
                                    name="name"
                                    label="Your Name"
                                    value={formData.name}
                                    onChange={(v) => setFormData({ ...formData, name: v })}
                                    required
                                />
                                <FloatingInput
                                    type="email"
                                    name="email"
                                    label="Your Email"
                                    value={formData.email}
                                    onChange={(v) => setFormData({ ...formData, email: v })}
                                    required
                                />
                            </div>
                            <FloatingInput
                                name="message"
                                label="What's on your mind?"
                                value={formData.message}
                                onChange={(v) => setFormData({ ...formData, message: v })}
                                required
                                textarea
                            />

                            <div className="flex items-center gap-4">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'sending'}
                                    className={`inline-flex items-center gap-3 px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 cursor-hover ${
                                        status === 'sent'
                                            ? 'bg-green-500 text-pure-black'
                                            : status === 'error'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-accent text-pure-black hover:bg-off-white'
                                    }`}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-pure-black border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : status === 'sent' ? (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Sent Successfully!</span>
                                        </>
                                    ) : status === 'error' ? (
                                        <>
                                            <AlertCircle className="w-4 h-4" />
                                            <span>Failed — Try Again</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </ScrollReveal>

                {/* Footer */}
                <ScrollReveal delay={0.6}>
                    <div className="border-t border-mid-grey pt-12 mt-20">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                                <span className="font-display text-lg text-off-white">NP</span>
                                <span className="font-mono text-[10px] text-mid-grey">•</span>
                                <span className="font-mono text-tiny text-light-grey">
                                    100% Personal. Pure Coffee-Boosted Code. No UI Kits.
                                </span>
                            </div>
                            <p className="font-mono text-tiny text-mid-grey">
                                © 2026 Nitish Pandey • Cars × Code × Coffee
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
