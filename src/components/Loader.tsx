import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
    >
      {/* Background Pulses */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-electric-blue rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{
            filter: [
              "drop-shadow(0 0 2px #00D1FF)",
              "drop-shadow(0 0 15px #00D1FF)",
              "drop-shadow(0 0 2px #00D1FF)"
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-4xl md:text-6xl font-bold tracking-widest text-electric-blue neon-glow-blue uppercase"
        >
          FARADAY VAULT
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-electric-blue mt-4 shadow-[0_0_10px_#00D1FF]"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.2, 0.4, 1] }}
          className="mt-6 text-text-secondary font-mono text-sm tracking-widest uppercase"
        >
          Iniciando Sistemas de Blindaje...
        </motion.p>
      </div>
      
      {/* Electrical noise lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </motion.div>
  );
};

export default Loader;
