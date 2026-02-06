import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Stars, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { Landmark, HeartPulse, ShoppingCart, Truck, MonitorPlay, GraduationCap, Building, ArrowRight, Activity, Zap } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { INDUSTRIES } from '../constants';
import Button from '../components/elements/Button';

// --- 3D CITY HERO ---

const MovingParticles = ({ count = 200 }) => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 40;
            const z = (Math.random() - 0.5) * 40;
            const y = Math.random() * 10;
            const speed = Math.random() * 0.1 + 0.02;
            temp.push({ x, y, z, speed, offset: Math.random() * 100 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            const t = state.clock.elapsedTime;
            // Move along Z axis
            p.z = ((p.z + p.speed + 20) % 40) - 20; 
            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(0.05, 0.05, 0.5); // Elongated "light" streak
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#00f2ff" />
        </instancedMesh>
    );
};

const CityBlock: React.FC<{ position: [number, number, number], height: number, color: string }> = ({ position, height, color }) => (
    <mesh position={[position[0], height/2 - 5, position[2]]}>
        <boxGeometry args={[1.5, height, 1.5]} />
        <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
        />
    </mesh>
);

const FutureCity = () => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
        }
    });

    // Procedural City Generation
    const blocks = useMemo(() => {
        const b = [];
        for (let x = -8; x <= 8; x+=2) {
            for (let z = -8; z <= 8; z+=2) {
                if (Math.random() > 0.3) {
                    const height = Math.random() * 8 + 2;
                    const color = Math.random() > 0.9 ? '#00f2ff' : Math.random() > 0.9 ? '#bd00ff' : '#0a1628';
                    b.push({ x, z, height, color });
                }
            }
        }
        return b;
    }, []);

    return (
        <group ref={group} rotation={[0.2, 0, 0]}>
            <ambientLight intensity={0.2} />
            <pointLight position={[20, 20, 20]} intensity={1} color="#00f2ff" />
            <pointLight position={[-20, 10, -20]} intensity={2} color="#bd00ff" />
            
            {blocks.map((b, i) => (
                <CityBlock key={i} position={[b.x, 0, b.z]} height={b.height} color={b.color} />
            ))}
            
            <MovingParticles count={150} />
            
            {/* Fog for depth */}
            <fog attach="fog" args={['#02040a', 5, 35]} />
            
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
        </group>
    );
};

// --- COMPONENT ---

const Industries: React.FC = () => {
  const getIcon = (name: string) => {
      const map: Record<string, React.ReactNode> = {
          'Landmark': <Landmark size={32} />,
          'HeartPulse': <HeartPulse size={32} />,
          'ShoppingCart': <ShoppingCart size={32} />,
          'Truck': <Truck size={32} />,
          'MonitorPlay': <MonitorPlay size={32} />,
          'GraduationCap': <GraduationCap size={32} />,
          'Building': <Building size={32} />
      };
      return map[name] || <Activity size={32} />;
  };

  return (
    <>
      <SEOHead 
        meta={{
          title: "Industries We Serve | Big Wall Solutions",
          description: "Specialized digital solutions for FinTech, Healthcare, E-Commerce, and more. We understand your industry's unique challenges.",
          keywords: ["fintech development", "healthcare software", "ecommerce solutions"],
          type: "service"
        }}
      />

      <div className="bg-navy-950 min-h-screen">
          
          {/* 3D Hero */}
          <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/20 to-navy-950 z-10 pointer-events-none"></div>
              
              <div className="absolute inset-0 z-0">
                  <Canvas camera={{ position: [0, 5, 15], fov: 40 }}>
                      <FutureCity />
                  </Canvas>
              </div>
              
              <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/30 bg-navy-900/80 backdrop-blur-md text-electric text-xs font-mono mb-6 shadow-lg shadow-electric/10">
                        <Zap size={12} className="fill-electric" /> SECTOR_SPECIFIC_INTELLIGENCE
                     </div>
                     <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
                        Domain <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-500">Mastery</span>
                     </h1>
                     <p className="text-xl text-gray-300 backdrop-blur-md bg-navy-950/40 p-6 rounded-2xl border border-white/5 leading-relaxed">
                        Generic software fails in specific contexts. We deploy specialized engineering squads that understand the regulatory, technical, and operational nuances of your industry.
                     </p>
                 </motion.div>
              </div>
          </section>

          {/* Industry Grid */}
          <section className="py-20 px-6 pb-40 relative z-20 -mt-20">
             <div className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {INDUSTRIES.map((ind, i) => (
                        <motion.div 
                            key={ind.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link to={`/industries/${ind.slug}`} className="block h-full group perspective-1000">
                                <div 
                                    className="bg-navy-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:border-opacity-50"
                                    style={{ borderColor: `${ind.color}30` }}
                                >
                                    {/* Hover Gradient Background */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(to bottom right, ${ind.color}, transparent)` }}
                                    ></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div 
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-300 shadow-lg group-hover:scale-110 group-hover:rotate-3"
                                                style={{ backgroundColor: `${ind.color}20`, color: ind.color }}
                                            >
                                                {getIcon(ind.icon)}
                                            </div>
                                            <div className="px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 text-gray-400 uppercase tracking-wider group-hover:text-white group-hover:border-white/30 transition-colors">
                                                Explore
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-display font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, #fff, ${ind.color})` }}>
                                            {ind.title}
                                        </h3>
                                        
                                        <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {ind.shortDescription}
                                        </p>
                                        
                                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all translate-y-2 group-hover:translate-y-0 opacity-80 group-hover:opacity-100" style={{ color: ind.color }}>
                                            View Solutions <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
             </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-24 bg-navy-900 border-t border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
             <div className="container mx-auto px-6 text-center relative z-10">
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Don't see your sector?</h2>
                 <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                     Our engineering principles are universal. We adapt our core architecture to fit any industry requirement.
                 </p>
                 <Button to="/contact" className="px-12 py-5 text-lg">
                     Consult an Architect
                 </Button>
             </div>
          </section>
      </div>
    </>
  );
};

export default Industries;