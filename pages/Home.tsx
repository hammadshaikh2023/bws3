import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Text, 
  Stars, 
  Image,
  MeshDistortMaterial,
  Grid,
  useTexture
} from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Smartphone, Cpu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/elements/Button';
import SEOHead from '../components/SEOHead';

// --- 3D COMPONENTS ---

const MagicalSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
        // Rotate the sphere slowly to shift reflections
        sphereRef.current.rotation.y = t * 0.1;
        sphereRef.current.rotation.z = t * 0.05;
    }
    if (lightRef.current) {
        // Rotate lights around the sphere
        lightRef.current.rotation.y = t * 0.5;
        lightRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group position={[0, 0, -2]}>
        {/* Main Liquid Sphere */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={sphereRef} scale={2.2}>
                <sphereGeometry args={[1, 128, 128]} />
                {/* 
                   MeshDistortMaterial creates the "magical" liquid effect.
                   We use a high distortion and speed for the fluid look.
                */}
                <MeshDistortMaterial 
                    color="#050a14" 
                    emissive="#1a0b2e"
                    emissiveIntensity={0.5}
                    roughness={0.1} 
                    metalness={1} 
                    distort={0.55} 
                    speed={3}
                    reflectivity={1}
                />
            </mesh>
        </Float>

        {/* Outer Tech Ring 1 */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0}>
             <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[3.2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
             </mesh>
        </Float>

        {/* Outer Tech Ring 2 */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0}>
             <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[3.8, 0.01, 16, 100]} />
                <meshStandardMaterial color="#bd00ff" emissive="#bd00ff" emissiveIntensity={2} />
             </mesh>
        </Float>

        {/* Dynamic Lights Orbiting the Sphere for Reflections */}
        <group ref={lightRef}>
             <pointLight position={[4, 0, 0]} color="#00f2ff" intensity={30} distance={10} />
             <pointLight position={[-4, 2, 0]} color="#bd00ff" intensity={30} distance={10} />
             <pointLight position={[0, -4, 2]} color="#ffffff" intensity={10} distance={8} />
        </group>
    </group>
  );
};

const DataParticles = ({ count = 300 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.2;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 3; // Slower particle movement
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.setScalar(s * 0.3 + 0.3);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshBasicMaterial color="#00f2ff" transparent opacity={0.4} />
    </instancedMesh>
  );
};

const CyberEnvironment = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame(({ clock }) => {
        const scrollY = window.scrollY;
        // Parallax the entire world based on scroll
        if (groupRef.current) {
            groupRef.current.position.y = scrollY * 0.002; 
        }
    });

    return (
        <group ref={groupRef}>
            {/* Dark Fog for depth */}
            <fog attach="fog" args={['#02040a', 5, 25]} />
            
            {/* Ambient Environment */}
            <ambientLight intensity={0.5} />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            {/* The Hero Sphere */}
            <MagicalSphere />

            {/* Background Particles */}
            <DataParticles count={300} />
            
            {/* Floor Grid - Fades into distance */}
            <Grid 
                position={[0, -6, 0]} 
                args={[60, 60]} 
                cellSize={1} 
                cellThickness={1} 
                cellColor="#0f172a" 
                sectionSize={5} 
                sectionThickness={1} 
                sectionColor="#1e293b" 
                fadeDistance={25} 
                fadeStrength={1.5}
                infiniteGrid
            />
        </group>
    );
}

// --- HTML SECTION COMPONENTS ---

