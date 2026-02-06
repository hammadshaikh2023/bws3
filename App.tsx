import React, { Suspense, useEffect, ErrorInfo, ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Canvas } from '@react-three/fiber';
import { Float, Box, Wireframe } from '@react-three/drei';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import ServicesHub from './pages/ServicesHub';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Button from './components/elements/Button';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

// Error Boundary to prevent white screen of death
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-navy-900 text-white p-4">
          <div className="max-w-xl w-full bg-navy-800 p-8 rounded-lg border border-red-500/50 shadow-2xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">System Malfunction</h2>
            <p className="mb-4 text-gray-300">Critical error in render pipeline.</p>
            <pre className="bg-black/50 p-4 rounded text-sm font-mono overflow-auto max-h-48 text-red-200">
              {this.state.error?.toString()}
            </pre>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-2 bg-electric text-navy-900 font-bold rounded-full hover:bg-white transition-colors"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 3D Placeholder Graphic
const ConstructionCube = () => (
    <group rotation={[0.5, 0.5, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Box args={[2, 2, 2]}>
                <meshStandardMaterial color="#0a1628" transparent opacity={0.8} />
                <Wireframe stroke={"#00f2ff"} thickness={0.05} />
            </Box>
        </Float>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00f2ff" />
    </group>
);

// Placeholder for incomplete pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="pt-32 pb-20 container mx-auto px-6 text-center min-h-[80vh] flex flex-col items-center justify-center">
    <div className="h-64 w-full mb-8">
        <Canvas>
            <ConstructionCube />
        </Canvas>
    </div>
    <div className="inline-block px-3 py-1 border border-electric/30 text-electric rounded-full text-xs font-mono mb-6 animate-pulse">
        STATUS: UNDER_DEVELOPMENT
    </div>
    <h1 className="text-5xl font-display font-bold mb-6 text-white">{title}</h1>
    <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
      We are currently architecting this module. Our team is ready to discuss {title.toLowerCase()} requirements immediately via direct link.
    </p>
    <div className="flex justify-center">
      <Button to="/contact" className="px-10 py-4 text-lg shadow-[0_0_20px_rgba(0,242,255,0.3)]">
         Initiate Contact
      </Button>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <HashRouter>
          <Layout>
            <ScrollToTop />
            <Routes>
              {/* Removed Suspense here as Home is not lazy loaded. 
                  3D asset loading is handled internally in Home.tsx */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Services */}
              <Route path="/services" element={<ServicesHub />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              
              {/* Industries */}
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />
              
              {/* Portfolio */}
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PlaceholderPage title="Case Study" />} />
              
              {/* Contact */}
              <Route path="/contact" element={<Contact />} />
              
              {/* Remaining Placeholders */}
              <Route path="/careers" element={<PlaceholderPage title="Careers Portal" />} />
              <Route path="/blog" element={<PlaceholderPage title="Data Insights" />} />
              <Route path="/blog/:slug" element={<PlaceholderPage title="Article" />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;