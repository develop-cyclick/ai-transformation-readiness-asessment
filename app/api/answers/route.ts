import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Answer } from '@/types/questions';

// POST save answers for a section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionToken, answers, progress } = body as {
      sessionToken: string;
      answers: Answer[];
      progress: number;
    };

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token is required' },
        { status: 400 }
      );
    }

    // Create or get response
    const response = await prisma.response.upsert({
      where: { sessionToken },
      update: {
        progress,
        updatedAt: new Date()
      },
      create: {
        sessionToken,
        progress
      }
    });

    // Save answers
    for (const answer of answers) {
      await prisma.answer.upsert({
        where: {
          responseId_questionId: {
            responseId: response.id,
            questionId: answer.questionId
          }
        },
        update: {
          sectionId: answer.sectionId,
          value: typeof answer.value === 'string'
            ? answer.value
            : JSON.stringify(answer.value),
          updatedAt: new Date()
        },
        create: {
          responseId: response.id,
          sectionId: answer.sectionId,
          questionId: answer.questionId,
          value: typeof answer.value === 'string'
            ? answer.value
            : JSON.stringify(answer.value)
        }
      });
    }

    return NextResponse.json({
      success: true,
      responseId: response.id
    });
  } catch (error) {
    console.error('Error saving answers:', error);
    return NextResponse.json(
      { error: 'Failed to save answers' },
      { status: 500 }
    );
  }
}
