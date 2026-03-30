/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "balaji_token";

// Client-side token management
export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    // Also set cookie for middleware access
    document.cookie = `balaji_token=${token}; path=/; max-age=604800; SameSite=Lax`; // 7 days
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  // Also clear cookie
  document.cookie = "balaji_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function decodeToken<T = any>(token?: string) {
  try {
    const t = token ?? getToken();
    if (!t) return null;
    return jwtDecode<T>(t);
  } catch {
    return null;
  }
}

// Server-side token validation (for API routes)
export function validateToken(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Get user role from token
export function getUserRole(token?: string): string | null {
  try {
    const decoded = decodeToken<{ role: string }>(token);
    return decoded?.role || null;
  } catch {
    return null;
  }
}

// Get user ID from token
export function getUserId(token?: string): string | null {
  try {
    const decoded = decodeToken<{ sub: string }>(token);
    return decoded?.sub || null;
  } catch {
    return null;
  }
}