const Section = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
    <div className={`relative z-10 w-full ${className}`}>
        {children}
    </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead 
        meta={{
          title: "Big Wall Solutions | Cyber-Grade Digital Engineering",
          description: "Premium digital agency crafting immersive web and mobile experiences. We help ambitious brands scale new heights.",
          keywords: ["web development", "3d website", "react agency", "cyberpunk design"],
          type: "website"
        }}
      />

      <div className="relative w-full overflow-hidden bg-transparent text-white">
        
        {/* Fixed 3D Background - Z-Index 0 */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
               <CyberEnvironment />
            </Suspense>
          </Canvas>
        </div>

        {/* Scrollable Content - Z-Index 10 */}
        <div className="relative z-10 flex flex-col">
            
            {/* HERO SECTION */}
            <Section className="min-h-screen flex items-center justify-center pt-20">
                <div className="container mx-auto px-6 text-center relative">
                    {/* Glass Panel Behind Text for readability */}
                    <div className="absolute inset-0 bg-navy-950/30 blur-3xl rounded-full z-[-1] scale-75"></div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex justify-center gap-4 mb-6">
                             <div className="px-4 py-1 border border-electric/30 rounded-full bg-navy-900/50 backdrop-blur-md text-electric text-xs font-mono animate-pulse">
                                SYSTEM STATUS: OPTIMAL
                             </div>
                             <div className="px-4 py-1 border border-purple-500/30 rounded-full bg-navy-900/50 backdrop-blur-md text-purple-glow text-xs font-mono">
                                WEB 3.0 READY
                             </div>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-display font-bold mb-8 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 drop-shadow-2xl">
                           DIGITAL<br/><span className="text-electric text-glow">ALCHEMY</span>
                        </h1>
                        
                        <p className="text-gray-200 text-lg md:text-xl max-w-xl mx-auto mb-12 font-mono leading-relaxed bg-navy-950/20 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                           Transmuting ideas into immersive digital realities with precision engineering and magical design.
                        </p>
                        
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                           <Button onClick={() => navigate('/contact')} className="px-10 py-5 text-lg shadow-[0_0_40px_rgba(0,242,255,0.4)] hover:shadow-[0_0_60px_rgba(0,242,255,0.6)]">
                              Start Project
                           </Button>
                           <Button onClick={() => navigate('/portfolio')} variant="outline" className="px-10 py-5 text-lg font-mono bg-navy-950/50 backdrop-blur-md">
                              View Work
                           </Button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-electric to-transparent"></div>
                </div>
            </Section>

            {/* INTRO / TRUST SECTION */}
            <Section className="py-24 bg-navy-950/60 backdrop-blur-md border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Powering Next-Gen Companies</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80">
                        {/* High-Tech Logos */}
                        {['NEXUS', 'ORBITAL', 'CYBERDYNE', 'VERTEX', 'SYNTH'].map((logo, i) => (
                            <div key={i} className="text-2xl font-display font-bold text-white flex items-center gap-2 group cursor-default">
                                <div className={`w-3 h-3 rounded-sm ${i % 2 === 0 ? 'bg-electric' : 'bg-purple-glow'} group-hover:animate-ping`}></div> {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* SERVICES PREVIEW SECTION */}
            <Section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="bg-navy-900/60 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                             <div className="flex items-center gap-3 mb-6">
                                <Cpu className="text-electric animate-spin-slow" />
                                <h2 className="text-4xl font-display font-bold">Core <span className="text-electric">Modules</span></h2>
                             </div>
                             
                             <p className="text-gray-300 mb-8 leading-relaxed">
                                We don't just build websites; we engineer digital ecosystems. Our stack is optimized for speed, security, and scalability in a connected world.
                             </p>
                             
                             <div className="space-y-4">
                                {[
                                    { icon: Globe, title: 'Web Architecture', desc: 'React, Next.js, and Three.js solutions.' },
                                    { icon: Smartphone, title: 'Mobile Engineering', desc: 'Native & Cross-platform apps.' },
                                    { icon: Zap, title: 'AI Integration', desc: 'LLMs and predictive modeling.' }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer hover:bg-white/5 p-4 rounded-lg transition-colors border border-transparent hover:border-electric/30">
                                        <div className="p-3 bg-navy-800 rounded-lg text-electric group-hover:scale-110 transition-transform shadow-lg shadow-electric/10">
                                            <s.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-electric transition-colors">{s.title}</h3>
                                            <p className="text-sm text-gray-400">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>

                             <div className="mt-10 pt-6 border-t border-white/10">
                                <Link to="/services" className="text-electric font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wider text-sm">
                                    Initialize All Modules <ArrowRight size={18} />
                                </Link>
                             </div>
                        </div>
                        
                        {/* Right side is open for the 3D parallax object to be visible */}
                        <div className="hidden lg:flex flex-col items-end gap-6 pointer-events-none">
                             <div className="p-6 bg-navy-900/30 backdrop-blur-md rounded-xl border border-electric/20 text-left w-64 transform translate-x-12">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-xs text-electric font-mono">LIVE_METRICS</div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="text-4xl font-mono font-bold text-white mb-1">99.9%</div>
                                <div className="text-xs text-gray-400">UPTIME GUARANTEED</div>
                                <div className="mt-4 h-1 w-full bg-navy-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-electric w-[99%]"></div>
                                </div>
                             </div>

                             <div className="p-6 bg-navy-900/30 backdrop-blur-md rounded-xl border border-purple-500/20 text-left w-64 transform translate-x-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-xs text-purple-glow font-mono">GLOBAL_NODES</div>
                                    <Globe size={12} className="text-purple-glow" />
                                </div>
                                <div className="text-4xl font-mono font-bold text-white mb-1">12</div>
                                <div className="text-xs text-gray-400">REGIONS ACTIVE</div>
                             </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* FEATURED WORK / PARALLAX SCROLL SECTION */}
            <Section className="py-32 bg-gradient-to-b from-transparent to-navy-950 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-electric font-mono text-sm tracking-widest flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-electric"></span> CASE_STUDIES
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Selected Works</h2>
                        </div>
                        <Button to="/portfolio" variant="outline" className="mt-6 md:mt-0 bg-navy-900/50 backdrop-blur-md">View All Projects</Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Expo City Eats", cat: "Mobile App", img: "https://images.unsplash.com/photo-1512428559087-560fa0db7989?auto=format&fit=crop&w=800&q=80" },
                            { title: "VaultFlow", cat: "FinTech", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
                            { title: "MediConnect", cat: "Healthcare", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
                        ].map((work, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-navy-800 border border-navy-700 hover:border-electric transition-colors shadow-2xl"
                            >
                                <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/50 to-transparent"></div>
                                
                                <div className="absolute top-4 right-4 p-2 bg-navy-950/80 backdrop-blur-sm rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="text-electric -rotate-45" size={20} />
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="text-electric text-xs font-mono mb-2 bg-navy-950/50 inline-block px-2 py-1 rounded border border-electric/20">{work.cat}</div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-electric transition-colors">{work.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA SECTION */}
            <Section className="py-40 flex items-center justify-center relative bg-navy-950">
                 {/* Decorative Grid Floor Fade */}
                 <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-navy-950 z-20"></div>

                 <div className="container mx-auto px-6 text-center relative z-30">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-24 h-24 mx-auto bg-electric/5 rounded-full flex items-center justify-center mb-8 border border-electric animate-pulse shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                           <Zap size={40} className="text-electric" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                           Ready to <span className="text-electric">Scale?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12">
                           Stop relying on templates. Start building a legacy.
                        </p>
                        <Button onClick={() => navigate('/contact')} className="px-12 py-6 text-xl bg-electric text-navy-900 font-bold hover:scale-105 shadow-[0_0_50px_rgba(0,242,255,0.4)] border-none">
                           INITIATE_CONTACT
                        </Button>
                    </div>
                 </div>
            </Section>

        </div>
      </div>
    </>
  );
};

export default Home;