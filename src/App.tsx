import { useState, useEffect, useMemo, useCallback } from 'react';
import { LESSONS_DATA } from './data/curriculumData';
import { FormulaEvaluator } from './engine/formulaEvaluator';
import { StorageManager } from './utils/storage';
import type { LevelId, UserProgress, Theme } from './types';
import { TRANSLATIONS } from './data/translations';

// Subcomponents
import { Navbar } from './components/Navbar';
import { LevelSelector } from './components/LevelSelector';
import { SpreadsheetGrid } from './components/SpreadsheetGrid';
import { LessonPanel } from './components/LessonPanel';
import { ShortcutDirectory } from './components/ShortcutDirectory';
import { CertificateModal } from './components/CertificateModal';
import { BackupModal } from './components/BackupModal';

import confetti from 'canvas-confetti';
import './App.css';

export function App() {
  // 1. Core State
  const [progress, setProgress] = useState<UserProgress>(() => StorageManager.getProgress());
  const [activeTab, setActiveTab] = useState<'practice' | 'shortcuts'>('practice');
  const [currentLevel, setCurrentLevel] = useState<LevelId>('basic');
  const [currentLessonId, setCurrentLessonId] = useState<string>('basic-1');

  // 2. Spreadsheet Grid & Formula State
  const [gridData, setGridData] = useState<Record<string, any>>({});
  const [activeCell, setActiveCell] = useState<string>('D2');
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationState, setEvaluationState] = useState<{
    status: 'idle' | 'success' | 'error';
    feedback?: string;
    enteredFormula?: string;
  }>({ status: 'idle' });

  // 3. Modal State
  const [certificateModalLevel, setCertificateModalLevel] = useState<LevelId | null>(null);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);

  // Current Lesson Object
  const currentLesson = useMemo(() => {
    return LESSONS_DATA.find((l) => l.id === currentLessonId) || LESSONS_DATA[0];
  }, [currentLessonId]);

  // All lessons in active level
  const currentLevelLessons = useMemo(() => {
    return LESSONS_DATA.filter((l) => l.level === currentLevel);
  }, [currentLevel]);

  // Translation bundle
  const t = TRANSLATIONS[progress.language];

  // Apply Dark Theme Class to Document
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  // Sync grid when lesson changes
  const initializeGridForLesson = useCallback((lessonToLoad: typeof currentLesson) => {
    const baseCells: Record<string, any> = {};
    Object.entries(lessonToLoad.initialGrid.cells).forEach(([addr, cell]) => {
      baseCells[addr] = cell.value;
    });

    // Restore previous answer if already answered
    const previousFormula = progress.lessonAnswers[lessonToLoad.id];
    if (previousFormula) {
      const evalRes = FormulaEvaluator.evaluate(previousFormula, baseCells);
      if (evalRes.success) {
        baseCells[lessonToLoad.targetCell] = evalRes.value;
      }
      setFormulaInput(previousFormula);
      setEvaluationState({
        status: 'success',
        enteredFormula: previousFormula,
      });
    } else {
      setFormulaInput('');
      setEvaluationState({ status: 'idle' });
    }

    setGridData(baseCells);
    setActiveCell(lessonToLoad.targetCell);
  }, [progress.lessonAnswers]);

  useEffect(() => {
    initializeGridForLesson(currentLesson);
  }, [currentLesson, initializeGridForLesson]);

  // Handle cell click selection
  const handleCellSelect = (cellAddress: string) => {
    setActiveCell(cellAddress);
    // If target cell selected, show current formula input
    if (cellAddress === currentLesson.targetCell) {
      // Keep existing formula input
    } else {
      const val = gridData[cellAddress];
      setFormulaInput(val !== undefined && val !== null ? String(val) : '');
    }
  };

  // Formula evaluation and verification
  const handleFormulaSubmit = () => {
    if (!formulaInput.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      // 1. Evaluate formula against current grid
      const evalResult = FormulaEvaluator.evaluate(formulaInput, gridData);

      if (!evalResult.success) {
        setIsEvaluating(false);
        setEvaluationState({
          status: 'error',
          feedback: evalResult.error || 'Terjadi kesalahan penulisan rumus.',
          enteredFormula: formulaInput,
        });
        return;
      }

      // 2. Validate output
      let isValid = false;
      let feedbackMessage = '';

      if (currentLesson.validate) {
        const customVal = currentLesson.validate(formulaInput, evalResult.value, gridData);
        isValid = customVal.valid;
        if (!isValid) {
          feedbackMessage = progress.language === 'id' ? customVal.feedbackId || '' : customVal.feedbackEn || '';
        }
      } else {
        // Compare with expectedResult
        const expected = currentLesson.expectedResult;
        if (Array.isArray(expected) && Array.isArray(evalResult.value)) {
          isValid = JSON.stringify(expected) === JSON.stringify(evalResult.value);
        } else if (typeof expected === 'number' && typeof evalResult.value === 'number') {
          isValid = Math.abs(expected - evalResult.value) < 0.01;
        } else {
          isValid = String(evalResult.value).trim().toLowerCase() === String(expected).trim().toLowerCase();
        }
      }

      if (isValid) {
        // Update grid cell
        const updatedGrid = {
          ...gridData,
          [currentLesson.targetCell]: evalResult.value,
        };
        setGridData(updatedGrid);

        // Mark complete in progress
        const allLevelIds = currentLevelLessons.map((l) => l.id);
        const { isNewlyCompletedLevel, progress: updatedProgress } =
          StorageManager.markLessonComplete(
            currentLesson.id,
            formulaInput,
            currentLesson.level,
            allLevelIds
          );

        setProgress({ ...updatedProgress });
        setEvaluationState({
          status: 'success',
          enteredFormula: formulaInput,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });

        // If level complete, automatically trigger certificate celebration
        if (isNewlyCompletedLevel) {
          setTimeout(() => {
            setCertificateModalLevel(currentLesson.level);
          }, 800);
        }
      } else {
        setEvaluationState({
          status: 'error',
          feedback: feedbackMessage || `Nilai kalkulasi sel menghasilkan "${evalResult.displayValue}", namun hasil yang diharapkan berbeda. Periksa kembali referensi sel atau operator Anda.`,
          enteredFormula: formulaInput,
        });
      }

      setIsEvaluating(false);
    }, 150);
  };

  // Lesson navigation
  const currentIndexInLevel = currentLevelLessons.findIndex((l) => l.id === currentLesson.id);
  const hasPrevLesson = currentIndexInLevel > 0;
  const hasNextLesson = currentIndexInLevel < currentLevelLessons.length - 1;

  const handleNextLesson = () => {
    if (hasNextLesson) {
      setCurrentLessonId(currentLevelLessons[currentIndexInLevel + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (hasPrevLesson) {
      setCurrentLessonId(currentLevelLessons[currentIndexInLevel - 1].id);
    }
  };

  const handleLevelSelect = (lvl: LevelId) => {
    setCurrentLevel(lvl);
    const firstLessonInLevel = LESSONS_DATA.find((l) => l.level === lvl);
    if (firstLessonInLevel) {
      setCurrentLessonId(firstLessonInLevel.id);
    }
  };

  const handleToggleBookmark = (shortcutId: string) => {
    const currentList = progress.bookmarkedShortcuts || [];
    let updatedList: string[];
    if (currentList.includes(shortcutId)) {
      updatedList = currentList.filter((id) => id !== shortcutId);
    } else {
      updatedList = [...currentList, shortcutId];
    }
    const updated = { ...progress, bookmarkedShortcuts: updatedList };
    setProgress(updated);
    StorageManager.saveProgress(updated);
  };

  const isLevelCompleted = currentLevelLessons.every((l) =>
    progress.completedLessons.includes(l.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={progress.language}
        onLanguageChange={(lang) => {
          const updated = { ...progress, language: lang };
          setProgress(updated);
          StorageManager.saveProgress(updated);
        }}
        theme={progress.theme}
        onThemeToggle={() => {
          const nextTheme: Theme = progress.theme === 'light' ? 'dark' : 'light';
          const updated: UserProgress = { ...progress, theme: nextTheme };
          setProgress(updated);
          StorageManager.saveProgress(updated);
        }}
        completedLessonsCount={progress.completedLessons.length}
        totalLessonsCount={LESSONS_DATA.length}
        completedLevelsCount={progress.completedLevels.length}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        {activeTab === 'practice' ? (
          <div>
            {/* Level Selector Tabs Strip */}
            <LevelSelector
              currentLevel={currentLevel}
              onLevelSelect={handleLevelSelect}
              lessons={LESSONS_DATA}
              currentLessonId={currentLesson.id}
              onLessonSelect={(id) => setCurrentLessonId(id)}
              completedLessons={progress.completedLessons}
              completedLevels={progress.completedLevels}
              onOpenCertificate={(lvl) => setCertificateModalLevel(lvl)}
              language={progress.language}
            />

            {/* Split Screen Workspace: Lesson Panel & Spreadsheet Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Lesson Instructions, Theory, Task (5 cols) */}
              <div className="lg:col-span-5 min-h-[500px]">
                <LessonPanel
                  lesson={currentLesson}
                  totalLessonsInLevel={currentLevelLessons.length}
                  language={progress.language}
                  onNextLesson={handleNextLesson}
                  onPrevLesson={handlePrevLesson}
                  hasPrevLesson={hasPrevLesson}
                  hasNextLesson={hasNextLesson}
                  evaluationState={evaluationState}
                  onClaimCertificate={() => setCertificateModalLevel(currentLevel)}
                  isLevelCompleted={isLevelCompleted}
                />
              </div>

              {/* Right Column: Spreadsheet Grid & Formula Bar (7 cols) */}
              <div className="lg:col-span-7 min-h-[500px]">
                <SpreadsheetGrid
                  gridConfig={currentLesson.initialGrid}
                  gridData={gridData}
                  activeCell={activeCell}
                  onCellSelect={handleCellSelect}
                  targetCell={currentLesson.targetCell}
                  formulaInput={formulaInput}
                  onFormulaChange={setFormulaInput}
                  onFormulaSubmit={handleFormulaSubmit}
                  isEvaluating={isEvaluating}
                  language={progress.language}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Shortcut Master Directory Tab */
          <ShortcutDirectory
            language={progress.language}
            bookmarkedShortcuts={progress.bookmarkedShortcuts || []}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </main>

      {/* Official Certificate Modal */}
      {certificateModalLevel && (
        <CertificateModal
          levelId={certificateModalLevel}
          userName={progress.userName}
          onUpdateUserName={(name) => {
            const updated = StorageManager.updateUserName(name);
            setProgress(updated);
          }}
          onClose={() => setCertificateModalLevel(null)}
          language={progress.language}
        />
      )}

      {/* Backup & Privacy Modal */}
      {isBackupModalOpen && (
        <BackupModal
          language={progress.language}
          onClose={() => setIsBackupModalOpen(false)}
          onProgressUpdated={(newProgress) => {
            setProgress(newProgress);
            initializeGridForLesson(currentLesson);
          }}
        />
      )}

      {/* Application Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200">latihdirixls</span>
            <span>{t.footer.copyright}</span>
          </p>
          <p className="text-slate-400 dark:text-slate-500">
            {t.footer.privacyNote}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
