import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { GrainyOverlay } from './components/GrainyOverlay';
import { NoiseBackground } from './components/NoiseBackground';
import { CommandPalette } from './components/CommandPalette';
import { ScrollProgress } from './components/ScrollProgress';
import { Spotlight } from './components/Spotlight';
import { DebugProvider } from './context/DebugContext';
import { DebugToggle } from './components/DebugToggle';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Mastery } from './sections/Mastery';
import { Playground } from './sections/Playground';
import { Gallery } from './sections/AutomotiveGallery';
import { Connect } from './sections/Connect';

function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <DebugProvider>
            <AnimatePresence mode="wait">
                {!loaded && <Preloader key="preloader" onComplete={() => setLoaded(true)} />}
            </AnimatePresence>

            {loaded && (
                <>
                    <ScrollProgress />
                    <Spotlight />
                    <DebugToggle />
                    <CustomCursor />
                    <GrainyOverlay />
                    <NoiseBackground />
                    <CommandPalette />
                    <Navigation />
                    <Hero />
                    <About />
                    <Mastery />
                    <Playground />
                    <Gallery />
                    <Connect />
                </>
            )}
        </DebugProvider>
    );
}

export default App;
