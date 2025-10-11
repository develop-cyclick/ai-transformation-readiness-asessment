import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (session) {
      return NextResponse.json(
        { authenticated: true, username: session.username },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}
