import React, { useState, useRef, Suspense } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Icosahedron, Environment, ContactShadows } from '@react-three/drei';
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, Star, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import SEOHead from '../components/SEOHead';
import Button from '../components/elements/Button';

// --- CONFIG ---
const SERVICE_THEMES: Record<string, { color: string, gradient: string, accent: string }> = {
  'web-dev': { color: '#00f2ff', gradient: 'from-cyan-400 to-blue-600', accent: 'cyan' },
  'mobile-apps': { color: '#bd00ff', gradient: 'from-purple-400 to-pink-600', accent: 'purple' },
  'ui-ux': { color: '#ff0099', gradient: 'from-pink-400 to-rose-600', accent: 'pink' },
  'ai-ml': { color: '#00ff66', gradient: 'from-emerald-400 to-green-600', accent: 'emerald' },
  'cloud': { color: '#3399ff', gradient: 'from-sky-400 to-indigo-600', accent: 'sky' },
  'enterprise': { color: '#ff9900', gradient: 'from-amber-400 to-orange-600', accent: 'orange' },
  'devops': { color: '#ff3333', gradient: 'from-red-400 to-rose-600', accent: 'red' },
  'blockchain': { color: '#ffd700', gradient: 'from-yellow-400 to-amber-600', accent: 'yellow' },
  'modernization': { color: '#00cccc', gradient: 'from-teal-400 to-emerald-600', accent: 'teal' }
};

