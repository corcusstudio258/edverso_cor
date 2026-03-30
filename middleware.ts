/* eslint-disable @typescript-eslint/no-unused-vars */
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

// Define routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/certificate',
  '/attendance',
  '/assessment',
  '/admin',
  '/college',
  '/course',
]

// Define routes that should redirect to dashboard if already authenticated
const authRoutes = [
  '/login',
  '/register',
]

interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('balaji_token')?.value

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Redirect logic for authenticated users on auth routes
  if (token && isAuthRoute) {
    try {
      const decoded = jwtDecode<JWTPayload>(token)
      // Check if token is expired
      if (decoded.exp * 1000 > Date.now()) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      // Token is invalid, clear it and allow access to auth routes
      const response = NextResponse.next()
      response.cookies.delete('balaji_token')
      return response
    }
  }

  // Protection logic for protected routes
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const decoded = jwtDecode<JWTPayload>(token)
      
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('balaji_token')
        return response
      }

      // You can add role-based access control here if needed
      // if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
      //   return NextResponse.redirect(new URL('/unauthorized', request.url))
      // }

      // Token is valid, allow access
      return NextResponse.next()
    } catch (error) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('balaji_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}