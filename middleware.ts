import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'admin_session';

interface SessionData {
  username: string;
  createdAt: number;
  expiresAt: number;
}

function isSessionValid(session: SessionData): boolean {
  const now = Date.now();
  return session.expiresAt > now;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if request is for admin routes (excluding login)
  if (pathname.startsWith('/admin')) {
    // Get session cookie
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

    // If no session cookie, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Parse and validate session
      const session: SessionData = JSON.parse(sessionCookie.value);

      if (!isSessionValid(session)) {
        // Session expired, redirect to login
        const loginUrl = new URL('/admin/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        // Clear expired cookie
        response.cookies.delete(SESSION_COOKIE_NAME);
        return response;
      }

      // Session is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Invalid session data, redirect to login
      console.error('Invalid session data:', error);
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*'],
};
