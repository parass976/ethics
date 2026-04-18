import { useEffect, useRef, useState } from 'react';
import { Target, Network, Code, Layers } from 'lucide-react';

const categories = [
  {
    icon: Target,
    title: 'Exploitation',
    color: 'text-red-400',
    border: 'border-red-500/20',
    glow: 'shadow-red-500/10',
    tools: ['Metasploit', 'SQLMap', 'Burp Suite Pro', 'Exploit-DB', 'BeEF', 'BloodHound', 'Impacket', 'Cobalt Strike'],
  },
  {
    icon: Network,
    title: 'Recon & OSINT',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/10',
    tools: ['Nmap', 'Shodan', 'theHarvester', 'Maltego', 'Recon-ng', 'Amass', 'FFUF', 'Subfinder'],
  },
  {
    icon: Layers,
    title: 'Active Directory',
    color: 'text-yellow-400',
    border: 'border-yellow-500/20',
    glow: 'shadow-yellow-500/10',
    tools: ['Mimikatz', 'PowerView', 'Rubeus', 'CrackMapExec', 'Evil-WinRM', 'Kerbrute', 'NetExec', 'ADEnum'],
  },
  {
    icon: Code,
    title: 'Web Security',
    color: 'text-green-400',
    border: 'border-green-500/20',
    glow: 'shadow-green-500/10',
    tools: ['OWASP Top 10', 'XSS/CSRF', 'SSRF', 'XXE', 'IDOR', 'JWT Attacks', 'OAuth Flaws', 'API Security'],
  },
];

const skillBars = [
  { name: 'Web Application Pentesting', level: 95 },
  { name: 'Network Penetration Testing', level: 88 },
  { name: 'Active Directory Attacks', level: 82 },
  { name: 'Social Engineering', level: 78 },
  { name: 'Malware Analysis', level: 70 },
  { name: 'Cloud Security (AWS/Azure)', level: 72 },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [barWidths, setBarWidths] = useState(skillBars.map(() => 0));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => {
            setBarWidths(skillBars.map(s => s.level));
          }, 300);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-green-500 text-sm">$&nbsp;</span>
          <h2 className="font-mono text-2xl font-bold text-white">ls -la skills/</h2>
          <div className="h-px flex-1 bg-green-500/20" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`bg-black/50 backdrop-blur-sm border ${cat.border} rounded-lg p-5 hover:bg-black/70 transition-all duration-300 shadow-lg ${cat.glow} ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms`, transitionProperty: 'opacity, transform' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
                <h3 className={`font-mono text-sm font-bold ${cat.color}`}>{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map(tool => (
                  <span
                    key={tool}
                    className={`font-mono text-xs px-2 py-1 bg-black/40 ${cat.color} border ${cat.border} rounded opacity-80 hover:opacity-100 transition-opacity cursor-default`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="font-mono text-sm font-bold text-green-400 mb-6">PROFICIENCY MATRIX</h3>
          <div className="space-y-5">
            {skillBars.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-xs text-gray-300">{skill.name}</span>
                  <span className="font-mono text-xs text-green-400">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000 ease-out shadow-sm shadow-green-400/50"
                    style={{ width: `${barWidths[i]}%`, transitionDelay: `${i * 100 + 400}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
