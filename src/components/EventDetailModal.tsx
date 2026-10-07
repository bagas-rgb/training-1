import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  CheckCircle2, 
  Share2, 
  MessageCircle, 
  ShieldAlert, 
  Users, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EventItem } from '../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegisterClick: (event: EventItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegisterClick,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'schedule' | 'rules' | 'contact'>('overview');
  const [copiedShare, setCopiedShare] = React.useState(false);

  if (!event) return null;

  const handleShareWA = () => {
    const text = encodeURIComponent(
      `Halo! Cek event seru untuk pelajar Pekanbaru: *${event.title}*\n` +
      `📅 Tanggal: ${event.date}\n` +
      `📍 Lokasi: ${event.location}\n` +
      `🏆 Total Hadiah: ${event.totalPrizeValue || 'Sertifikat & Benefit'}\n` +
      `Yuk daftar bareng di platform KawanEvent Riau!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full bg-slate-950 overflow-hidden shrink-0">
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-950 transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Quick banner badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <span>{event.category}</span>
                <span aria-hidden="true">·</span>
                <span>{event.organizer}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {event.title}
              </h2>
            </div>
            
            <div className="hidden sm:block text-right">
              <div className="text-xs text-slate-400">Investasi / HTM:</div>
              <div className="text-2xl font-black text-amber-400">{event.priceFormatted}</div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-slate-800 px-4 sm:px-6 bg-slate-950/60 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ringkasan & Hadiah
          </button>
          
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'schedule'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Jadwal & Rundown
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'rules'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Syarat & Ketentuan Lomba
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'contact'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Penyelenggara & WhatsApp
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Event Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Waktu & Tanggal</span>
                  </div>
                  <div className="font-semibold text-white text-sm">{event.date}</div>
                  <div className="text-xs text-slate-400">{event.time}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Lokasi & Venue</span>
                  </div>
                  <div className="font-semibold text-white text-sm truncate">{event.location}</div>
                  <div className="text-xs text-slate-400 truncate">{event.venueAddress}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Status Kuota</span>
                  </div>
                  <div className="font-semibold text-white text-sm">
                    {event.currentParticipants} dari {event.maxParticipants} Terdaftar
                  </div>
                  <div className="text-xs text-emerald-400">
                    Sisa {event.maxParticipants - event.currentParticipants} slot
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Tentang Acara Ini
                </h4>
                <p className="leading-relaxed text-slate-300">
                  {event.description}
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  <span className="font-semibold text-slate-200">Sasaran Peserta: </span>
                  {event.targetAudience}
                </p>
              </div>

              {/* Prizes Box */}
              {event.prizes.length > 0 && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Trophy className="w-4 h-4" />
                    <span>Apresiasi & Hadiah Pemenang</span>
                  </div>
                  <ul className="space-y-2">
                    {event.prizes.map((prz, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-amber-400 font-bold">#{idx + 1}</span>
                        <span>{prz}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Fasilitas & Keuntungan Peserta
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {event.benefits.map((ben, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Rundown Waktu Kegiatan
                </h4>
                <span className="text-xs text-slate-400">Waktu Indonesia Barat (WIB)</span>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-800 space-y-6 py-2">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-amber-400 group-hover:bg-amber-400 transition-colors" />
                    <div className="text-xs font-bold text-amber-400">{item.time}</div>
                    <div className="text-sm text-slate-200 font-medium mt-0.5">{item.activity}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-400 border border-slate-800">
                * Jadwal dapat mengalami penyesuaian teknis di lokasi atas arahan koordinator panitia.
              </div>
            </div>
          )}

          {/* TAB 3: RULES & REQUIREMENTS */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>Ketentuan & Tata Tertib Peserta</span>
              </div>

              <div className="space-y-2.5">
                {event.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>

              {/* Special rules mention for Duckathon */}
              {event.id === 'evt-duck-2026' && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/50 space-y-2 text-xs">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Peraturan Khusus: Log Prompt AI (Bobot 25%)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Peserta wajib mencatat setiap prompt ke AI (Gemini/ChatGPT/Claude). 
                    Sistem platform KawanEvent menyediakan fitur <span className="text-amber-400 font-semibold">Log Prompt AI bawaan</span> yang dapat langsung di-export saat sesi penjurian di hadapan dewan juri UNILAK Duck SC.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTACT & ORGANIZER */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400">Penyelenggara Acara:</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-xl">{event.organizerLogo || '🏛️'}</span>
                  <span>{event.organizer}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Lokasi Venue: {event.venueAddress}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Hubungi Contact Person Resmi:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.contactPersons.map((cp, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="font-bold text-white text-sm">{cp.name}</div>
                      <div className="text-xs text-slate-400">{cp.role}</div>
                      <a
                        href={`https://wa.me/62${cp.phone.replace(/[^0-9]/g, '').slice(1)}?text=Halo%20kak%20${encodeURIComponent(cp.name)},%20saya%20ingin%20bertanya%20mengenai%20event%20${encodeURIComponent(event.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp ({cp.phone})</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(event.id)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300' 
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
            </button>

            <button
              onClick={handleShareWA}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Bagikan ke WhatsApp"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Share WA</span>
            </button>

            {copiedShare && (
              <span className="text-xs text-emerald-400 font-medium">Link disalin!</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Tutup
            </button>

            <button
              onClick={() => {
                onClose();
                onRegisterClick(event);
              }}
              className="py-2.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              <span>Isi Form Pendaftaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
