import { UserProgress, LevelId } from '../types';

const STORAGE_KEY = 'latihdirixls_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  version: 1,
  userName: '',
  completedLessons: [],
  lessonAnswers: {},
  completedLevels: [],
  language: 'id',
  theme: 'light',
  bookmarkedShortcuts: [],
  lastActiveLessonId: 'basic-1',
  lastUpdated: new Date().toISOString(),
};

export class StorageManager {
  public static getProgress(): UserProgress {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_PROGRESS };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
      };
    } catch {
      return { ...DEFAULT_PROGRESS };
    }
  }

  public static saveProgress(progress: UserProgress): void {
    try {
      const updated = {
        ...progress,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }

  public static updateUserName(name: string): UserProgress {
    const current = this.getProgress();
    current.userName = name;
    this.saveProgress(current);
    return current;
  }

  public static markLessonComplete(
    lessonId: string,
    formula: string,
    levelId: LevelId,
    allLessonsInLevel: string[]
  ): { isLevelCompleted: boolean; isNewlyCompletedLevel: boolean; progress: UserProgress } {
    const current = this.getProgress();

    if (!current.completedLessons.includes(lessonId)) {
      current.completedLessons.push(lessonId);
    }
    current.lessonAnswers[lessonId] = formula;

    // Check if entire level is now complete
    const isLevelDone = allLessonsInLevel.every((id) =>
      current.completedLessons.includes(id)
    );

    let isNewlyCompletedLevel = false;
    if (isLevelDone && !current.completedLevels.includes(levelId)) {
      current.completedLevels.push(levelId);
      isNewlyCompletedLevel = true;
    }

    this.saveProgress(current);

    return {
      isLevelCompleted: isLevelDone,
      isNewlyCompletedLevel,
      progress: current,
    };
  }

  public static generateCertificateSerial(
    userName: string,
    levelId: string,
    dateStr: string
  ): string {
    const seed = `${userName}-${levelId}-${dateStr}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    const levelCode = levelId.substring(0, 3).toUpperCase();
    return `LDX-${levelCode}-${hex.substring(0, 4)}-${hex.substring(4, 8)}`;
  }

  public static exportProgressJson(): string {
    const current = this.getProgress();
    return JSON.stringify(current, null, 2);
  }

  public static importProgressJson(jsonStr: string): {
    success: boolean;
    progress?: UserProgress;
    error?: string;
  } {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Format data bukan objek JSON valid' };
      }
      if (!Array.isArray(parsed.completedLessons)) {
        return { success: false, error: 'Data latihan tidak sesuai spesifikasi' };
      }

      const merged: UserProgress = {
        ...DEFAULT_PROGRESS,
        ...parsed,
        version: 1,
        lastUpdated: new Date().toISOString(),
      };

      this.saveProgress(merged);
      return { success: true, progress: merged };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Gagal memproses file' };
    }
  }

  public static resetProgress(): UserProgress {
    const fresh = {
      ...DEFAULT_PROGRESS,
      lastUpdated: new Date().toISOString(),
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignored
    }
    return fresh;
  }
}
