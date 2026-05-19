import type { DiffSummaryStats } from '@/lib/types'

type AdminHeaderProps = {
  isDirty: boolean
  diffSummary: DiffSummaryStats
}

export function AdminHeader({ isDirty, diffSummary }: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-zinc-950">
          Payments capability config
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">
          Edit merchant-facing capability data, compare it against committed
          JSON, and export the updated source file.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500">
          {isDirty ? 'Unsaved changes' : 'No unsaved changes'}
        </span>
        {isDirty ? (
          <span className="rounded-full bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
            {diffSummary.total}
          </span>
        ) : null}
      </div>
    </div>
  )
}
