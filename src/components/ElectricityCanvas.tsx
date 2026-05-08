import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface LightningProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  active: boolean;
  shieldActive: boolean;
  color?: string;
  branches?: boolean;
}

const ElectricityCanvas: React.FC<LightningProps & { className?: string }> = ({
  startX,
  startY,
  endX,
  endY,
  active,
  shieldActive,
  color = '#00D1FF',
  branches = true,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const createLightning = (start: Point, end: Point, segments: number, jitter: number): Point[] => {
      const points: Point[] = [start];
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const x = start.x + (end.x - start.x) * t + (Math.random() - 0.5) * jitter;
        const y = start.y + (end.y - start.y) * t + (Math.random() - 0.5) * jitter;
        points.push({ x, y });
      }
      points.push(end);
      return points;
    };

    const drawLine = (points: Point[], width: number, opacity: number, glowColor: string) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active) {
        // Main bolt
        const jitterValue = shieldActive ? 40 : 80;
        const mainPoints = createLightning({ x: startX, y: startY }, { x: endX, y: endY }, 15, jitterValue);
        
        // Outer Glow
        drawLine(mainPoints, 8, 0.1, `${color}33`);
        // Inner Glow
        drawLine(mainPoints, 4, 0.5, `${color}99`);
        // Core
        drawLine(mainPoints, 1.5, 1, '#FFFFFF');

        // Random Sparks/Branches
        if (branches) {
           for (let i = 0; i < 3; i++) {
            if (Math.random() > 0.5) {
              const branchIndex = Math.floor(Math.random() * (mainPoints.length - 2)) + 1;
              const branchStart = mainPoints[branchIndex];
              const branchEnd = {
                x: branchStart.x + (Math.random() - 0.5) * 120,
                y: branchStart.y + (Math.random() - 0.5) * 120
              };
              const branchPoints = createLightning(branchStart, branchEnd, 6, 25);
              drawLine(branchPoints, 1, 0.4, color);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [startX, startY, endX, endY, active, shieldActive, color, branches]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className={`pointer-events-none ${className}`}
      style={{ filter: 'drop-shadow(0 0 10px rgba(0, 209, 255, 0.5))' }}
    />
  );
};

export default ElectricityCanvas;
