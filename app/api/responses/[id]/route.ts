import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single response by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await prisma.response.findUnique({
      where: { id },
      include: {
        answers: {
          orderBy: {
            questionId: 'asc'
          }
        }
      }
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Response not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response' },
      { status: 500 }
    );
  }
}

// PUT/PATCH update response
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { businessName, email, completed, progress, answers } = body;

    // Update response
    const response = await prisma.response.update({
      where: { id },
      data: {
        businessName,
        email,
        completed,
        progress,
        updatedAt: new Date()
      }
    });

    // Update answers if provided
    if (answers && Array.isArray(answers)) {
      for (const answer of answers) {
        await prisma.answer.upsert({
          where: {
            responseId_questionId: {
              responseId: id,
              questionId: answer.questionId
            }
          },
          update: {
            value: answer.value,
            updatedAt: new Date()
          },
          create: {
            id: answer.id || `${id}-${answer.questionId}`,
            responseId: id,
            sectionId: answer.sectionId,
            questionId: answer.questionId,
            value: answer.value,
            updatedAt: new Date()
          }
        });
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating response:', error);
    return NextResponse.json(
      { error: 'Failed to update response' },
      { status: 500 }
    );
  }
}

// DELETE response
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.response.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting response:', error);
    return NextResponse.json(
      { error: 'Failed to delete response' },
      { status: 500 }
    );
  }
}
