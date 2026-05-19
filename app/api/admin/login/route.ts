import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const SESSION_DURATION_SECONDS = 60 * 60 * 8

function signToken(secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const hmac = createHmac('sha256', secret).update(timestamp).digest('hex')
  return `${timestamp}.${hmac}`
}

function safeRedirectTarget(value: string | null): string {
  if (!value) return '/admin'
  if (!value.startsWith('/admin')) return '/admin'
  if (value.startsWith('/admin/login')) return '/admin'
  return value
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { username, password } = body as {
    username?: string
    password?: string
  }

  const expectedUsername = process.env.ADMIN_USERNAME ?? 'admin'
  const expectedPassword = process.env.ADMIN_PASSWORD ?? 'changeme'
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'dev-secret-change-me'

  if (username !== expectedUsername || password !== expectedPassword) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = signToken(secret)
  const redirectTo = safeRedirectTarget(request.nextUrl.searchParams.get('from'))
  const response = NextResponse.json({ success: true, redirectTo })

  response.cookies.set('fynd_admin_session', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/admin',
    maxAge: SESSION_DURATION_SECONDS,
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
