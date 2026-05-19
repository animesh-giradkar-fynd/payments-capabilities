'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const params = new URLSearchParams(window.location.search)
    const from = params.get('from') ?? '/admin'

    try {
      const response = await fetch(
        `/api/admin/login?from=${encodeURIComponent(from)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        },
      )

      if (response.status === 401) {
        setPassword('')
        setError('Incorrect username or password')
        setLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = (await response.json()) as { redirectTo?: string }
      router.push(data.redirectTo ?? '/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-fynd-surface-20 px-4">
      <section className="w-full max-w-sm rounded-lg border border-fynd-border bg-white p-8 shadow-fynd">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded bg-fynd-primarySoft">
          <Lock className="h-5 w-5 text-fynd-primaryHover" aria-hidden="true" />
        </div>
        <h1 className="mt-3 text-center text-base font-semibold text-fynd-mako">
          Admin access
        </h1>
        <p className="mt-1 text-center text-xs text-fynd-muted">
          Fynd payments capability config
        </p>

        <form className="mt-6 flex flex-col gap-3" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="h-10 rounded border border-fynd-border bg-white px-3 text-sm text-fynd-mako outline-none transition-colors placeholder:text-fynd-muted focus:border-fynd-primary"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 rounded border border-fynd-border bg-white px-3 text-sm text-fynd-mako outline-none transition-colors placeholder:text-fynd-muted focus:border-fynd-primary"
          />
          {error ? (
            <p className="mt-1 text-xs text-fynd-error-50">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-fynd-primary px-3 text-sm font-medium text-white transition-colors hover:bg-fynd-primaryHover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-fynd-muted">
          Credentials set via environment variables
        </p>
      </section>
    </main>
  )
}
