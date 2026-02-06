import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Torus, Octahedron, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Mail, Phone, MapPin, Send, MessageSquare, Briefcase, User, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Button from '../components/elements/Button';

// --- 3D SCENE ---
const ContactHero3D = () => {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#bd00ff" intensity={2} />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Octahedron args={[1.5, 0]} position={[0, 0, 0]}>
                    <MeshDistortMaterial color="#00f2ff" roughness={0.1} metalness={0.9} distort={0.4} speed={3} />
                </Octahedron>
            </Float>
            
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Torus args={[2.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#bd00ff" emissive="#bd00ff" emissiveIntensity={2} />
                </Torus>
            </Float>

             <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8}>
                <Torus args={[3, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
                </Torus>
            </Float>
            
            <Environment preset="city" />
        </group>
    );
}

type FormType = 'project' | 'careers' | 'general';

const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormType>('project');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bigwallsolutions.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://bigwallsolutions.com/contact" }
    ]
  };

  return (
    <>
      <SEOHead 
        meta={{
          title: "Contact Big Wall Solutions | Start Your Project",
          description: "Get in touch with our team. Whether you have a project in mind, want to join our team, or just say hello, we're here.",
          keywords: ["contact us", "web development agency contact", "hire developers"],
          type: "website"
        }}
        schema={breadcrumbSchema}
      />

      <section className="pt-32 pb-20 bg-navy-950 min-h-screen relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-electric/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Info & 3D */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="h-64 w-full mb-8 relative">
                    <Canvas>
                        <Suspense fallback={null}>
                            <ContactHero3D />
                        </Suspense>
                    </Canvas>
                </div>

                <h1 className="text-5xl font-display font-bold mb-6">Initiate <span className="text-electric">Handshake</span></h1>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                  Ready to scale? Our signals are open. Connect with our architects to blueprint your next digital ascent.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Mail, title: "Secure Comms", line1: "hello@bigwall.com", line2: "PGP Key Available" },
                    { icon: MapPin, title: "Base of Operations", line1: "Innovation Tower, Lvl 12", line2: "Dubai Internet City, UAE" },
                    { icon: Phone, title: "Voice Link", line1: "+971 50 000 0000", line2: "Mon-Fri 09:00 - 18:00" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-xl bg-navy-900/50 border border-white/5 hover:border-electric/30 transition-all group">
                        <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center text-electric group-hover:scale-110 transition-transform shadow-lg shadow-electric/10">
                            <item.icon size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.line1}</p>
                            <p className="text-xs text-gray-500 font-mono">{item.line2}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Interactive Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-navy-900/80 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-navy-950 rounded-xl border border-white/5">
                {[
                  { id: 'project', label: 'Project', icon: <MessageSquare size={16} /> },
                  { id: 'careers', label: 'Careers', icon: <Briefcase size={16} /> },
                  { id: 'general', label: 'General', icon: <User size={16} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as FormType); setFormStatus('idle'); }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-electric text-navy-900 shadow-[0_0_15px_rgba(0,242,255,0.3)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {formStatus === 'success' ? (
                  <div className="text-center py-20">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} 
                      className="w-24 h-24 bg-electric/10 text-electric rounded-full flex items-center justify-center mx-auto mb-6 border border-electric/30 shadow-[0_0_30px_rgba(0,242,255,0.2)]"
                    >
                      <CheckCircle size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold mb-2 text-white">Transmission Received</h3>
                    <p className="text-gray-400">Our protocols are engaged. We will respond within 24 hours.</p>
                    <Button onClick={() => setFormStatus('idle')} variant="ghost" className="mt-8 border border-white/10">Send another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-electric uppercase tracking-widest">Identity</label>
                            <input type="text" placeholder="Full Name" required className="w-full bg-navy-950 border border-white/10 rounded-lg p-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-electric uppercase tracking-widest">Contact</label>
                            <input type="email" placeholder="Email Address" required className="w-full bg-navy-900 border border-white/10 rounded-lg p-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600" />
                        </div>
                    </div>

                    {activeTab === 'project' && (
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-electric uppercase tracking-widest">Investment</label>
                          <select className="w-full bg-navy-950 border border-white/10 rounded-lg p-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all cursor-pointer">
                            <option value="">Select Range...</option>
                            <option>$10k - $25k</option>
                            <option>$25k - $50k</option>
                            <option>$50k - $100k</option>
                            <option>$100k+</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-electric uppercase tracking-widest">Requirement</label>
                          <input type="text" placeholder="e.g. Mobile App" className="w-full bg-navy-950 border border-white/10 rounded-lg p-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600" />
                        </div>
                      </div>
                    )}

                    {activeTab === 'careers' && (
                      <div className="space-y-2">
                         <label className="text-xs font-mono text-electric uppercase tracking-widest">Portfolio Link</label>
                         <input type="url" placeholder="https://..." className="w-full bg-navy-950 border border-white/10 rounded-lg p-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-electric uppercase tracking-widest">Data Packet</label>
                      <textarea required rows={4} placeholder="Tell us about your objectives..." className="w-full bg-navy-950 border border-white/10 rounded-lg p-4 text-white focus:border-electric focus:ring-1 focus:ring-electric/50 outline-none transition-all placeholder:text-gray-600"></textarea>
                    </div>

                    <Button type="submit" disabled={formStatus === 'submitting'} className="w-full py-4 mt-2 text-lg font-bold shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                      {formStatus === 'submitting' ? 'UPLOADING...' : 'TRANSMIT MESSAGE'} <Send size={18} className="ml-2" />
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;