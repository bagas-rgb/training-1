import React from 'react';
import { X, Sparkles, ArrowRight, Check, Compass, Calendar, Trophy } from 'lucide-react';
import { EventItem } from '../types';

interface SmartRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  allEvents: EventItem[];
  onSelectEvent: (event: EventItem) => void;
}

export const SmartRecommendationModal: React.FC<SmartRecommendationModalProps> = ({
  isOpen,
  onClose,
  allEvents,
  onSelectEvent,
}) => {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [interest, setInterest] = React.useState<string>('coding');
  const [format, setFormat] = React.useState<string>('competition');
  const [matchedEvents, setMatchedEvents] = React.useState<EventItem[]>([]);

  if (!isOpen) return null;

  const handleComputeMatch = () => {
    let results = allEvents.filter(e => {
      if (interest === 'coding') {
        return e.category === 'Teknologi & Coding' || e.title.includes('AI') || e.title.includes('Coding');
      }
      if (interest === 'design') {
        return e.category === 'Workshop & Skill' || e.category === 'Seni & Desain';
      }
      if (interest === 'science') {
        return e.category === 'Sains & Riset';
      }
      if (interest === 'esport') {
        return e.category === 'Olahraga & E-Sport';
      }
      return true;
    });

    if (results.length === 0) {
      results = allEvents.slice(0, 2);
    }

    setMatchedEvents(results);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setInterest('coding');
    setFormat('competition');
    setMatchedEvents([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Smart Matcher Minat Pelajar</h3>
              <p className="text-xs text-slate-400">Temukan lomba & event yang paling pas dengan potensimu</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Langkah 1 dari 2</span>
                <h4 className="text-lg font-bold text-white">Apa bidang yang paling ingin kamu eksplorasi?</h4>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'coding', title: 'Coding, AI & Pemrograman Web', desc: 'Pembuatan website, AI prompting & software challenge' },
                  { id: 'design', title: 'UI/UX Desain & Seni Visual', desc: 'Desain mockup aplikasi, fotografi budaya & grafis' },
                  { id: 'science', title: 'Riset Sains & Inovasi Teknologi', desc: 'Olimpiade karya ilmiah, KIR & sains terapan Riau' },
                  { id: 'esport', title: 'E-Sport & Turnamen Gaming', desc: 'Kompetisi taktik tim Mobile Legends resmi pelajar' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setInterest(item.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      interest === item.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    {interest === item.id && (
                      <Check className="w-5 h-5 text-amber-400 shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Lanjut ke Format Acara</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Langkah 2 dari 2</span>
                <h4 className="text-lg font-bold text-white">Format kegiatan seperti apa yang kamu inginkan?</h4>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'competition', title: 'Kompetisi & Lomba Berhadiah', desc: 'Piala, uang pembinaan, piagam sertifikat juara (contoh Duckathon 2.0)' },
                  { id: 'workshop', title: 'Workshop Praktik & Belajar Skill', desc: 'Langsung praktik dibimbing mentor dari nol' },
                  { id: 'free', title: 'Seminar / Talkshow Edukasi Terbuka', desc: 'Gratis, santai, menambah relasi & sertifikat' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormat(item.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      format === item.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    {format === item.id && (
                      <Check className="w-5 h-5 text-amber-400 shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Kembali
                </button>
                <button
                  onClick={handleComputeMatch}
                  className="py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lihat Rekomendasi</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Event yang Paling Cocok Untukmu!</h4>
                <p className="text-xs text-slate-400">Berdasarkan preferensi minat yang kamu pilih:</p>
              </div>

              <div className="space-y-3">
                {matchedEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
                      <span>{evt.category}</span>
                      <span className="font-bold text-white">{evt.priceFormatted}</span>
                    </div>

                    <h5 className="font-bold text-white text-sm">
                      {evt.title}
                    </h5>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">{evt.totalPrizeValue || 'Sertifikat'}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectEvent(evt);
                        }}
                        className="py-1.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        Lihat Detail & Daftar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Ulangi Kuis Matcher
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
