import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [selectedImage, setSelectedImage] = useState<typeof photos[0] | null>(null);

    const handleImageLoad = (id: number) => {
        setLoadedImages(prev => new Set(prev).add(id));
    };

    // Close lightbox on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section className="min-h-screen px-6 md:px-12 py-20 bg-dark-grey relative overflow-hidden">
            {/* Fun floating element */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 right-20 text-6xl opacity-10 pointer-events-none hidden md:block"
            >
                🏎️
            </motion.div>

            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="mb-16">
                        <span className="font-mono text-tiny text-light-grey tracking-widest uppercase">Through My Lens</span>
                        <h2 className="font-display text-giant md:text-massive text-off-white mt-4">
                            AUTOMOTIVE
                        </h2>
                        <p className="font-body text-lg text-off-white mt-6 max-w-2xl">
                            Cars aren't just machines. They're art, engineering, and pure emotion on wheels.
                            <span className="text-light-grey italic"> This is how I see them.</span>
                        </p>
                    </div>
                </ScrollReveal>

                {/* Interactive grid with progressive loading */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {photos.map((photo, index) => (
                        <ScrollReveal key={photo.id} delay={index * 0.05}>
                            <motion.div
                                onHoverStart={() => setHoveredId(photo.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                onClick={() => setSelectedImage(photo)}
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="aspect-square bg-mid-grey border border-dark-grey hover:border-accent transition-all duration-500 cursor-hover group relative overflow-hidden"
                            >
                                {/* Loading skeleton / blur background */}
                                {!loadedImages.has(photo.id) && (
                                    <div className="absolute inset-0 bg-mid-grey flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-20" />
                                    </div>
                                )}

                                {/* Actual image with lazy loading and optimization */}
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(photo.id)}
                                    className={`w-full h-full object-cover transition-all duration-700 ${loadedImages.has(photo.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-110 blur-sm'
                                        } group-hover:scale-110`}
                                    style={{
                                        imageRendering: 'auto',
                                    }}
                                />

                                {/* Hover overlay with fun effect */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredId === photo.id ? 1 : 0 }}
                                    className="absolute inset-0 bg-pure-black bg-opacity-40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-all duration-300"
                                >
                                    <motion.span
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: hoveredId === photo.id ? 0 : 20, opacity: hoveredId === photo.id ? 1 : 0 }}
                                        className="font-display text-3xl md:text-4xl text-off-white"
                                    >
                                        {photo.title}
                                    </motion.span>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: hoveredId === photo.id ? 0 : 20, opacity: hoveredId === photo.id ? 1 : 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="mt-2 text-accent"
                                    >
                                        <Maximize2 className="w-6 h-6" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Instagram CTA */}
                <ScrollReveal delay={0.4}>
                    <div className="text-center">
                        <MagneticButton
                            href="https://www.instagram.com/nitishxpandey/"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-off-white text-pure-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-accent transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                            <span>See More on Instagram</span>
                        </MagneticButton>
                    </div>
                </ScrollReveal>
            </div>

            {/* Lightbox / Full view */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-pure-black bg-opacity-95 flex items-center justify-center p-4 md:p-12 cursor-pointer"
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
                                className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain border border-mid-grey shadow-2xl"
                            />
                            <div className="absolute -bottom-16 left-0 w-full text-center">
                                <h3 className="font-display text-4xl text-off-white">{selectedImage.title}</h3>
                                <p className="font-mono text-tiny text-light-grey mt-2 tracking-widest uppercase cursor-pointer">
                                    Click anywhere to close × Esc
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
