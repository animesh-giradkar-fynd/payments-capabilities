'use client'

import { Fragment } from 'react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type {
  Capability,
  CapabilityCategory,
  ChannelKey,
  ChannelSupport,
} from '@/lib/types'
import { CHANNEL_FULL_LABELS } from '@/lib/utils'
import { TableCapabilityRow } from './TableCapabilityRow'
import { TableCategoryRow } from './TableCategoryRow'

type CapabilityTableProps = {
  categories: CapabilityCategory[]
  onCapabilityChange: (
    categoryId: string,
    capabilityId: string,
    patch: Partial<
      Pick<
        Capability,
        'name' | 'description' | 'icon' | 'showOnMerchantView' | 'internalOnly'
      >
    >,
  ) => void
  onChannelSupportChange: (
    categoryId: string,
    capabilityId: string,
    channel: ChannelKey,
    support: ChannelSupport,
  ) => void
  onReorderCapability: (
    categoryId: string,
    activeId: string,
    overId: string,
  ) => void
  onRemoveCapability: (categoryId: string, capabilityId: string) => void
}

export function CapabilityTable({
  categories,
  onCapabilityChange,
  onChannelSupportChange,
  onReorderCapability,
  onRemoveCapability,
}: CapabilityTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeCategory = active.data.current?.categoryId as string | undefined
    const overCategory = over.data.current?.categoryId as string | undefined
    if (!activeCategory || activeCategory !== overCategory) return

    onReorderCapability(activeCategory, String(active.id), String(over.id))
  }

  const hasRows = categories.some((category) => category.capabilities.length > 0)

  return (
    <div className="overflow-hidden rounded-lg border border-fynd-border bg-white shadow-fynd">
      <div className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <table className="w-full min-w-[1120px] border-collapse text-left">
            <thead className="bg-fynd-surface-20 text-xs font-semibold uppercase tracking-wider text-fynd-muted">
              <tr>
                <th className="w-10 px-3 py-3" />
                <th className="px-3 py-3">Capability</th>
                <th className="px-3 py-3">Icon</th>
                <th className="px-3 py-3">{CHANNEL_FULL_LABELS.storefront}</th>
                <th className="px-3 py-3">{CHANNEL_FULL_LABELS.storeOS}</th>
                <th className="px-3 py-3">
                  {CHANNEL_FULL_LABELS.agenticCheckout}
                </th>
                <th className="px-3 py-3">Visibility</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <Fragment key={category.id}>
                  <TableCategoryRow
                    category={category}
                    visibleCount={category.capabilities.length}
                  />
                  <SortableContext
                    items={category.capabilities.map((capability) => capability.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {category.capabilities.map((capability) => (
                      <TableCapabilityRow
                        key={capability.id}
                        categoryId={category.id}
                        capability={capability}
                        onCapabilityChange={onCapabilityChange}
                        onChannelSupportChange={onChannelSupportChange}
                        onRemove={onRemoveCapability}
                      />
                    ))}
                  </SortableContext>
                </Fragment>
              ))}
            </tbody>
          </table>
        </DndContext>
      </div>

      {!hasRows ? (
        <div className="border-t border-fynd-iron px-4 py-8 text-center text-sm text-fynd-muted">
          No capabilities match the current filters.
        </div>
      ) : null}
    </div>
  )
}
