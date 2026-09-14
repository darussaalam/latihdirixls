import React, { useRef, useState, useEffect } from 'react';
import { LevelId, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { StorageManager } from '../utils/storage';
import { Award, Printer, Download, X, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  levelId: LevelId;
  userName: string;
  onUpdateUserName: (name: string) => void;
  onClose: () => void;
  language: Language;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  levelId,
  userName,
  onUpdateUserName,
  onClose,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [localName, setLocalName] = useState(userName || 'Peserta Mandiri');
  const certificateRef = useRef<HTMLDivElement>(null);

  // Trigger celebration confetti on modal open
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const levelDetails: Record<LevelId, { titleId: string; titleEn: string; code: string; skills: string[] }> = {
    basic: {
      titleId: 'Sertifikat Dasar Excel (Excel Fundamentals)',
      titleEn: 'Excel Fundamentals Certificate',
      code: 'BAS',
      skills: [
        'Anatomi Sel & Struktur Lembar Kerja',
        'Operasi Aritmatika Penjumlahan & Pengurangan',
        'Fungsi Agregasi Dasar: SUM, AVERAGE, MIN, MAX',
        'Pencacahan Sel Angka & Teks: COUNT vs COUNTA',
        'Penguncian Referensi Sel Absolut ($) & Relatif',
      ],
    },
    intermediate: {
      titleId: 'Sertifikat Praktisi Excel Menengah (Intermediate Practitioner)',
      titleEn: 'Excel Intermediate Practitioner Certificate',
      code: 'INT',
      skills: [
        'Logika Pengambilan Keputusan Bersyarat: IF',
        'Kalkulasi Bersyarat Tunggal: SUMIF & COUNTIF',
        'Penggabungan Karakter Teks: CONCAT & Operator &',
        'Ekstraksi Teks Spesifik: LEFT, RIGHT, MID, LEN',
        'Pemodelan Rekapitulasi Gaji & Tunjangan Bersyarat',
      ],
    },
    advanced: {
      titleId: 'Sertifikat Spesialis Excel Lanjutan (Advanced Specialist)',
      titleEn: 'Advanced Excel Specialist Certificate',
      code: 'ADV',
      skills: [
        'Pencarian Vertikal Presisi: VLOOKUP (Exact Match)',
        'Pencarian Dua Arah Tanpa Batas: Kombinasi INDEX & MATCH',
        'Pencarian Cerdas Tanpa Batasan: XLOOKUP Modern',
        'Pembersihan Tampilan Laporan: IFERROR',
        'Array Dinamis Tanpa Duplikasi: UNIQUE',
        'Sistem Invoice Otomatis Berbasis Lookup Katalog',
      ],
    },
    pro: {
      titleId: 'Sertifikat Master Excel Profesional (Professional Master)',
      titleEn: 'Professional Excel Master Certificate',
      code: 'PRO',
      skills: [
        'Kalkulasi Finansial Kredit Angsuran Bulanan: PMT',
        'Pencarian Matriks Dua Arah Simultan: INDEX-MATCH-MATCH',
        'Simulasi Komisi Sales Progresif Berjenjang: Nested IF',
        'Pengelolaan Durasi & Tanggal Kerja: YEAR & TODAY',
        'Penjumlahan Multi Kriteria: SUMIFS',
        'Model Finansial Laba Bersih Scorecard Eksekutif',
      ],
    },
  };

  const details = levelDetails[levelId];
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const serial = StorageManager.generateCertificateSerial(localName, levelId, '2026-09');

  const handleNameChange = (val: string) => {
    setLocalName(val);
    onUpdateUserName(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = () => {
    // Generate high resolution SVG/Canvas snapshot download
    if (!certificateRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw high resolution background and parchment
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1200, 850);

    // Double Guilloche borders
    ctx.strokeStyle = '#107C41';
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 1140, 790);

    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 760);

    // Header Title
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('latihdirixls', 600, 110);

    ctx.fillStyle = '#107C41';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('SERTIFIKAT KELULUSAN RESMI', 600, 160);

    // Recipient Notice
    ctx.fillStyle = '#475569';
    ctx.font = '16px sans-serif';
    ctx.fillText('Diberikan secara terverifikasi kepada:', 600, 220);

    // Recipient Name
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(localName, 600, 280);

    // Underline
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 300);
    ctx.lineTo(850, 300);
    ctx.stroke();

    // Achievement Description
    ctx.fillStyle = '#334155';
    ctx.font = '18px sans-serif';
    ctx.fillText('Telah menyelesaikan seluruh materi dan evaluasi kompetensi pada program:', 600, 350);

    ctx.fillStyle = '#107C41';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(details.titleId, 600, 400);

    // Serial & Date
    ctx.fillStyle = '#64748B';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Nomor Seri: ${serial}`, 80, 750);
    ctx.fillText(`Tanggal: ${currentDate}`, 80, 775);

    ctx.textAlign = 'right';
    ctx.fillText('Platform Belajar Mandiri latihdirixls', 1120, 750);
    ctx.fillText('Terverifikasi 100% Client-Side Evaluation', 1120, 775);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Sertifikat-${levelId}-${localName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Modal Controls Header */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-excel-green" aria-hidden="true" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.certificate.modalTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label={t.certificate.close}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body & Customizer Form */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Name Input Form */}
          <div className="no-print flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
              {t.certificate.recipientLabel}:
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder={t.certificate.recipientPlaceholder}
              className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-excel-green"
            />
          </div>

          {/* Printable Certificate Frame */}
          <div
            ref={certificateRef}
            className="certificate-frame relative p-8 sm:p-12 rounded-lg bg-white text-slate-900 border-4 border-double border-excel-green shadow-lg select-none"
            style={{ minHeight: '520px' }}
          >
            {/* Inner Gold Accented Border */}
            <div className="absolute inset-3 border border-amber-500/70 pointer-events-none" />

            {/* Certificate Header Branding */}
            <div className="text-center space-y-1">
              <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                latihdirixls Official Credential
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-excel-green tracking-wide">
                {t.certificate.certificateOfCompletion}
              </h2>
            </div>

            {/* Recipient Section */}
            <div className="text-center my-6 space-y-2">
              <p className="text-xs text-slate-600 italic">
                {t.certificate.awardedTo}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 underline decoration-excel-green/60 decoration-2 underline-offset-8">
                {localName || 'Peserta Mandiri'}
              </h3>
            </div>

            {/* Program & Curriculum Achievement */}
            <div className="text-center max-w-xl mx-auto my-6 space-y-2">
              <p className="text-xs text-slate-600">
                {t.certificate.forMastering}
              </p>
              <div className="text-lg sm:text-xl font-bold text-slate-800">
                {details.titleId}
              </div>
            </div>

            {/* Competency Skills Matrix */}
            <div className="max-w-xl mx-auto my-6 p-4 rounded bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                Kompetensi Praktik Yang Telah Diverifikasi:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                {details.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-excel-green shrink-0" aria-hidden="true" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Signoff & Serial Seal */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div>
                <div className="font-mono font-bold text-slate-800">
                  ID: {serial}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Diterbitkan pada: {currentDate}
                </div>
              </div>

              {/* Verified Badge Seal */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-excel-green bg-green-50 text-excel-green font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Terverifikasi Mandiri</span>
              </div>

              <div className="text-right">
                <div className="font-semibold text-slate-800">
                  latihdirixls Platform
                </div>
                <div className="text-[11px] text-slate-500">
                  Evaluasi Otomatis Client-Side
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="no-print flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handleDownloadPng}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-excel-green hover:bg-excel-dark text-white transition-colors min-h-[44px]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{t.certificate.downloadPng}</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors min-h-[44px]"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>{t.certificate.printPdf}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors min-h-[44px]"
            >
              {t.certificate.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
