import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add the ngrok header
  requestHeaders.set('ngrok-skip-browser-warning', 'true')

  // You can also set a custom user agent
  requestHeaders.set('User-Agent', 'HouseFly-App/1.0')

  // Return response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/:path*',
} 