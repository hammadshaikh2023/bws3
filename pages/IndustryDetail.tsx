import React, { useRef, Suspense } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Box, Icosahedron, Octahedron, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';
import { ArrowRight, CheckCircle, Shield, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { INDUSTRIES, CASE_STUDIES } from '../constants';
import SEOHead from '../components/SEOHead';
import Button from '../components/elements/Button';

// --- 3D ABSTRACT OBJECTS ---

const IndustryHeroObject = ({ type, color }: { type: string, color: string }) => {
    const meshRef = useRef<any>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    const materialProps = { color: color, emissive: color, emissiveIntensity: 0.2, roughness: 0.2, metalness: 0.8 };

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* FinTech: Gold Coin / Token */}
                {type === 'fintech' && (
                    <group ref={meshRef} rotation={[Math.PI/2, 0, 0]}>
                        <Torus args={[2.5, 0.8, 16, 100]}>
                            <MeshDistortMaterial {...materialProps} distort={0.3} speed={2} />
                        </Torus>
                        <Box args={[1.5, 3, 0.5]} position={[0,0,0]}>
                             <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
                        </Box>
                    </group>
                )}
                
                {/* Healthcare: Cross / DNA Abstract */}
                {type === 'healthcare' && (
                    <group ref={meshRef}>
                        <Box args={[1, 4, 1]}>
                            <MeshDistortMaterial {...materialProps} distort={0.4} speed={3} />
                        </Box>
                        <Box args={[4, 1, 1]}>
                            <MeshDistortMaterial {...materialProps} distort={0.4} speed={3} />
                        </Box>
                    </group>
                )}

                {/* Logistics: Box / Cube */}
                {type === 'logistics' && (
                    <Box ref={meshRef} args={[3, 3, 3]}>
                        <meshStandardMaterial color={color} wireframe />
                        <Box args={[2.5, 2.5, 2.5]}>
                             <MeshDistortMaterial {...materialProps} distort={0.2} speed={5} />
                        </Box>
                    </Box>
                )}

                {/* E-Commerce: Abstract Bag / Tag */}
                {type === 'ecommerce' && (
                    <Octahedron ref={meshRef} args={[2.5, 0]}>
                        <MeshDistortMaterial {...materialProps} distort={0.6} speed={2} />
                    </Octahedron>
                )}

                {/* Default Fallback */}
                {!['fintech', 'healthcare', 'logistics', 'ecommerce'].includes(type) && (
                    <Icosahedron ref={meshRef} args={[2.5, 0]}>
                        <MeshDistortMaterial {...materialProps} distort={0.5} speed={2} />
                    </Icosahedron>
                )}
            </Float>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
        </group>
    );
};

const IndustryDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const industry = INDUSTRIES.find(i => i.slug === slug);

    if (!industry) return <Navigate to="/industries" replace />;

    // Find a relevant case study if available (basic matching logic)
    const caseStudy = CASE_STUDIES.find(c => c.category.toLowerCase().includes(industry.slug) || c.category.toLowerCase() === industry.id);

    return (
        <>
            <SEOHead meta={industry.meta} />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 min-h-[85vh] flex items-center overflow-hidden bg-navy-950">
                {/* Background Glow */}
                <div 
                    className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[150px] pointer-events-none"
                    style={{ backgroundColor: industry.color }}
                ></div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <Link to="/industries" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group text-sm font-mono uppercase tracking-widest">
                            <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} /> Industries Hub
                        </Link>
                        
                        <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-white leading-tight">
                            {industry.title} <br/>
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #fff, ${industry.color})` }}>
                                Solutions
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-lg border-l-2 pl-6" style={{ borderColor: industry.color }}>
                            {industry.fullDescription}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button to="/contact" className="px-8 py-4 shadow-lg" style={{ backgroundColor: industry.color, color: '#000' }}>
                                Start {industry.title} Project
                            </Button>
                            <div className="flex gap-8 items-center px-6">
                                {industry.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-bold text-white font-display">{stat.value}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="h-[500px] w-full relative">
                        <Canvas camera={{ position: [0, 0, 6] }}>
                            <Suspense fallback={null}>
                                <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                                <IndustryHeroObject type={industry.id} color={industry.color} />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </section>

            {/* CHALLENGES GRID */}
            <section className="py-24 bg-navy-900 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-sm font-mono uppercase tracking-widest" style={{ color: industry.color }}>// Sector Friction</span>
                        <h2 className="text-4xl font-display font-bold mt-2">The Challenges You Face</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {industry.challenges.map((challenge, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-navy-800 p-8 rounded-2xl border border-white/5 hover:border-red-500/50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-navy-950 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{challenge.title}</h3>
                                <p className="text-gray-400">{challenge.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUTIONS GRID */}
            <section className="py-24 bg-navy-950 border-t border-white/5">
                <div className="container mx-auto px-6">
                     <div className="text-center mb-16">
                        <span className="text-sm font-mono uppercase tracking-widest text-electric">// Our Protocol</span>
                        <h2 className="text-4xl font-display font-bold mt-2">Engineered Solutions</h2>
                    </div>

                    <div className="space-y-8">
                        {industry.solutions.map((sol, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex flex-col md:flex-row gap-8 items-center bg-navy-900/50 p-8 rounded-2xl border border-white/10 hover:border-electric/50 transition-all"
                             >
                                <div className="md:w-1/3 flex justify-center md:justify-start">
                                    <div className="text-5xl font-display font-bold opacity-20" style={{ color: industry.color }}>0{i+1}</div>
                                </div>
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                        {sol.title} <CheckCircle size={20} style={{ color: industry.color }} />
                                    </h3>
                                    <p className="text-gray-400 text-lg">{sol.desc}</p>
                                </div>
                             </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CASE STUDY HIGHLIGHT */}
            {caseStudy && (
                <section className="py-24 bg-navy-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="bg-navy-800 border border-white/10 rounded-3xl overflow-hidden grid md:grid-cols-2">
                            <div className="p-12 flex flex-col justify-center">
                                <div className="inline-block px-3 py-1 rounded bg-navy-950 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6 w-fit">
                                    Featured Case Study
                                </div>
                                <h2 className="text-4xl font-display font-bold mb-4">{caseStudy.title}</h2>
                                <p className="text-gray-400 mb-8 text-lg">{caseStudy.summary}</p>
                                
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    {caseStudy.stats.map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-3xl font-bold text-white" style={{ color: industry.color }}>{stat.value}</div>
                                            <div className="text-xs text-gray-500 uppercase">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <Button to={`/portfolio/${caseStudy.slug}`} variant="outline" className="w-fit">
                                    Read Full Case Study
                                </Button>
                            </div>
                            <div className="h-full min-h-[300px] relative">
                                <img src={caseStudy.image} alt={caseStudy.title} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-l from-navy-800 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-display font-bold mb-8">Ready to dominate the {industry.title} sector?</h2>
                    <Button to="/contact" className="px-12 py-5 text-xl shadow-2xl" style={{ backgroundColor: industry.color, color: '#000' }}>
                        Start Discussion
                    </Button>
                </div>
            </section>
        </>
    );
};

export default IndustryDetail;