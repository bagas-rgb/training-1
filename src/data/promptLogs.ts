import { PromptLogItem } from '../types';

export const PROMPT_LOGS: PromptLogItem[] = [
  {
    id: 'log-01',
    phase: 'Arsitektur & Konsep',
    title: 'Analisis Syarat Ketentuan Duckathon 2.0 & Penentuan Scope 8 Jam',
    promptText: `Bertindaklah sebagai Senior Frontend Software Architect dan konsultan kompetisi Vibe Coding Challenge UNILAK Duck SC. 
Baca dengan teliti aturan lomba Duckathon 2.0:
- Peserta: Siswa/i aktif sekolah di Pekanbaru, Riau (individu, max 3 orang/sekolah).
- HTM: Rp10.000/orang. Kontak: 0819-0267-3775 & 0821-7137-4234.
- Waktu pelaksanaan: 8 jam coding.
- Penilaian: Desain Visual & Vibe (30%), Fungsionalitas (25%), Kualitas Prompt Log (25%), Inovasi & Kreativitas (20%).
- Tech Stack: Wajib gunakan Framework lanjutan (React + TypeScript + Tailwind CSS) untuk klaim poin bonus juri ⭐.

Tentukan scope produk yang realistis dan impactful untuk tema "Platform Informasi & Pendaftaran Event Pelajar" dengan alur:
Home -> Filter/Cari Event Pekanbaru -> Detail Event Lengkap -> Form Pendaftaran Siswa -> Konfirmasi E-Ticket Digital Interaktif + Built-in AI Prompt Log Viewer agar juri bisa langsung memeriksa dan menilai kriteria prompt 25%.`,
    purpose: 'Memetakan batasan teknis, alur pengguna, dan memastikan keselarasan 100% dengan pasal-pasal di dokumen resmi Duckathon 2.0.',
    aiResponseSummary: 'Merumuskan roadmap 5 pilar: Event Discovery (Search & Category), Event Deep-Dive, Multi-Step Student Registration dengan validasi NISN/Sekolah Riau, E-Ticket System dengan QR Code SVG, dan Terintegrasi Audit Prompt Log Viewer.',
    criteriaScoreRelevance: 'Kualitas Prompt 25% + Fungsionalitas 25%'
  },
  {
    id: 'log-02',
    phase: 'Struktur Data & Logic',
    title: 'Model Data Event Lokal Pekanbaru & Validasi Registrasi Siswa',
    promptText: `Buatkan model data TypeScript yang komprehensif untuk platform event pelajar Pekanbaru. 
Syarat data:
1. Event model: id, title, category, organizer (termasuk Duck SC UNILAK), tanggal, lokasi spesifik Pekanbaru, rundown waktu, biaya tiket (gratis/berbayar dengan HTM terjangkau), kuota maksimal (misal 36 peserta untuk Duckathon), dan kontak panitia (0819-0267-3775, 0821-7137-4234).
2. Registration model: id transaksi (kode DUCK-2026-XXXX), nama lengkap, sekolah asal (dukung SMA/SMK ternama di Pekanbaru), NISN, WhatsApp, email, status pendaftaran (Terkonfirmasi/Menunggu Verifikasi), dan timestamp.
3. Fungsi helper: validasi nomor WhatsApp Indonesia (08xx), penyimpanan lokal (localStorage) agar data registrasi tidak hilang saat refresh.`,
    purpose: 'Menyiapkan fondasi tipe data yang aman (strict typing) dan realistis untuk lingkungan pelajar Riau.',
    aiResponseSummary: 'Dibuatkan interface EventItem, RegistrationItem, daftar sekolah terverifikasi di Pekanbaru, dan helper LocalStorage dengan fallback data otomatis.',
    criteriaScoreRelevance: 'Fungsionalitas 25% + Ketentuan Teknis Lanjutan ⭐'
  },
  {
    id: 'log-03',
    phase: 'Desain UI & Vibe',
    title: 'Desain Visual Berstandar Tinggi, Zero-Slop & Vibe Theme Switcher',
    promptText: `Rancang antarmuka pengguna (UI/UX) modern menggunakan Tailwind CSS dengan aturan estetika ketat:
- HINDARI AI-slop: Dilarang menggunakan static pill tags murahan (jangan bungkus metadata kategori, tanggal, status dalam rounded pills warna-warni). Gunakan tipografi bersih dengan pemisah titik (\`·\`) dan layout editorial berkelas.
- Terapkan kontras warna WCAG AA yang tajam dan nyaman dibaca.
- Buatkan fitur "Vibe Theme Switcher" untuk memenuhi kriteria undian vibe coding:
  1. "Duck Gold & Maroon" (Identitas resmi Duck SC UNILAK Pekanbaru)
  2. "Cyber Tech" (Nuansa gelap futuristik untuk coding festival)
  3. "Emerald Lancang Kuning" (Khas budaya Riau yang elegan)
  4. "Clean Minimalist" (Nuansa studio putih & slate kontemporer)
- Pastikan tampilan 100% responsif di layar HP (360px), tablet (768px), dan desktop (1440px) lengkap dengan navigasi mobile yang intuitif.`,
    purpose: 'Memaksimalkan bobot nilai Desain Visual & Vibe (30%) tanpa cacat visual AI generik.',
    aiResponseSummary: 'Menghasilkan sistem token tema berbasis CSS state, tipografi hierarkis tajam, tata letak kartu event tanpa pill badges klise, dan responsivitas mobile-first.',
    criteriaScoreRelevance: 'Desain Visual & Vibe 30%'
  },
  {
    id: 'log-04',
    phase: 'Fungsionalitas & Tiket',
    title: 'Generator E-Tiket Digital Interaktif dengan QR Code & Bukti WhatsApp',
    promptText: `Buatkan komponen E-Ticket (Tiket Digital Pelajar) yang muncul setelah pendaftaran selesai dan di dashboard "Tiket Saya".
Fitur yang wajib ada:
1. Desain menyerupai boarding pass / badge event modern dengan perforated tear edge visual effect.
2. Generator visual QR Code interaktif menggunakan format SVG native (tidak bergantung external image URL agar anti-rusak/offline ready).
3. Kode registrasi unik format 'DUCK-2026-[RANDOM-HEX]', informasi nama siswa, sekolah asal di Pekanbaru, nama event, dan tanggal.
4. Tombol interaktif: "Cetak / Simpan E-Tiket", "Kirim Konfirmasi ke WhatsApp Panitia Duck SC", dan "Batalkan Pendaftaran".
5. Status badge fungsional: Terkonfirmasi aktif atau Menunggu Verifikasi HTM.`,
    purpose: 'Memberikan pengalaman pengguna (UX) pendaftaran yang nyata, selesai, dan memuaskan.',
    aiResponseSummary: 'Dihasilkan kartu tiket digital modular lengkap dengan rendering QR code SVG, format pesan WhatsApp URL-encoded otomatis ke nomor panitia, dan dialog konfirmasi cetak.',
    criteriaScoreRelevance: 'Fungsionalitas 25% + Inovasi 20%'
  },
  {
    id: 'log-05',
    phase: 'Inovasi & Kreativitas',
    title: 'Fitur Smart Event Recommendation & Countdown Timer Duckathon',
    promptText: `Tambahkan fitur inovasi bernilai tinggi untuk mendukung kriteria Inovasi & Kreativitas (20%):
1. Smart Event Matcher (Kuis Cepat 2 Langkah): Siswa memilih minat utama (Coding/IT, Desain Grafis, Riset Ilmiah, Esport) dan tipe waktu (Weekend / Fleksibel) -> algoritma instan menampilkan rekomendasi event paling cocok di Pekanbaru.
2. Real-time Countdown Timer menuju penutupan pendaftaran event Duckathon 2.0 (14 Oktober 2026).
3. Sistem Bookmark / Favorit event dengan filter instan.
4. Tombol "Share ke Teman Sekolah via WhatsApp" dengan auto-generated text ringkasan event.`,
    purpose: 'Mendongkrak nilai keunikan ide dan fitur pembeda yang tidak dimiliki peserta lain.',
    aiResponseSummary: 'Dibuatkan modal Quiz Matcher dengan filter scoring langsung, visual countdown banner, dan integrasi WhatsApp Web API.',
    criteriaScoreRelevance: 'Inovasi & Kreativitas 20%'
  },
  {
    id: 'log-06',
    phase: 'Refinement & Validasi',
    title: 'Fitur Audit Log Prompt Bawaan untuk Penjurian Duckathon 2.0',
    promptText: `Sesuai aturan PDF Duckathon 2.0 Pasal 2 & Pasal 3 point c ("Log Prompt — WAJIB Dikumpulkan"), buatkan modal terpadu "AI Prompt Engineering Audit Log".
Kebutuhan:
1. Juri atau pengguna bisa membuka panel log prompt kapan saja dari navbar.
2. Tampilkan daftar semua prompt dengan kategori fase pengerjaan, tujuan teknis, dan keselarasan dengan bobot penilaian juri (30% Vibe, 25% Fungsi, 25% Prompt, 20% Inovasi).
3. Sediakan tombol "Salin Prompt" per item dan tombol "Download Dokumen Log (.txt)" agar peserta bisa langsung mengekspor bukti pengerjaan untuk diserahkan ke dewan juri tanpa perlu edit manual.`,
    purpose: 'Memenuhi kewajiban pasal lomba sekaligus mempermudah dewan juri mengaudit kualitas prompt engineering.',
    aiResponseSummary: 'Dihasilkan komponen PromptLogModal yang interaktif, memiliki filter fase, tombol copy clipboard, dan generator unduh file teks dokumentasi resmi.',
    criteriaScoreRelevance: 'Kualitas Prompt (Log Prompt) 25%'
  }
];
