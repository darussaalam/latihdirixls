export interface EvaluationResult {
  success: boolean;
  value: any;
  displayValue: string;
  error?: string;
  ast?: any;
}

export class FormulaEvaluator {
  /**
   * Evaluates an Excel formula string against a 2D grid dataset.
   * Tolerates both comma (,) and semicolon (;) as argument separators.
   */
  public static evaluate(
    formula: string,
    gridData: Record<string, any>
  ): EvaluationResult {
    const trimmed = formula.trim();

    if (!trimmed.startsWith('=')) {
      return {
        success: true,
        value: trimmed,
        displayValue: trimmed,
      };
    }

    const expression = trimmed.substring(1).trim();

    try {
      const parsedValue = this.evalExpression(expression, gridData);
      return {
        success: true,
        value: parsedValue,
        displayValue: this.formatDisplayValue(parsedValue),
      };
    } catch (err: any) {
      return {
        success: false,
        value: '#ERROR!',
        displayValue: '#ERROR!',
        error: err?.message || 'Rumus tidak valid / Formula syntax error',
      };
    }
  }

  /**
   * Formats raw evaluated values to spreadsheet-standard display strings.
   */
  public static formatDisplayValue(val: any): string {
    if (val === null || val === undefined) return '';
    if (typeof val === 'number') {
      if (Number.isInteger(val)) return val.toString();
      return Number(val.toFixed(2)).toString();
    }
    if (typeof val === 'boolean') {
      return val ? 'TRUE' : 'FALSE';
    }
    if (Array.isArray(val)) {
      return val.map((v) => this.formatDisplayValue(v)).join(', ');
    }
    return String(val);
  }

