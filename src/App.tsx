import { useTheme } from './context/ThemeContext';
import MatrixRain from './components/MatrixRain';
import NetworkNodes from './components/NetworkNodes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { theme } = useTheme();

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundColor: theme.background,
        '--primary-color': theme.primary,
        '--secondary-color': theme.secondary,
        '--accent-color': theme.accent,
      } as React.CSSProperties}
    >
      <style>{`
        :root {
          --primary-color: ${theme.primary};
          --secondary-color: ${theme.secondary};
          --accent-color: ${theme.accent};
        }
      `}</style>

      <MatrixRain />
      <NetworkNodes />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
