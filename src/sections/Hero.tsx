import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, ChevronDown } from 'lucide-react';
import ElectricityCanvas from '../components/ElectricityCanvas';

const Hero: React.FC = () => {
  const [boltActive, setBoltActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoltActive(true);
      setTimeout(() => setBoltActive(false), 150);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-electric-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-electric-blue/10 border border-electric-blue/20 px-3 py-1 rounded-full mb-6"
          >
            <Zap className="text-electric-blue" size={14} />
            <span className="text-[10px] font-bold tracking-[0.2em] text-electric-blue uppercase">Simulador de Electrostática v2.0</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            LA <span className="text-electric-blue neon-glow-blue">ELECTRICIDAD</span> RODEA. <br />
            EL INTERIOR <span className="text-success">PERMANECE</span> INTACTO.
          </h1>
          
          <p className="text-text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Explora cómo una Jaula de Faraday bloquea campos eléctricos y protege lo que hay dentro mediante la redistribución de cargas superficiales.
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#simulacion"
              className="px-8 py-4 bg-electric-blue text-bg-primary font-bold rounded-xl flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,209,255,0.4)]"
            >
              <Zap size={20} />
              INICIAR SIMULACIÓN
            </a>
            <a 
              href="#como-funciona"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all"
            >
              VER EXPLICACIÓN
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-text-secondary opacity-50">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-bg-primary bg-bg-secondary flex items-center justify-center text-[10px]">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest">Utilizado por +500 laboratorios</p>
          </div>
        </motion.div>

        {/* Right Simulation Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] flex items-center justify-center"
        >
          {/* Tesla Coil Base */}
          <div className="absolute bottom-0 w-32 h-40 bg-gradient-to-t from-bg-secondary to-transparent border-x border-white/10 rounded-t-3xl" />
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 bg-white rounded-full absolute bottom-36 shadow-[0_0_30px_#FFFFFF]"
          />

          {/* Faraday Structure (Simplified Wireframe) */}
          <div className="relative w-64 h-64 border-2 border-electric-blue/30 rounded-3xl flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.1),transparent)]" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #00D1FF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <ShieldCheck className="text-success w-24 h-24 drop-shadow-[0_0_15px_#00FFA3]" />
            
            {/* Active Protection Glow */}
            <AnimatePresence>
              {boltActive && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 border-4 border-electric-blue shadow-[inset_0_0_30px_rgba(0,209,255,0.5)] z-20"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Lightning Canvas */}
          <ElectricityCanvas 
            startX={400} 
            startY={430} 
            endX={400} 
            endY={250} 
            active={boltActive}
            shieldActive={true}
            className="absolute z-20 top-0 left-0 w-full h-full"
          />

          {/* HUD Elements */}
          <div className="absolute top-10 right-10 bg-black/40 p-3 border border-white/10 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-mono text-success uppercase tracking-widest">Protección Activa</span>
            </div>
            <div className="text-[16px] font-mono text-white tracking-widest">CAMPO INT: 0.00 V/m</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll para explorar</span>
        <ChevronDown size={20} className="text-electric-blue" />
      </motion.div>
    </section>
  );
};

export default Hero;
