import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Menu, X, Github, Twitter, Linkedin, ChevronDown, Cpu, Activity } from 'lucide-react';
import Logo from './elements/Logo';
import Button from './elements/Button';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-cloud relative selection:bg-electric selection:text-navy-900">
      
      {/* Global Cyber Grid Background - Z-Index -2 to stay behind everything */}
      <div className="fixed inset-0 z-[-2] bg-navy-950 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      <div className="fixed inset-0 z-[-2] bg-gradient-to-b from-navy-950/80 via-transparent to-navy-950 pointer-events-none"></div>

      {/* Navigation HUD */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-navy-950/80 backdrop-blur-xl border-electric/20 py-3 shadow-[0_0_20px_rgba(0,242,255,0.1)]' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          {/* Decorative HUD Lines */}
          <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-electric"></div>
          <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-electric"></div>

          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                <Link 
                  to={link.path} 
                  className="flex items-center gap-1 text-sm font-medium font-mono text-gray-400 hover:text-electric transition-colors tracking-wide uppercase"
                >
                  {link.label}
                  {link.subLinks && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />}
                </Link>
                {/* Holographic Dropdown */}
                {link.subLinks && (
                  <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 perspective-1000">
                    <div className="bg-navy-900/90 backdrop-blur-xl border border-electric/30 rounded-none p-1 min-w-[240px] shadow-[0_0_30px_rgba(0,242,255,0.15)] clip-path-tech">
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-electric"></div>
                      
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-3 text-xs font-mono text-gray-300 hover:bg-electric/10 hover:text-electric transition-colors border-l-2 border-transparent hover:border-electric"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="h-6 w-[1px] bg-gray-800 mx-2"></div>
            <Button to="/contact" className="px-6 py-2 text-xs font-mono uppercase tracking-widest border border-electric/50 hover:border-electric hover:shadow-[0_0_15px_rgba(0,242,255,0.4)]">
              Initialize
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white hover:text-electric transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy-950/95 backdrop-blur-xl pt-24 px-6 lg:hidden overflow-y-auto border-t border-electric/20">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-gray-800 pb-4">
                <Link 
                  to={link.path} 
                  className="text-2xl font-display font-bold text-white block mb-2 hover:text-electric transition-colors"
                >
                  <span className="text-electric mr-2">//</span>{link.label}
                </Link>
                {link.subLinks && (
                  <div className="pl-6 flex flex-col gap-3 mt-3 border-l border-electric/20 ml-2">
                    {link.subLinks.map(sub => (
                      <Link key={sub.path} to={sub.path} className="text-gray-400 font-mono text-sm hover:text-electric">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button to="/contact" className="mt-4 w-full py-4 font-mono uppercase">
              Start Project
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow relative z-0">
        {children}
      </main>

      {/* Tech Footer */}
      <footer className="bg-navy-950 border-t border-gray-900 relative overflow-hidden pt-20 pb-10 z-10">
        {/* Animated Footer Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-electric to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Logo className="mb-6" showText={true} />
              <p className="text-gray-400 max-w-md mb-8 leading-relaxed font-mono text-sm">
                <span className="text-electric">sys.status:</span> operational<br/>
                <span className="text-electric">loc:</span> global_grid<br/>
                <br/>
                Crafting digital experiences that transcend boundaries. Your partner in navigating the complex landscape of modern technology.
              </p>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 bg-navy-900 border border-gray-800 hover:border-electric hover:text-electric hover:shadow-[0_0_10px_rgba(0,242,255,0.2)] transition-all group">
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-mono font-bold text-electric text-sm uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 inline-block">Modules</h4>
              <ul className="space-y-3 text-gray-400 font-mono text-sm">
                <li><Link to="/services/web-development" className="hover:text-electric transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-electric rounded-full"></span> Web Development</Link></li>
                <li><Link to="/services/mobile-apps" className="hover:text-electric transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-electric rounded-full"></span> Mobile Apps</Link></li>
                <li><Link to="/services/ui-ux" className="hover:text-electric transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-electric rounded-full"></span> UI/UX Design</Link></li>
                <li><Link to="/services/ai-ml" className="hover:text-electric transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-electric rounded-full"></span> AI Solutions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono font-bold text-electric text-sm uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 inline-block">System</h4>
              <ul className="space-y-3 text-gray-400 font-mono text-sm">
                <li><Link to="/about" className="hover:text-electric transition-colors">About_Us</Link></li>
                <li><Link to="/careers" className="hover:text-electric transition-colors">Careers_Portal</Link></li>
                <li><Link to="/blog" className="hover:text-electric transition-colors">Data_Logs</Link></li>
                <li><Link to="/contact" className="hover:text-electric transition-colors">Terminate_Handshake</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600">
            <p>&copy; 2024 BIG WALL SOLUTIONS. ALL SYSTEMS NOMINAL.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-electric">PRIVACY_PROTOCOL</Link>
              <Link to="/terms" className="hover:text-electric">TERMS_OF_ENGAGEMENT</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;