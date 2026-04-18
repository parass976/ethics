import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  type: 'normal' | 'hub' | 'target';
}

export default function NetworkNodes() {
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

    const nodeCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() > 0.9 ? 4 : Math.random() > 0.7 ? 3 : 2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      type: Math.random() > 0.92 ? 'hub' : Math.random() > 0.85 ? 'target' : 'normal',
    }));

    const scanLines: { y: number; speed: number; alpha: number }[] = Array.from({ length: 3 }, () => ({
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random() * 1.5,
      alpha: 0.03 + Math.random() * 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      scanLines.forEach(line => {
        const grad = ctx.createLinearGradient(0, line.y - 40, 0, line.y + 40);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `rgba(0, 212, 255, ${line.alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, line.y - 40, canvas.width, 80);
        line.y += line.speed;
        if (line.y > canvas.height + 40) line.y = -40;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            const isHubConn = nodes[i].type === 'hub' || nodes[j].type === 'hub';
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isHubConn
              ? `rgba(0, 212, 255, ${alpha * 1.5})`
              : `rgba(0, 255, 65, ${alpha})`;
            ctx.lineWidth = isHubConn ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        node.pulse += node.pulseSpeed;
        const pulseFactor = 1 + Math.sin(node.pulse) * 0.3;

        if (node.type === 'hub') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3 * pulseFactor, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 212, 255, 0.06)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulseFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#00d4ff';
          ctx.shadowColor = '#00d4ff';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (node.type === 'target') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * pulseFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#ff4444';
          ctx.shadowColor = '#ff4444';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 65, 0.7)';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
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
      className="fixed inset-0 z-0 opacity-60 pointer-events-none"
    />
  );
}
