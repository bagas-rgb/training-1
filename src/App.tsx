import React, { useState, useEffect, useMemo } from 'react';
import { 
  EventItem, 
  EventCategory, 
  RegistrationItem, 
  VibeTheme 
} from './types';
import { MOCK_EVENTS } from './data/mockEvents';
import { 
  getStoredRegistrations, 
  saveRegistration, 
  cancelRegistration, 
  getStoredBookmarks, 
  toggleBookmark, 
  getStoredTheme, 
  saveTheme 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventFilters } from './components/EventFilters';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { DashboardView } from './components/DashboardView';
import { TimelineCalendarView } from './components/TimelineCalendarView';
import { PromptLogModal } from './components/PromptLogModal';
import { SmartRecommendationModal } from './components/SmartRecommendationModal';
import { Footer } from './components/Footer';
import { CheckCircle2, Info, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<'events' | 'dashboard' | 'timeline'>('events');
  const [currentTheme, setCurrentTheme] = useState<VibeTheme>('duck');
  
  // Storage states
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('Semua');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPriceType, setSelectedPriceType] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'quota'>('date');

  // Modals
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);
  const [registerEvent, setRegisterEvent] = useState<EventItem | null>(null);
  const [isPromptLogOpen, setIsPromptLogOpen] = useState(false);
  const [isSmartQuizOpen, setIsSmartQuizOpen] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load initial local data
  useEffect(() => {
    setRegistrations(getStoredRegistrations());
    setBookmarks(getStoredBookmarks());
    setCurrentTheme(getStoredTheme());
  }, []);

  const handleSetTheme = (theme: VibeTheme) => {
    setCurrentTheme(theme);
    saveTheme(theme);
    showToast(`Vibe tampilan diubah ke: ${theme.toUpperCase()}`, 'info');
  };

  // Featured event is Duckathon 2.0
  const featuredEvent = useMemo(() => {
    return MOCK_EVENTS.find(e => e.id === 'evt-duck-2026') || MOCK_EVENTS[0];
  }, []);

  // Filtered and Sorted Events
  const filteredEvents = useMemo(() => {
    let result = [...MOCK_EVENTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'Semua') {
      result = result.filter(e => e.category === selectedCategory);
    }

    // Location
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'unilak') {
        result = result.filter(e => e.location.includes('Lancang Kuning') || e.location.includes('UNILAK'));
      } else if (selectedLocation === 'sudirman') {
        result = result.filter(e => e.venueAddress.includes('Sudirman') || e.location.includes('Sudirman'));
      } else if (selectedLocation === 'sukajadi') {
        result = result.filter(e => e.location.includes('Sukajadi') || e.venueAddress.includes('Sukajadi'));
      } else if (selectedLocation === 'online') {
        result = result.filter(e => e.locationType === 'Online' || e.locationType === 'Hybrid');
      }
    }

    // Price
    if (selectedPriceType === 'free') {
      result = result.filter(e => e.price === 0);
    } else if (selectedPriceType === 'paid') {
      result = result.filter(e => e.price > 0);
    }

    // Sort
    if (sortBy === 'date') {
      // Default order in mockEvents is chronological
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.currentParticipants - a.currentParticipants);
    } else if (sortBy === 'quota') {
      result.sort(
        (a, b) => (a.maxParticipants - a.currentParticipants) - (b.maxParticipants - b.currentParticipants)
      );
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLocation, selectedPriceType, sortBy]);

  // Handle Bookmarks
  const handleToggleBookmark = (eventId: string) => {
    const updated = toggleBookmark(eventId);
    setBookmarks(updated);
    const isNowBookmarked = updated.includes(eventId);
    showToast(isNowBookmarked ? 'Event disimpan ke daftar favorit!' : 'Event dihapus dari favorit.', 'info');
  };

  // Handle Register Success
  const handleRegistrationSuccess = (newReg: RegistrationItem) => {
    const updated = saveRegistration(newReg);
    setRegistrations(updated);
    setRegisterEvent(null);
    setCurrentTab('dashboard');
    showToast(`Pendaftaran Berhasil! Tiket resmi #${newReg.ticketCode} telah aktif.`, 'success');
  };

  // Handle Cancel Registration
  const handleCancelRegistration = (id: string) => {
    const updated = cancelRegistration(id);
    setRegistrations(updated);
    showToast('Pendaftaran tiket berhasil dibatalkan.', 'info');
  };

  // Bookmarked Event Items
  const bookmarkedEventItems = useMemo(() => {
    return MOCK_EVENTS.filter(e => bookmarks.includes(e.id));
  }, [bookmarks]);

  // Theme container style wrapper
  const themeClasses = {
    duck: 'theme-duck bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950',
    cyber: 'theme-cyber bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950',
    emerald: 'theme-emerald bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white',
    monochrome: 'theme-mono bg-zinc-950 text-zinc-100 selection:bg-zinc-200 selection:text-zinc-950',
  }[currentTheme];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${themeClasses}`}>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-2xl text-xs font-medium">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeTicketCount={registrations.length}
        openPromptLogs={() => setIsPromptLogOpen(true)}
        openSmartQuiz={() => setIsSmartQuizOpen(true)}
        currentTheme={currentTheme}
        setTheme={handleSetTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: EVENTS DISCOVERY */}
        {currentTab === 'events' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              featuredEvent={featuredEvent}
              onSelectEvent={(evt) => setDetailEvent(evt)}
              onDirectRegister={(evt) => setRegisterEvent(evt)}
            />

            {/* Events Explorer Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Katalog Lomba & Kegiatan Pelajar
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Jelajahi berbagai agenda pengembangan bakat, teknologi, dan seni di Pekanbaru
                  </p>
                </div>

                <button
                  onClick={() => setIsSmartQuizOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Bingung pilih lomba? Coba Smart Matcher</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Filters */}
              <EventFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
                selectedPriceType={selectedPriceType}
                onSelectPriceType={setSelectedPriceType}
                sortBy={sortBy}
                onSelectSortBy={setSortBy}
                totalFilteredCount={filteredEvents.length}
              />

              {/* Event Cards Grid */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-3">
                  <p className="text-base font-bold text-white">Tidak ada event yang cocok dengan filter</p>
                  <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau reset kategori ke 'Semua'</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                      setSelectedLocation('all');
                      setSelectedPriceType('all');
                    }}
                    className="py-2 px-4 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((evt) => (
                    <EventCard
                      key={evt.id}
                      event={evt}
                      isBookmarked={bookmarks.includes(evt.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onSelectEvent={(e) => setDetailEvent(e)}
                      onRegisterClick={(e) => setRegisterEvent(e)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW 2: DASHBOARD & E-TICKETS */}
        {currentTab === 'dashboard' && (
          <DashboardView
            registrations={registrations}
            bookmarkedEvents={bookmarkedEventItems}
            onCancelRegistration={handleCancelRegistration}
            onSelectEvent={(evt) => setDetailEvent(evt)}
            onExploreMore={() => setCurrentTab('events')}
            onRemoveBookmark={handleToggleBookmark}
          />
        )}

        {/* VIEW 3: TIMELINE & CALENDAR */}
        {currentTab === 'timeline' && (
          <TimelineCalendarView
            events={MOCK_EVENTS}
            onSelectEvent={(evt) => setDetailEvent(evt)}
            onRegisterClick={(evt) => setRegisterEvent(evt)}
          />
        )}

      </main>

      {/* Modals */}
      <EventDetailModal
        event={detailEvent}
        onClose={() => setDetailEvent(null)}
        onRegisterClick={(evt) => setRegisterEvent(evt)}
        isBookmarked={detailEvent ? bookmarks.includes(detailEvent.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <RegistrationModal
        event={registerEvent}
        onClose={() => setRegisterEvent(null)}
        onSuccess={handleRegistrationSuccess}
      />

      <PromptLogModal
        isOpen={isPromptLogOpen}
        onClose={() => setIsPromptLogOpen(false)}
      />

      <SmartRecommendationModal
        isOpen={isSmartQuizOpen}
        onClose={() => setIsSmartQuizOpen(false)}
        allEvents={MOCK_EVENTS}
        onSelectEvent={(evt) => setDetailEvent(evt)}
      />

      {/* Footer */}
      <Footer openPromptLogs={() => setIsPromptLogOpen(true)} />

    </div>
  );
}
