import React from 'react';
import { Calendar, Clock, MapPin, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import { EventItem } from '../types';

interface TimelineCalendarViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
}

export const TimelineCalendarView: React.FC<TimelineCalendarViewProps> = ({
  events,
  onSelectEvent,
  onRegisterClick,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Kalender & Jadwal Pelajar Riau 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Agenda Kegiatan, Lomba & Workshop
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Pantau batas akhir pendaftaran dan hari pelaksanaan agar tidak terlewatkan kuota terbatas.
        </p>
      </div>

      {/* Timeline track */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10 py-4">
        {events.map((evt, idx) => (
          <div key={evt.id} className="relative group">
            
            {/* Dot marker */}
            <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
              evt.id === 'evt-duck-2026'
                ? 'bg-amber-400 border-amber-300 ring-4 ring-amber-400/20'
                : 'bg-slate-800 border-slate-600 group-hover:border-amber-400'
            }`} />

            {/* Event card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-lg">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {evt.date}
                  </span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-slate-400">{evt.time}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-slate-300 font-medium">{evt.category}</span>
                </div>

                <div className="text-xs font-bold text-white">
                  {evt.priceFormatted}
                </div>
              </div>

              <div className="space-y-1">
                <h3 
                  onClick={() => onSelectEvent(evt)}
                  className="text-lg font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
                >
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-xs">{evt.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
                  >
                    Detail
                  </button>

                  <button
                    onClick={() => onRegisterClick(evt)}
                    className="py-1.5 px-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1"
                  >
                    <span>Daftar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
