import React from 'react';
import { Terminal, Shield, Phone, MapPin, Heart, Code2 } from 'lucide-react';

interface FooterProps {
  openPromptLogs: () => void;
}

export const Footer: React.FC<FooterProps> = ({ openPromptLogs }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦆</span>
              <span className="font-extrabold text-white text-base">
                KawanEvent <span className="text-amber-400">Riau</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Platform informasi kurasi kompetisi & pendaftaran kegiatan siswa/i aktif di Pekanbaru, Riau.
            </p>
            <div className="text-[11px] text-slate-400">
              Dikembangkan untuk <strong className="text-slate-200">Duckathon 2.0 — Vibe Coding Challenge</strong>.
            </div>
          </div>

          {/* Col 2: Organizers & Venue */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Penyelenggara Resmi
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-slate-300 font-semibold">Duck SC (Developer Unity Creative UNILAK)</li>
              <li>Fakultas Ilmu Komputer Universitas Lancang Kuning</li>
              <li className="flex items-start gap-1 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Jl. Yos Sudarso KM. 8, Rumbai, Pekanbaru, Riau</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact from PDF */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Contact Person Panitia (PDF)
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>CP 1: 0819-0267-3775</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>CP 2: 0821-7137-4234</span>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">
                HTM Resmi Rp10.000 / peserta (Kuota terbatas 36 peserta).
              </div>
            </div>
          </div>

          {/* Col 4: Tech Stack Bonus & AI Audit */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
              <span>Ketentuan Teknis Lanjutan</span>
              <span className="text-amber-400">⭐</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Menggunakan React 19 + TypeScript + Tailwind CSS (Framework Lanjutan berhak klaim poin bonus dari dewan juri).
            </p>
            <button
              onClick={openPromptLogs}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold hover:bg-indigo-500/30 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Buka Audit Log Prompt (25%)</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 Developer Unity Creative UNILAK Study Club · Duckathon 2.0 Vibe Coding Challenge
          </div>
          <div className="flex items-center gap-3">
            <span>Desain Visual 30%</span>
            <span>·</span>
            <span>Fungsi 25%</span>
            <span>·</span>
            <span>Prompt Log 25%</span>
            <span>·</span>
            <span>Inovasi 20%</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
