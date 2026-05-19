import type { DiffSummaryStats } from '@/lib/types'

type AdminHeaderProps = {
  isDirty: boolean
  diffSummary: DiffSummaryStats
}

export function AdminHeader({ isDirty, diffSummary }: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-fynd-muted">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-fynd-text">
          Payments capability config
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fynd-subdued">
          Edit merchant-facing capability data, compare it against committed
          JSON, and export the updated source file.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full border border-fynd-border bg-white px-3 py-1.5 text-xs font-medium text-fynd-subdued">
          {isDirty ? 'Unsaved changes' : 'No unsaved changes'}
        </span>
        {isDirty ? (
          <span className="rounded-full bg-fynd-primarySoft px-2.5 py-1.5 text-xs font-semibold text-fynd-primaryHover">
            {diffSummary.total}
          </span>
        ) : null}
      </div>
    </div>
  )
}
