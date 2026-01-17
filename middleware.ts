import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is logged in
  const userCookie = request.cookies.get("freshserve-user")
  const isLoggedIn = !!userCookie?.value

  // Get the current path
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ["/login"]
  const isPublicPath = publicPaths.includes(path)

  // Define protected paths that require authentication
  const protectedPaths = ["/dashboard", "/farmer", "/restaurant", "/customer", "/queue", "/settings", "/profile"]
  const isProtectedPath = protectedPaths.some((prefix) => path.startsWith(prefix))

  // Redirect logic
  if (!isLoggedIn && isProtectedPath) {
    // Redirect to login if not logged in and trying to access a protected route
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isLoggedIn && isPublicPath) {
    // Redirect to dashboard if already logged in and trying to access login page
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // For the root path, redirect based on authentication status
  if (path === "/") {
    return isLoggedIn
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
