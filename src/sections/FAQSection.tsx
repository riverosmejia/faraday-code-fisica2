import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Por qué no pasa electricidad al interior?",
      a: "No es que se 'bloquee' físicamente, sino que los electrones libres en el conductor metálico se desplazan para anular el campo eléctrico en el interior. El campo resultante dentro de la jaula es cero."
    },
    {
      q: "¿Tiene que ser una caja cerrada totalmente?",
      a: "No necesariamente. Puede ser una malla o rejilla. Mientras los agujeros sean pequeños en comparación con la longitud de onda de la radiación electromagnética, funcionará efectivamente."
    },
    {
      q: "¿Por qué un auto protege en una tormenta?",
      a: "Contrario a la creencia popular, no es por los neumáticos de hule. Es porque la carrocería metálica actúa como una Jaula de Faraday, guiando la electricidad por el exterior hasta el suelo."
    },
    {
      q: "¿Bloquea también las ondas de radio y WiFi?",
      a: "Sí, la mayoría de los blindajes de Faraday bloquean frecuencias de radio (RF), WiFi y señales de celular. Por eso los ascensores o edificios con mucha estructura metálica a veces tienen mala señal."
    },
    {
      q: "¿Qué materiales funcionan mejor?",
      a: "Cualquier buen conductor eléctrico. El cobre, el aluminio y el acero son los más comunes. Cuanto mayor sea la conductividad, mejor será la redistribución de carga."
    }
  ];

  return (
    <section id="faq" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CONSULTAS DEL <span className="text-electric-blue uppercase">Archivo</span></h2>
          <p className="text-text-secondary">Respuestas técnicas a las dudas más comunes sobre blindaje electrostático.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card shadow-none border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white text-lg pr-8">{faq.q}</span>
                <div className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  {activeIndex === index ? <Minus size={20} className="text-electric-blue" /> : <Plus size={20} className="text-electric-blue" />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-white/5 pt-4 text-sm">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
