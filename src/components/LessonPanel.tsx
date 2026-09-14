import React, { useState } from 'react';
import { Lesson, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  BookOpen,
  Code,
  Briefcase,
  Target,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
} from 'lucide-react';

interface LessonPanelProps {
  lesson: Lesson;
  totalLessonsInLevel: number;
  language: Language;
  onNextLesson: () => void;
  onPrevLesson: () => void;
  hasPrevLesson: boolean;
  hasNextLesson: boolean;
  evaluationState: {
    status: 'idle' | 'success' | 'error';
    feedback?: string;
    enteredFormula?: string;
  };
  onClaimCertificate?: () => void;
  isLevelCompleted: boolean;
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  lesson,
  totalLessonsInLevel,
  language,
  onNextLesson,
  onPrevLesson,
  hasPrevLesson,
  hasNextLesson,
  evaluationState,
  onClaimCertificate,
  isLevelCompleted,
}) => {
  const [revealedHintLevel, setRevealedHintLevel] = useState<number>(0);
  const t = TRANSLATIONS[language];

  // Reset revealed hints when lesson changes
  React.useEffect(() => {
    setRevealedHintLevel(0);
  }, [lesson.id]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 overflow-y-auto">
      {/* Lesson Meta Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-excel-50 dark:bg-excel-900/40 text-excel-green dark:text-green-400 border border-excel-200 dark:border-excel-800">
            {lesson.category[language]}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {t.lesson.lessonPrefix} {lesson.order} {t.lesson.of} {totalLessonsInLevel}
          </span>
        </div>

        {/* Certificate shortcut if level completed */}
        {isLevelCompleted && onClaimCertificate && (
          <button
            onClick={onClaimCertificate}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 transition-colors"
          >
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.certificate.modalTitle}</span>
          </button>
        )}
      </div>

      {/* Lesson Title */}
      <h2 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
        {lesson.title[language]}
      </h2>

      {/* Section 1: Concept Explanation */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          <BookOpen className="w-4 h-4 text-excel-green" aria-hidden="true" />
          <span>{t.lesson.conceptTitle}</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {lesson.concept[language]}
        </p>
      </div>

      {/* Section 2: Syntax & Formula Example */}
      <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Code className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>{t.lesson.syntaxTitle}</span>
          </div>
          <span className="text-xs font-mono text-excel-green dark:text-green-400 font-semibold">
            {lesson.formulaExample}
          </span>
        </div>
        <div className="text-xs font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 select-all">
          {lesson.syntax[language]}
        </div>
      </div>

      {/* Section 3: Real Business Scenario */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <span>{t.lesson.scenarioTitle}</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50/60 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200/80 dark:border-amber-900/40">
          {lesson.scenario[language]}
        </p>
      </div>

      {/* Section 4: Practice Task */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
          <Target className="w-4 h-4 text-excel-green" aria-hidden="true" />
          <span>{t.lesson.taskTitle}</span>
        </div>
        <div className="p-3.5 rounded-lg bg-green-50/70 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-900 dark:text-green-200">
            {lesson.taskInstruction[language]}
          </p>
          <p className="mt-1 text-xs text-green-700 dark:text-green-300">
            {t.lesson.targetCellNotice}{' '}
            <strong className="font-mono underline">{lesson.targetCell}</strong>.
          </p>
        </div>
      </div>

      {/* Evaluation Feedback Message */}
      {evaluationState.status === 'success' && (
        <div className="mt-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 flex items-start gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
              {t.lesson.correctTitle}
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
              Rumus Anda:{' '}
              <span className="font-mono font-semibold">
                {evaluationState.enteredFormula}
              </span>
            </p>
            {hasNextLesson ? (
              <button
                onClick={onNextLesson}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              >
                <span>{t.lesson.nextLesson}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : (
              <div className="mt-3">
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100">
                  {t.lesson.congratulationsLevel}
                </p>
                {onClaimCertificate && (
                  <button
                    onClick={onClaimCertificate}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-colors"
                  >
                    <Award className="w-4 h-4" aria-hidden="true" />
                    <span>{t.lesson.claimCertificate}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {evaluationState.status === 'error' && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-red-900 dark:text-red-200">
              {t.lesson.incorrectTitle}
            </h3>
            <p className="text-xs text-red-800 dark:text-red-300 mt-1">
              {evaluationState.feedback || 'Periksa kembali penulisan nama fungsi, kurung tutup, dan alamat sel target.'}
            </p>
          </div>
        </div>
      )}

      {/* Progressive Hint Drawer (Tier 1, 2, 3) */}
      <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span>Sistem Bantuan & Petunjuk</span>
          </span>
          {revealedHintLevel < lesson.hints.length && (
            <button
              onClick={() => setRevealedHintLevel((prev) => prev + 1)}
              className="text-xs font-medium text-excel-green dark:text-green-400 hover:underline min-h-[36px] flex items-center"
            >
              {t.lesson.hintButton} ({revealedHintLevel + 1}/{lesson.hints.length})
            </button>
          )}
        </div>

        {revealedHintLevel > 0 && (
          <div className="mt-2.5 space-y-2">
            {lesson.hints.slice(0, revealedHintLevel).map((hint, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
              >
                <strong className="text-slate-900 dark:text-slate-100">
                  {t.lesson.hintLevel} {hint.level}:
                </strong>{' '}
                {hint.text[language]}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={onPrevLesson}
          disabled={!hasPrevLesson}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t.lesson.previousLesson}</span>
        </button>

        <button
          onClick={onNextLesson}
          disabled={!hasNextLesson}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px]"
        >
          <span>{t.lesson.nextLesson}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
