import { useEffect, useRef, useState } from 'react';
import { X, Sun, Zap, Palette, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type ThemeType = 'matrix-green' | 'cyberpunk-blue' | 'neon-purple' | 'stealth-dark';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const themeOptions = [
  { id: 'matrix-green', name: 'Matrix Green', color: '#00ff41' },
  { id: 'cyberpunk-blue', name: 'Cyberpunk Blue', color: '#00d4ff' },
  { id: 'neon-purple', name: 'Neon Purple', color: '#c84aff' },
  { id: 'stealth-dark', name: 'Stealth Dark', color: '#ffffff' },
];

const animationOptions = [
  { id: 'low', name: 'Low', desc: 'Minimal animations' },
  { id: 'medium', name: 'Medium', desc: 'Standard animations' },
  { id: 'high', name: 'High', desc: 'Full effects' },
];

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { brightness, setBrightness, animationIntensity, setAnimationIntensity, setTheme, theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-black/90 rounded-lg max-w-xl w-full mx-4 overflow-hidden shadow-2xl"
        style={{
          borderColor: `${theme.primary}4d`,
          borderWidth: '1px',
          boxShadow: `0 0 30px ${theme.primary}1a`,
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50" style={{ borderBottomColor: `${theme.primary}33`, borderBottomWidth: '1px' }}>
          <h2 className="font-mono text-lg font-bold flex items-center gap-2" style={{ color: theme.primary }}>
            <Palette className="w-5 h-5" />
            system.config
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 transition-colors"
            style={{ '--hover-color': theme.primary } as React.CSSProperties}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = theme.primary; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6b7280'; }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 max-h-[80vh] overflow-y-auto space-y-6">
          <div>
            <label className="flex items-center gap-2 font-mono text-sm mb-3" style={{ color: theme.primary }}>
              <Palette className="w-4 h-4" />
              theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id as ThemeType)}
                  className="p-3 rounded transition-all bg-black/40 font-mono text-xs text-gray-300 flex items-center gap-2 group"
                  style={{
                    borderColor: `${opt.color}33`,
                    borderWidth: '1px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${opt.color}99`;
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.color = opt.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${opt.color}33`;
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.color = '#d1d5db';
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: opt.color, borderColor: opt.color }}
                  />
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 font-mono text-sm mb-3" style={{ color: theme.primary }}>
              <Sun className="w-4 h-4" />
              brightness
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={e => setBrightness(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1f2937 0%, ${theme.primary} ${brightness - 50}%, #1f2937 ${brightness - 50}%, #1f2937 100%)`,
                }}
              />
              <span className="font-mono text-xs text-gray-400 w-12 text-right">{brightness}%</span>
            </div>
            <p className="font-mono text-xs text-gray-600 mt-2">adjust screen brightness</p>
          </div>

          <div>
            <label className="flex items-center gap-2 font-mono text-sm mb-3" style={{ color: theme.primary }}>
              <Zap className="w-4 h-4" />
              animation intensity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {animationOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAnimationIntensity(opt.id as 'low' | 'medium' | 'high')}
                  className="p-3 border rounded transition-all font-mono text-xs"
                  style={{
                    borderColor: animationIntensity === opt.id ? theme.primary : `${theme.primary}33`,
                    backgroundColor: animationIntensity === opt.id ? `${theme.primary}1a` : 'rgba(0, 0, 0, 0.4)',
                    color: animationIntensity === opt.id ? theme.primary : '#9ca3af',
                  }}
                  onMouseEnter={(e) => {
                    if (animationIntensity !== opt.id) {
                      e.currentTarget.style.borderColor = `${theme.primary}66`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (animationIntensity !== opt.id) {
                      e.currentTarget.style.borderColor = `${theme.primary}33`;
                    }
                  }}
                >
                  <div className="font-bold">{opt.name}</div>
                  <div className="text-xs" style={{ color: animationIntensity === opt.id ? theme.primary : '#6b7280' }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded" style={{ borderColor: `${theme.primary}1a`, borderWidth: '1px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <label className="flex items-center gap-2 font-mono text-sm text-gray-300 cursor-pointer">
              <Volume2 className="w-4 h-4" />
              sound effects
            </label>
            <button
              onClick={() => setSound(!sound)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{
                backgroundColor: sound ? theme.primary : '#374151',
              }}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  sound ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <div className="p-4 rounded" style={{ borderColor: theme.secondary, borderWidth: '1px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <p className="font-mono text-xs text-gray-400">
              <span style={{ color: theme.secondary }} className="font-bold">$</span> echo &quot;changes saved automatically to localStorage&quot;
            </p>
          </div>
        </div>

        <div className="px-6 py-3 bg-gray-900/30 flex gap-2" style={{ borderTopColor: `${theme.primary}33`, borderTopWidth: '1px' }}>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 font-mono text-xs font-bold rounded transition-all"
            style={{
              color: theme.primary,
              borderColor: `${theme.primary}4d`,
              borderWidth: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.primary}0a`;
              e.currentTarget.style.borderColor = `${theme.primary}99`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = `${theme.primary}4d`;
            }}
          >
            ./close.sh
          </button>
        </div>
      </div>
    </div>
  );
}
