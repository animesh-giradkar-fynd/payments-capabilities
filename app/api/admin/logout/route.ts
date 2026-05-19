import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url), {
    status: 303,
  })

  response.cookies.set('fynd_admin_session', '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/admin',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