// --- 3D HERO ELEMENTS ---
const ServiceHero3D = ({ id, color }: { id: string, color: string }) => {
    const meshRef = useRef<any>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    const Material = <MeshDistortMaterial color={color} speed={2} distort={0.4} roughness={0.2} metalness={0.8} />;

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Render different geometry based on service ID */}
                {id === 'web-dev' && (
                    <Icosahedron ref={meshRef} args={[2.5, 0]} position={[0,0,0]}>
                        {Material}
                    </Icosahedron>
                )}
                {id === 'mobile-apps' && (
                    <group ref={meshRef}>
                         <Box args={[2, 3.5, 0.2]} position={[0,0,0]} radius={0.2}>
                            {Material}
                         </Box>
                         <Torus args={[2.5, 0.1, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
                            <meshStandardMaterial color="white" emissive={color} emissiveIntensity={2} />
                         </Torus>
                    </group>
                )}
                {id === 'ai-ml' && (
                     <Sphere ref={meshRef} args={[2.2, 64, 64]}>
                        <MeshDistortMaterial color={color} speed={4} distort={0.6} roughness={0.1} />
                     </Sphere>
                )}
                {id === 'blockchain' && (
                    <group ref={meshRef}>
                        <Box args={[2, 2, 2]}>
                            <meshStandardMaterial color={color} wireframe />
                        </Box>
                        <Box args={[1.5, 1.5, 1.5]} rotation={[1, 1, 0]}>
                            {Material}
                        </Box>
                    </group>
                )}
                {!['web-dev', 'mobile-apps', 'ai-ml', 'blockchain'].includes(id) && (
                    <Torus ref={meshRef} args={[2, 0.6, 32, 100]}>
                        {Material}
                    </Torus>
                )}
            </Float>
            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color={color} intensity={5} />
        </group>
    );
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', budget: '', details: '', platforms: { ios: false, android: false } });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) return <Navigate to="/services" replace />;

  const theme = SERVICE_THEMES[service.id] || { color: '#ffffff', gradient: 'from-gray-500 to-gray-700', accent: 'gray' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const relatedServices = service.relatedServices 
    ? SERVICES.filter(s => service.relatedServices?.includes(s.id) || service.relatedServices?.includes(s.slug))
    : [];

  return (
    <>
      <SEOHead meta={service.meta} />
      
      {/* 3D Hero Section */}
      <section className="relative pt-32 pb-20 min-h-[80vh] flex items-center overflow-hidden bg-navy-950">
        {/* Background Gradient Mesh */}
        <div className={`absolute top-[-50%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br ${theme.gradient} opacity-20 blur-[120px] rounded-full z-0`}></div>
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }}
            >
                <Link to="/services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
                    <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} /> Back to Hub
                </Link>
                <div className={`inline-block px-3 py-1 rounded border mb-6 text-sm font-bold uppercase tracking-wider`} style={{ borderColor: theme.color, color: theme.color, backgroundColor: `${theme.color}10` }}>
                    Module: {service.title}
                </div>
                <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 text-white leading-tight">
                    {service.title.split(' ')[0]} <br/>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>
                        {service.title.split(' ').slice(1).join(' ')}
                    </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-lg">
                    {service.fullDescription}
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <Button 
                        onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'})} 
                        className={`px-8 py-4 border-none shadow-[0_0_20px_${theme.color}40] bg-gradient-to-r ${theme.gradient} text-white`}
                    >
                        Initialize Project
                    </Button>
                    {service.stats && (
                        <div className="flex gap-6 items-center px-6 border-l border-gray-700">
                            {service.stats.slice(0, 1).map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* 3D Canvas */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1 }}
                className="h-[500px] w-full relative"
            >
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <Suspense fallback={null}>
                        <ServiceHero3D id={service.id} color={theme.color} />
                    </Suspense>
                </Canvas>
            </motion.div>
        </div>
      </section>

      {/* Problem / Solution Split */}
      <section className="py-24 bg-navy-900 relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 relative z-10">
          <div className="bg-navy-800/50 p-8 rounded-2xl border border-red-500/20">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div> The Friction
            </h3>
            <h2 className="text-3xl font-display font-bold mb-4 text-white">Why standard solutions fail</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{service.problem}</p>
          </div>
          <div className="bg-navy-800/50 p-8 rounded-2xl border border-green-500/20" style={{ borderColor: `${theme.color}30` }}>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: theme.color }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }}></div> The Solution
            </h3>
            <h2 className="text-3xl font-display font-bold mb-4 text-white">Engineering for scale</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{service.solution}</p>
          </div>
        </div>
      </section>

      {/* Interactive Process Steps */}
      <section className="py-24 bg-navy-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
            Execution <span style={{ color: theme.color }}>Protocol</span>
          </h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-navy-800 -translate-y-1/2 hidden md:block z-0"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {service.process.map((step, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="group"
                    >
                        <div className="bg-navy-900 border border-navy-700 p-6 rounded-2xl relative hover:-translate-y-2 transition-transform duration-300 h-full hover:border-white/20">
                            <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center font-bold text-xl shadow-lg transition-colors group-hover:text-white" style={{ backgroundColor: `${theme.color}20`, color: theme.color }}>
                                {step.step}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Tech Stack */}
      <section className="py-24 bg-navy-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-12">Core Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.techStack.map((tech, i) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-8 py-4 bg-navy-800 rounded-xl border border-navy-700 text-white font-bold text-lg hover:border-white/30 transition-all cursor-default shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                style={{ borderBottomColor: theme.color, borderBottomWidth: '2px' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form with Theme */}
      <section id="contact-form" className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b from-navy-950 to-${theme.accent}-900/20`}></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="bg-navy-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold mb-4">Initialize {service.title}</h2>
                <p className="text-gray-400">Configure your project parameters below.</p>
            </div>
            
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500/20 text-green-500">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Request Transmitted</h3>
                <p className="text-gray-400">Our systems are processing your data. Expect contact within 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" required className="w-full bg-navy-900 border border-navy-600 rounded-xl p-4 text-white focus:border-white/50 focus:ring-0 outline-none transition-all" />
                  <input type="email" placeholder="Work Email" required className="w-full bg-navy-900 border border-navy-600 rounded-xl p-4 text-white focus:border-white/50 focus:ring-0 outline-none transition-all" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <input type="tel" placeholder="Phone (Optional)" className="w-full bg-navy-900 border border-navy-600 rounded-xl p-4 text-white focus:border-white/50 focus:ring-0 outline-none transition-all" />
                   <input type="text" placeholder="Company Name" className="w-full bg-navy-900 border border-navy-600 rounded-xl p-4 text-white focus:border-white/50 focus:ring-0 outline-none transition-all" />
                </div>

                <select required className="w-full bg-navy-900 border border-navy-600 rounded-xl p-4 text-white focus:border-white/50 focus:ring-0 outline-none transition-all">
                    <option value="">Select Estimated Budget...</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                </select>

                <textarea required rows={4} placeholder="Brief project details..." className="w-full bg-navy-900 border border-navy-600 rounded-xl p-4 text-white focus:border-white/50 focus:ring-0 outline-none transition-all"></textarea>
                
                <Button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full py-5 text-lg font-bold uppercase tracking-widest shadow-lg"
                  style={{ backgroundColor: theme.color, color: '#000' }}
                >
                  {formStatus === 'submitting' ? 'Transmitting...' : 'Launch Project Request'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;