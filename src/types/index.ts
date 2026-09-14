export type Language = 'id' | 'en';
export type Theme = 'light' | 'dark';

export type LevelId = 'basic' | 'intermediate' | 'advanced' | 'pro';

export type CellFormat = 'text' | 'number' | 'currency' | 'percent' | 'date';

export interface GridCellData {
  value: string | number | boolean | null;
  displayValue?: string;
  formula?: string;
  format?: CellFormat;
  isTarget?: boolean;
  isReadOnly?: boolean;
  isHeader?: boolean;
}

export interface InitialGridConfig {
  columns: string[];
  rowCount: number;
  cells: Record<string, { value: string | number | boolean | null; format?: CellFormat; isReadOnly?: boolean }>;
}

export interface LessonHint {
  level: 1 | 2 | 3;
  text: {
    id: string;
    en: string;
  };
}

export interface Lesson {
  id: string;
  level: LevelId;
  order: number;
  title: {
    id: string;
    en: string;
  };
  category: {
    id: string;
    en: string;
  };
  concept: {
    id: string;
    en: string;
  };
  syntax: {
    id: string;
    en: string;
  };
  formulaExample: string;
  localizationNote?: {
    id: string;
    en: string;
  };
  scenario: {
    id: string;
    en: string;
  };
  taskInstruction: {
    id: string;
    en: string;
  };
  targetCell: string;
  expectedResult: number | string | boolean | string[];
  validate?: (formula: string, calculatedValue: any, gridData: Record<string, any>) => { valid: boolean; feedbackId?: string; feedbackEn?: string };
  expectedFormulaSample: string;
  initialGrid: InitialGridConfig;
  hints: LessonHint[];
}

export type ShortcutCategory = 'navigation' | 'formatting' | 'formulas' | 'selection' | 'editing' | 'general';

export interface ShortcutItem {
  id: string;
  category: ShortcutCategory;
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  keysWindows: string[];
  keysMac: string[];
  importance: 'essential' | 'advanced';
  exampleUsage: {
    id: string;
    en: string;
  };
}

export interface CertificateRecord {
  levelId: LevelId;
  levelTitle: {
    id: string;
    en: string;
  };
  recipientName: string;
  completedDate: string;
  serialNumber: string;
  competencies: Array<{
    id: string;
    en: string;
  }>;
}

export interface UserProgress {
  version: number;
  userName: string;
  completedLessons: string[];
  lessonAnswers: Record<string, string>;
  completedLevels: LevelId[];
  language: Language;
  theme: Theme;
  bookmarkedShortcuts: string[];
  lastActiveLessonId: string;
  lastUpdated: string;
}
