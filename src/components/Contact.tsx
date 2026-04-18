import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Twitter, Linkedin, Send, Key } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', value: '@asdf', href: '#', color: 'hover:text-white' },
  { icon: Twitter, label: 'Twitter', value: '@asdf_sec', href: '#', color: 'hover:text-cyan-400' },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/asdf-sec', href: '#', color: 'hover:text-blue-400' },
  { icon: Mail, label: 'Email', value: 'asdf@proton.me', href: 'mailto:asdf@proton.me', color: 'hover:text-green-400' },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setOutput([]);
    const steps = [
      `[*] Initializing secure connection...`,
      `[*] Encrypting payload with AES-256-GCM...`,
      `[+] Connection established: TLSv1.3`,
      `[*] Sending message from: ${form.name} <${form.email}>`,
      `[*] Subject: ${form.subject}`,
      `[+] Message delivered successfully.`,
      `[+] DONE. Response within 24-48h.`,
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, step]);
        if (i === steps.length - 1) {
          setStatus('sent');
          setForm({ name: '', email: '', subject: '', message: '' });
        }
      }, i * 400);
    });
  };

  return (
    <section id="contact" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-green-500 text-sm">$&nbsp;</span>
          <h2 className="font-mono text-2xl font-bold text-white">ssh asdf@contact.local</h2>
          <div className="h-px flex-1 bg-green-500/20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <Key className="w-4 h-4 text-green-400" />
                <span className="font-mono text-sm text-green-400 font-bold">SECURE CHANNEL</span>
              </div>
              <p className="font-mono text-xs text-gray-400 leading-relaxed mb-6">
                Available for penetration testing engagements, red team operations, security consulting, and responsible disclosure. All communications are encrypted.
              </p>
              <div className="space-y-3">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className={`flex items-center gap-3 p-3 bg-black/30 border border-green-500/10 rounded hover:border-green-500/30 hover:bg-green-500/5 transition-all group ${s.color}`}
                  >
                    <s.icon className="w-4 h-4 text-gray-500 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs text-gray-500">{s.label}:</span>
                    <span className="font-mono text-xs text-gray-300">{s.value}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-5">
              <p className="font-mono text-xs text-yellow-400 mb-1 font-bold">RESPONSIBLE DISCLOSURE</p>
              <p className="font-mono text-xs text-gray-400">
                Found a vulnerability? PGP key available. I respond to all security reports within 48 hours.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {status === 'sent' || output.length > 0 ? (
              <div className="bg-black/70 backdrop-blur-sm border border-green-500/30 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-green-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-gray-500">transmission.log</span>
                </div>
                <div className="p-6 min-h-[200px] font-mono text-sm space-y-2">
                  {output.map((line, i) => (
                    <div key={i} className={`${line.startsWith('[+]') ? 'text-green-400' : 'text-gray-400'}`}>
                      {line}
                    </div>
                  ))}
                  {status === 'sent' && (
                    <button
                      onClick={() => { setStatus('idle'); setOutput([]); }}
                      className="mt-4 font-mono text-xs text-green-400 border border-green-500/30 px-4 py-2 rounded hover:bg-green-500/10 transition-all"
                    >
                      ./new_message.sh
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'email', 'subject'].map(field => (
                  <div key={field}>
                    <label className="block font-mono text-xs text-gray-500 mb-1.5">
                      <span className="text-green-600">$</span> {field}:
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      required
                      className="w-full bg-black/50 border border-green-500/20 rounded px-4 py-2.5 font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-green-500/60 focus:bg-black/70 transition-all"
                      placeholder={`enter ${field}...`}
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-1.5">
                    <span className="text-green-600">$</span> message:
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full bg-black/50 border border-green-500/20 rounded px-4 py-2.5 font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-green-500/60 focus:bg-black/70 transition-all resize-none"
                    placeholder="describe your engagement..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-400 text-black font-mono font-bold text-sm rounded hover:bg-green-300 transition-all duration-200 shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'transmitting...' : './send_message.sh'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
