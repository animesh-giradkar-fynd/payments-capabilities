'use client'

import { Download, RotateCcw } from 'lucide-react'
import type { DiffSummaryStats } from '@/lib/types'
import { DiffSummary } from './DiffSummary'

type ExportBarProps = {
  isDirty: boolean
  diffSummary: DiffSummaryStats
  onExport: () => void
  onReset: () => void
}

export function ExportBar({
  isDirty,
  diffSummary,
  onExport,
  onReset,
}: ExportBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <DiffSummary diffSummary={diffSummary} />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={!isDirty}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-zinc-200 px-3 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-zinc-900 px-3 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Export JSON
        </button>
      </div>
    </div>
  )
}
