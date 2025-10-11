// Session management utilities
export function generateSessionToken(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getSessionToken(): string | null {
  if (typeof window === 'undefined') return null;

  let token = localStorage.getItem('questionnaire_session_token');
  if (!token) {
    token = generateSessionToken();
    localStorage.setItem('questionnaire_session_token', token);
  }
  return token;
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('questionnaire_session_token');
  localStorage.removeItem('questionnaire_response_id');
}

export function getResponseId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('questionnaire_response_id');
}

export function setResponseId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('questionnaire_response_id', id);
}
