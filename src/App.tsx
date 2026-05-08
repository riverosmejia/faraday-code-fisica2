import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import SimulatorSection from './sections/SimulatorSection';
import EducationSection from './sections/EducationSection';
import ApplicationsSection from './sections/ApplicationsSection';
import FAQSection from './sections/FAQSection';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga del "laboratorio"
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Smooth scroll para todos los links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg-primary">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <SimulatorSection />
            <div className="bg-gradient-to-b from-bg-primary via-bg-secondary/10 to-bg-primary">
              <EducationSection />
              <ApplicationsSection />
            </div>
            <FAQSection />
          </main>
          <Footer />
        </>
      )}

      {/* Global Grain/Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
