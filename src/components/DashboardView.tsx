import React from 'react';
import { 
  Ticket, 
  Bookmark, 
  Printer, 
  Download, 
  MessageCircle, 
  Trash2, 
  Calendar, 
  MapPin, 
  School, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { EventItem, RegistrationItem } from '../types';

interface DashboardViewProps {
  registrations: RegistrationItem[];
  bookmarkedEvents: EventItem[];
  onCancelRegistration: (id: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onExploreMore: () => void;
  onRemoveBookmark: (eventId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  registrations,
  bookmarkedEvents,
  onCancelRegistration,
  onSelectEvent,
  onExploreMore,
  onRemoveBookmark,
}) => {
  const [activeSubTab, setActiveSubTab] = React.useState<'tickets' | 'bookmarks'>('tickets');
  const [printingId, setPrintingId] = React.useState<string | null>(null);

  const handlePrint = (reg: RegistrationItem) => {
    setPrintingId(reg.id);
    setTimeout(() => {
      window.print();
      setPrintingId(null);
    }, 300);
  };

  const handleSendToWhatsApp = (reg: RegistrationItem) => {
    const text = encodeURIComponent(
      `Halo Panitia Duckathon 2.0 / Duck SC UNILAK,\n` +
      `Saya telah mendaftar melalui platform KawanEvent Riau:\n\n` +
      `🎫 *KODE TIKET:* ${reg.ticketCode}\n` +
      `👤 *Nama:* ${reg.fullName}\n` +
      `🏫 *Sekolah:* ${reg.schoolName}\n` +
      `📌 *Event:* ${reg.eventTitle}\n` +
      `📍 *Tanggal & Lokasi:* ${reg.eventDate} - ${reg.eventLocation}\n` +
      `Mohon verifikasi kehadiran/pembayaran saya. Terima kasih!`
    );
    window.open(`https://wa.me/6281902673775?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>Dashboard Pelajar</span>
            <span aria-hidden="true">·</span>
            <span>Pekanbaru & Riau</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Status Pendaftaran & E-Tiket Saya
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Kelola bukti pendaftaran digital, tunjukkan QR Code saat check-in di lokasi, dan pantau event yang Anda simpan.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveSubTab('tickets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'tickets'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Tiket Aktif ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'bookmarks'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Tersimpan ({bookmarkedEvents.length})</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: TICKETS */}
      {activeSubTab === 'tickets' && (
        <div className="space-y-6">
          {registrations.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Ticket className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Belum Ada Pendaftaran Event</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Anda belum mendaftar di event manapun. Temukan lomba coding Duckathon 2.0 atau workshop pelajar seru lainnya!
                </p>
              </div>
              <button
                onClick={onExploreMore}
                className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Jelajahi Daftar Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  id={`ticket-${reg.id}`}
                  className="relative rounded-2xl border border-slate-700 bg-slate-900/95 overflow-hidden shadow-2xl flex flex-col justify-between"
                >
                  {/* Decorative top strip */}
                  <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                  
                  {/* Ticket Content */}
                  <div className="p-5 sm:p-6 space-y-5">
                    
                    {/* Header Ticket: Code & Status */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
                      <div>
                        <div className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                          OFFICIAL DIGITAL PASS
                        </div>
                        <div className="text-lg font-black text-white font-mono tracking-wider">
                          {reg.ticketCode}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Didaftar: {reg.registeredAt}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          reg.status === 'Terkonfirmasi'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {reg.status === 'Terkonfirmasi' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          <span>{reg.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* Middle Ticket Grid: Event Details & Student Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      
                      {/* Left: Event Details */}
                      <div className="sm:col-span-8 space-y-3">
                        <div>
                          <h4 className="text-base font-bold text-white leading-snug">
                            {reg.eventTitle}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{reg.eventDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{reg.eventLocation}</span>
                          </div>
                        </div>

                        {/* Student Badge Info */}
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Nama Siswa:</span>
                            <span className="font-bold text-white">{reg.fullName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Asal Sekolah:</span>
                            <span className="font-semibold text-slate-200">{reg.schoolName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">NISN / ID:</span>
                            <span className="font-mono text-slate-300">{reg.studentIdOrNisn}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: SVG Native QR Code */}
                      <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                        {/* Native clean QR Code graphic simulation */}
                        <svg className="w-24 h-24 text-white" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
                          <rect x="13" y="13" width="14" height="14" fill="currentColor" />
                          
                          <rect x="65" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
                          <rect x="73" y="13" width="14" height="14" fill="currentColor" />
                          
                          <rect x="5" y="65" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
                          <rect x="13" y="73" width="14" height="14" fill="currentColor" />
                          
                          {/* Inner matrix dots */}
                          <rect x="44" y="10" width="8" height="8" fill="currentColor" />
                          <rect x="44" y="24" width="8" height="8" fill="currentColor" />
                          <rect x="10" y="44" width="8" height="8" fill="currentColor" />
                          <rect x="24" y="44" width="8" height="8" fill="currentColor" />
                          <rect x="44" y="44" width="12" height="12" fill="currentColor" />
                          <rect x="62" y="44" width="8" height="8" fill="currentColor" />
                          <rect x="80" y="44" width="8" height="8" fill="currentColor" />
                          <rect x="44" y="65" width="8" height="8" fill="currentColor" />
                          <rect x="62" y="65" width="16" height="8" fill="currentColor" />
                          <rect x="44" y="80" width="12" height="12" fill="currentColor" />
                          <rect x="65" y="80" width="8" height="12" fill="currentColor" />
                          <rect x="80" y="80" width="10" height="10" fill="currentColor" />
                        </svg>
                        <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">
                          Scan di Meja Registrasi
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Perforated ticket divider visual */}
                  <div className="relative flex items-center justify-between border-t border-dashed border-slate-700 px-4 py-1 bg-slate-950/60">
                    <div className="w-4 h-4 rounded-full bg-slate-950 -ml-6 border-r border-slate-700" />
                    <div className="text-[10px] tracking-widest text-slate-500 uppercase font-mono">
                      DUCKATHON 2.0 · RESMI UNILAK PEKANBARU
                    </div>
                    <div className="w-4 h-4 rounded-full bg-slate-950 -mr-6 border-l border-slate-700" />
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-950 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePrint(reg)}
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Cetak atau simpan sebagai PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Cetak / Unduh PDF</span>
                      </button>

                      <button
                        onClick={() => handleSendToWhatsApp(reg)}
                        className="py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Kirim bukti pendaftaran ke WA Panitia"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim ke WA Panitia</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Yakin ingin membatalkan pendaftaran tiket ${reg.ticketCode}?`)) {
                          onCancelRegistration(reg.id);
                        }
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 text-xs transition-colors cursor-pointer"
                      title="Batalkan pendaftaran tiket ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: BOOKMARKS */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedEvents.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-slate-500" />
              <h3 className="text-base font-bold text-white">Belum Ada Event Tersimpan</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Klik ikon bookmark pada event yang menarik untuk menyimpannya ke daftar ini.
              </p>
              <button
                onClick={onExploreMore}
                className="py-2 px-4 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5"
              >
                <span>Cari Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{evt.category}</span>
                      <button
                        onClick={() => onRemoveBookmark(evt.id)}
                        className="text-slate-500 hover:text-rose-400"
                        title="Hapus dari tersimpan"
                      >
                        Hapus
                      </button>
                    </div>

                    <h4 
                      onClick={() => onSelectEvent(evt)}
                      className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer line-clamp-2"
                    >
                      {evt.title}
                    </h4>

                    <div className="text-xs text-slate-400 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{evt.priceFormatted}</span>
                    <button
                      onClick={() => onSelectEvent(evt)}
                      className="py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                    >
                      Lihat & Daftar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