  /**
   * Normalizes argument separators: changes semicolons to commas outside quotes.
   */
  public static normalizeSeparators(str: string): string {
    let result = '';
    let inQuotes = false;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '"') {
        inQuotes = !inQuotes;
        result += char;
      } else if (char === ';' && !inQuotes) {
        result += ',';
      } else {
        result += char;
      }
    }
    return result;
  }

  /**
   * Evaluates mathematical expressions and nested function calls.
   */
  private static evalExpression(expr: string, gridData: Record<string, any>): any {
    let cleaned = expr.trim();
    if (!cleaned) return '';

    // Handle string literal
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      return cleaned.slice(1, -1);
    }

    // Handle number literal
    if (!isNaN(Number(cleaned)) && !cleaned.includes(' ') && cleaned !== '') {
      return Number(cleaned);
    }

    // Handle boolean literals
    if (cleaned.toUpperCase() === 'TRUE') return true;
    if (cleaned.toUpperCase() === 'FALSE') return false;

    // Check for top-level function call: NAME(...)
    const funcMatch = cleaned.match(/^([A-Z0-9_\.]+)\s*\((.*)\)$/i);
    if (funcMatch) {
      // Check if parentheses are balanced across the whole string
      const fullArgs = funcMatch[2];
      if (this.isBalanced(fullArgs)) {
        const funcName = funcMatch[1].toUpperCase();
        const rawArgs = this.splitArguments(fullArgs);
        return this.executeFunction(funcName, rawArgs, gridData);
      }
    }

    // Check for logical operators outside quotes and parentheses: =, <>, <=, >=, <, >
    const comparisonOp = this.findTopLevelOperator(cleaned, ['<=', '>=', '<>', '=', '<', '>']);
    if (comparisonOp) {
      const leftVal = this.evalExpression(comparisonOp.left, gridData);
      const rightVal = this.evalExpression(comparisonOp.right, gridData);
      switch (comparisonOp.operator) {
        case '=':
          return this.areEqual(leftVal, rightVal);
        case '<>':
          return !this.areEqual(leftVal, rightVal);
        case '<':
          return Number(leftVal) < Number(rightVal);
        case '>':
          return Number(leftVal) > Number(rightVal);
        case '<=':
          return Number(leftVal) <= Number(rightVal);
        case '>=':
          return Number(leftVal) >= Number(rightVal);
      }
    }

    // Check for concatenation operator &
    const concatOp = this.findTopLevelOperator(cleaned, ['&']);
    if (concatOp) {
      const leftVal = this.evalExpression(concatOp.left, gridData);
      const rightVal = this.evalExpression(concatOp.right, gridData);
      return String(leftVal ?? '') + String(rightVal ?? '');
    }

    // Check for addition and subtraction: +, -
    const addSubOp = this.findTopLevelOperator(cleaned, ['+', '-']);
    if (addSubOp) {
      const leftVal = Number(this.evalExpression(addSubOp.left, gridData));
      const rightVal = Number(this.evalExpression(addSubOp.right, gridData));
      return addSubOp.operator === '+' ? leftVal + rightVal : leftVal - rightVal;
    }

    // Check for multiplication and division: *, /
    const mulDivOp = this.findTopLevelOperator(cleaned, ['*', '/']);
    if (mulDivOp) {
      const leftVal = Number(this.evalExpression(mulDivOp.left, gridData));
      const rightVal = Number(this.evalExpression(mulDivOp.right, gridData));
      if (mulDivOp.operator === '/') {
        if (rightVal === 0) throw new Error('#DIV/0!');
        return leftVal / rightVal;
      }
      return leftVal * rightVal;
    }

    // Check for exponentiation: ^
    const expOp = this.findTopLevelOperator(cleaned, ['^']);
    if (expOp) {
      const leftVal = Number(this.evalExpression(expOp.left, gridData));
      const rightVal = Number(this.evalExpression(expOp.right, gridData));
      return Math.pow(leftVal, rightVal);
    }

    // Check for enclosed parentheses (expr)
    if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
      const inside = cleaned.slice(1, -1);
      if (this.isBalanced(inside)) {
        return this.evalExpression(inside, gridData);
      }
    }

    // Check for single cell reference: e.g. A1, $A$1, B12
    const cellMatch = cleaned.match(/^\$?([A-Z]+)\$?([0-9]+)$/i);
    if (cellMatch) {
      const col = cellMatch[1].toUpperCase();
      const row = cellMatch[2];
      const addr = `${col}${row}`;
      const cell = gridData[addr];
      if (cell === undefined || cell === null) return 0;
      if (typeof cell === 'object' && 'value' in cell) {
        return cell.value;
      }
      return cell;
    }

    // Check for cell range: e.g. A1:B5
    if (cleaned.includes(':')) {
      return this.resolveRange(cleaned, gridData);
    }

    return cleaned;
  }

  /**
   * Equality check compatible with Excel semantics (case-insensitive strings, loose numbers).
   */
  private static areEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a === 'string' && typeof b === 'string') {
      return a.trim().toLowerCase() === b.trim().toLowerCase();
    }
    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
      return Number(a) === Number(b);
    }
    return String(a).toLowerCase() === String(b).toLowerCase();
  }

  /**
   * Checks if brackets and quotes are balanced.
   */
  private static isBalanced(str: string): boolean {
    let depth = 0;
    let inQuotes = false;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (!inQuotes) {
        if (c === '(') depth++;
        else if (c === ')') {
          depth--;
          if (depth < 0) return false;
        }
      }
    }
    return depth === 0 && !inQuotes;
  }

  /**
   * Finds operators located strictly at the top level (outside parentheses and quotes).
   */
  private static findTopLevelOperator(
    str: string,
    operators: string[]
  ): { operator: string; left: string; right: string } | null {
    let depth = 0;
    let inQuotes = false;

    // Scan from right to left for left-associative operations (addition, subtraction, etc.)
    for (let i = str.length - 1; i >= 0; i--) {
      const c = str[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (!inQuotes) {
        if (c === ')') depth++;
        else if (c === '(') depth--;
        else if (depth === 0) {
          for (const op of operators) {
            const opLen = op.length;
            if (i >= opLen - 1 && str.substring(i - opLen + 1, i + 1) === op) {
              const left = str.substring(0, i - opLen + 1).trim();
              const right = str.substring(i + 1).trim();
              if (left.length > 0 && right.length > 0) {
                return { operator: op, left, right };
              }
            }
          }
        }
      }
    }
    return null;
  }

  /**
   * Splits comma or semicolon separated function arguments outside nested parentheses and strings.
   */
  public static splitArguments(argsStr: string): string[] {
    const args: string[] = [];
    let current = '';
    let depth = 0;
    let inQuotes = false;

    for (let i = 0; i < argsStr.length; i++) {
      const c = argsStr[i];
      if (c === '"') {
        inQuotes = !inQuotes;
        current += c;
      } else if (!inQuotes && (c === ',' || c === ';') && depth === 0) {
        args.push(current.trim());
        current = '';
      } else {
        if (!inQuotes) {
          if (c === '(') depth++;
          else if (c === ')') depth--;
        }
        current += c;
      }
    }

    if (current.trim().length > 0) {
      args.push(current.trim());
    }

    return args;
  }

  /**
   * Expands an Excel range like "A1:B3" into an array of cell values.
   */
  public static resolveRange(rangeStr: string, gridData: Record<string, any>): any[] {
    const cleaned = rangeStr.replace(/\$/g, '').trim();
    const parts = cleaned.split(':');
    if (parts.length !== 2) return [];

    const startMatch = parts[0].match(/^([A-Z]+)([0-9]+)$/i);
    const endMatch = parts[1].match(/^([A-Z]+)([0-9]+)$/i);

    if (!startMatch || !endMatch) return [];

    const startCol = this.colNameToIndex(startMatch[1].toUpperCase());
    const startRow = parseInt(startMatch[2], 10);
    const endCol = this.colNameToIndex(endMatch[1].toUpperCase());
    const endRow = parseInt(endMatch[2], 10);

    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);

    const values: any[] = [];
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const addr = `${this.colIndexToName(c)}${r}`;
        const cell = gridData[addr];
        let val = 0;
        if (cell !== undefined && cell !== null) {
          val = typeof cell === 'object' && 'value' in cell ? cell.value : cell;
        }
        values.push(val);
      }
    }
    return values;
  }

  /**
   * Helper to retrieve flattened values from an argument (resolving single cells or ranges).
   */
  private static getValuesList(arg: string, gridData: Record<string, any>): any[] {
    if (arg.includes(':')) {
      return this.resolveRange(arg, gridData);
    }
    const val = this.evalExpression(arg, gridData);
    if (Array.isArray(val)) return val;
    return [val];
  }

  /**
   * Main function router for standard Excel library.
   */
  private static executeFunction(
    name: string,
    args: string[],
    gridData: Record<string, any>
  ): any {
    switch (name) {
      // 1. Math & Aggregation
      case 'SUM': {
        let total = 0;
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            const num = Number(v);
            if (!isNaN(num)) total += num;
          }
        }
        return total;
      }

      case 'AVERAGE': {
        let total = 0;
        let count = 0;
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            const num = Number(v);
            if (!isNaN(num) && v !== null && v !== '') {
              total += num;
              count++;
            }
          }
        }
        if (count === 0) throw new Error('#DIV/0!');
        return total / count;
      }

      case 'MIN': {
        let minVal: number | null = null;
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            const num = Number(v);
            if (!isNaN(num) && v !== null && v !== '') {
              if (minVal === null || num < minVal) minVal = num;
            }
          }
        }
        return minVal ?? 0;
      }

      case 'MAX': {
        let maxVal: number | null = null;
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            const num = Number(v);
            if (!isNaN(num) && v !== null && v !== '') {
              if (maxVal === null || num > maxVal) maxVal = num;
            }
          }
        }
        return maxVal ?? 0;
      }

      case 'COUNT': {
        let count = 0;
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            if (v !== null && v !== '' && typeof v !== 'boolean' && !isNaN(Number(v))) {
              count++;
            }
          }
        }
        return count;
      }

      case 'COUNTA': {
        let count = 0;
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            if (v !== null && v !== '' && v !== undefined) {
              count++;
            }
          }
        }
        return count;
      }

      case 'ROUND': {
        if (args.length < 1) throw new Error('ROUND requires at least 1 argument');
        const num = Number(this.evalExpression(args[0], gridData));
        const digits = args.length > 1 ? Number(this.evalExpression(args[1], gridData)) : 0;
        const factor = Math.pow(10, digits);
        return Math.round(num * factor) / factor;
      }

      // 2. Conditionals & Logic
      case 'IF': {
        if (args.length < 2) throw new Error('IF requires at least 2 arguments');
        const condition = Boolean(this.evalExpression(args[0], gridData));
        if (condition) {
          return this.evalExpression(args[1], gridData);
        }
        if (args.length > 2) {
          return this.evalExpression(args[2], gridData);
        }
        return false;
      }

      case 'AND': {
        for (const arg of args) {
          const val = this.evalExpression(arg, gridData);
          if (!Boolean(val)) return false;
        }
        return true;
      }

      case 'OR': {
        for (const arg of args) {
          const val = this.evalExpression(arg, gridData);
          if (Boolean(val)) return true;
        }
        return false;
      }

      case 'NOT': {
        const val = this.evalExpression(args[0], gridData);
        return !Boolean(val);
      }

      case 'IFERROR': {
        if (args.length < 2) throw new Error('IFERROR requires 2 arguments');
        try {
          return this.evalExpression(args[0], gridData);
        } catch {
          return this.evalExpression(args[1], gridData);
        }
      }

      // 3. Conditional Aggregation
      case 'SUMIF': {
        if (args.length < 2) throw new Error('SUMIF requires at least 2 arguments');
        const rangeVals = this.resolveRange(args[0], gridData);
        const criterion = this.evalExpression(args[1], gridData);
        const sumRangeVals = args.length >= 3 ? this.resolveRange(args[2], gridData) : rangeVals;

        let sum = 0;
        for (let i = 0; i < rangeVals.length; i++) {
          if (this.matchesCriterion(rangeVals[i], criterion)) {
            const valToSum = Number(sumRangeVals[i]);
            if (!isNaN(valToSum)) sum += valToSum;
          }
        }
        return sum;
      }

      case 'COUNTIF': {
        if (args.length < 2) throw new Error('COUNTIF requires 2 arguments');
        const rangeVals = this.resolveRange(args[0], gridData);
        const criterion = this.evalExpression(args[1], gridData);

        let count = 0;
        for (const v of rangeVals) {
          if (this.matchesCriterion(v, criterion)) count++;
        }
        return count;
      }

      case 'AVERAGEIF': {
        if (args.length < 2) throw new Error('AVERAGEIF requires at least 2 arguments');
        const rangeVals = this.resolveRange(args[0], gridData);
        const criterion = this.evalExpression(args[1], gridData);
        const avgRangeVals = args.length >= 3 ? this.resolveRange(args[2], gridData) : rangeVals;

        let sum = 0;
        let count = 0;
        for (let i = 0; i < rangeVals.length; i++) {
          if (this.matchesCriterion(rangeVals[i], criterion)) {
            const num = Number(avgRangeVals[i]);
            if (!isNaN(num)) {
              sum += num;
              count++;
            }
          }
        }
        if (count === 0) throw new Error('#DIV/0!');
        return sum / count;
      }

      // 4. Text Functions
      case 'CONCAT':
      case 'CONCATENATE': {
        let result = '';
        for (const arg of args) {
          const vals = this.getValuesList(arg, gridData);
          for (const v of vals) {
            result += String(v ?? '');
          }
        }
        return result;
      }

      case 'LEFT': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        const numChars = args.length > 1 ? Number(this.evalExpression(args[1], gridData)) : 1;
        return text.substring(0, numChars);
      }

      case 'RIGHT': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        const numChars = args.length > 1 ? Number(this.evalExpression(args[1], gridData)) : 1;
        return text.substring(Math.max(0, text.length - numChars));
      }

      case 'MID': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        const startPos = Number(this.evalExpression(args[1], gridData));
        const numChars = Number(this.evalExpression(args[2], gridData));
        return text.substring(Math.max(0, startPos - 1), Math.max(0, startPos - 1) + numChars);
      }

      case 'LEN': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        return text.length;
      }

      case 'TRIM': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        return text.trim().replace(/\s+/g, ' ');
      }

      case 'UPPER': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        return text.toUpperCase();
      }

      case 'LOWER': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        return text.toLowerCase();
      }

      case 'PROPER': {
        const text = String(this.evalExpression(args[0], gridData) ?? '');
        return text.replace(/\b\w/g, (c) => c.toUpperCase());
      }

      // 5. Lookups & Reference
      case 'VLOOKUP': {
        if (args.length < 3) throw new Error('VLOOKUP requires at least 3 arguments');
        const lookupVal = this.evalExpression(args[0], gridData);
        const rangeStr = args[1].replace(/\$/g, '').trim();
        const colIdx = Number(this.evalExpression(args[2], gridData));
        const exactMatch = args.length > 3 ? !Boolean(this.evalExpression(args[3], gridData)) : true;

        const table = this.getRangeMatrix(rangeStr, gridData);
        for (const row of table) {
          if (row.length === 0) continue;
          const firstVal = row[0];
          if (exactMatch) {
            if (this.areEqual(firstVal, lookupVal)) {
              if (colIdx > row.length || colIdx < 1) throw new Error('#REF!');
              return row[colIdx - 1];
            }
          } else {
            // Approximate match
            if (Number(firstVal) <= Number(lookupVal)) {
              return row[colIdx - 1];
            }
          }
        }
        throw new Error('#N/A');
      }

      case 'HLOOKUP': {
        if (args.length < 3) throw new Error('HLOOKUP requires at least 3 arguments');
        const lookupVal = this.evalExpression(args[0], gridData);
        const rangeStr = args[1].replace(/\$/g, '').trim();
        const rowIdx = Number(this.evalExpression(args[2], gridData));

        const table = this.getRangeMatrix(rangeStr, gridData);
        if (table.length === 0) throw new Error('#N/A');
        const firstRow = table[0];

        for (let c = 0; c < firstRow.length; c++) {
          if (this.areEqual(firstRow[c], lookupVal)) {
            if (rowIdx > table.length || rowIdx < 1) throw new Error('#REF!');
            return table[rowIdx - 1][c];
          }
        }
        throw new Error('#N/A');
      }

      case 'INDEX': {
        if (args.length < 2) throw new Error('INDEX requires at least 2 arguments');
        const rangeStr = args[0].replace(/\$/g, '').trim();
        const rowNum = Number(this.evalExpression(args[1], gridData));
        const colNum = args.length > 2 ? Number(this.evalExpression(args[2], gridData)) : 1;

        const matrix = this.getRangeMatrix(rangeStr, gridData);
        if (rowNum < 1 || rowNum > matrix.length) throw new Error('#REF!');
        const row = matrix[rowNum - 1];
        if (colNum < 1 || colNum > row.length) throw new Error('#REF!');
        return row[colNum - 1];
      }

      case 'MATCH': {
        if (args.length < 2) throw new Error('MATCH requires at least 2 arguments');
        const lookupVal = this.evalExpression(args[0], gridData);
        const rangeVals = this.resolveRange(args[1], gridData);

        for (let i = 0; i < rangeVals.length; i++) {
          if (this.areEqual(rangeVals[i], lookupVal)) {
            return i + 1; // 1-based index
          }
        }
        throw new Error('#N/A');
      }

      case 'XLOOKUP': {
        if (args.length < 3) throw new Error('XLOOKUP requires at least 3 arguments');
        const lookupVal = this.evalExpression(args[0], gridData);
        const lookupArray = this.resolveRange(args[1], gridData);
        const returnArray = this.resolveRange(args[2], gridData);
        const ifNotFound = args.length > 3 ? this.evalExpression(args[3], gridData) : null;

        for (let i = 0; i < lookupArray.length; i++) {
          if (this.areEqual(lookupArray[i], lookupVal)) {
            return returnArray[i];
          }
        }

        if (ifNotFound !== null && ifNotFound !== undefined) {
          return ifNotFound;
        }
        throw new Error('#N/A');
      }

      // 6. Dynamic Arrays
      case 'UNIQUE': {
        const vals = this.resolveRange(args[0], gridData);
        const unique = Array.from(new Set(vals.filter((v) => v !== null && v !== '')));
        return unique.length === 1 ? unique[0] : unique;
      }

      case 'SORT': {
        const vals = this.resolveRange(args[0], gridData);
        const sorted = [...vals].sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') return a - b;
          return String(a).localeCompare(String(b));
        });
        return sorted;
      }

      // 7. Finance & Date
      case 'PMT': {
        // PMT(rate, nper, pv)
        if (args.length < 3) throw new Error('PMT requires 3 arguments (rate, nper, pv)');
        const rate = Number(this.evalExpression(args[0], gridData));
        const nper = Number(this.evalExpression(args[1], gridData));
        const pv = Number(this.evalExpression(args[2], gridData));

        if (rate === 0) return -(pv / nper);
        const pmt = (rate * pv * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
        return -Math.round(pmt * 100) / 100;
      }

      case 'TODAY': {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      }

      case 'YEAR': {
        const dateStr = String(this.evalExpression(args[0], gridData));
        const date = new Date(dateStr);
        return isNaN(date.getFullYear()) ? 2026 : date.getFullYear();
      }

      default:
        throw new Error(`Fungsi ${name} belum didukung`);
    }
  }

  /**
   * Helper to check criteria matching in conditional functions like SUMIF and COUNTIF.
   */
  private static matchesCriterion(val: any, criterion: any): boolean {
    if (criterion === null || criterion === undefined) return false;
    const critStr = String(criterion).trim();

    if (critStr.startsWith('>=')) {
      return Number(val) >= Number(critStr.substring(2));
    }
    if (critStr.startsWith('<=')) {
      return Number(val) <= Number(critStr.substring(2));
    }
    if (critStr.startsWith('<>')) {
      return !this.areEqual(val, critStr.substring(2));
    }
    if (critStr.startsWith('>')) {
      return Number(val) > Number(critStr.substring(1));
    }
    if (critStr.startsWith('<')) {
      return Number(val) < Number(critStr.substring(1));
    }
    if (critStr.startsWith('=')) {
      return this.areEqual(val, critStr.substring(1));
    }

    return this.areEqual(val, criterion);
  }

  /**
   * Returns a 2D matrix of cell values from a range string (e.g. "A1:C4").
   */
  private static getRangeMatrix(rangeStr: string, gridData: Record<string, any>): any[][] {
    const parts = rangeStr.split(':');
    if (parts.length !== 2) return [];

    const startMatch = parts[0].match(/^([A-Z]+)([0-9]+)$/i);
    const endMatch = parts[1].match(/^([A-Z]+)([0-9]+)$/i);

    if (!startMatch || !endMatch) return [];

    const startCol = this.colNameToIndex(startMatch[1].toUpperCase());
    const startRow = parseInt(startMatch[2], 10);
    const endCol = this.colNameToIndex(endMatch[1].toUpperCase());
    const endRow = parseInt(endMatch[2], 10);

    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);

    const matrix: any[][] = [];
    for (let r = minRow; r <= maxRow; r++) {
      const rowVals: any[] = [];
      for (let c = minCol; c <= maxCol; c++) {
        const addr = `${this.colIndexToName(c)}${r}`;
        const cell = gridData[addr];
        let val = null;
        if (cell !== undefined && cell !== null) {
          val = typeof cell === 'object' && 'value' in cell ? cell.value : cell;
        }
        rowVals.push(val);
      }
      matrix.push(rowVals);
    }
    return matrix;
  }

  /**
   * Converts column letters (e.g. "A", "Z", "AA") to 1-based index.
   */
  public static colNameToIndex(name: string): number {
    let index = 0;
    for (let i = 0; i < name.length; i++) {
      index = index * 26 + (name.charCodeAt(i) - 64);
    }
    return index;
  }

  /**
   * Converts 1-based column index to column letter ("A", "B", ...).
   */
  public static colIndexToName(index: number): string {
    let name = '';
    while (index > 0) {
      const remainder = (index - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      index = Math.floor((index - 1) / 26);
    }
    return name;
  }
}
