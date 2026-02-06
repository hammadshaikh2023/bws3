import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { 
  ArrowRight, Code, Globe, Smartphone, PenTool, Cpu, 
  Cloud, Briefcase, Shield, Link as LinkIcon, RefreshCw, 
  Layers 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Button from '../components/elements/Button';
import { SERVICES } from '../constants';
import { ServiceData } from '../types';

// --- CONFIG ---
const SERVICE_THEMES: Record<string, { color: string, gradient: string }> = {
  'web-dev': { color: '#00f2ff', gradient: 'from-cyan-400 via-blue-500 to-blue-600' }, // Electric Blue
  'mobile-apps': { color: '#bd00ff', gradient: 'from-purple-400 via-fuchsia-500 to-pink-600' }, // Neon Purple
  'ui-ux': { color: '#ff0099', gradient: 'from-pink-400 via-rose-500 to-red-500' }, // Hot Pink
  'ai-ml': { color: '#00ff66', gradient: 'from-emerald-400 via-green-500 to-teal-600' }, // Matrix Green
  'cloud': { color: '#3399ff', gradient: 'from-sky-400 via-blue-500 to-indigo-600' }, // Sky Blue
  'enterprise': { color: '#ff9900', gradient: 'from-amber-400 via-orange-500 to-red-600' }, // Amber
  'devops': { color: '#ff3333', gradient: 'from-red-400 via-red-500 to-rose-600' }, // Red
  'blockchain': { color: '#ffd700', gradient: 'from-yellow-300 via-amber-400 to-yellow-600' }, // Gold
  'modernization': { color: '#00cccc', gradient: 'from-teal-300 via-teal-400 to-emerald-600' } // Teal
};

// --- 3D BACKGROUND ---
const StarField = (props: any) => {
  const ref = useRef<any>();
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.002} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

// --- 3D TILT CARD COMPONENT ---
const ServiceCard3D: React.FC<{ service: ServiceData; index: number }> = ({ service, index }) => {
  const theme = SERVICE_THEMES[service.id] || { color: '#00f2ff', gradient: 'from-gray-400 to-gray-600' };
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Globe': <Globe size={32} />,
      'Smartphone': <Smartphone size={32} />,
      'PenTool': <PenTool size={32} />, 
      'Cpu': <Cpu size={32} />,
      'Cloud': <Cloud size={32} />,
      'Briefcase': <Briefcase size={32} />,
      'Shield': <Shield size={32} />,
      'Link': <LinkIcon size={32} />,
      'RefreshCw': <RefreshCw size={32} />
    };
    return icons[iconName] || <Code size={32} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full perspective-1000 group"
    >
      <Link to={`/services/${service.slug}`} className="block h-full">
        <div className="relative h-full bg-navy-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-white/20">
            {/* Dynamic Gradient Background Glow */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${theme.gradient} opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-500 rounded-full pointer-events-none`}></div>
            
            {/* Content Container with z-index to sit above glow */}
            <div className="relative z-10 flex flex-col h-full transform transition-transform duration-300" style={{ transform: "translateZ(20px)" }}>
                
                {/* Icon Box */}
                <div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${theme.gradient} p-[1px] mb-6 shadow-lg shadow-${theme.color}/20 group-hover:scale-110 transition-transform duration-300`}
                >
                    <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center text-white">
                        {getIcon(service.icon)}
                    </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {service.title}
                </h3>
                
                <p className="text-gray-400 mb-8 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.shortDescription}
                </p>

                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{ color: theme.color }}>
                    Explore Module <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesHub: React.FC = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bigwallsolutions.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bigwallsolutions.com/services" }
    ]
  };

  return (
    <>
      <SEOHead 
        meta={{
          title: "Our Services | Custom App & Web Development | Big Wall Solutions",
          description: "Explore our comprehensive digital services: mobile apps, web development, UI/UX design, AI integration, and more. Tailored solutions for your business.",
          keywords: ["services", "app development", "web design", "AI integration", "cloud architecture"],
          type: "service"
        }}
        schema={breadcrumbSchema}
      />

      <div className="relative bg-navy-950 min-h-screen">
          
          {/* Fixed Background Canvas */}
          <div className="fixed inset-0 z-0 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 1] }}>
                  <StarField />
              </Canvas>
          </div>

          <div className="relative z-10">
            {/* Hero */}
            <section className="pt-32 pb-16 text-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-electric/30 bg-electric/10 text-electric font-mono text-sm mb-6 backdrop-blur-md">
                        SYSTEM_MODULES_V3.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white drop-shadow-2xl">
                        Digital Capabilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-purple-500 to-pink-500">Unleashed</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        We don't just build software; we engineer competitive advantages. Select a module below to initialize your transformation.
                    </p>
                </motion.div>
            </section>

            {/* Grid */}
            <section className="py-12 px-6 pb-32">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {SERVICES.map((service, i) => (
                            <ServiceCard3D key={service.id} service={service} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Banner */}
            <section className="py-20 bg-navy-900/50 backdrop-blur-sm border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-mono text-gray-400 mb-12 uppercase tracking-widest">// Powered By Industry Standard Tech</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'TensorFlow', 'Kubernetes', 'Swift', 'Kotlin', 'Flutter', 'GraphQL'].map((tech, i) => (
                            <div key={i} className="px-6 py-3 bg-navy-800 rounded-lg border border-white/5 text-gray-300 font-bold hover:border-electric hover:text-white hover:bg-electric/10 transition-all cursor-default shadow-lg">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-electric/5 z-0"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Not sure which module you need?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Our strategists are ready to audit your current infrastructure and propose a tailored roadmap.
                    </p>
                    <Button to="/contact" className="px-12 py-5 text-lg shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                        Get a Free Architecture Audit
                    </Button>
                </div>
            </section>
          </div>
      </div>
    </>
  );
};

export default ServicesHub;