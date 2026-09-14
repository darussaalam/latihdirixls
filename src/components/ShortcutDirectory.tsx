import React, { useState, useEffect, useRef } from 'react';
import { SHORTCUTS_DATA } from '../data/shortcutsData';
import type { ShortcutCategory, ShortcutItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Search, Monitor, Laptop, Sparkles, Check, Bookmark } from 'lucide-react';

interface ShortcutDirectoryProps {
  language: Language;
  bookmarkedShortcuts: string[];
  onToggleBookmark: (shortcutId: string) => void;
}

export const ShortcutDirectory: React.FC<ShortcutDirectoryProps> = ({
  language,
  bookmarkedShortcuts,
  onToggleBookmark,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ShortcutCategory | 'all' | 'bookmarked'>('all');
  const [platform, setPlatform] = useState<'windows' | 'mac'>('windows');

  // Interactive tester state
  const [activeTesterKeys, setActiveTesterKeys] = useState<string[]>([]);
  const [detectedShortcut, setDetectedShortcut] = useState<ShortcutItem | null>(null);
  const testerRef = useRef<HTMLDivElement>(null);

  const categories: Array<{ id: ShortcutCategory | 'all' | 'bookmarked'; label: string }> = [
    { id: 'all', label: t.shortcuts.allCategories },
    { id: 'navigation', label: language === 'id' ? 'Navigasi' : 'Navigation' },
    { id: 'selection', label: language === 'id' ? 'Seleksi & Blok' : 'Selection' },
    { id: 'formulas', label: language === 'id' ? 'Rumus & Hitung' : 'Formulas' },
    { id: 'formatting', label: language === 'id' ? 'Format & Gaya' : 'Formatting' },
    { id: 'editing', label: language === 'id' ? 'Edit & Baris' : 'Editing' },
    { id: 'general', label: language === 'id' ? 'Umum & File' : 'General' },
    { id: 'bookmarked', label: language === 'id' ? `Tersimpan (${bookmarkedShortcuts.length})` : `Saved (${bookmarkedShortcuts.length})` },
  ];

  // Filtered shortcut list
  const filteredShortcuts = SHORTCUTS_DATA.filter((item) => {
    // Category match
    if (selectedCategory === 'bookmarked') {
      if (!bookmarkedShortcuts.includes(item.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (item.category !== selectedCategory) return false;
    }

    // Search query match
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = item.title[language].toLowerCase().includes(query);
    const descMatch = item.description[language].toLowerCase().includes(query);
    const keysMatch = [...item.keysWindows, ...item.keysMac].some((k) =>
      k.toLowerCase().includes(query)
    );
    return titleMatch || descMatch || keysMatch;
  });

  // Keyboard shortcut tester listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process when tester box is focused or active
      if (document.activeElement !== testerRef.current && !testerRef.current?.contains(document.activeElement)) {
        return;
      }

      e.preventDefault();
      const keysPressed: string[] = [];

      if (e.ctrlKey) keysPressed.push('Ctrl');
      if (e.metaKey) keysPressed.push('Cmd');
      if (e.altKey) keysPressed.push('Alt');
      if (e.shiftKey) keysPressed.push('Shift');

      const mainKey = e.key.toUpperCase();
      if (!['CONTROL', 'META', 'ALT', 'SHIFT'].includes(mainKey)) {
        if (mainKey === ' ') keysPressed.push('Spasi');
        else if (mainKey === 'ARROWDOWN') keysPressed.push('Panah Bawah');
        else if (mainKey === 'ARROWUP') keysPressed.push('Panah Atas');
        else if (mainKey === 'ARROWLEFT') keysPressed.push('Panah Kiri');
        else if (mainKey === 'ARROWRIGHT') keysPressed.push('Panah Kanan');
        else keysPressed.push(mainKey);
      }

      setActiveTesterKeys(keysPressed);

      // Match against shortcut library
      const matched = SHORTCUTS_DATA.find((item) => {
        const targetKeys = platform === 'windows' ? item.keysWindows : item.keysMac;
        return (
          keysPressed.length === targetKeys.length &&
          keysPressed.every((k) =>
            targetKeys.some((tk) => tk.toLowerCase() === k.toLowerCase())
          )
        );
      });

      if (matched) {
        setDetectedShortcut(matched);
      } else {
        setDetectedShortcut(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [platform, language]);

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.shortcuts.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-excel-green transition-colors"
            />
          </div>

          {/* OS Platform Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 self-start md:self-auto">
            <button
              onClick={() => setPlatform('windows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded min-h-[40px] transition-colors ${
                platform === 'windows'
                  ? 'bg-white dark:bg-slate-700 text-excel-green dark:text-green-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.shortcuts.platformWindows}</span>
            </button>
            <button
              onClick={() => setPlatform('mac')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded min-h-[40px] transition-colors ${
                platform === 'mac'
                  ? 'bg-white dark:bg-slate-700 text-excel-green dark:text-green-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.shortcuts.platformMac}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  isSelected
                    ? 'bg-excel-green text-white shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Shortcut Tester Sandbox */}
      <div
        ref={testerRef}
        tabIndex={0}
        className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 border-2 border-dashed border-excel-green/60 dark:border-green-500/40 focus:outline-none focus:ring-2 focus:ring-excel-green transition-all"
        aria-label="Simulator Uji Coba Shortcut Keyboard"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-excel-green" aria-hidden="true" />
              <span>{t.shortcuts.keyTesterTitle}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {t.shortcuts.keyTesterDesc}
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700">
            {platform === 'windows' ? 'Mode Windows (Ctrl, Alt)' : 'Mode Mac (Cmd ⌘, Option ⌥)'}
          </div>
        </div>

        {/* Live Detected Keys Display */}
        <div className="mt-4 flex flex-wrap items-center gap-2 min-h-[44px]">
          {activeTesterKeys.length > 0 ? (
            activeTesterKeys.map((key, i) => (
              <kbd
                key={i}
                className="px-3 py-1.5 text-xs font-mono font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-md shadow-sm"
              >
                {key}
              </kbd>
            ))
          ) : (
            <span className="text-xs italic text-slate-500 dark:text-slate-400">
              {t.shortcuts.testerPlaceholder}
            </span>
          )}

          {detectedShortcut && (
            <div className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded border border-emerald-300 dark:border-emerald-800">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>
                {t.shortcuts.matchedShortcut} {detectedShortcut.title[language]}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Shortcuts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShortcuts.map((item) => {
          const isBookmarked = bookmarkedShortcuts.includes(item.id);
          const keys = platform === 'windows' ? item.keysWindows : item.keysMac;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Card Header & Bookmark */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-excel-green dark:text-green-400">
                    {item.category}
                  </span>
                  <button
                    onClick={() => onToggleBookmark(item.id)}
                    className="text-slate-400 hover:text-amber-500 transition-colors p-1"
                    title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Shortcut'}
                    aria-label={`Simpan shortcut ${item.title[language]}`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Shortcut Title */}
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {item.title[language]}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {item.description[language]}
                </p>

                {/* Example Context */}
                <div className="mt-3 p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">Contoh:</strong>{' '}
                  {item.exampleUsage[language]}
                </div>
              </div>

              {/* Keycaps Display */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1 flex-wrap">
                  {keys.map((k, idx) => (
                    <React.Fragment key={idx}>
                      <kbd className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded shadow-sm">
                        {k}
                      </kbd>
                      {idx < keys.length - 1 && (
                        <span className="text-xs text-slate-400 font-bold">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {item.importance === 'essential' ? t.shortcuts.importanceEssential : t.shortcuts.importanceAdvanced}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredShortcuts.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tidak ada shortcut yang cocok dengan kata kunci pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
};
