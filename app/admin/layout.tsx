import type { ReactNode } from 'react'
import { headers } from 'next/headers'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const headerStore = await headers()
  const pathname = headerStore.get('x-admin-pathname') ?? ''

  if (pathname.startsWith('/admin/login')) {
    return children
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <p className="text-sm font-medium text-zinc-800">Capability config</p>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  )
}
