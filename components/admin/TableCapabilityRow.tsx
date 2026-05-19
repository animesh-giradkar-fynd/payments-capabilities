'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { GripVertical, Trash2 } from 'lucide-react'
import type {
  Capability,
  ChannelKey,
  ChannelSupport,
  SupportStatus,
} from '@/lib/types'
import { CHANNEL_KEYS } from '@/lib/types'
import { CHANNEL_LABELS, classNames } from '@/lib/utils'
import { StatusSelect } from './StatusSelect'

type EditableTextProps = {
  value: string
  onCommit: (value: string) => void
  className?: string
  multiline?: boolean
}

function EditableText({
  value,
  onCommit,
  className,
  multiline = false,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (!editing) setDraft(value)
  }, [editing, value])

  function commit() {
    const next = draft.trim()
    setEditing(false)
    if (next && next !== value) onCommit(next)
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key === 'Enter' && (!multiline || !event.shiftKey)) {
      event.preventDefault()
      commit()
    }

    if (event.key === 'Escape') {
      setDraft(value)
      setEditing(false)
    }
  }

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          rows={2}
          className={classNames(
            'w-full resize-none rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300',
            className,
          )}
        />
      )
    }

    return (
      <input
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={onKeyDown}
        className={classNames(
          'w-full rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm font-medium text-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300',
          className,
        )}
      />
    )
  }

  return (
    <button
      type="button"
      onDoubleClick={() => setEditing(true)}
      onClick={() => setEditing(true)}
      className={classNames('block w-full text-left', className)}
    >
      {value}
    </button>
  )
}

type TableCapabilityRowProps = {
  categoryId: string
  capability: Capability
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
  onRemove: (categoryId: string, capabilityId: string) => void
}

export function TableCapabilityRow({
  categoryId,
  capability,
  onCapabilityChange,
  onChannelSupportChange,
  onRemove,
}: TableCapabilityRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: capability.id,
    data: { categoryId },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  function updateStatus(channel: ChannelKey, status: SupportStatus) {
    const current = capability.channels[channel]
    onChannelSupportChange(categoryId, capability.id, channel, {
      ...current,
      status,
    })
  }

  function updateNote(channel: ChannelKey, note: string) {
    const current = capability.channels[channel]
    onChannelSupportChange(categoryId, capability.id, channel, {
      ...current,
      note: note.trim() ? note : undefined,
    })
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={classNames(
        'border-t border-zinc-100 bg-white align-top',
        isDragging && 'relative z-10 shadow-lg',
      )}
    >
      <td className="w-10 px-3 py-3">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-zinc-50 hover:text-zinc-500"
          aria-label={`Reorder ${capability.name}`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" aria-hidden="true" />
        </button>
      </td>
      <td className="min-w-64 px-3 py-3">
        <EditableText
          value={capability.name}
          onCommit={(name) =>
            onCapabilityChange(categoryId, capability.id, { name })
          }
          className="text-sm font-medium text-zinc-800"
        />
        <EditableText
          value={capability.description}
          onCommit={(description) =>
            onCapabilityChange(categoryId, capability.id, { description })
          }
          multiline
          className="mt-1 text-xs leading-relaxed text-zinc-500"
        />
        <p className="mt-1 font-mono text-[11px] text-zinc-300">
          {capability.id}
        </p>
      </td>
      <td className="px-3 py-3">
        <input
          value={capability.icon}
          onChange={(event) =>
            onCapabilityChange(categoryId, capability.id, {
              icon: event.target.value,
            })
          }
          className="h-8 w-32 rounded-md border border-zinc-200 px-2 text-xs text-zinc-600 outline-none focus:border-zinc-400"
          aria-label={`${capability.name} icon`}
        />
      </td>
      {CHANNEL_KEYS.map((channel) => {
        const support = capability.channels[channel]
        return (
          <td key={channel} className="min-w-44 px-3 py-3">
            <StatusSelect
              value={support.status}
              onChange={(status) => updateStatus(channel, status)}
              label={`${capability.name} ${CHANNEL_LABELS[channel]} status`}
            />
            <input
              value={support.note ?? ''}
              onChange={(event) => updateNote(channel, event.target.value)}
              placeholder="Note"
              className="mt-2 h-8 w-full rounded-md border border-zinc-200 px-2 text-xs text-zinc-600 outline-none transition-colors placeholder:text-zinc-300 focus:border-zinc-400"
              aria-label={`${capability.name} ${CHANNEL_LABELS[channel]} note`}
            />
          </td>
        )
      })}
      <td className="px-3 py-3">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs text-zinc-500">
            <input
              type="checkbox"
              checked={capability.showOnMerchantView}
              onChange={(event) =>
                onCapabilityChange(categoryId, capability.id, {
                  showOnMerchantView: event.target.checked,
                })
              }
              className="h-4 w-4 rounded border-zinc-300"
            />
            Merchant
          </label>
          <label className="flex items-center gap-2 text-xs text-zinc-500">
            <input
              type="checkbox"
              checked={capability.internalOnly ?? false}
              onChange={(event) =>
                onCapabilityChange(categoryId, capability.id, {
                  internalOnly: event.target.checked,
                })
              }
              className="h-4 w-4 rounded border-zinc-300"
            />
            Internal
          </label>
          <button
            type="button"
            onClick={() => onRemove(categoryId, capability.id)}
            className="mt-1 inline-flex h-8 w-fit items-center gap-1 rounded-md border border-red-100 px-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}
