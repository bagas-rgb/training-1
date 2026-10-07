import React from 'react';
import { 
  Sparkles, 
  Ticket, 
  Compass, 
  Terminal, 
  Palette, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { VibeTheme } from '../types';

interface NavbarProps {
  currentTab: 'events' | 'dashboard' | 'timeline';
  setCurrentTab: (tab: 'events' | 'dashboard' | 'timeline') => void;
  activeTicketCount: number;
  openPromptLogs: () => void;
  openSmartQuiz: () => void;
  currentTheme: VibeTheme;
  setTheme: (theme: VibeTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  activeTicketCount,
  openPromptLogs,
  openSmartQuiz,
  currentTheme,
  setTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = React.useState(false);

  const themeOptions: { id: VibeTheme; name: string; colorDot: string; desc: string }[] = [
    { id: 'duck', name: 'Duck SC Gold', colorDot: 'bg-amber-400', desc: 'Warna Khas UNILAK' },
    { id: 'cyber', name: 'Cyber Neon', colorDot: 'bg-cyan-400', desc: 'Vibe Hackathon Futuristik' },
    { id: 'emerald', name: 'Lancang Kuning', colorDot: 'bg-emerald-500', desc: 'Hijau Tropis & Emas Riau' },
    { id: 'monochrome', name: 'Clean Studio', colorDot: 'bg-zinc-300', desc: 'Editorial Minimalis' },
  ];

  const currentThemeLabel = themeOptions.find(t => t.id === currentTheme)?.name || 'Duck SC Gold';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 border-white/10 bg-slate-950/90 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('events')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 font-black text-xl select-none">
              🦆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-lg sm:text-xl text-white">
                  Kawan<span className="text-amber-400">Event</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 hidden sm:inline-block border border-slate-700 rounded px-1.5 py-0.5">
                  Riau Pelajar
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Developer Unity Creative UNILAK Study Club
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setCurrentTab('events')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentTab === 'events'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              Jelajah Event
            </button>

            <button
              onClick={() => setCurrentTab('timeline')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentTab === 'timeline'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              Kalender Pelajar
            </button>

            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                currentTab === 'dashboard'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Ticket className="w-4 h-4 text-emerald-400" />
              Tiket Saya
              {activeTicketCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-amber-500 text-slate-950">
                  {activeTicketCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Tools: Quiz, Log Prompt, Theme Switcher */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Smart Matcher */}
            <button
              onClick={openSmartQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
              title="Cari event sesuai minatmu dalam 2 klik"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Matcher</span>
            </button>

            {/* AI Log Prompt (Critical for jury score 25%) */}
            <button
              onClick={openPromptLogs}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 hover:bg-indigo-500/25 transition-colors"
              title="Lihat dokumentasi Log Prompt AI untuk penilaian juri (Bobot 25%)"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Log Prompt AI</span>
              <span className="text-[10px] font-bold bg-indigo-500 text-white px-1.5 py-0.2 rounded">
                25% Juri
              </span>
            </button>

            {/* Vibe Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors"
                title="Pilih tema vibe lomba"
              >
                <Palette className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden lg:inline">{currentThemeLabel}</span>
              </button>

              {themeDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 text-xs"
                  onClick={() => setThemeDropdownOpen(false)}
                >
                  <div className="px-2 py-1.5 font-semibold text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800 mb-1">
                    Pilih Vibe Lomba
                  </div>
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setTheme(opt.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                        currentTheme === opt.id ? 'bg-white/10 text-white font-medium' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${opt.colorDot}`} />
                        <span>{opt.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={openPromptLogs}
              className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs flex items-center gap-1"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-[11px] font-bold">Log AI</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Buka navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setCurrentTab('events'); setMobileMenuOpen(false); }}
              className={`p-2.5 text-xs text-center rounded-lg border flex flex-col items-center gap-1 ${
                currentTab === 'events'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 text-slate-300'
              }`}
            >
              <Compass className="w-4 h-4" />
              Jelajah
            </button>

            <button
              onClick={() => { setCurrentTab('timeline'); setMobileMenuOpen(false); }}
              className={`p-2.5 text-xs text-center rounded-lg border flex flex-col items-center gap-1 ${
                currentTab === 'timeline'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                  : 'border-slate-800 text-slate-300'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Kalender
            </button>

            <button
              onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
              className={`p-2.5 text-xs text-center rounded-lg border flex flex-col items-center gap-1 ${
                currentTab === 'dashboard'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 text-slate-300'
              }`}
            >
              <Ticket className="w-4 h-4" />
              Tiket ({activeTicketCount})
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => { openSmartQuiz(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Smart Matcher Minat Pelajar
            </button>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Pilih Vibe:</span>
              <div className="flex gap-1.5">
                {themeOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    className={`px-2 py-1 text-[11px] rounded border ${
                      currentTheme === opt.id
                        ? 'border-amber-400 bg-amber-400/20 text-white font-bold'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    {opt.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
