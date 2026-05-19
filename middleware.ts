import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_COOKIE = 'fynd_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 8

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function signToken(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return toHex(signature)
}

async function verifyToken(cookie: string, secret: string): Promise<boolean> {
  const [timestamp, hmac] = cookie.split('.')
  if (!timestamp || !hmac) return false

  const expectedHmac = await signToken(timestamp, secret)
  if (hmac !== expectedHmac) return false

  const issued = Number.parseInt(timestamp, 10)
  if (!Number.isFinite(issued)) return false

  const now = Math.floor(Date.now() / 1000)
  return now - issued <= SESSION_DURATION_SECONDS
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-admin-pathname', request.nextUrl.pathname)

  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'dev-secret-change-me'

  if (!sessionCookie || !(await verifyToken(sessionCookie, secret))) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set(
      'from',
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    )
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin/:path*'],
}
