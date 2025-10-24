import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { questionnaireData } from '@/data/questions';

interface ResponseWithAnswers {
  id: string;
  businessName: string | null;
  email: string | null;
  progress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  Answer: Array<{
    id: string;
    questionId: number;
    sectionId: number;
    value: string;
  }>;
}

// GET export responses to CSV
export async function GET(request: NextRequest) {
  try {
    const responses: ResponseWithAnswers[] = await prisma.response.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        Answer: {
          orderBy: {
            questionId: 'asc'
          }
        }
      }
    });

    // Create CSV header
    const headers = [
      'ID',
      'ชื่อบริษัท',
      'อีเมล',
      'สถานะ',
      'ความคืบหน้า (%)',
      'จำนวนคำตอบ',
      'วันที่สร้าง',
      'อัพเดทล่าสุด'
    ];

    // Add question headers
    const allQuestions = questionnaireData.sections.flatMap(section =>
      section.questions.map(q => ({
        id: q.id,
        text: q.text,
        sectionId: section.id
      }))
    );

    allQuestions.forEach(q => {
      headers.push(`[${q.id}] ${q.text}`);
    });

    // Create CSV rows
    const rows: string[][] = responses.map((response: ResponseWithAnswers) => {
      const row: string[] = [
        response.id,
        response.businessName || '',
        response.email || '',
        response.completed ? 'เสร็จสมบูรณ์' : 'ยังไม่เสร็จ',
        response.progress.toString(),
        response.Answer.length.toString(),
        new Date(response.createdAt).toLocaleString('th-TH'),
        new Date(response.updatedAt).toLocaleString('th-TH')
      ];

      // Add answers for each question
      allQuestions.forEach((q: { id: number; text: string; sectionId: number }) => {
        const answer = response.Answer.find((a: { questionId: number; value: string }) => a.questionId === q.id);
        row.push(answer?.value || '');
      });

      return row;
    });

    // Convert to CSV
    const csv = [
      headers.join(','),
      ...rows.map((row: string[]) => row.map((cell: string) => `"${cell.toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Add BOM for Thai characters in Excel
    const bom = '\uFEFF';
    const csvWithBom = bom + csv;

    return new NextResponse(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="responses-export-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error('Error exporting responses:', error);
    return NextResponse.json(
      { error: 'Failed to export responses' },
      { status: 500 }
    );
  }
}
