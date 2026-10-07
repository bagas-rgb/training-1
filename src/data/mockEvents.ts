import { EventItem } from '../types';

export const POPULAR_PEKANBARU_SCHOOLS = [
  'SMAN 1 Pekanbaru',
  'SMAN 8 Pekanbaru',
  'SMAN 2 Pekanbaru',
  'SMAN 5 Pekanbaru',
  'SMAN Plus Provinsi Riau',
  'SMKN 1 Pekanbaru',
  'SMKN 2 Pekanbaru',
  'SMKN 4 Pekanbaru',
  'SMKN 7 Pekanbaru',
  'MAN 1 Pekanbaru',
  'MAN 2 Pekanbaru',
  'SMA IT Al-Ittihad Rumbai',
  'SMA Cendana Rumbai',
  'SMA Santa Maria Pekanbaru',
  'SMA Darma Yudha Pekanbaru',
  'SMA As-Shofa Pekanbaru',
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-duck-2026',
    title: 'Duckathon 2.0 — Vibe Coding Challenge',
    slug: 'duckathon-2-vibe-coding-challenge',
    category: 'Teknologi & Coding',
    organizer: 'Developer Unity Creative UNILAK Study Club (Duck SC)',
    organizerLogo: '🦆',
    badgeText: 'Event Resmi UNILAK',
    date: '18 Oktober 2026',
    time: '08.00 - 17.00 WIB (8 Jam Coding)',
    location: 'Lab Komputer Universitas Lancang Kuning (UNILAK), Pekanbaru',
    locationType: 'Offline',
    venueAddress: 'Jl. Yos Sudarso KM. 8, Rumbai, Kota Pekanbaru, Riau',
    price: 10000,
    priceFormatted: 'Rp10.000 / orang',
    registrationDeadline: '14 Oktober 2026',
    maxParticipants: 36,
    currentParticipants: 28,
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    description: 'Kompetisi coding berbasis prompt engineering dan AI untuk siswa/i aktif di Pekanbaru, Riau. Peserta ditantang membuat web interaktif dalam waktu 8 jam sesuai studi kasus undian estetika/vibe menggunakan AI tools resmi.',
    targetAudience: 'Siswa/i aktif SMA/SMK/MA di Pekanbaru (Maksimal 3 orang per sekolah)',
    prizes: [
      'Juara 1: Trophy + Sertifikat Juara + Uang Pembinaan & Merchandise Eksklusif',
      'Juara 2: Trophy + Sertifikat Juara + Uang Pembinaan & Merchandise Eksklusif',
      'Juara 3: Trophy + Sertifikat Juara + Uang Pembinaan & Merchandise Eksklusif',
      'Seluruh Peserta: Sertifikat Resmi + Snack Pagi, Makan Siang & Snack Sore'
    ],
    totalPrizeValue: 'Trophy + Uang Pembinaan + Sertifikat',
    benefits: [
      'Sertifikat resmi Developer Unity Creative UNILAK Study Club',
      'Snack pagi, makan siang, dan snack sore terjamin',
      'Akses resmi ke AI tools panitia via WiFi resmi',
      'Relasi programmer muda se-Pekanbaru & bimbingan mentor UNILAK'
    ],
    requirements: [
      'Siswa/i aktif sekolah yang berlokasi di Pekanbaru, Riau',
      'Kompetisi bersifat perorangan (individu), maksimal 3 orang per sekolah',
      'Membayar HTM Rp10.000 via panitia',
      'Menggunakan komputer lab yang disediakan panitia (laptop pribadi tidak diperkenankan)',
      'Wajib mendokumentasikan Log Prompt AI selama pengerjaan'
    ],
    schedule: [
      { time: '07.30 - 08.00', activity: 'Registrasi Ulang & Absensi Peserta di Lab UNILAK' },
      { time: '08.00 - 08.30', activity: 'Pembukaan, Tata Tertib & Undian Studi Kasus / Vibe' },
      { time: '08.30 - 12.30', activity: 'Sesi Vibe Coding Tahap 1 (Eksplorasi & Struktur UI)' },
      { time: '12.30 - 13.30', activity: 'Istirahat, Sholat & Makan Siang (Disediakan Panitia)' },
      { time: '13.30 - 16.30', activity: 'Sesi Vibe Coding Tahap 2 & Penyusunan Log Prompt' },
      { time: '16.30 - 17.30', activity: 'Presentasi Proyek di Hadapan Dewan Juri & Penjurian' }
    ],
    contactPersons: [
      { name: 'Admin Duck SC 1', phone: '0819-0267-3775', role: 'Konfirmasi Pendaftaran & Pembayaran' },
      { name: 'Admin Duck SC 2', phone: '0821-7137-4234', role: 'Informasi Teknis & Perlengkapan' }
    ],
    isFeatured: true,
  },
  {
    id: 'evt-riau-ai-2026',
    title: 'Seminar & Workshop Generative AI untuk Pelajar Riau 2026',
    slug: 'seminar-generative-ai-pelajar-riau',
    category: 'Seminar & Talkshow',
    organizer: 'Komunitas Digital Pelajar Riau x Fasilkom UNILAK',
    organizerLogo: '🤖',
    badgeText: 'Gratis Pelajar',
    date: '25 Oktober 2026',
    time: '09.00 - 14.30 WIB',
    location: 'Auditorium Gedung Guru Riau, Pekanbaru & Live Zoom',
    locationType: 'Hybrid',
    venueAddress: 'Jl. Jenderal Sudirman No. 120, Kota Pekanbaru, Riau',
    price: 0,
    priceFormatted: 'Gratis (Free)',
    registrationDeadline: '22 Oktober 2026',
    maxParticipants: 150,
    currentParticipants: 112,
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'Kenali masa depan teknologi AI! Pelajari cara memanfaatkan prompting cerdas untuk akselerasi belajar matematika, sains, coding, dan kreasi konten visual tanpa melanggar etika akademik.',
    targetAudience: 'Siswa SMA/SMK/MA sederajat dan guru pendamping se-Riau',
    prizes: ['Doorprize Tablet Pelajar', 'Merchandise AI Starter Kit', 'E-Certificate Nasional'],
    totalPrizeValue: 'Door Prize senilai Rp5.000.000',
    benefits: [
      'E-Sertifikat 8 JP ber-barcode verifikasi',
      'Template prompt praktis untuk riset dan tugas sekolah',
      'Makan siang box dan seminar kit bagi peserta offline',
      'Networking dengan praktisi AI dan dosen UNILAK'
    ],
    requirements: [
      'Memiliki kartu tanda pelajar aktif',
      'Membawa laptop atau smartphone untuk sesi hands-on',
      'Mengisi form absensi saat kedatangan'
    ],
    schedule: [
      { time: '09.00 - 10.30', activity: 'Keynote: Etika dan Potensi AI untuk Pelajar Masa Depan' },
      { time: '10.30 - 12.00', activity: 'Hands-on Workshop: Prompt Engineering & Studi Kasus' },
      { time: '12.00 - 13.00', activity: 'Ishoma & Networking' },
      { time: '13.00 - 14.30', activity: 'Tanya Jawab & Pengundian Doorprize' }
    ],
    contactPersons: [
      { name: 'Kak Fikri (Humas)', phone: '0812-7654-3210', role: 'Registrasi & Tanya Jawab' }
    ],
    isFeatured: true,
  },
  {
    id: 'evt-uiux-bootcamp-2026',
    title: 'Pelatihan Desain UI/UX & Figma untuk Desainer Muda Pekanbaru',
    slug: 'pelatihan-uiux-figma-pekanbaru',
    category: 'Workshop & Skill',
    organizer: 'Riau Creative Tech Academy',
    organizerLogo: '🎨',
    badgeText: 'Hands-on Project',
    date: '31 Oktober 2026',
    time: '13.00 - 17.30 WIB',
    location: 'Co-Working Space Lancang Kuning Hub, Sukajadi, Pekanbaru',
    locationType: 'Offline',
    venueAddress: 'Jl. KH. Ahmad Dahlan No. 45, Sukajadi, Pekanbaru',
    price: 15000,
    priceFormatted: 'Rp15.000 / orang',
    registrationDeadline: '28 Oktober 2026',
    maxParticipants: 40,
    currentParticipants: 35,
    bannerUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    description: 'Kuasai dasar pembuatan antarmuka aplikasi digital yang menarik, clean, dan intuitif menggunakan Figma. Praktik langsung membuat prototipe aplikasi mobile dari wireframe hingga visual mockup.',
    targetAudience: 'Siswa pecinta desain grafis, visual art, dan multimedia',
    prizes: ['Lisensi Tool Desain Premium 1 Tahun untuk Desain Terbaik', 'Sertifikat Portofolio'],
    totalPrizeValue: 'Paket Tools & Merchandise Desain',
    benefits: [
      'Asset kit icon & UI library siap pakai',
      'Portofolio desain perdana yang siap dipamerkan di Behance/LinkedIn',
      'Review langsung dari Senior Product Designer',
      'Snack & coffee break'
    ],
    requirements: [
      'Membawa laptop masing-masing dengan browser Google Chrome',
      'Sudah mendaftar akun gratis di Figma.com'
    ],
    schedule: [
      { time: '13.00 - 14.00', activity: 'Dasar Tipografi, Warna & Zero-Slop Visual Hierarchy' },
      { time: '14.00 - 16.00', activity: 'Praktek Desain Mobile App Event Pelajar di Figma' },
      { time: '16.00 - 17.30', activity: 'Showcase Desain, Feedback, dan Penutupan' }
    ],
    contactPersons: [
      { name: 'Nabila (Sekretariat)', phone: '0813-8899-7711', role: 'Informasi Kelas' }
    ],
    isFeatured: false,
  },
  {
    id: 'evt-science-olympiad-2026',
    title: 'Olimpiade Sains & Inovasi Teknologi Pelajar Riau (OSIT 2026)',
    slug: 'olimpiade-sains-teknologi-riau',
    category: 'Sains & Riset',
    organizer: 'Musyawarah Guru Mata Pelajaran (MGMP) Riau',
    organizerLogo: '🔬',
    badgeText: 'Piala Gubernur',
    date: '7 November 2026',
    time: '08.00 - 16.00 WIB',
    location: 'Gedung Olahraga & Seni Remaja Riau, Pekanbaru',
    locationType: 'Offline',
    venueAddress: 'Jl. Jend. Sudirman, Tangkerang Tengah, Marpoyan Damai, Pekanbaru',
    price: 25000,
    priceFormatted: 'Rp25.000 / peserta',
    registrationDeadline: '2 November 2026',
    maxParticipants: 100,
    currentParticipants: 84,
    bannerUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    description: 'Ajang kompetisi riset sains terapan, kecerdasan buatan, dan karya inovasi ilmiah remaja tingkat SMA/SMK se-Provinsi Riau dengan perebutan Piala Bergilir Gubernur Riau.',
    targetAudience: 'Siswa peminat riset KIR, fisika terapan, robotika, & bioteknologi',
    prizes: [
      'Juara 1: Trophy Gubernur + Piagam + Rp4.000.000',
      'Juara 2: Trophy + Piagam + Rp2.500.000',
      'Juara 3: Trophy + Piagam + Rp1.500.000'
    ],
    totalPrizeValue: 'Total Hadiah Rp8.000.000 + Piala Gubernur',
    benefits: [
      'Piagam Penghargaan Resmi Dinas Pendidikan',
      'Poin akreditasi prestasi untuk jalur beasiswa kuliah',
      'Medali penghargaan untuk finalis 10 besar'
    ],
    requirements: [
      'Surat rekomendasi dari kepala sekolah masing-masing',
      'Menyerahkan karya tulis/ringkasan proposal inovasi'
    ],
    schedule: [
      { time: '08.00 - 09.00', activity: 'Opening Ceremony & Parade Sekolah Peserta' },
      { time: '09.00 - 12.00', activity: 'Sesi Tes Teori & Uji Presentasi Karya Ilmiah' },
      { time: '13.30 - 15.30', activity: 'Expo Prototipe Sains Terbuka untuk Publik' },
      { time: '15.30 - 16.00', activity: 'Pengumuman Pemenang & Penyerahan Piala' }
    ],
    contactPersons: [
      { name: 'Drs. Hendri, M.Pd', phone: '0852-6543-9876', role: 'Koordinator Penjurian' }
    ],
    isFeatured: true,
  },
  {
    id: 'evt-creative-photo-2026',
    title: 'Lomba Fotografi & Konten Kreatif "Wajah Budaya Lancang Kuning"',
    slug: 'lomba-fotografi-budaya-lancang-kuning',
    category: 'Seni & Desain',
    organizer: 'Dewan Kesenian Riau x Komunitas Visual Pelajar',
    organizerLogo: '📷',
    badgeText: 'Kategori Mobile & DSLR',
    date: '14 November 2026',
    time: '10.00 - 16.00 WIB (Batas Pengumpulan Karya)',
    location: 'Taman Budaya Provinsi Riau & Online Submission',
    locationType: 'Hybrid',
    venueAddress: 'Jl. Jenderal Sudirman No. 1, Simpang Tiga, Bukit Raya, Pekanbaru',
    price: 0,
    priceFormatted: 'Gratis (Free)',
    registrationDeadline: '10 November 2026',
    maxParticipants: 80,
    currentParticipants: 42,
    bannerUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
    description: 'Eksplorasi keindahan arsitektur Melayu Riau, tepian Sungai Siak, dan keramahan masyarakat Pekanbaru melalui lensa kamera smartphone atau kamera digitalmu.',
    targetAudience: 'Siswa SMA/SMK dengan hobi fotografi & videografi kreatif',
    prizes: [
      'Juara 1: Kamera Mirrorless Kit + Trophy',
      'Juara 2: Smartphone Gimbal Stabilizer + Trophy',
      'Juara 3: Paket Aksesoris Fotografi + Trophy',
      'Karya Favorit: Uang Tunai Rp1.000.000'
    ],
    totalPrizeValue: 'Total Hadiah Rp6.500.000',
    benefits: [
      'Karya pemenang dipamerkan di Galeri Seni Taman Budaya Riau',
      'Sertifikat berstandar kuratorial fotografi',
      'Workshop gratis fotografi storytelling'
    ],
    requirements: [
      'Foto orisinil diambil di wilayah Provinsi Riau',
      'Karya tidak mengandung unsur SARA atau plagiarisme',
      'Boleh menggunakan smartphone atau kamera profesional'
    ],
    schedule: [
      { time: '10.00 - 11.00', activity: 'Briefing Tema & Kriteria Penilaian Foto Story' },
      { time: '11.00 - 14.00', activity: 'Hunting Foto On-the-spot di Cagar Budaya Riau' },
      { time: '14.00 - 16.00', activity: 'Kurasi Dewan Juri & Pameran Mini' }
    ],
    contactPersons: [
      { name: 'Rangga (Koordinator Pameran)', phone: '0822-1234-5678', role: 'Registrasi Karya' }
    ],
    isFeatured: false,
  },
  {
    id: 'evt-esport-championship-2026',
    title: 'Turnamen E-Sport Pelajar Pekanbaru: Mobile Legends Campus Series',
    slug: 'turnamen-esport-pelajar-pekanbaru',
    category: 'Olahraga & E-Sport',
    organizer: 'BEM UNILAK & IESPA Kota Pekanbaru',
    organizerLogo: '🎮',
    badgeText: 'Slot Terbatas',
    date: '21 November 2026',
    time: '09.00 - 20.00 WIB',
    location: 'Hall PKM Universitas Lancang Kuning (UNILAK), Pekanbaru',
    locationType: 'Offline',
    venueAddress: 'Jl. Yos Sudarso KM. 8, Rumbai, Pekanbaru',
    price: 30000,
    priceFormatted: 'Rp30.000 / tim (5 pemain)',
    registrationDeadline: '16 November 2026',
    maxParticipants: 32,
    currentParticipants: 29,
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    description: 'Tunjukkan kekompakan dan sportivitas tim sekolahmu di arena turnamen resmi pelajar dengan sistem gugur dan live streaming caster profesional UNILAK.',
    targetAudience: 'Siswa aktif perwakilan sekolah (tim 5 orang + 1 cadangan)',
    prizes: [
      'Juara 1: Trophy + Rp2.500.000 + Diamond MLBB',
      'Juara 2: Trophy + Rp1.500.000 + Diamond MLBB',
      'Juara 3: Trophy + Rp750.000 + Diamond MLBB'
    ],
    totalPrizeValue: 'Total Hadiah Rp5.000.000',
    benefits: [
      'E-Sertifikat resmi IESPA Kota Pekanbaru',
      'Konsumsi tim dan slot streaming live YouTube',
      'Peluang scouting atlet e-sport daerah'
    ],
    requirements: [
      'Semua anggota tim satu sekolah (SMA/SMK sederajat)',
      'Menjunjung tinggi sportivitas dan anti-toxic code'
    ],
    schedule: [
      { time: '09.00 - 12.00', activity: 'Babak Penyisihan Grup A & B' },
      { time: '13.00 - 17.00', activity: 'Babak Perempat Final & Semifinal' },
      { time: '18.30 - 20.00', activity: 'Grand Final & Penganugerahan Juara' }
    ],
    contactPersons: [
      { name: 'Rian (Panitia IESPA)', phone: '0812-9988-1122', role: 'Pendaftaran Tim' }
    ],
    isFeatured: false,
  }
];
