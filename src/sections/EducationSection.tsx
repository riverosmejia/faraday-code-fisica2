import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Layers, RefreshCw } from 'lucide-react';

const EducationSection: React.FC = () => {
  const cards = [
    {
      title: "¿Qué es?",
      description: "Una Jaula de Faraday es un recinto cerrado formado por material conductor o una malla que bloquea campos eléctricos externos.",
      icon: <BookOpen className="text-electric-blue" size={24} />,
      detail: "Fue observada por primera vez por Michael Faraday en 1836."
    },
    {
      title: "El efecto",
      description: "Cuando se aplica un campo eléctrico, las cargas positivas y negativas del conductor se separan rápidamente.",
      icon: <Zap className="text-electric-yellow" size={24} />,
      detail: "La redistribución de carga crea un campo nulo en el interior."
    },
    {
      title: "Estructura",
      description: "No necesita ser una placa metálica sólida; una malla con huecos lo suficientemente pequeños también funciona.",
      icon: <Layers className="text-success" size={24} />,
      detail: "La efectividad depende del tamaño de los huecos y la frecuencia."
    },
    {
      title: "Dinámica",
      description: "En reposo, el exceso de carga en el conductor reside solo en su superficie exterior.",
      icon: <RefreshCw className="text-danger" size={24} />,
      detail: "Esto evita que el potencial eléctrico cause daños internos."
    }
  ];

  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              CIENCIA <span className="text-electric-blue">HOLOGRÁFICA</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Desglosamos los principios fundamentales detrás de la protección electrostática. Un baile de electrones que salva vidas y tecnología.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-6xl font-black text-white/5 tracking-tighter">03. ARCHIVOS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{card.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {card.description}
              </p>
              <div className="pt-6 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
                {card.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
