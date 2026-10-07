import React from 'react';
import { Filter, SlidersHorizontal, Layers, MapPin, DollarSign } from 'lucide-react';
import { EventCategory } from '../types';

interface EventFiltersProps {
  selectedCategory: EventCategory;
  onSelectCategory: (category: EventCategory) => void;
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  selectedPriceType: 'all' | 'free' | 'paid';
  onSelectPriceType: (type: 'all' | 'free' | 'paid') => void;
  sortBy: 'date' | 'popular' | 'quota';
  onSelectSortBy: (sort: 'date' | 'popular' | 'quota') => void;
  totalFilteredCount: number;
}

const CATEGORIES: EventCategory[] = [
  'Semua',
  'Teknologi & Coding',
  'Workshop & Skill',
  'Seminar & Talkshow',
  'Seni & Desain',
  'Sains & Riset',
  'Olahraga & E-Sport',
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedLocation,
  onSelectLocation,
  selectedPriceType,
  onSelectPriceType,
  sortBy,
  onSelectSortBy,
  totalFilteredCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Filter Tabs (Horizontal scroll on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-400 font-medium px-2 py-1 shrink-0 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          Kategori:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary filter bar: Location, Price, Sort, Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
        
        {/* Left selects */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Location filter */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => onSelectLocation(e.target.value)}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
            >
              <option value="all">Semua Lokasi (Pekanbaru & Riau)</option>
              <option value="unilak">Universitas Lancang Kuning (UNILAK)</option>
              <option value="sudirman">Jl. Sudirman / Pusat Kota</option>
              <option value="sukajadi">Sukajadi & Tampan</option>
              <option value="online">Online / Hybrid</option>
            </select>
          </div>

          {/* Price filter segmented button */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onSelectPriceType('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedPriceType === 'all'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua Biaya
            </button>
            <button
              onClick={() => onSelectPriceType('free')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedPriceType === 'free'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gratis
            </button>
            <button
              onClick={() => onSelectPriceType('paid')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedPriceType === 'paid'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTM Terjangkau
            </button>
          </div>

        </div>

        {/* Right sort & count */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value as any)}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
            >
              <option value="date">Urutkan: Tanggal Pelaksanaan</option>
              <option value="quota">Urutkan: Sisa Kuota Menipis</option>
              <option value="popular">Urutkan: Paling Diminati</option>
            </select>
          </div>

          <div className="text-slate-400 border-l border-slate-800 pl-3">
            Menampilkan <span className="text-white font-bold">{totalFilteredCount}</span> event
          </div>
        </div>

      </div>
    </div>
  );
};
