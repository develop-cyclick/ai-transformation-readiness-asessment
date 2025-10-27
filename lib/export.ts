import * as XLSX from 'xlsx';
import { questionnaireData } from '@/data/questions';

export interface ResponseData {
  id: string;
  businessName: string | null;
  email: string | null;
  progress: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Array<{
    id: string;
    questionId: number;
    sectionId: number;
    value: string;
  }>;
}

interface FlattenedResponse {
  [key: string]: string | number | boolean;
}

/**
 * Get question text by question ID
 */
function getQuestionText(questionId: number): string {
  for (const section of questionnaireData.sections) {
    const question = section.questions.find(q => q.id === questionId);
    if (question) {
      return `Q${questionId}: ${question.text}`;
    }
  }
  return `Q${questionId}`;
}

/**
 * Parse answer value - handle JSON arrays for multiselect
 */
function parseAnswerValue(value: string): string {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.join('; ');
    }
    return value;
  } catch {
    return value;
  }
}

/**
 * Flatten a single response into a flat object for export
 */
export function flattenResponse(response: ResponseData): FlattenedResponse {
  const flat: FlattenedResponse = {
    'Response ID': response.id,
    'Business Name': response.businessName || '',
    'Email': response.email || '',
    'Status': response.completed ? 'เสร็จสมบูรณ์' : 'ยังไม่เสร็จ',
    'Progress (%)': response.progress,
    'Created At': new Date(response.createdAt).toLocaleString('th-TH'),
    'Updated At': new Date(response.updatedAt).toLocaleString('th-TH'),
  };

  // Add all answers
  response.answers.forEach(answer => {
    const questionText = getQuestionText(answer.questionId);
    flat[questionText] = parseAnswerValue(answer.value);
  });

  return flat;
}

/**
 * Flatten multiple responses
 */
export function flattenResponses(responses: ResponseData[]): FlattenedResponse[] {
  return responses.map(flattenResponse);
}

/**
 * Generate CSV string from responses
 * Includes UTF-8 BOM for proper Thai character handling
 */
export function generateCSV(responses: ResponseData[]): string {
  if (responses.length === 0) {
    return '';
  }

  const flattened = flattenResponses(responses);

  // Get all unique column headers
  const headers = new Set<string>();
  flattened.forEach(row => {
    Object.keys(row).forEach(key => headers.add(key));
  });
  const headerArray = Array.from(headers);

  // Build CSV rows
  const csvRows: string[] = [];

  // Header row
  csvRows.push(headerArray.map(escapeCSVValue).join(','));

  // Data rows
  flattened.forEach(row => {
    const values = headerArray.map(header => {
      const value = row[header];
      return escapeCSVValue(value != null ? String(value) : '');
    });
    csvRows.push(values.join(','));
  });

  // Add UTF-8 BOM for Thai characters
  const BOM = '\uFEFF';
  return BOM + csvRows.join('\n');
}

/**
 * Escape CSV value - handle commas, quotes, newlines
 */
function escapeCSVValue(value: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Generate Excel file from responses
 */
export function generateExcel(responses: ResponseData[]): Buffer {
  if (responses.length === 0) {
    // Return empty workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['No data']]);
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  const flattened = flattenResponses(responses);

  // Convert to worksheet
  const ws = XLSX.utils.json_to_sheet(flattened);

  // Apply column widths (approximate)
  const colWidths: XLSX.ColInfo[] = [];
  Object.keys(flattened[0]).forEach((key) => {
    const maxLength = Math.max(
      key.length,
      ...flattened.map(row => String(row[key] || '').length)
    );
    colWidths.push({ wch: Math.min(maxLength + 2, 50) }); // Max 50 characters wide
  });
  ws['!cols'] = colWidths;

  // Create workbook and add worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Responses');

  // Write to buffer
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
}

/**
 * Generate filename for export
 */
export function generateFilename(
  format: 'csv' | 'xlsx',
  count: number,
  businessName?: string
): string {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (count === 1 && businessName) {
    // Single response
    const sanitized = businessName.replace(/[^a-zA-Z0-9ก-๙\-_]/g, '_');
    return `response-${sanitized}-${date}.${format}`;
  } else {
    // Multiple responses
    return `responses-${count}-${date}.${format}`;
  }
}
