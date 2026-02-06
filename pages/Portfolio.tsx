import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Filter } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, TorusKnot, Environment, Stars } from '@react-three/drei';
import SEOHead from '../components/SEOHead';
import { CASE_STUDIES } from '../constants';

// --- 3D BACKGROUND ---
const PortfolioBackground3D = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <TorusKnot args={[10, 3, 100, 16]} position={[-20, 10, -40]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color="#0a1628" emissive="#00f2ff" emissiveIntensity={0.2} wireframe />
                </TorusKnot>
            </Float>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                 <TorusKnot args={[8, 2, 100, 16]} position={[20, -10, -30]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#0a1628" emissive="#bd00ff" emissiveIntensity={0.2} wireframe />
                </TorusKnot>
            </Float>
        </group>
    );
};

interface PortfolioCardProps {
    study: any;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ study }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative perspective-1000 h-full"
    >
        <Link to={`/portfolio/${study.slug}`} className="block h-full">
            <div className="relative h-full bg-navy-900 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-electric/50 group-hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <span className="px-6 py-3 bg-electric text-navy-900 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Case Study <ArrowRight size={16} />
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow bg-navy-900/80 backdrop-blur-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-electric text-xs font-mono font-bold uppercase tracking-widest border border-electric/30 px-2 py-1 rounded bg-electric/5">{study.category}</div>
                        <div className="text-gray-500 text-xs font-mono">{study.client}</div>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-electric transition-colors">{study.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{study.summary}</p>
                    
                    <div className="flex gap-6 pt-6 border-t border-white/10">
                        {study.stats.map((stat: any, i: number) => (
                            <div key={i}>
                                <div className="text-lg font-bold text-white font-display">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(CASE_STUDIES.map(c => c.category)))];
  
  const filteredStudies = filter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === filter);

  return (
    <>
      <SEOHead 
        meta={{
          title: "Our Work | Big Wall Solutions Portfolio",
          description: "Explore our latest case studies in mobile app development, web design, and enterprise software.",
          keywords: ["portfolio", "case studies", "app showcase", "web development projects"],
          type: "website"
        }}
      />

      <div className="relative min-h-screen bg-navy-950">
        
        {/* Fixed 3D Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 20] }}>
                <PortfolioBackground3D />
            </Canvas>
        </div>

        <div className="relative z-10">
            {/* Header */}
            <section className="pt-32 pb-16 text-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 text-white drop-shadow-2xl">
                        Engineered for <span className="text-electric">Impact</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                        We don't just ship code; we deliver measurable business outcomes. Explore our archive of digital breakthroughs.
                    </p>
                    
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                            filter === cat 
                                ? 'bg-electric text-navy-900 border-electric shadow-[0_0_20px_rgba(0,242,255,0.4)]' 
                                : 'bg-navy-900/50 backdrop-blur-md text-gray-400 border-white/10 hover:border-white/40 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Grid */}
            <section className="pb-32 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {filteredStudies.map((study) => (
                            <PortfolioCard key={study.id} study={study} />
                        ))}
                    </div>
                    
                    {filteredStudies.length === 0 && (
                        <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </section>
        </div>
      </div>
    </>
  );
};

export default Portfolio;