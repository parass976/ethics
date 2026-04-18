import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|\\';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const speeds: number[] = Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);
    const brightDrops: boolean[] = Array(columns).fill(false).map(() => Math.random() > 0.85);

    let frame = 0;

    const draw = () => {
      frame++;
      columns = Math.floor(canvas.width / fontSize);

      while (drops.length < columns) {
        drops.push(1);
        speeds.push(0.3 + Math.random() * 0.7);
        brightDrops.push(Math.random() > 0.85);
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (brightDrops[i]) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 8;
        } else {
          const alpha = 0.4 + Math.random() * 0.6;
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 4;
        }

        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          brightDrops[i] = Math.random() > 0.85;
        }
        drops[i] += speeds[i];
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-25 pointer-events-none"
    />
  );
}
