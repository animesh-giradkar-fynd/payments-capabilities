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
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-3 sm:flex-row sm:items-center">
      <label className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search capabilities"
          className="h-10 w-full rounded-md border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400"
        />
      </label>

      <select
        value={channelFilter}
        onChange={(event) =>
          onChannelFilterChange(event.target.value as ChannelFilter)
        }
        className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400"
        aria-label="Filter by channel"
      >
        <option value="all">All channels</option>
        <option value="storefront">{CHANNEL_FULL_LABELS.storefront}</option>
        <option value="storeOS">{CHANNEL_FULL_LABELS.storeOS}</option>
        <option value="agenticCheckout">
          {CHANNEL_FULL_LABELS.agenticCheckout}
        </option>
      </select>

      <label className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-600">
        <input
          type="checkbox"
          checked={gapsOnly}
          onChange={(event) => onGapsOnlyChange(event.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
        />
        Gaps only
      </label>

      <button
        type="button"
        onClick={onAddCapability}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add
      </button>
    </div>
  )
}
