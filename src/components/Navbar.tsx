import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Info, Grid, MessageCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio', icon: <Zap size={18} /> },
    { name: 'Simulación', href: '#simulacion', icon: <Shield size={18} /> },
    { name: 'Cómo Funciona', href: '#como-funciona', icon: <Info size={18} /> },
    { name: 'Aplicaciones', href: '#aplicaciones', icon: <Grid size={18} /> },
    { name: 'FAQ', href: '#faq', icon: <MessageCircle size={18} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-md py-3 shadow-lg shadow-black/50 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-electric-blue rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_#00D1FF]">
            <Shield className="-rotate-45 text-bg-primary" size={20} />
          </div>
          <span className="font-bold tracking-tighter text-xl hidden sm:block">FARADAY VAULT</span>
        </motion.div>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-text-secondary hover:text-electric-blue transition-colors text-sm font-medium flex items-center gap-2 group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-electric-blue">
                  {link.icon}
                </span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button className="bg-electric-blue/10 border border-electric-blue/30 px-5 py-2 rounded-full text-xs font-bold text-electric-blue hover:bg-electric-blue hover:text-bg-primary transition-all shadow-[0_0_10px_rgba(0,209,255,0.2)]">
          ACCESO LABORATORIO
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
