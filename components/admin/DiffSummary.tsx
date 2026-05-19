import type { DiffSummaryStats } from '@/lib/types'

type DiffSummaryProps = {
  diffSummary: DiffSummaryStats
}

export function DiffSummary({ diffSummary }: DiffSummaryProps) {
  if (diffSummary.total === 0) {
    return <p className="text-xs text-zinc-400">No changes from committed JSON.</p>
  }

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="rounded-full bg-violet-100 px-2.5 py-1 font-medium text-violet-700">
        {diffSummary.total} total
      </span>
      <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-600">
        {diffSummary.categoryChanges} category
      </span>
      <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-600">
        {diffSummary.capabilityChanges} capability
      </span>
      <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-600">
        {diffSummary.statusChanges} status
      </span>
    </div>
  )
}
