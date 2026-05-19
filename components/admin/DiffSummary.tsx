import type { DiffSummaryStats } from '@/lib/types'

type DiffSummaryProps = {
  diffSummary: DiffSummaryStats
}

export function DiffSummary({ diffSummary }: DiffSummaryProps) {
  if (diffSummary.total === 0) {
    return (
      <p className="text-xs text-fynd-muted">No changes from committed JSON.</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="rounded-full bg-fynd-primarySoft px-2.5 py-1 font-medium text-fynd-primaryHover">
        {diffSummary.total} total
      </span>
      <span className="rounded-full bg-fynd-surface-20 px-2.5 py-1 font-medium text-fynd-subdued">
        {diffSummary.categoryChanges} category
      </span>
      <span className="rounded-full bg-fynd-surface-20 px-2.5 py-1 font-medium text-fynd-subdued">
        {diffSummary.capabilityChanges} capability
      </span>
      <span className="rounded-full bg-fynd-surface-20 px-2.5 py-1 font-medium text-fynd-subdued">
        {diffSummary.statusChanges} status
      </span>
    </div>
  )
}
