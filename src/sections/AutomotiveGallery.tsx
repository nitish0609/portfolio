import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GlitchHeader } from '../components/GlitchHeader';

const photos = [
    { id: 1, title: 'Ferocity', src: '/gallery/car1.jpg' },
    { id: 2, title: 'Stance', src: '/gallery/car2.jpg' },
    { id: 3, title: 'Icon', src: '/gallery/car3.jpg' },
    { id: 4, title: 'Momentum', src: '/gallery/car4.jpg' },
    { id: 5, title: 'Retro', src: '/gallery/car5.jpg' },
    { id: 6, title: 'Heritage', src: '/gallery/car6.jpg' },
    { id: 7, title: 'Theatre', src: '/gallery/car7.jpg' },
    { id: 8, title: 'Elegance', src: '/gallery/car8.jpg' },
    { id: 9, title: 'Lineage', src: '/gallery/car9.jpg' },
];

export const Gallery = () => {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [selectedImage, setSelectedImage] = useState<typeof photos[0] | null>(null);

    const handleImageLoad = (id: number) => {
        setLoadedImages(prev => new Set(prev).add(id));
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section id="gallery" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-pure-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="mb-20 overflow-visible">
                        <GlitchHeader title="AUTOMOTIVE" subtitle="Through My Lens" />
                        <p className="font-body text-lg text-off-white mt-6 max-w-2xl">
                            Cars are more than just machines . they're engineering as art. I shoot them to capture the form and the light that usually goes unnoticed.
                            <span className="text-light-grey italic block mt-2"> Low on edits, high on soul.</span>
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                    {photos.map((photo) => (
                        <ScrollReveal key={photo.id}>
                            <div
                                onClick={() => setSelectedImage(photo)}
                                className="relative aspect-[4/5] bg-mid-grey border border-dark-grey hover:border-accent hover:-translate-y-2 transition-all duration-500 cursor-hover group overflow-hidden"
                            >
                                {!loadedImages.has(photo.id) && (
                                    <div className="absolute inset-0 bg-mid-grey flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-20" />
                                    </div>
                                )}
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(photo.id)}
                                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${loadedImages.has(photo.id) ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
                                />
                                <div className="absolute inset-0 bg-pure-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                    <span className="font-display text-4xl text-off-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {photo.title}
                                    </span>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.4}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-mid-grey/30 pt-12">
                        <p className="font-mono text-tiny text-light-grey uppercase tracking-widest">
                            [ Focused on the mechanical soul ]
                        </p>
                        <MagneticButton
                            href="https://www.instagram.com/nitishxpandey/"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-off-white text-pure-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-accent transition-colors w-full md:w-auto justify-center"
                        >
                            <Instagram className="w-5 h-5" />
                            <span>Full Gallery on Instagram</span>
                        </MagneticButton>
                    </div>
                </ScrollReveal>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-pure-black/95 flex items-center justify-center p-4 md:p-12 cursor-pointer backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-full max-h-full"
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[80vh] object-contain border border-mid-grey"
                            />
                            <div className="mt-8 text-center">
                                <h3 className="font-display text-4xl text-off-white">{selectedImage.title}</h3>
                                <p className="font-mono text-tiny text-light-grey mt-2">CLOSE × ESC</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
