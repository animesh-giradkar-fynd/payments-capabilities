'use client'

import { Plus, Search } from 'lucide-react'
import type { ChannelKey } from '@/lib/types'
import { CHANNEL_FULL_LABELS } from '@/lib/utils'

export type ChannelFilter = ChannelKey | 'all'

type AdminFilterBarProps = {
  search: string
  onSearchChange: (value: string) => void
  channelFilter: ChannelFilter
  onChannelFilterChange: (value: ChannelFilter) => void
  gapsOnly: boolean
  onGapsOnlyChange: (value: boolean) => void
  onAddCapability: () => void
}

export function AdminFilterBar({
  search,
  onSearchChange,
  channelFilter,
  onChannelFilterChange,
  gapsOnly,
  onGapsOnlyChange,
  onAddCapability,
}: AdminFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-fynd-border bg-white p-3 shadow-fynd sm:flex-row sm:items-center">
      <label className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fynd-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search capabilities"
          className="h-10 w-full rounded border border-fynd-border bg-white pl-9 pr-3 text-sm text-fynd-mako outline-none transition-colors placeholder:text-fynd-muted focus:border-fynd-primary"
        />
      </label>

      <select
        value={channelFilter}
        onChange={(event) =>
          onChannelFilterChange(event.target.value as ChannelFilter)
        }
        className="h-10 rounded border border-fynd-border bg-white px-3 text-sm text-fynd-mako outline-none transition-colors focus:border-fynd-primary"
        aria-label="Filter by channel"
      >
        <option value="all">All channels</option>
        <option value="storefront">{CHANNEL_FULL_LABELS.storefront}</option>
        <option value="storeOS">{CHANNEL_FULL_LABELS.storeOS}</option>
        <option value="agenticCheckout">
          {CHANNEL_FULL_LABELS.agenticCheckout}
        </option>
      </select>

      <label className="inline-flex h-10 items-center gap-2 rounded border border-fynd-border px-3 text-sm font-medium text-fynd-subdued">
        <input
          type="checkbox"
          checked={gapsOnly}
          onChange={(event) => onGapsOnlyChange(event.target.checked)}
          className="h-4 w-4 rounded border-fynd-border accent-fynd-primary"
        />
        Gaps only
      </label>

      <button
        type="button"
        onClick={onAddCapability}
        className="inline-flex h-10 items-center justify-center gap-2 rounded bg-fynd-primary px-4 text-sm font-medium text-white transition-colors hover:bg-fynd-primaryHover"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add
      </button>
    </div>
  )
}
