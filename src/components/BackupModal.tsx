import React, { useState, useRef } from 'react';
import { Language, UserProgress } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { StorageManager } from '../utils/storage';
import { HardDrive, Download, Upload, Trash2, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface BackupModalProps {
  language: Language;
  onClose: () => void;
  onProgressUpdated: (progress: UserProgress) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  language,
  onClose,
  onProgressUpdated,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Keyboard accessibility: close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleExport = () => {
    const jsonStr = StorageManager.exportProgressJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateTag = new Date().toISOString().split('T')[0];
    link.download = `latihdirixls-backup-${dateTag}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ type: 'success', text: 'Data progres berhasil diekspor ke file JSON.' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = StorageManager.importProgressJson(content);
      if (res.success && res.progress) {
        onProgressUpdated(res.progress);
        setStatusMessage({ type: 'success', text: t.backup.importSuccess });
      } else {
        setStatusMessage({ type: 'error', text: res.error || t.backup.importError });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    const fresh = StorageManager.resetProgress();
    onProgressUpdated(fresh);
    setShowResetConfirm(false);
    setStatusMessage({ type: 'success', text: 'Seluruh progres belajar telah dibersihkan.' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-excel-green" aria-hidden="true" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.backup.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Tutup Dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.backup.desc}
          </p>

          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-excel-green" aria-hidden="true" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" aria-hidden="true" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Action List */}
          <div className="space-y-2.5 pt-2">
            {/* Export JSON Button */}
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-excel-green" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {t.backup.exportBtn}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">.JSON</span>
            </button>

            {/* Import JSON Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {t.backup.importBtn}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Pilih Berkas</span>
            </button>

            {/* Reset Data Button */}
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400">
                    {t.backup.resetBtn}
                  </span>
                </div>
              </button>
            ) : (
              <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 space-y-2">
                <p className="text-xs font-semibold text-red-900 dark:text-red-200">
                  {t.backup.resetConfirmDesc}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 text-xs font-bold rounded bg-red-600 hover:bg-red-700 text-white min-h-[36px]"
                  >
                    {t.backup.confirmYes}
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 min-h-[36px]"
                  >
                    {t.backup.confirmCancel}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 min-h-[40px]"
          >
            {t.certificate.close}
          </button>
        </div>
      </div>
    </div>
  );
};
