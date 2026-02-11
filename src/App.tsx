import { CustomCursor } from './components/CustomCursor';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Gallery } from './sections/AutomotiveGallery';
import { Connect } from './sections/Connect';

function App() {
    return (
        <>
            <CustomCursor />
            <Hero />
            <About />
            <Gallery />
            <Connect />
        </>
    );
}

export default App;
