import React from 'react';
import { Calendar, MapPin, Trophy, Bookmark, BookmarkCheck, ArrowRight, Users, Clock } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onRegisterClick: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isBookmarked,
  onToggleBookmark,
  onSelectEvent,
  onRegisterClick,
}) => {
  const remainingQuota = event.maxParticipants - event.currentParticipants;
  const isAlmostFull = remainingQuota <= 8;

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-xl">
      
      {/* Top Media / Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Top Floating action: Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(event.id);
          }}
          aria-label={isBookmarked ? 'Hapus bookmark' : 'Simpan event'}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isBookmarked
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          title={isBookmarked ? 'Tersimpan di favorit' : 'Simpan event ke favorit'}
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {/* Bottom Banner Kicker: Category & Organizer as clean text */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 drop-shadow">
          <div className="flex items-center gap-1.5 font-medium truncate max-w-[75%]">
            <span>{event.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{event.organizer}</span>
          </div>
          <span className="font-bold text-amber-300 shrink-0">
            {event.priceFormatted}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title and Short description */}
        <div className="space-y-2">
          <h3 
            onClick={() => onSelectEvent(event)}
            className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Metadata section (Zero-pill text hierarchy) */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{event.date}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {event.totalPrizeValue && (
            <div className="flex items-center gap-2 text-amber-300 font-medium">
              <Trophy className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{event.totalPrizeValue}</span>
            </div>
          )}
        </div>

        {/* Quota indicator */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-500" />
              Kuota: {event.currentParticipants}/{event.maxParticipants}
            </span>
            <span className={isAlmostFull ? 'text-amber-400 font-bold' : 'text-slate-400'}>
              {remainingQuota > 0 ? `Tersisa ${remainingQuota} kursi` : 'Kuota Penuh'}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isAlmostFull ? 'bg-amber-400' : 'bg-slate-500'
              }`}
              style={{ width: `${Math.min(100, (event.currentParticipants / event.maxParticipants) * 100)}%` }}
            />
          </div>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onSelectEvent(event)}
            className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-center cursor-pointer"
          >
            Detail Event
          </button>
          
          <button
            onClick={() => onRegisterClick(event)}
            className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm shadow-amber-400/20"
          >
            <span>Daftar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </article>
  );
};
