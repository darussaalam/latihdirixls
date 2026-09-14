import React from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Table, Keyboard, Moon, Sun, HardDrive, CheckCircle2, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: 'practice' | 'shortcuts';
  onTabChange: (tab: 'practice' | 'shortcuts') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  completedLevelsCount: number;
  onOpenBackupModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  completedLessonsCount,
  totalLessonsCount,
  completedLevelsCount,
  onOpenBackupModal,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-excel-green text-white font-bold text-xl shadow-sm">
              X
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                latihdiri<span className="text-excel-green">xls</span>
              </span>
              <p className="hidden sm:block text-xs text-slate-600 dark:text-slate-400">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Main Mode Navigation (Practice vs Shortcuts) */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700" aria-label="Main Navigation">
            <button
              onClick={() => onTabChange('practice')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all min-h-[44px] ${
                activeTab === 'practice'
                  ? 'bg-white dark:bg-slate-700 text-excel-green dark:text-green-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-current={activeTab === 'practice' ? 'page' : undefined}
            >
              <Table className="w-4 h-4" aria-hidden="true" />
              <span>{t.tabs.practice}</span>
            </button>
            <button
              onClick={() => onTabChange('shortcuts')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all min-h-[44px] ${
                activeTab === 'shortcuts'
                  ? 'bg-white dark:bg-slate-700 text-excel-green dark:text-green-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-current={activeTab === 'shortcuts' ? 'page' : undefined}
            >
              <Keyboard className="w-4 h-4" aria-hidden="true" />
              <span>{t.tabs.shortcuts}</span>
            </button>
          </nav>

          {/* User Progress Stats & Utility Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Real Progress Counter */}
            <div className="hidden md:flex items-center space-x-3 pr-2 border-r border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-excel-green" aria-hidden="true" />
                <span>{completedLessonsCount}/{totalLessonsCount}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1.5 rounded-md border border-amber-200 dark:border-amber-800">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>{completedLevelsCount}/4 {language === 'id' ? 'Sertifikat' : 'Certificates'}</span>
              </div>
            </div>

            {/* Language Switcher Button */}
            <div className="inline-flex rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5">
              <button
                onClick={() => onLanguageChange('id')}
                className={`px-2 py-1.5 text-xs font-semibold rounded min-h-[44px] min-w-[36px] transition-colors ${
                  language === 'id'
                    ? 'bg-white dark:bg-slate-700 text-excel-green dark:text-green-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Pilih Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1.5 text-xs font-semibold rounded min-h-[44px] min-w-[36px] transition-colors ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-excel-green dark:text-green-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Select English Language"
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" aria-hidden="true" />
              )}
            </button>

            {/* Backup & Export/Import Dialog Trigger */}
            <button
              onClick={onOpenBackupModal}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Pengaturan Cadangan Data dan Privasi"
              title={t.backup.title}
            >
              <HardDrive className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
