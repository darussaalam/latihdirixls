import React, { useRef, useEffect } from 'react';
import { InitialGridConfig, CellFormat } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SpreadsheetGridProps {
  gridConfig: InitialGridConfig;
  gridData: Record<string, any>;
  activeCell: string;
  onCellSelect: (cellAddress: string) => void;
  targetCell: string;
  formulaInput: string;
  onFormulaChange: (val: string) => void;
  onFormulaSubmit: () => void;
  isEvaluating: boolean;
  language: 'id' | 'en';
}

export const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({
  gridConfig,
  gridData,
  activeCell,
  onCellSelect,
  targetCell,
  formulaInput,
  onFormulaChange,
  onFormulaSubmit,
  isEvaluating,
  language,
}) => {
  const formulaInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  // Focus formula input when target cell is clicked or active
  useEffect(() => {
    if (activeCell === targetCell && formulaInputRef.current) {
      formulaInputRef.current.focus();
    }
  }, [activeCell, targetCell]);

  const activeCol = activeCell.replace(/[0-9]/g, '');
  const activeRow = parseInt(activeCell.replace(/[A-Z]/g, '') || '0', 10);

  // Format cell value for presentation
  const formatCellValue = (val: any, format?: CellFormat): string => {
    if (val === null || val === undefined || val === '') return '';
    if (typeof val === 'number') {
      if (format === 'currency') {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(val);
      }
      if (format === 'percent') {
        return `${Math.round(val * 100)}%`;
      }
      return new Intl.NumberFormat('id-ID').format(val);
    }
    if (typeof val === 'boolean') {
      return val ? 'TRUE' : 'FALSE';
    }
    if (Array.isArray(val)) {
      return val.join(', ');
    }
    return String(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onFormulaSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Formula Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        {/* Active Cell Address Indicator */}
        <div className="flex items-center justify-center px-2.5 py-1 text-xs font-mono font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded min-w-[50px] shadow-inner text-center">
          {activeCell || 'A1'}
        </div>

        {/* Function Icon */}
        <span className="text-sm font-serif italic font-bold text-slate-500 dark:text-slate-400 select-none px-1">
          {t.grid.formulaLabel}
        </span>

        {/* Formula Input Field */}
        <div className="flex-1 relative">
          <input
            ref={formulaInputRef}
            type="text"
            value={formulaInput}
            onChange={(e) => onFormulaChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              activeCell === targetCell
                ? t.grid.formulaBarPlaceholder
                : `Nilai pada ${activeCell}`
            }
            className="w-full px-3 py-1.5 text-sm font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded focus:border-excel-green dark:focus:border-green-400 transition-colors"
            aria-label="Formula Bar"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Quick Submit Button */}
        <button
          onClick={onFormulaSubmit}
          disabled={isEvaluating || !formulaInput.trim()}
          className="px-3 py-1.5 text-xs font-semibold rounded bg-excel-green hover:bg-excel-dark text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[36px]"
        >
          {isEvaluating ? t.lesson.checking : t.lesson.checkFormula}
        </button>
      </div>

      {/* Target Cell Prompt Banner */}
      <div className="px-3 py-1.5 bg-green-50 dark:bg-green-950/40 border-b border-green-200 dark:border-green-900/60 flex items-center justify-between text-xs">
        <span className="text-green-800 dark:text-green-300 font-medium">
          {t.grid.targetInstruction}
        </span>
        <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100">
          Target: {targetCell}
        </span>
      </div>

      {/* Spreadsheet Grid Container */}
      <div className="flex-1 overflow-auto max-h-[600px] select-none">
        <table className="border-collapse w-full min-w-[500px] text-xs font-tabular">
          {/* Header Row (Column Letters: A, B, C...) */}
          <thead className="sticky top-0 z-20">
            <tr>
              <th className="w-12 h-7 bg-slate-200 dark:bg-slate-800 border-r border-b border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-normal">
                #
              </th>
              {gridConfig.columns.map((col) => {
                const isColActive = col === activeCol;
                return (
                  <th
                    key={col}
                    className={`h-7 px-3 border-r border-b border-slate-300 dark:border-slate-700 text-xs font-semibold text-center min-w-[120px] transition-colors ${
                      isColActive
                        ? 'bg-excel-green text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body (Rows 1..N) */}
          <tbody>
            {Array.from({ length: gridConfig.rowCount }).map((_, rIdx) => {
              const rowNum = rIdx + 1;
              const isRowActive = rowNum === activeRow;

              return (
                <tr key={rowNum} className="h-8">
                  {/* Row Number Header */}
                  <td
                    className={`text-center font-semibold text-xs border-r border-b border-slate-300 dark:border-slate-700 select-none transition-colors ${
                      isRowActive
                        ? 'bg-excel-green text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {rowNum}
                  </td>

                  {/* Columns */}
                  {gridConfig.columns.map((col) => {
                    const addr = `${col}${rowNum}`;
                    const configCell = gridConfig.cells[addr];
                    const currentVal = gridData[addr] !== undefined ? gridData[addr] : configCell?.value;
                    const isTarget = addr === targetCell;
                    const isSelected = addr === activeCell;
                    const isReadOnly = configCell?.isReadOnly ?? false;
                    const format = configCell?.format;

                    const formattedDisplay = formatCellValue(currentVal, format);

                    return (
                      <td
                        key={addr}
                        onClick={() => onCellSelect(addr)}
                        className={`px-2.5 py-1 border-r border-b border-slate-200 dark:border-slate-800 cursor-cell text-slate-900 dark:text-slate-100 transition-all ${
                          isReadOnly ? 'bg-slate-50/70 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-900'
                        } ${
                          isSelected
                            ? 'ring-2 ring-excel-green dark:ring-green-400 z-10 font-medium'
                            : ''
                        } ${
                          isTarget && !isSelected
                            ? 'bg-green-50/80 dark:bg-green-950/40 border-2 border-dashed border-excel-green font-semibold'
                            : ''
                        } ${
                          typeof currentVal === 'number' ? 'text-right' : 'text-left'
                        }`}
                        title={`Sel ${addr}${isTarget ? ' (Target Rumus)' : ''}`}
                      >
                        <div className="truncate">
                          {formattedDisplay}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
