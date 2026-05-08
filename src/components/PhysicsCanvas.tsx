import React, { useEffect, useRef } from 'react';

interface PhysicsCanvasProps {
  shieldActive: boolean;
  isFiring: boolean;
  scientificMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  type: 'ion' | 'electron';
  charge: string;
}

const PhysicsCanvas: React.FC<PhysicsCanvasProps> = ({ shieldActive, isFiring, scientificMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const cageWidth = 260;
    const cageHeight = 420;
    const cageX = 400 - cageWidth / 2;
    const cageY = 300 - cageHeight / 2;
    const thickness = 40;

    const initParticles = () => {
      particles = [];
      const rows = 12;
      const cols = 8;
      
      // Create a grid of ions and electrons within the cage wall thickness
      const createWallParticles = (x: number, y: number, w: number, h: number) => {
        const step = 25;
        for (let ix = 0; ix < w; ix += step) {
          for (let iy = 0; iy < h; iy += step) {
            const px = x + ix + Math.random() * 5;
            const py = y + iy + Math.random() * 5;
            
            // Add Ion (Positive fixed)
            particles.push({
              x: px, y: py, baseX: px, baseY: py,
              vx: 0, vy: 0, type: 'ion', charge: '+'
            });
            // Add Electron (Negative mobile)
            particles.push({
              x: px + 5, y: py + 5, baseX: px + 5, baseY: py + 5,
              vx: 0, vy: 0, type: 'electron', charge: '-'
            });
          }
        }
      };

      // Top wall
      createWallParticles(cageX, cageY, cageWidth, thickness);
      // Bottom wall
      createWallParticles(cageX, cageY + cageHeight - thickness, cageWidth, thickness);
      // Left wall
      createWallParticles(cageX, cageY + thickness, thickness, cageHeight - thickness * 2);
      // Right wall
      createWallParticles(cageX + cageWidth - thickness, cageY + thickness, thickness, cageHeight - thickness * 2);
    };

    initParticles();

    const drawFieldLines = (time: number) => {
      if (!isFiring) return;
      
      const lineCount = 8;
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = shieldActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 77, 109, 0.6)';
      
      for (let i = 0; i < lineCount; i++) {
        const y = 80 + i * (440 / (lineCount - 1));
        
        ctx.beginPath();
        // External left field
        ctx.moveTo(50, y);
        ctx.lineTo(cageX, y);
        
        // Internal field (only if shield is OFF)
        if (!shieldActive) {
          ctx.lineTo(cageX + cageWidth, y);
        } else {
          ctx.moveTo(cageX + cageWidth, y);
        }
        
        // External right field
        ctx.lineTo(750, y);
        ctx.stroke();

        // Draw Arrows
        const arrowX = 740;
        ctx.beginPath();
        ctx.moveTo(arrowX - 10, y - 5);
        ctx.lineTo(arrowX, y);
        ctx.lineTo(arrowX - 10, y + 5);
        ctx.stroke();
      }
      ctx.restore();
    };

    const updateAndDrawParticles = (time: number) => {
      particles.forEach((p, idx) => {
        if (p.type === 'electron') {
          if (isFiring && shieldActive) {
            // MIGRACIÓN GLOBAL REAL (Sin anclaje)
            // Los electrones son atraídos con fuerza por la fuente positiva a la izquierda
            const forceX = -1.5;
            p.vx += forceX;
            p.vx *= 0.85; // Damping mejorado
            
            p.x += p.vx;
            
            // Límite físico: Pared izquierda de la jaula (Acumulación Superficial)
            const accumulationDepth = 25;
            const stopPoint = cageX + 5 + (idx % accumulationDepth);
            
            if (p.x < stopPoint) {
              p.x = stopPoint;
              p.vx = 0;
              // Micro-flotación lenta en la superficie acumulada
              p.y += Math.sin(time * 0.05 + idx) * 0.2;
            }
          } else if (isFiring && !shieldActive) {
            // Penetración: Movimiento errático masivo de alta energía
            p.vx += (Math.random() - 0.5) * 4;
            p.vy += (Math.random() - 0.5) * 4;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.x += p.vx;
            p.y += p.vy;
            
            // Colisiones con bordes del simulador
            if (p.x < 10 || p.x > 790) p.vx *= -1;
            if (p.y < 10 || p.y > 590) p.vy *= -1;
          } else {
            // Equilibrio: Retorno a la red cristalina original (Iones)
            const dx = p.baseX - p.x;
            const dy = p.baseY - p.y;
            p.vx = dx * 0.08;
            p.vy = dy * 0.08;
            p.x += p.vx;
            p.y += p.vy;
          }
        }

        // Renderizado de Iones (Cargas Positivas Fijas en la red cristalina)
        if (p.type === 'ion') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#00D1FF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00D1FF';
          ctx.fill();
          
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = 'white';
          ctx.font = 'bold 11px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', p.x, p.y);
          ctx.restore();
        } else {
          // Renderizado de Electrones (Cargas Negativas Móviles)
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFE600';
          
          if (isFiring && shieldActive) {
            // Brillo por alta concentración/energía en zona de impacto e inducción
            const isAtLeft = p.x < cageX + thickness + 15;
            if (isAtLeft) {
              ctx.shadowBlur = 20;
              ctx.shadowColor = '#FFE600';
              ctx.fillStyle = '#FFF9A3';
            } else {
              ctx.globalAlpha = 0.5; // Desvanecimiento de los que están migrando (Déficit visible)
            }
          }
          
          ctx.fill();
          
          ctx.fillStyle = 'black';
          ctx.font = 'bold 9px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('-', p.x, p.y);
          ctx.restore();
        }
      });
    };

    const drawSimulationLabels = () => {
      if (!isFiring) return;
      
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      
      // Indicadores de Carga Externa (Fuente + a la izquierda, Sumidero - a la derecha)
      ctx.fillText('+', 50, 70);
      ctx.fillText('-', 750, 70);

      if (shieldActive) {
        // Líneas de Polarización Sutíl
        ctx.setLineDash([8, 4]);
        ctx.strokeStyle = 'rgba(255, 77, 109, 0.4)';
        ctx.lineWidth = 1.5;
        // Solo marcamos la zona de acumulación izquierda con un recuadro sutíl
        ctx.strokeRect(cageX - 10, cageY - 10, thickness + 20, cageHeight + 20);
      } else {
        ctx.fillStyle = 'rgba(255, 77, 109, 0.15)';
        ctx.font = 'bold 32px Impact';
        ctx.fillText('RADIATION PENETRATION', 400, 100);
      }
      ctx.restore();
    };

    const render = () => {
      timeRef.current += 1;
      const t = timeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawFieldLines(t);
      updateAndDrawParticles(t);
      drawSimulationLabels();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [shieldActive, isFiring, scientificMode]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 transition-all ${isFiring && !shieldActive ? 'animate-pulse bg-danger/5' : ''}`}
    />
  );
};

export default PhysicsCanvas;

