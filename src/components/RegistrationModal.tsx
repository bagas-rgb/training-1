import React from 'react';
import { 
  X, 
  Check, 
  Upload, 
  User, 
  School, 
  Mail, 
  Phone, 
  FileCheck, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EventItem, RegistrationItem } from '../types';
import { POPULAR_PEKANBARU_SCHOOLS } from '../data/mockEvents';

interface RegistrationModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSuccess: (newRegistration: RegistrationItem) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = React.useState<1 | 2>(1); // 1: Input Form, 2: Review & Konfirmasi

  // Form State
  const [fullName, setFullName] = React.useState('');
  const [schoolName, setSchoolName] = React.useState(POPULAR_PEKANBARU_SCHOOLS[0]);
  const [customSchool, setCustomSchool] = React.useState('');
  const [studentIdOrNisn, setStudentIdOrNisn] = React.useState('');
  const [classGrade, setClassGrade] = React.useState('Kelas 11 SMA/SMK');
  const [email, setEmail] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');
  const [simulatedCardFile, setSimulatedCardFile] = React.useState<string | null>(null);
  const [agreedTerms, setAgreedTerms] = React.useState(false);

  // Errors state
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!event) return null;

  const resolvedSchool = schoolName === 'LAINNYA' ? customSchool : schoolName;

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Nama lengkap wajib diisi';
    } else if (fullName.trim().length < 3) {
      errs.fullName = 'Nama minimal 3 karakter';
    }

    if (schoolName === 'LAINNYA' && !customSchool.trim()) {
      errs.customSchool = 'Tuliskan nama sekolah Anda di Pekanbaru/Riau';
    }

    if (!studentIdOrNisn.trim()) {
      errs.studentIdOrNisn = 'NISN / No. Induk Pelajar wajib diisi';
    }

    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Format email tidak valid';
    }

    if (!whatsapp.trim()) {
      errs.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^08[0-9]{8,12}$/.test(whatsapp.replace(/\s+/g, ''))) {
      errs.whatsapp = 'Gunakan format WhatsApp Indonesia (contoh: 081234567890)';
    }

    if (!agreedTerms) {
      errs.terms = 'Anda wajib menyetujui syarat & kode etik peserta';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSimulatedCardFile(e.target.files[0].name);
    } else {
      setSimulatedCardFile('kartu_pelajar_terverifikasi.pdf');
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    
    // Generate unique registration code
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const uniqueId = `DUCK-2026-${randomHex}`;

    setTimeout(() => {
      const newReg: RegistrationItem = {
        id: uniqueId,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        fullName: fullName.trim(),
        schoolName: resolvedSchool,
        studentIdOrNisn: studentIdOrNisn.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        classGrade,
        categoryOrRole: 'Individu (Peserta Siswa)',
        registeredAt: 'Baru saja',
        status: event.price > 0 ? 'Menunggu Verifikasi' : 'Terkonfirmasi',
        ticketCode: uniqueId,
        qrPayload: `VERIFIED-${uniqueId}-${encodeURIComponent(fullName.trim())}-${encodeURIComponent(resolvedSchool)}`,
        cardFileSimulatedName: simulatedCardFile || 'kartu_pelajar_siswa.pdf',
      };

      setIsSubmitting(false);
      onSuccess(newReg);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Formulir Pendaftaran Siswa
            </div>
            <h2 className="text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Tutup pendaftaran"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-2 text-center text-xs border-b border-slate-800 bg-slate-950/40">
          <div className={`py-2.5 font-medium border-b-2 ${step === 1 ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-slate-500'}`}>
            1. Data Lengkap Peserta
          </div>
          <div className={`py-2.5 font-medium border-b-2 ${step === 2 ? 'border-amber-400 text-amber-400 font-bold' : 'border-transparent text-slate-500'}`}>
            2. Review & Terbitkan Tiket
          </div>
        </div>

        {/* Body Form */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-sm space-y-4">
          
          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-4">
              
              {/* Event Quick Notice */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-start gap-2.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Ketentuan Wilayah: </span>
                  Khusus pelajar aktif di Pekanbaru, Riau. Biaya: <strong className="text-amber-400">{event.priceFormatted}</strong>.
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-200">
                  Nama Lengkap Siswa *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Muhammad Ardiansyah"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-400">{errors.fullName}</p>}
              </div>

              {/* School Select (Pekanbaru local schools) */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-200">
                  Asal Sekolah di Pekanbaru / Riau *
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <select
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {POPULAR_PEKANBARU_SCHOOLS.map((sch) => (
                      <option key={sch} value={sch}>{sch}</option>
                    ))}
                    <option value="LAINNYA">+ Sekolah Lain di Pekanbaru / Riau</option>
                  </select>
                </div>

                {schoolName === 'LAINNYA' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={customSchool}
                      onChange={(e) => setCustomSchool(e.target.value)}
                      placeholder="Ketik nama lengkap sekolah Anda..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                    {errors.customSchool && <p className="text-xs text-rose-400">{errors.customSchool}</p>}
                  </div>
                )}
              </div>

              {/* NISN & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-200">
                    NISN / Nomor Induk Siswa *
                  </label>
                  <input
                    type="text"
                    value={studentIdOrNisn}
                    onChange={(e) => setStudentIdOrNisn(e.target.value)}
                    placeholder="Contoh: 0067829102"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.studentIdOrNisn && <p className="text-xs text-rose-400">{errors.studentIdOrNisn}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-200">
                    Tingkat Kelas
                  </label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Kelas 10 SMA/SMK">Kelas 10 SMA / SMK</option>
                    <option value="Kelas 11 SMA/SMK">Kelas 11 SMA / SMK</option>
                    <option value="Kelas 12 SMA/SMK">Kelas 12 SMA / SMK</option>
                    <option value="Tingkat MA / Kejuruan">Madrasah Aliyah (MA)</option>
                  </select>
                </div>
              </div>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-200">
                    Email Siswa *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-200">
                    Nomor WhatsApp Aktif *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="081234567890"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  {errors.whatsapp && <p className="text-xs text-rose-400">{errors.whatsapp}</p>}
                </div>
              </div>

              {/* Upload Kartu Pelajar (Simulasi Praktis Lomba) */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-semibold text-slate-200">
                  Unggah Kartu Pelajar / Surat Keterangan Sekolah (Simulasi)
                </label>
                <label className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-xl p-3.5 flex items-center justify-between cursor-pointer bg-slate-950/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">
                        {simulatedCardFile ? simulatedCardFile : 'Klik untuk memilih file Kartu Pelajar'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Format PDF/JPG/PNG (Maks 5 MB)
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSimulateFileUpload}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <span className="text-xs font-semibold text-amber-400 hover:underline">
                    {simulatedCardFile ? 'Ganti File' : 'Pilih File'}
                  </span>
                </label>
              </div>

              {/* Checkbox Terms & Ethics from PDF */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-950"
                  />
                  <span>
                    Saya menyatakan data di atas benar, saya merupakan siswa aktif di Pekanbaru/Riau, 
                    serta bersedia menjunjung tinggi sportivitas dan kode etik kompetisi Duck SC UNILAK.
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-rose-400 mt-1">{errors.terms}</p>}
              </div>

              {/* Next Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  <span>Lanjut ke Review Data & Tiket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* STEP 2: REVIEW & CONFIRMATION */
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Ringkasan Pendaftaran
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Nama Lengkap:</span>
                    <span className="font-semibold text-white">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Asal Sekolah:</span>
                    <span className="font-semibold text-white">{resolvedSchool}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">NISN Siswa:</span>
                    <span className="font-semibold text-white">{studentIdOrNisn}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Tingkat Kelas:</span>
                    <span className="font-semibold text-white">{classGrade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">WhatsApp:</span>
                    <span className="font-semibold text-white">{whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email:</span>
                    <span className="font-semibold text-white">{email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Berkas Kartu Pelajar:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    {simulatedCardFile || 'kartu_pelajar_siswa.pdf'}
                  </span>
                </div>
              </div>

              {/* Payment Info Box */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Biaya HTM Resmi:</span>
                  <span className="text-base font-black text-amber-400">{event.priceFormatted}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {event.price > 0 ? (
                    <>
                      Sesuai <strong>Pasal 2 Ketentuan Duckathon 2.0</strong>, pembayaran HTM Rp10.000 dilakukan dengan konfirmasi ke WhatsApp Contact Person resmi (0819-0267-3775 atau 0821-7137-4234). E-Tiket Anda akan diterbitkan langsung dengan status terverifikasi.
                    </>
                  ) : (
                    <>Event ini gratis (Rp0) untuk seluruh pelajar aktif se-Riau. E-Tiket akan langsung aktif seketika.</>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Ubah Data
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Menerbitkan Tiket...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Konfirmasi & Dapatkan E-Tiket</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
