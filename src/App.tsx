import { CustomCursor } from './components/CustomCursor';
import { GrainyOverlay } from './components/GrainyOverlay';
import { NoiseBackground } from './components/NoiseBackground';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Gallery } from './sections/AutomotiveGallery';
import { Connect } from './sections/Connect';

import { ScrollProgress } from './components/ScrollProgress';
import { Spotlight } from './components/Spotlight';
import { DebugProvider } from './context/DebugContext';
import { DebugToggle } from './components/DebugToggle';

function App() {
    return (
        <DebugProvider>
            <ScrollProgress />
            <Spotlight />
            <DebugToggle />
            <CustomCursor />
            <GrainyOverlay />
            <NoiseBackground />
            <CommandPalette />
            <Hero />
            <About />
            <Gallery />
            <Connect />
        </DebugProvider>
    );
}

export default App;
