import React from 'react';
import { Search, MapPin, Calendar, Clock, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { EventItem } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  featuredEvent: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onDirectRegister: (event: EventItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  featuredEvent,
  onSelectEvent,
  onDirectRegister,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-white/5">
      {/* Background glow mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header Copy */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>Pekanbaru & Riau</span>
            <span aria-hidden="true">·</span>
            <span>Platform Komunitas Pelajar</span>
            <span aria-hidden="true">·</span>
            <span>UNILAK Duck SC</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Wadahnya Lomba & Event <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              Generasi Berprestasi Riau
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Temukan kompetisi coding, workshop keahlian, seminar sains, dan ajang kreatif siswa di Pekanbaru. 
            Daftar mudah dalam hitungan detik dan dapatkan E-Tiket resmi terverifikasi.
          </p>

          {/* Search Input Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-xl p-1.5 shadow-2xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lomba coding, workshop AI, olimpiade, atau nama sekolah..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>
            
            {/* Quick search keywords */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Pencarian populer:</span>
              <button 
                onClick={() => setSearchQuery('Duckathon')}
                className="hover:text-amber-300 underline underline-offset-4"
              >
                Duckathon 2.0
              </button>
              <span>·</span>
              <button 
                onClick={() => setSearchQuery('Workshop')}
                className="hover:text-amber-300 underline underline-offset-4"
              >
                Workshop AI
              </button>
              <span>·</span>
              <button 
                onClick={() => setSearchQuery('Figma')}
                className="hover:text-amber-300 underline underline-offset-4"
              >
                UI/UX Desain
              </button>
              <span>·</span>
              <button 
                onClick={() => setSearchQuery('Olimpiade')}
                className="hover:text-amber-300 underline underline-offset-4"
              >
                Olimpiade Sains
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Card: Duckathon 2.0 (Official Competition Showcase) */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-bold text-amber-400 tracking-wider uppercase">
                  ⭐ Spotlight Challenge
                </span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-slate-300">Developer Unity Creative UNILAK Study Club</span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">Sisa {featuredEvent.maxParticipants - featuredEvent.currentParticipants} Kuota dari {featuredEvent.maxParticipants}</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {featuredEvent.title}
                </h2>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {featuredEvent.description}
                </p>
              </div>

              {/* Event Metadata */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{featuredEvent.date}</span>
                </div>
                <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{featuredEvent.time}</span>
                </div>
                <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate max-w-[260px]">{featuredEvent.location}</span>
                </div>
                <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-amber-300">{featuredEvent.totalPrizeValue}</span>
                </div>
              </div>

              {/* Verified Trust Notes from PDF */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HTM Resmi Rp10.000 · Snack & Makan Siang Ditanggung Panitia · Sertifikat Resmi Seluruh Peserta</span>
              </div>
            </div>

            {/* Right Action / CTA Box */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-center lg:text-left">
                <div className="text-xs text-slate-400">Biaya Investasi:</div>
                <div className="text-2xl font-black text-amber-400">
                  {featuredEvent.priceFormatted}
                </div>
                <div className="text-[11px] text-slate-400">
                  Batas Pendaftaran: <span className="text-slate-200 font-semibold">{featuredEvent.registrationDeadline}</span>
                </div>
                
                {/* Quota bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${(featuredEvent.currentParticipants / featuredEvent.maxParticipants) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Terisi {featuredEvent.currentParticipants} peserta</span>
                  <span>Maks 36 orang</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onDirectRegister(featuredEvent)}
                  className="w-full py-3 px-5 text-sm font-bold rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Daftar Event Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectEvent(featuredEvent)}
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer text-center"
                >
                  Lihat Detail Rundown & Aturan PDF
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
