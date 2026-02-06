import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Award, Users, Coffee, Globe, Heart, Zap, Target, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { TEAM } from '../constants';

// --- 3D COMPONENTS ---

interface NetworkNodeProps {
  position: [number, number, number];
  color: string;
}

const NetworkNode: React.FC<NetworkNodeProps> = ({ position, color }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={position}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
    </Float>
  );
};

const ConnectionLines = ({ count = 20 }) => {
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
       const start = [Math.random() * 10 - 5, Math.random() * 6 - 3, Math.random() * 4 - 2] as [number, number, number];
       const end = [Math.random() * 10 - 5, Math.random() * 6 - 3, Math.random() * 4 - 2] as [number, number, number];
       temp.push({ start, end });
    }
    return temp;
  }, [count]);

  return (
    <group>
        {lines.map((l, i) => (
            <Line 
                key={i} 
                points={[l.start, l.end]} 
                color={i % 2 === 0 ? "#00f2ff" : "#bd00ff"} 
                lineWidth={1} 
                transparent 
                opacity={0.3} 
            />
        ))}
    </group>
  );
};

const AboutHero3D = () => {
    return (
        <group rotation={[0, Math.PI / 4, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="#00f2ff" intensity={2} />
            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            
            {/* Abstract Network of Minds */}
            <ConnectionLines count={30} />
            
            {Array.from({ length: 15 }).map((_, i) => (
                <NetworkNode 
                    key={i} 
                    position={[
                        Math.random() * 8 - 4, 
                        Math.random() * 6 - 3, 
                        Math.random() * 4 - 2
                    ]} 
                    color={i % 3 === 0 ? "#00f2ff" : i % 3 === 1 ? "#bd00ff" : "#ffffff"} 
                />
            ))}
        </group>
    );
};

// --- MAIN COMPONENT ---

const About: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const timelineEvents = [
    { year: '2014', title: 'The Genesis', desc: 'Started in a garage with a single laptop and a vision to disrupt the digital status quo.' },
    { year: '2016', title: 'First Enterprise Scale', desc: 'Partnered with a Fortune 500 retailer to rebuild their entire e-commerce infrastructure.' },
    { year: '2019', title: 'Global Expansion', desc: 'Opened hubs in London and Dubai, transforming into a truly borderless agency.' },
    { year: '2022', title: 'AI Division Launch', desc: 'Pioneered our dedicated Generative AI lab to integrate LLMs into business logic.' },
    { year: '2024', title: 'Industry Leadership', desc: 'Recognized as a Top 10 Digital Agency by TechWorld for innovation.' }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bigwallsolutions.com/" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://bigwallsolutions.com/about" }
    ]
  };

  return (
    <>
      <SEOHead 
        meta={{
          title: "About Big Wall Solutions | Our Story, Mission & Values",
          description: "Discover the story behind Big Wall Solutions. Meet our leadership team, explore our culture, and learn why we're passionate about digital innovation.",
          keywords: ["about us", "digital agency team", "tech leadership", "company culture"],
          type: "website"
        }}
        schema={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 z-0">
             <Canvas camera={{ position: [0, 0, 8] }}>
                 <AboutHero3D />
             </Canvas>
        </div>
        
        {/* Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="inline-block px-4 py-1 border border-electric/30 rounded-full bg-navy-900/50 backdrop-blur-md text-electric text-xs font-mono mb-6">
                 EST. 2014 // GLOBAL_GRID
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 text-white drop-shadow-2xl">
                Architects of the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-cyan-400 to-purple-500">Digital Frontier</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto backdrop-blur-sm bg-navy-950/30 p-4 rounded-xl border border-white/5">
                Big Wall Solutions is a collective of engineers, dreamers, and strategists. We don't just build software; we construct the digital infrastructure that powers tomorrow's industry leaders.
              </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-32 bg-navy-900 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">The Ascent</h2>
            <p className="text-gray-400 font-mono">Our journey from code to cloud.</p>
          </div>

          <div className="relative">
            {/* Center Line with Glow */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-navy-800 hidden md:block overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-electric to-transparent animate-float"></div>
            </div>

            <div className="space-y-24">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 text-center md:text-right">
                    {index % 2 === 0 && (
                       <div className="md:pr-12 group cursor-default">
                         <h3 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 group-hover:from-electric group-hover:to-cyan-400 transition-all duration-500 mb-2">{event.year}</h3>
                         <h4 className="text-2xl font-bold text-white mb-4">{event.title}</h4>
                         <p className="text-gray-400 leading-relaxed">{event.desc}</p>
                       </div>
                    )}
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-navy-950 border-2 border-electric shadow-[0_0_20px_rgba(0,242,255,0.5)] flex items-center justify-center shrink-0">
                     <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    {index % 2 === 1 && (
                       <div className="md:pl-12 group cursor-default">
                         <h3 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-l from-gray-700 to-gray-500 group-hover:from-purple-500 group-hover:to-fuchsia-400 transition-all duration-500 mb-2">{event.year}</h3>
                         <h4 className="text-2xl font-bold text-white mb-4">{event.title}</h4>
                         <p className="text-gray-400 leading-relaxed">{event.desc}</p>
                       </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-32 bg-navy-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-center mb-20">The Visionaries</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {TEAM.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative h-[500px] perspective-1000"
              >
                <div className="relative h-full w-full bg-navy-900 rounded-2xl overflow-hidden border border-white/10 group-hover:border-electric/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    {/* Image */}
                    <div className="h-[65%] w-full overflow-hidden relative">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                         <div className="w-12 h-1 bg-electric mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                         <h3 className="text-3xl font-display font-bold text-white mb-2">{member.name}</h3>
                         <p className="text-electric font-mono text-sm tracking-widest mb-4 uppercase">{member.role}</p>
                         <p className="text-gray-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                             {member.bio}
                         </p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Culture */}
      <section className="py-32 bg-navy-900 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8">Culture Code</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              We operate on a distributed-first model, hiring the best talent regardless of geography. Our culture is built on autonomy, mastery, and purpose.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: <Globe className="text-electric" />, label: "Remote-First", desc: "Global Talent Pool" },
                { icon: <Heart className="text-purple-500" />, label: "Health", desc: "Premium Coverage" },
                { icon: <Coffee className="text-orange-400" />, label: "Balance", desc: "Flexible Schedule" },
                { icon: <Users className="text-green-400" />, label: "Community", desc: "Quarterly Retreats" }
              ].map((perk, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-navy-800/50 border border-white/5 hover:border-white/20 transition-colors">
                  <div className="p-2 bg-navy-950 rounded-lg">{perk.icon}</div>
                  <div>
                    <h4 className="font-bold text-white">{perk.label}</h4>
                    <p className="text-sm text-gray-400">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
             <div className="absolute -inset-4 bg-gradient-to-r from-electric to-purple-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
             <div className="relative grid grid-cols-2 gap-4 p-4 bg-navy-950/80 backdrop-blur-xl rounded-2xl border border-white/10">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" className="rounded-xl shadow-lg h-48 w-full object-cover" alt="Office" />
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" className="rounded-xl shadow-lg h-48 w-full object-cover translate-y-8" alt="Team" />
                <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=80" className="rounded-xl shadow-lg h-48 w-full object-cover" alt="Code" />
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" className="rounded-xl shadow-lg h-48 w-full object-cover translate-y-8" alt="Meeting" />
             </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-navy-950 border-t border-navy-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
             {[
               { icon: <Award size={40} />, label: "Awwwards" },
               { icon: <Target size={40} />, label: "Clutch Top 1%" },
               { icon: <Zap size={40} />, label: "Fast Company" },
               { icon: <TrendingUp size={40} />, label: "Inc. 5000" },
             ].map((award, i) => (
               <div key={i} className="flex items-center gap-3 text-white hover:text-electric transition-colors">
                 {award.icon}
                 <span className="font-display font-bold text-xl">{award.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;