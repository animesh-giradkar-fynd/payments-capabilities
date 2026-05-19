'use client'

import { useMemo, useState } from 'react'
import { AddCapabilityModal } from '@/components/admin/AddCapabilityModal'
import { AdminFilterBar, type ChannelFilter } from '@/components/admin/AdminFilterBar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { CapabilityTable } from '@/components/admin/CapabilityTable'
import { ExportBar } from '@/components/admin/ExportBar'
import type { CapabilitiesData, Capability } from '@/lib/types'
import { CHANNEL_KEYS } from '@/lib/types'
import { useCapabilities } from '@/lib/useCapabilities'

function capabilityHasGap(capability: Capability) {
  return CHANNEL_KEYS.some(
    (channel) => capability.channels[channel].status === 'not-supported',
  )
}

function filterData(
  data: CapabilitiesData,
  search: string,
  channelFilter: ChannelFilter,
  gapsOnly: boolean,
): CapabilitiesData {
  const query = search.trim().toLowerCase()

  return {
    categories: data.categories
      .map((category) => {
        const capabilities = category.capabilities.filter((capability) => {
          const matchesSearch =
            !query ||
            capability.name.toLowerCase().includes(query) ||
            capability.description.toLowerCase().includes(query) ||
            capability.id.toLowerCase().includes(query)

          const matchesChannel =
            channelFilter === 'all' ||
            capability.channels[channelFilter].status !== 'na'

          const matchesGap = !gapsOnly || capabilityHasGap(capability)

          return matchesSearch && matchesChannel && matchesGap
        })

        return { ...category, capabilities }
      })
      .filter((category) => category.capabilities.length > 0),
  }
}

export default function AdminPage() {
  const {
    data,
    loading,
    error,
    isDirty,
    diffSummary,
    updateCapability,
    updateChannelSupport,
    addCapability,
    removeCapability,
    reorderCapability,
    exportJSON,
    resetToCommitted,
  } = useCapabilities()
  const [search, setSearch] = useState('')
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all')
  const [gapsOnly, setGapsOnly] = useState(false)
  const [adding, setAdding] = useState(false)

  const filteredData = useMemo(
    () => filterData(data, search, channelFilter, gapsOnly),
    [data, search, channelFilter, gapsOnly],
  )

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6">
      <AdminHeader isDirty={isDirty} diffSummary={diffSummary} />

      {error ? (
        <div className="rounded border border-fynd-warning-20 bg-fynd-warning-20 px-4 py-3 text-sm text-fynd-warning-80">
          Showing fallback data because committed JSON could not be fetched.
        </div>
      ) : null}

      <ExportBar
        isDirty={isDirty}
        diffSummary={diffSummary}
        onExport={exportJSON}
        onReset={resetToCommitted}
      />

      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        channelFilter={channelFilter}
        onChannelFilterChange={setChannelFilter}
        gapsOnly={gapsOnly}
        onGapsOnlyChange={setGapsOnly}
        onAddCapability={() => setAdding(true)}
      />

      {loading ? (
        <div className="rounded-lg border border-fynd-border bg-white p-6 text-sm text-fynd-muted shadow-fynd">
          Loading capabilities...
        </div>
      ) : (
        <CapabilityTable
          categories={filteredData.categories}
          onCapabilityChange={updateCapability}
          onChannelSupportChange={updateChannelSupport}
          onReorderCapability={reorderCapability}
          onRemoveCapability={removeCapability}
        />
      )}

      <AddCapabilityModal
        open={adding}
        categories={data.categories}
        onClose={() => setAdding(false)}
        onAdd={addCapability}
      />
    </main>
  )
}
