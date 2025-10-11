import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all responses (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionToken = searchParams.get('sessionToken');

    // If sessionToken is provided, get specific response
    if (sessionToken) {
      const response = await prisma.response.findUnique({
        where: { sessionToken },
        include: {
          answers: {
            orderBy: {
              questionId: 'asc'
            }
          }
        }
      });
      return NextResponse.json(response);
    }

    // Otherwise get all responses (admin)
    const responses = await prisma.response.findMany({
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        _count: {
          select: { answers: true }
        }
      }
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
}

// POST create or update response
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionToken, businessName, email, completed } = body;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token is required' },
        { status: 400 }
      );
    }

    // Upsert (create or update)
    const response = await prisma.response.upsert({
      where: { sessionToken },
      update: {
        businessName,
        email,
        completed: completed !== undefined ? completed : undefined,
        updatedAt: new Date()
      },
      create: {
        sessionToken,
        businessName,
        email,
        completed: completed || false
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating/updating response:', error);
    return NextResponse.json(
      { error: 'Failed to create/update response' },
      { status: 500 }
    );
  }
}
