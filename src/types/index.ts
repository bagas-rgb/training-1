export type EventCategory = 
  | 'Semua'
  | 'Teknologi & Coding'
  | 'Workshop & Skill'
  | 'Seminar & Talkshow'
  | 'Seni & Desain'
  | 'Sains & Riset'
  | 'Olahraga & E-Sport';

export type EventStatus = 'Buka' | 'Segera Tutup' | 'Penuh' | 'Selesai';

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  organizer: string;
  organizerLogo?: string;
  badgeText?: string;
  date: string;
  time: string;
  location: string;
  locationType: 'Offline' | 'Online' | 'Hybrid';
  venueAddress: string;
  price: number; // 0 for gratis, or amount in IDR
  priceFormatted: string;
  registrationDeadline: string;
  maxParticipants: number;
  currentParticipants: number;
  bannerUrl: string;
  description: string;
  targetAudience: string;
  prizes: string[];
  totalPrizeValue?: string;
  benefits: string[];
  requirements: string[];
  schedule: { time: string; activity: string }[];
  contactPersons: { name: string; phone: string; role: string }[];
  isFeatured?: boolean;
}

export interface RegistrationItem {
  id: string; // registration code, e.g. DUCK-2026-0812
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  fullName: string;
  schoolName: string;
  studentIdOrNisn: string;
  email: string;
  whatsapp: string;
  classGrade: string; // e.g. Kelas 10, Kelas 11, Kelas 12
  categoryOrRole: string; // e.g. Individu, Tim, Lanjutan
  registeredAt: string;
  status: 'Terkonfirmasi' | 'Menunggu Verifikasi' | 'Dibatalkan';
  ticketCode: string;
  qrPayload: string;
  cardFileSimulatedName?: string;
}

export interface PromptLogItem {
  id: string;
  phase: 'Arsitektur & Konsep' | 'Struktur Data & Logic' | 'Desain UI & Vibe' | 'Fungsionalitas & Tiket' | 'Inovasi & Kreativitas' | 'Refinement & Validasi';
  title: string;
  promptText: string;
  purpose: string;
  aiResponseSummary: string;
  criteriaScoreRelevance: string; // e.g., 'Kualitas Prompt 25%', 'Fungsionalitas 25%'
}

export type VibeTheme = 'duck' | 'cyber' | 'emerald' | 'monochrome';
