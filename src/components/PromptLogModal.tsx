import React from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Filter, 
  Sparkles, 
  Award, 
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PROMPT_LOGS } from '../data/promptLogs';
import { PromptLogItem } from '../types';

interface PromptLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptLogModal: React.FC<PromptLogModalProps> = ({ isOpen, onClose }) => {
  const [selectedPhase, setSelectedPhase] = React.useState<string>('all');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const phases = ['all', ...Array.from(new Set(PROMPT_LOGS.map(p => p.phase)))];

  const filteredLogs = selectedPhase === 'all'
    ? PROMPT_LOGS
    : PROMPT_LOGS.filter(p => p.phase === selectedPhase);

  const handleCopyPrompt = (log: PromptLogItem) => {
    navigator.clipboard.writeText(log.promptText);
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFullLog = () => {
    const headerText = 
`========================================================================
DOKUMENTASI LOG PROMPT RESMI — DUCKATHON 2.0 VIBE CODING CHALLENGE
Developer Unity Creative UNILAK Study Club (Duck SC)
========================================================================
Tema: Platform Informasi & Pendaftaran Event Pelajar (KawanEvent Riau)
Lokasi: Universitas Lancang Kuning (UNILAK), Pekanbaru, Riau
Bobot Penilaian Kriteria: Kualitas Prompt (25%)
Tanggal Dokumentasi: 18 Oktober 2026
Tech Stack: React 19 + TypeScript + Vite + Tailwind CSS (Level Lanjutan ⭐)

------------------------------------------------------------------------
DAFTAR LOG PROMPT ENGINEERING TAHAP DEMI TAHAP:
------------------------------------------------------------------------
`;

    const bodyText = PROMPT_LOGS.map((p, idx) => {
      return `
[LOG #${idx + 1}] FASE: ${p.phase}
JUDUL: ${p.title}
RELEVANSI KRITERIA JURI: ${p.criteriaScoreRelevance}
TUJUAN ARSITEKTUR:
${p.purpose}

TEKS PROMPT LENGKAP YANG DIKIRIMKAN KE AI:
"""
${p.promptText}
"""

RINGKASAN OUTPUT/SOLUSI HASIL PROMPT:
${p.aiResponseSummary}

------------------------------------------------------------------------
`;
    }).join('\n');

    const fullBlob = new Blob([headerText + bodyText], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(fullBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `Log_Prompt_Duckathon2_UNILAK_KawanEvent.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/95 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Audit Log Prompt AI
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500 text-white">
                  Bobot Juri 25%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sesuai Pasal 3 Ketentuan Vibe Coding Challenge UNILAK Duck SC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFullLog}
              className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              title="Unduh seluruh prompt dalam format .TXT untuk diserahkan ke juri"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dokumen (.txt)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup log prompt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scoring Criteria Summary Banner */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Desain Visual & Vibe</span>
            <span className="font-extrabold text-white text-sm">30%</span>
            <span className="text-[10px] text-slate-400 block">Estetika & Vibe Switcher</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Fungsionalitas</span>
            <span className="font-extrabold text-white text-sm">25%</span>
            <span className="text-[10px] text-slate-400 block">Filter, Navigasi & Tiket</span>
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/60 space-y-0.5">
            <span className="text-indigo-300 block text-[10px] uppercase font-bold">Kualitas Prompt AI</span>
            <span className="font-extrabold text-indigo-200 text-sm">25%</span>
            <span className="text-[10px] text-indigo-300 block">Struktur, Konteks & Hasil</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Inovasi & Ide</span>
            <span className="font-extrabold text-white text-sm">20%</span>
            <span className="text-[10px] text-slate-400 block">Smart Matcher & QR Tiket</span>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-slate-800 bg-slate-950/40 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            Fase Prompt:
          </span>
          {phases.map((ph) => (
            <button
              key={ph}
              onClick={() => setSelectedPhase(ph)}
              className={`shrink-0 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedPhase === ph
                  ? 'bg-indigo-500 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ph === 'all' ? 'Semua Tahapan (6)' : ph}
            </button>
          ))}
        </div>

        {/* Scrollable Prompt Cards */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {filteredLogs.map((log, idx) => (
            <div 
              key={log.id}
              className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 space-y-3 transition-colors"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-indigo-400 font-bold">#{log.id.toUpperCase()}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-slate-300 font-medium">{log.phase}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-amber-400 font-semibold">{log.criteriaScoreRelevance}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {log.title}
                  </h4>
                </div>

                <button
                  onClick={() => handleCopyPrompt(log)}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Salin teks prompt ini ke clipboard"
                >
                  {copiedId === log.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Purpose */}
              <div className="text-xs text-slate-300">
                <strong className="text-slate-200">Tujuan & Strategi Prompting: </strong>
                {log.purpose}
              </div>

              {/* Prompt Text Box */}
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
                {log.promptText}
              </div>

              {/* AI Output summary */}
              <div className="text-xs text-slate-400 flex items-start gap-2 pt-1 border-t border-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-300">Hasil Implementasi: </span>
                  {log.aiResponseSummary}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <div>
            Total <span className="text-white font-bold">{PROMPT_LOGS.length} log prompt</span> terstruktur siap audit penjurian.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
          >
            Tutup Panel
          </button>
        </div>

      </div>
    </div>
  );
};
