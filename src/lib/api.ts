/**
 * API configuration — resolves the backend URL for fetch calls.
 * In development: proxied via Vite to localhost:3000/api/
 * In production: calls api.teecode.store directly
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export function apiUrl(path: string): string {
  // In dev mode (Vite proxy), use /api/ prefix
  if (!API_BASE_URL) {
    return `/api${path.startsWith('/') ? path : '/' + path}`;
  }
  // In production, call the separate backend
  return `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
}
