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
    <div className="min-h-screen bg-fynd-surface-20">
      <header className="sticky top-0 z-20 border-b border-fynd-border bg-white shadow-fynd">
        <div className="mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-fynd-primary text-xs font-semibold text-white">
              F
            </span>
            <div>
              <p className="text-sm font-semibold text-fynd-mako">
                Capability config
              </p>
              <p className="text-[11px] text-fynd-muted">Fynd Payments</p>
            </div>
          </div>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded border border-fynd-border px-3 py-1.5 text-xs font-medium text-fynd-subdued transition-colors hover:bg-fynd-surface-20 hover:text-fynd-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fynd-primary/30"
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
