import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface SessionData {
  username: string;
  createdAt: number;
  expiresAt: number;
}

/**
 * Generate a secure session token
 */
export function generateSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}_${random}`;
}

/**
 * Verify admin credentials against environment variables
 */
export function verifyCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return false;
  }

  return username === adminUsername && password === adminPassword;
}

/**
 * Create session data
 */
export function createSessionData(username: string): SessionData {
  const createdAt = Date.now();
  const expiresAt = createdAt + SESSION_DURATION;

  return {
    username,
    createdAt,
    expiresAt,
  };
}

/**
 * Validate session data
 */
export function isSessionValid(session: SessionData): boolean {
  const now = Date.now();
  return session.expiresAt > now;
}

/**
 * Set session cookie (server-side only)
 */
export async function setSessionCookie(sessionData: SessionData) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

/**
 * Get session from cookie (server-side only)
 */
export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const session: SessionData = JSON.parse(sessionCookie.value);

    if (!isSessionValid(session)) {
      // Session expired, clear it
      await clearSessionCookie();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Clear session cookie (server-side only)
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
