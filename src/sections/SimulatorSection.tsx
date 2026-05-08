import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, ShieldOff, Smartphone, AlertCircle, Info, RefreshCcw, Microscope, Activity } from 'lucide-react';
import ElectricityCanvas from '../components/ElectricityCanvas';
import PhysicsCanvas from '../components/PhysicsCanvas';

const SimulatorSection: React.FC = () => {
  const [shieldActive, setShieldActive] = useState(true);
  const [isFiring, setIsFiring] = useState(false);
  const [scientificMode, setScientificMode] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string>("");
  const [damageLevel, setDamageLevel] = useState(0);

  const messages = {
    shieldOn: [
      "Equilibrio electrostático alcanzado",
      "Campo inducido estabilizado",
      "Fase de blindaje operativa",
      "Interacción superficial detectada"
    ],
    shieldOff: [
      "Fallo crítico de conductividad",
      "Penetración electromagnética",
      "Inestabilidad de potencial interno",
      "Integridad comprometida"
    ]
  };

  const handleFire = () => {
    if (isFiring) return;
    setIsFiring(true);
    
    const relevantMessages = shieldActive ? messages.shieldOn : messages.shieldOff;
    setActiveMessage(relevantMessages[Math.floor(Math.random() * relevantMessages.length)]);

    if (!shieldActive) {
      setDamageLevel(prev => Math.min(prev + 25, 100));
    }
    
    setTimeout(() => {
      setIsFiring(false);
      setActiveMessage("");
    }, 1500);
  };

  const resetSimulator = () => {
    setDamageLevel(0);
    setShieldActive(true);
  };

  const [internalFieldVal, setInternalFieldVal] = useState("0.00");
  const [externalFieldVal, setExternalFieldVal] = useState("0.00");

  useEffect(() => {
    let interval: any;
    if (isFiring) {
      interval = setInterval(() => {
        if (shieldActive) {
          setInternalFieldVal((Math.random() * 0.05).toFixed(2));
          setExternalFieldVal((95 + Math.random() * 10).toFixed(2));
        } else {
          setInternalFieldVal((85 + Math.random() * 20).toFixed(2));
          setExternalFieldVal((95 + Math.random() * 10).toFixed(2));
        }
      }, 50);
    } else {
      setInternalFieldVal("0.00");
      setExternalFieldVal("0.00");
    }
    return () => clearInterval(interval);
  }, [isFiring, shieldActive]);

  return (
    <section id="simulacion" className="py-24 bg-bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full mb-6"
          >
            <Activity className="text-electric-blue" size={14} />
            <span className="text-[10px] font-bold tracking-[0.2em] text-electric-blue uppercase">Monitor de Flujo de Electrones</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            LABORATORIO <span className="text-electric-blue uppercase">Faraday</span>
          </motion.h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Visualiza el movimiento de cargas y la cancelación de campos en tiempo real mediante nuestro simulador de partículas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card p-6 border-l-4 border-l-electric-blue">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-electric-blue" />
                BLINDAJE
              </h3>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setShieldActive(!shieldActive)}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    shieldActive 
                    ? 'bg-success/10 border border-success/30 text-success shadow-[0_0_15px_rgba(0,255,163,0.1)]' 
                    : 'bg-danger/10 border border-danger/30 text-danger shadow-[0_0_15px_rgba(255,77,109,0.1)]'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-left">
                    Protección:<br/>{shieldActive ? 'ACTIVA' : 'OFF'}
                  </span>
                  {shieldActive ? <Shield size={24} /> : <ShieldOff size={24} />}
                </button>

                <button 
                  onMouseDown={handleFire}
                  disabled={isFiring}
                  className={`w-full py-6 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                    isFiring ? 'bg-electric-yellow/20 text-electric-yellow opacity-50' : 'bg-electric-blue text-bg-primary shadow-[0_10px_20px_rgba(0,209,255,0.3)] hover:scale-[1.02]'
                  }`}
                >
                  <Zap size={24} />
                  {isFiring ? 'DESCARGA EN CURSO' : 'INICIAR ARCO TESLA'}
                </button>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <button 
                    onClick={() => setScientificMode(!scientificMode)}
                    className={`w-full py-4 rounded-xl border-2 text-xs font-bold uppercase tracking-[0.2em] flex flex-col items-center justify-center gap-1 transition-all ${
                      scientificMode 
                      ? 'bg-electric-blue/20 border-electric-blue text-electric-blue shadow-[0_0_20px_rgba(0,209,255,0.2)]' 
                      : 'border-white/10 text-text-secondary hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <Microscope size={20} />
                    {scientificMode ? 'MODO FÍSICA ACTIVO' : 'VER FÍSICA (EDU)'}
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Activity size={18} className="text-electric-blue" />
                TELEMETRÍA
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[8px] uppercase tracking-tighter mb-2 font-mono text-text-secondary">
                    <span>Campo Externo</span>
                    <span>{externalFieldVal} V/m</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${externalFieldVal}%` }} className="h-full bg-electric-blue shadow-[0_0_10px_#00D1FF]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[8px] uppercase tracking-tighter mb-2 font-mono text-text-secondary">
                    <span>Campo Interno</span>
                    <span className={parseFloat(internalFieldVal) > 1 ? 'text-danger animate-pulse' : 'text-success'}>
                      {internalFieldVal} V/m
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${internalFieldVal}%` }} 
                      className={`h-full ${parseFloat(internalFieldVal) > 1 ? 'bg-danger shadow-[0_0_10px_#FF4D6D]' : 'bg-success'}`} 
                    />
                  </div>
                </div>
                
                {damageLevel > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between text-[8px] uppercase tracking-tighter mb-2 font-mono text-danger">
                      <span>Integridad de Dispositivo</span>
                      <span>{100 - damageLevel}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${100 - damageLevel}%` }} className="h-full bg-danger" />
                    </div>
                    <button onClick={resetSimulator} className="w-full mt-4 py-2 text-[9px] font-mono border border-danger/20 text-danger rounded hover:bg-danger/5 transition-colors uppercase tracking-widest">
                      <RefreshCcw size={10} className="inline mr-2" /> Reparar Dispositivo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Canvas Area (Center) */}
          <div className="lg:col-span-6 relative aspect-square bg-bg-primary rounded-3xl border border-white/5 shadow-inner overflow-hidden group">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            
            {/* Scientific HUD Overlay */}
            <div className="absolute top-6 right-6 z-[60] flex flex-col gap-3 items-end">
              <AnimatePresence mode="wait">
                {isFiring && (
                  <motion.div
                    key={shieldActive ? 'shield-on' : 'shield-off'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`glass-card px-4 py-2 border-r-4 ${shieldActive ? 'border-r-success' : 'border-r-danger'} min-w-[200px] backdrop-blur-xl bg-black/40`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Estado Sistema</span>
                      <Activity size={10} className={shieldActive ? 'text-success' : 'text-danger animate-pulse'} />
                    </div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-tight">
                      {activeMessage || (shieldActive ? 'PROTECCIÓN ACTIVA' : 'SISTEMA EXPUESTO')}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="glass-card px-4 py-2 border-r-4 border-r-electric-blue backdrop-blur-xl bg-black/40 min-w-[200px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Análisis Cuántico</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [4, 8, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-0.5 bg-electric-blue/40" 
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-2xl font-bold font-mono tracking-tighter transition-colors duration-500 ${shieldActive && isFiring ? 'text-success' : 'text-white'}`}>
                    {shieldActive && isFiring ? '0.00' : (parseFloat(internalFieldVal) > 0 ? (parseFloat(internalFieldVal)).toFixed(2) : '---')}
                  </span>
                  <span className="text-[10px] font-mono text-text-secondary mb-1 uppercase tracking-tighter">E_net (V/m)</span>
                </div>
              </div>
            </div>

            {/* Simulation Canvas */}
            <PhysicsCanvas 
              shieldActive={shieldActive} 
              isFiring={isFiring} 
              scientificMode={scientificMode} 
            />

            {/* Lightning Visualization overlay */}
            <ElectricityCanvas 
              startX={50} 
              startY={300} 
              endX={shieldActive ? 270 : 400} 
              endY={300} 
              active={isFiring} 
              shieldActive={shieldActive} 
              color={shieldActive ? '#00D1FF' : '#FF4D6D'}
              className="absolute top-0 left-0 w-full h-full z-40"
            />

            {/* Main Stage */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className={`relative transition-all duration-700 w-[260px] h-[420px] flex items-center justify-center rounded-xl ${
                shieldActive 
                ? 'border-[20px] border-white/10 bg-white/[0.02]' 
                : 'border-2 border-dashed border-white/10 bg-transparent'
              }`}>
                {/* Internal Phone Object */}
                <motion.div 
                  animate={isFiring && !shieldActive ? { 
                    x: [0, -2, 2, -3, 3, 0],
                    y: [0, 1, -1, 1, -1, 0],
                    filter: ["brightness(1)", "brightness(2)", "brightness(0.5)", "brightness(1)"],
                  } : {}}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className={`relative w-28 h-52 rounded-3xl p-1 transition-all duration-500 overflow-hidden ${
                    damageLevel >= 100 ? 'opacity-20 grayscale scale-95' : 'bg-black border-2 border-white/10 shadow-2xl shadow-black/80'
                  }`}
                >
                   {/* Phone UI Simulation */}
                  <div className={`w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors ${
                    isFiring && !shieldActive ? 'bg-danger/10' : 'bg-bg-primary/50'
                  }`}>
                    <Smartphone className={`${damageLevel > 70 ? 'text-danger animate-pulse' : 'text-text-secondary opacity-30'} transition-all`} size={40} />
                    <div className="w-12 h-1 bg-white/5 rounded-full" />
                    <div className="text-[8px] font-mono text-center tracking-tighter uppercase px-4 leading-tight opacity-30 space-y-1">
                      <p>Sinal: {shieldActive ? 'BLOQUEADO' : 'EXCELENTE'}</p>
                      {isFiring && !shieldActive && <p className="text-danger font-bold">EM INTERFERENCE!</p>}
                    </div>
                  </div>
                </motion.div>

                {/* Shield Effect Glow */}
                <AnimatePresence>
                  {isFiring && shieldActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 border-4 border-electric-blue/40 shadow-[0_0_60px_rgba(0,209,255,0.2),inset_0_0_40px_rgba(0,209,255,0.2)] z-20 rounded-xl"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>




            {/* Contrast HUD Indicators (Bottom Left) */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-[60]">
              <div className="bg-black/60 border border-white/5 px-3 py-1 rounded-sm text-[8px] font-mono text-text-secondary flex items-center gap-2 backdrop-blur-md">
                <div className={`w-1.5 h-1.5 rounded-full ${isFiring ? 'bg-danger animate-pulse border border-danger/50' : 'bg-white/20'}`} />
                ENTORNO: {isFiring ? 'INESTABLE (DESC.)' : 'ESTADO BASE'}
              </div>
              <div className="bg-black/60 border border-white/5 px-3 py-1 rounded-sm text-[8px] font-mono text-text-secondary flex items-center gap-2 backdrop-blur-md">
                <div className={`w-1.5 h-1.5 rounded-full ${shieldActive ? 'bg-success border border-success/50' : 'bg-danger border border-danger/50'}`} />
                ZONA INTERNA: {shieldActive ? 'BLINDAJE OPERATIVO' : 'RADIACIÓN DETECTADA'}
              </div>
            </div>
          </div>

          {/* Education Overlay (Right) */}
          <div className="lg:col-span-3 h-full flex flex-col gap-6">
            <div className="glass-card p-6 flex-grow flex flex-col">
              <h4 className="text-[10px] font-mono tracking-[0.3em] text-electric-blue uppercase mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-electric-blue" />
                Análisis de Partículas
              </h4>
              <div className="space-y-6 flex-grow">
                <div className="group">
                  <p className="text-[10px] text-white font-bold uppercase mb-2 group-hover:text-electric-blue transition-colors">Redistribución</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Las cargas negativas (electrones) en el metal se desplazan alejándose del campo externo negativo aplicado.
                  </p>
                </div>
                <div className="group">
                  <p className="text-[10px] text-white font-bold uppercase mb-2 group-hover:text-success transition-colors">Campo Neto</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Este movimiento crea un dipole interno cuya fuerza es idéntica pero opuesta al campo externo. La suma es 0.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl mt-auto">
                    <p className="text-[9px] text-text-secondary leading-snug">
                      <span className="text-electric-blue font-bold">DATO:</span> En un conductor perfecto, el campo eléctrico en su interior es siempre cero en condiciones estáticas.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
