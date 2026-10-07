import { RegistrationItem, VibeTheme } from '../types';

const REGISTRATIONS_KEY = 'kawanevent_registrations_v1';
const BOOKMARKS_KEY = 'kawanevent_bookmarks_v1';
const THEME_KEY = 'kawanevent_theme_v1';

export const getStoredRegistrations = (): RegistrationItem[] => {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed reading registrations from localStorage', err);
  }

  // Initial sample registration for immediate dashboard inspection
  const initialSample: RegistrationItem[] = [
    {
      id: 'DUCK-2026-A892',
      eventId: 'evt-duck-2026',
      eventTitle: 'Duckathon 2.0 — Vibe Coding Challenge',
      eventDate: '18 Oktober 2026',
      eventLocation: 'Lab Komputer Universitas Lancang Kuning (UNILAK), Pekanbaru',
      fullName: 'Ahmad Faiz Pratama',
      schoolName: 'SMKN 2 Pekanbaru',
      studentIdOrNisn: '0078129384',
      email: 'faiz.pratama@pelajar.riau.go.id',
      whatsapp: '081268779911',
      classGrade: 'Kelas 11 Rekayasa Perangkat Lunak',
      categoryOrRole: 'Individu (Peserta)',
      registeredAt: 'Hari ini, 09.30 WIB',
      status: 'Terkonfirmasi',
      ticketCode: 'DUCK-2026-A892',
      qrPayload: 'VERIFIED-DUCK2026-AHMAD-FAIZ-SMKN2PKU',
      cardFileSimulatedName: 'kartu_pelajar_faiz_smkn2.pdf'
    }
  ];
  try {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(initialSample));
  } catch {
    // ignore
  }
  return initialSample;
};

export const saveRegistration = (newItem: RegistrationItem): RegistrationItem[] => {
  const current = getStoredRegistrations();
  const updated = [newItem, ...current];
  try {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save registration', err);
  }
  return updated;
};

export const cancelRegistration = (id: string): RegistrationItem[] => {
  const current = getStoredRegistrations();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to cancel registration', err);
  }
  return updated;
};

export const getStoredBookmarks = (): string[] => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return ['evt-duck-2026', 'evt-riau-ai-2026'];
};

export const toggleBookmark = (eventId: string): string[] => {
  const current = getStoredBookmarks();
  let updated: string[];
  if (current.includes(eventId)) {
    updated = current.filter(id => id !== eventId);
  } else {
    updated = [...current, eventId];
  }
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
};

export const getStoredTheme = (): VibeTheme => {
  try {
    const raw = localStorage.getItem(THEME_KEY) as VibeTheme;
    if (raw && ['duck', 'cyber', 'emerald', 'monochrome'].includes(raw)) {
      return raw;
    }
  } catch {
    // ignore
  }
  return 'duck';
};

export const saveTheme = (theme: VibeTheme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
};
