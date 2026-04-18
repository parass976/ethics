import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Terminal, Wifi, Lock, Cpu } from 'lucide-react';

const lines = [
  { prefix: 'root@kali:~#', text: ' whoami', delay: 0 },
  { prefix: '', text: 'asdf', delay: 700, highlight: true },
  { prefix: 'root@kali:~#', text: ' cat role.txt', delay: 1400 },
  { prefix: '', text: 'Penetration Tester | Red Team Operator | Security Researcher', delay: 2100 },
  { prefix: 'root@kali:~#', text: ' nmap -p- --open target.local', delay: 2900 },
  { prefix: '', text: 'Starting Nmap scan... [OPEN PORTS: 22, 80, 443, 8080]', delay: 3700, scan: true },
  { prefix: 'root@kali:~#', text: ' _', delay: 4500, blink: true },
];

const statusItems = [
  { icon: Wifi, label: 'VPN', value: 'ACTIVE', color: 'text-green-400' },
  { icon: Lock, label: 'OPSEC', value: 'ENABLED', color: 'text-cyan-400' },
  { icon: Cpu, label: 'STATUS', value: 'OPERATIONAL', color: 'text-green-400' },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [typedTexts, setTypedTexts] = useState<string[]>(Array(lines.length).fill(''));
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lines.forEach((line, idx) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, idx]);
        if (line.text) {
          const chars = line.text.split('');
          let ci = 0;
          const typeInterval = setInterval(() => {
            if (ci < chars.length) {
              setTypedTexts(prev => {
                const next = [...prev];
                next[idx] = line.text.slice(0, ci + 1);
                return next;
              });
              ci++;
            } else {
              clearInterval(typeInterval);
            }
          }, line.highlight ? 60 : 18);
        }
      }, line.delay);
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="absolute top-8 right-8 hidden md:flex flex-col gap-2">
        {statusItems.map(item => (
          <div key={item.label} className="flex items-center gap-2 bg-black/60 border border-green-500/20 rounded px-3 py-1.5 backdrop-blur-sm">
            <item.icon className={`w-3 h-3 ${item.color}`} />
            <span className="font-mono text-xs text-gray-500">{item.label}:</span>
            <span className={`font-mono text-xs font-bold ${item.color}`}>
              <span className="animate-pulse">&#9632;</span> {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
          <span className="font-mono text-xs text-green-600 tracking-widest uppercase">SECURE SHELL INTERFACE</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
        </div>

        <div
          ref={terminalRef}
          className="bg-black/70 backdrop-blur-sm border border-green-500/30 rounded-lg overflow-hidden shadow-2xl shadow-green-500/10"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-green-500/20">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="w-3 h-3 text-green-500/60" />
              <span className="font-mono text-xs text-gray-500">zsh — 80x24</span>
            </div>
          </div>

          <div className="p-6 min-h-[280px] font-mono text-sm space-y-1">
            {lines.map((line, idx) =>
              visibleLines.includes(idx) ? (
                <div key={idx} className="flex items-start gap-2">
                  {line.prefix && (
                    <span className="text-green-500 shrink-0 font-bold">{line.prefix}</span>
                  )}
                  <span
                    className={`break-all ${
                      line.highlight
                        ? 'text-cyan-300 font-bold text-lg tracking-wide'
                        : line.scan
                        ? 'text-yellow-400'
                        : line.prefix
                        ? 'text-gray-300'
                        : 'text-gray-400'
                    } ${line.blink ? 'animate-pulse' : ''}`}
                  >
                    {typedTexts[idx]}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-green-400 text-black font-mono font-bold text-sm rounded hover:bg-green-300 transition-all duration-200 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 border border-green-400"
          >
            ./view_projects.sh
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-transparent text-green-400 font-mono font-bold text-sm rounded hover:bg-green-400/10 transition-all duration-200 border border-green-500/40 hover:border-green-500/80"
          >
            ./hire_me.sh
          </button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-green-500/50 hover:text-green-400 transition-all animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
