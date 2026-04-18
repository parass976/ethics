import { useState, useEffect } from 'react';
import { Terminal, Menu, X, Shield, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SettingsPanel from './Settings';

const navLinks = [
  { label: '~/about', href: '#about' },
  { label: '~/skills', href: '#skills' },
  { label: '~/projects', href: '#projects' },
  { label: '~/contact', href: '#contact' },
];

export default function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: scrolled ? `1px solid ${theme.primary}33` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Shield className="w-6 h-6" style={{ color: theme.primary }} />
            <div className="absolute inset-0 rounded-full blur-md group-hover:opacity-100 opacity-60 transition-all" style={{ backgroundColor: `${theme.primary}33` }} />
          </div>
          <span
            className={`font-mono font-bold text-lg tracking-wider transition-all ${
              glitch ? 'glitch-text' : ''
            }`}
            style={{
              color: theme.primary,
              textShadow: glitch ? `-2px 0 ${theme.accent}, 2px 0 ${theme.secondary}` : 'none',
            }}
          >
            asdf
            <span className="animate-pulse" style={{ color: theme.secondary }}>_</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-4 py-2 font-mono text-sm text-gray-400 border border-transparent rounded transition-all duration-200 relative group"
              style={{
                '--hover-color': theme.primary,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
                e.currentTarget.style.backgroundColor = `${theme.primary}0a`;
                e.currentTarget.style.borderColor = `${theme.primary}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.secondary }}>$&nbsp;</span>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => setSettingsOpen(true)}
            className="px-4 py-2 font-mono text-sm text-gray-400 border border-transparent rounded transition-all duration-200 flex items-center gap-1"
            style={{ color: theme.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.primary}0a`;
              e.currentTarget.style.borderColor = `${theme.primary}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <Settings className="w-4 h-4" />
          </button>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); handleNav('#contact'); }}
            className="ml-4 px-5 py-2 font-mono text-sm text-black rounded transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: theme.primary,
              borderColor: theme.primary,
              border: `1px solid ${theme.primary}`,
              boxShadow: `0 0 20px ${theme.primary}33`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <Terminal className="w-4 h-4" />
            connect
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setSettingsOpen(true)}
            style={{ color: theme.primary }}
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: theme.primary }}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 py-4 flex flex-col gap-2" style={{ borderTopColor: `${theme.primary}33`, borderTopWidth: '1px' }}>
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left px-4 py-3 font-mono text-sm text-gray-400 hover:text-green-400 hover:bg-green-400/5 rounded border border-transparent hover:border-green-500/20 transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </nav>
  );
}
