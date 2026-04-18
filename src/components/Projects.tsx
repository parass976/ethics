import { useEffect, useRef, useState } from 'react';
import { ExternalLink, GitBranch, AlertTriangle, Shield, Lock } from 'lucide-react';

const projects = [
  {
    id: 'CVE-2024-XXXX',
    title: 'Critical RCE in Enterprise VPN',
    type: 'CVE Research',
    severity: 'CRITICAL',
    severityColor: 'text-red-400 border-red-500/40 bg-red-500/10',
    tags: ['RCE', 'Buffer Overflow', 'CVE'],
    description:
      'Discovered an unauthenticated remote code execution vulnerability in a widely deployed enterprise VPN solution. Achieved full system compromise via a crafted packet triggering a stack buffer overflow in the authentication handler.',
    impact: 'Full system compromise, credential theft, lateral movement',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
  },
  {
    id: 'BB-2024-0187',
    title: 'Auth Bypass — Major Fintech Platform',
    type: 'Bug Bounty',
    severity: 'HIGH',
    severityColor: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
    tags: ['Authentication', 'JWT', 'IDOR', '$5,000'],
    description:
      'Identified a flawed JWT validation implementation that allowed an attacker to forge tokens for any user account, bypassing MFA and gaining unauthorized access to financial data and transactions.',
    impact: 'Account takeover, financial data exposure, PII breach',
    icon: Lock,
    iconColor: 'text-orange-400',
  },
  {
    id: 'RT-2024-BANK',
    title: 'Red Team — Financial Institution',
    type: 'Red Team Op',
    severity: 'CLASSIFIED',
    severityColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
    tags: ['Active Directory', 'Phishing', 'Persistence', 'Domain Admin'],
    description:
      'Full red team engagement against a Tier 1 financial institution. Achieved domain admin in 6 hours via spear-phishing → Kerberoasting → privilege escalation chain. Delivered executive report with remediation roadmap.',
    impact: 'Domain compromise, SOC detection gap analysis, 47 findings',
    icon: Shield,
    iconColor: 'text-cyan-400',
  },
  {
    id: 'TOOL-2024-AUTORECON',
    title: 'AutoPT — Automated Pentest Framework',
    type: 'Open Source Tool',
    severity: 'PUBLIC',
    severityColor: 'text-green-400 border-green-500/40 bg-green-500/10',
    tags: ['Python', 'Automation', 'Recon', '800+ Stars'],
    description:
      'Built a modular automated penetration testing framework that orchestrates recon, vulnerability scanning, and exploitation chains. Integrates 20+ tools with intelligent result correlation and report generation.',
    impact: '800+ GitHub stars, used by 300+ pentesters worldwide',
    icon: GitBranch,
    iconColor: 'text-green-400',
  },
];

const badges: Record<string, string> = {
  CRITICAL: 'bg-red-500/10 text-red-400 border border-red-500/30',
  HIGH: 'bg-orange-500/10 text-orange-400 border border-orange-500/30',
  CLASSIFIED: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
  PUBLIC: 'bg-green-500/10 text-green-400 border border-green-500/30',
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-green-500 text-sm">$&nbsp;</span>
          <h2 className="font-mono text-2xl font-bold text-white">find ~/projects -type f</h2>
          <div className="h-px flex-1 bg-green-500/20" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`group bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 transition-all duration-500 shadow-lg hover:shadow-green-500/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 120}ms`, transitionProperty: 'opacity, transform, box-shadow, border-color' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/40 rounded border border-green-500/10 group-hover:border-green-500/30 transition-colors">
                      <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-gray-500">{p.id}</span>
                      <div className="font-mono text-xs text-gray-500 mt-0.5">{p.type}</div>
                    </div>
                  </div>
                  <span className={`font-mono text-xs px-2 py-1 rounded ${badges[p.severity]}`}>
                    {p.severity}
                  </span>
                </div>

                <h3 className="font-mono text-base font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                  {p.title}
                </h3>

                <p className="font-mono text-xs text-gray-400 leading-relaxed mb-4">{p.description}</p>

                <div className="bg-black/40 rounded border border-green-500/10 px-3 py-2 mb-4">
                  <span className="font-mono text-xs text-gray-500">IMPACT: </span>
                  <span className="font-mono text-xs text-gray-300">{p.impact}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(tag => (
                    <span key={tag} className="font-mono text-xs px-2 py-0.5 bg-green-500/5 text-green-600 border border-green-500/15 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-3 bg-black/30 border-t border-green-500/10 flex items-center justify-between">
                <span className="font-mono text-xs text-gray-600">./read_more.sh</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-green-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
