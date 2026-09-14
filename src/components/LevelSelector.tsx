import React from 'react';
import { LevelId, Lesson, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Award, CheckCircle2, Circle } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: LevelId;
  onLevelSelect: (lvl: LevelId) => void;
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  completedLessons: string[];
  completedLevels: LevelId[];
  onOpenCertificate: (lvl: LevelId) => void;
  language: Language;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  onLevelSelect,
  lessons,
  currentLessonId,
  onLessonSelect,
  completedLessons,
  completedLevels,
  onOpenCertificate,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const levels: Array<{ id: LevelId; label: string; sub: string }> = [
    { id: 'basic', label: t.levels.basic, sub: 'Level 1: Basic' },
    { id: 'intermediate', label: t.levels.intermediate, sub: 'Level 2: Intermediate' },
    { id: 'advanced', label: t.levels.advanced, sub: 'Level 3: Advanced' },
    { id: 'pro', label: t.levels.pro, sub: 'Level 4: Pro Master' },
  ];

  const filteredLessons = lessons.filter((l) => l.level === currentLevel);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-3 sm:p-4 mb-4">
      {/* 4 Levels Tab Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {levels.map((lvl) => {
          const isSelected = currentLevel === lvl.id;
          const levelLessons = lessons.filter((l) => l.level === lvl.id);
          const doneCount = levelLessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;
          const isFinished = completedLevels.includes(lvl.id) || doneCount === levelLessons.length;

          return (
            <div
              key={lvl.id}
              className={`flex flex-col justify-between p-3 rounded-lg border transition-all cursor-pointer min-h-[72px] ${
                isSelected
                  ? 'border-excel-green bg-green-50/50 dark:bg-green-950/30 ring-1 ring-excel-green dark:ring-green-400'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40'
              }`}
              onClick={() => onLevelSelect(lvl.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-xs sm:text-sm font-bold ${
                    isSelected ? 'text-excel-green dark:text-green-400' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {lvl.label}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {lvl.sub}
                  </span>
                </div>

                {isFinished && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCertificate(lvl.id);
                    }}
                    className="p-1 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 transition-colors"
                    title={t.certificate.modalTitle}
                    aria-label={`Buka sertifikat ${lvl.label}`}
                  >
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Progress Bar for Level */}
              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>Progres</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {doneCount}/{levelLessons.length}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-excel-green rounded-full transition-all duration-300"
                    style={{ width: `${(doneCount / levelLessons.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Navigator Strip for Active Level */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 mr-2">
            Pilih Materi:
          </span>
          {filteredLessons.map((l) => {
            const isCompleted = completedLessons.includes(l.id);
            const isActive = l.id === currentLessonId;

            return (
              <button
                key={l.id}
                onClick={() => onLessonSelect(l.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0 min-h-[36px] ${
                  isActive
                    ? 'bg-excel-green text-white shadow-sm font-semibold'
                    : isCompleted
                    ? 'bg-green-100/70 dark:bg-green-900/40 text-green-900 dark:text-green-200 hover:bg-green-200/70'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-excel-green'}`} aria-hidden="true" />
                ) : (
                  <Circle className="w-3.5 h-3.5 opacity-40" aria-hidden="true" />
                )}
                <span>
                  {l.order}. {l.title[language]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
