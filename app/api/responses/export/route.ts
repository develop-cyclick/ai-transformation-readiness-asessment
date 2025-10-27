import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateCSV, generateExcel, generateFilename, type ResponseData } from '@/lib/export';

/**
 * POST /api/responses/export
 * Export responses as CSV or Excel
 *
 * Body:
 * {
 *   ids: string[]  - Array of response IDs to export
 *   format: 'csv' | 'xlsx'  - Export format
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, format } = body;

    // Validation
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Response IDs are required' },
        { status: 400 }
      );
    }

    if (!format || !['csv', 'xlsx'].includes(format)) {
      return NextResponse.json(
        { error: 'Format must be either "csv" or "xlsx"' },
        { status: 400 }
      );
    }

    // Limit batch size to prevent performance issues
    if (ids.length > 100) {
      return NextResponse.json(
        { error: 'Cannot export more than 100 responses at once' },
        { status: 400 }
      );
    }

    // Fetch responses with answers from database
    const responses = await prisma.response.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        answers: {
          orderBy: {
            questionId: 'asc'
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    if (responses.length === 0) {
      return NextResponse.json(
        { error: 'No responses found' },
        { status: 404 }
      );
    }

    // Transform to ResponseData format
    const responseData: ResponseData[] = responses.map(r => ({
      id: r.id,
      businessName: r.businessName,
      email: r.email,
      progress: r.progress,
      completed: r.completed,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      answers: r.answers || []
    }));

    // Generate file based on format
    let fileBuffer: Buffer;
    let contentType: string;
    let filename: string;

    if (format === 'csv') {
      const csvContent = generateCSV(responseData);
      fileBuffer = Buffer.from(csvContent, 'utf-8');
      contentType = 'text/csv; charset=utf-8';
      filename = generateFilename('csv', responseData.length, responseData[0]?.businessName || undefined);
    } else {
      // Excel
      fileBuffer = generateExcel(responseData);
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      filename = generateFilename('xlsx', responseData.length, responseData[0]?.businessName || undefined);
    }

    // Return file as download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error exporting responses:', error);
    return NextResponse.json(
      { error: 'Failed to export responses' },
      { status: 500 }
    );
  }
}
