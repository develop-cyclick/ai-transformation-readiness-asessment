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

// PUT update response
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { businessName, email, answers } = body;

    // Update response metadata
    await prisma.response.update({
      where: { id },
      data: {
        businessName,
        email,
        updatedAt: new Date()
      }
    });

    // Update answers if provided
    if (answers && Array.isArray(answers)) {
      for (const answer of answers) {
        if (answer.id && answer.value !== undefined) {
          await prisma.answer.update({
            where: { id: answer.id },
            data: {
              value: answer.value,
              updatedAt: new Date()
            }
          });
        }
      }
    }

    // Fetch updated response with answers
    const updatedResponse = await prisma.response.findUnique({
      where: { id },
      include: {
        answers: {
          orderBy: {
            questionId: 'asc'
          }
        }
      }
    });

    return NextResponse.json(updatedResponse);
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
