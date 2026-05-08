import React from 'react';
import { Shield, Github, Linkedin, Zap, Globe } from 'lucide-react'; // Cambiamos Twitter por Globe

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-electric-blue rounded-sm rotate-45 flex items-center justify-center">
                <Shield className="-rotate-45 text-bg-primary" size={20} />
              </div>
              <span className="font-bold tracking-tighter text-xl text-white">FARADAY VAULT</span>
            </div>
            <p className="text-text-secondary max-w-sm mb-6 leading-relaxed">
              Descubriendo los secretos del electromagnetismo a través de la simulación digital y el diseño de vanguardia.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Github, href: "https://github.com/riverosmejia//faraday-code-fisica2" },
                { Icon: Globe, href: "https://riverosmejia.github.io/portfolio/" },
                { Icon: Linkedin, href: "https://linkedin.com/in/riverosmejia" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-electric-blue hover:border-electric-blue transition-all"
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navegación</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><a href="#inicio" className="hover:text-electric-blue transition-colors">Inicio</a></li>
              <li><a href="#simulacion" className="hover:text-electric-blue transition-colors">Simulador</a></li>
              <li><a href="#como-funciona" className="hover:text-electric-blue transition-colors">Teoría Científica</a></li>
              <li><a href="#aplicaciones" className="hover:text-electric-blue transition-colors">Casos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Información</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-mono">
              <li className="flex items-center gap-2">
                <Zap size={14} className="text-electric-yellow" />
                <span>Status: Optimal</span>
              </li>
              <li>Version: 1.0.4-stable</li>
              <li>Lab-Auth: Certified</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-text-secondary/50 uppercase tracking-[0.3em]">
            © 2026 RIVEROSMEJIA. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-8 text-[10px] text-text-secondary/50 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;