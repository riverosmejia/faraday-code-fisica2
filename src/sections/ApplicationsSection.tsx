import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Microwave, Car, Cable, Cpu, Activity } from 'lucide-react';

const ApplicationsSection: React.FC = () => {
  const apps = [
    {
      title: "Aviones",
      desc: "Protegen a los pasajeros de los rayos durante el vuelo al conducir la descarga por el fuselaje exterior.",
      icon: <Plane size={32} />
    },
    {
      title: "Microondas",
      desc: "Evitan que la radiación escape, manteniendo la energía dentro para calentar los alimentos.",
      icon: <Microwave size={32} />
    },
    {
      title: "Automóviles",
      desc: "Su estructura metálica actúa como jaula, protegiendo a los ocupantes durante tormentas eléctricas.",
      icon: <Car size={32} />
    },
    {
      title: "Cables Blindados",
      desc: "Usan mallas metálicas para evitar interferencias en señales de audio o datos.",
      icon: <Cable size={32} />
    },
    {
      title: "Electrónica Alta",
      desc: "Componentes críticos se envuelven en escudos metálicos para evitar ruidos de radiofrecuencia.",
      icon: <Cpu size={32} />
    },
    {
      title: "Salas de RM",
      desc: "Las salas de Resonancia Magnética están blindadas para que ondas externas no afecten las imágenes médicas.",
      icon: <Activity size={32} />
    }
  ];

  return (
    <section id="aplicaciones" className="py-24 bg-bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">APLICACIONES <span className="text-success uppercase">Reales</span></h2>
          <p className="text-text-secondary">Desde tu cocina hasta la seguridad aeroespacial, este principio está en todas partes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 bg-bg-primary border border-white/5 rounded-2xl hover:border-electric-blue/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-electric-blue mb-6 group-hover:bg-electric-blue group-hover:text-bg-primary transition-all duration-500">
                {app.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-electric-blue transition-colors">{app.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{app.desc}</p>
              
              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-electric-blue text-[10px] font-mono uppercase font-bold tracking-widest">
                <span>Protocolo Activo</span>
                <div className="flex-grow h-[1px] bg-electric-blue/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
