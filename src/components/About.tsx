import { useEffect, useRef, useState } from 'react';
import { Bug, Award, Globe, Users } from 'lucide-react';

const stats = [
  { icon: Bug, value: '47+', label: 'Vulnerabilities Found', color: 'text-red-400' },
  { icon: Award, value: '$12K+', label: 'Bug Bounty Earned', color: 'text-yellow-400' },
  { icon: Globe, value: '30+', label: 'Targets Assessed', color: 'text-cyan-400' },
  { icon: Users, value: '5+', label: 'Clients Secured', color: 'text-green-400' },
];

const certs = ['OSCP', 'CEH', 'eJPT', 'CompTIA Security+'];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-green-500 text-sm">$&nbsp;</span>
          <h2 className="font-mono text-2xl font-bold text-white">cat about_me.txt</h2>
          <div className="h-px flex-1 bg-green-500/20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-500/15">
                <span className="font-mono text-xs text-green-600">~/about_me.txt</span>
              </div>
              <div className="space-y-4 font-mono text-sm text-gray-300 leading-relaxed">
                <p>
                  <span className="text-green-400">&gt;&gt;&gt;</span> I'm <span className="text-cyan-300 font-bold">asdf</span>, a professional penetration tester and red team operator with a passion for breaking things—ethically.
                </p>
                <p>
                  <span className="text-green-400">&gt;&gt;&gt;</span> With deep expertise in web application security, network infrastructure assessment, and Active Directory attacks, I help organizations identify and remediate critical vulnerabilities before adversaries exploit them.
                </p>
                <p>
                  <span className="text-green-400">&gt;&gt;&gt;</span> I've conducted engagements across fintech, healthcare, and enterprise environments—delivering actionable reports that actually get fixed.
                </p>
                <p>
                  <span className="text-green-400">&gt;&gt;&gt;</span> When not on a pentest, I'm researching 0-days, competing in CTFs, and contributing to the security community.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {certs.map(cert => (
                <span key={cert} className="font-mono text-xs px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-5 hover:border-green-500/40 transition-all group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <div className={`font-mono text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="font-mono text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400">AVAILABILITY STATUS</span>
              </div>
              <p className="font-mono text-xs text-gray-400">
                Currently <span className="text-green-400 font-bold">available</span> for penetration testing engagements, red team operations, and security consulting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
