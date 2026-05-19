'use client'

import { FormEvent, useMemo, useState } from 'react'
import {
  ArrowLeftRight,
  Banknote,
  BarChart3,
  Building2,
  CalendarClock,
  CircleDot,
  CreditCard,
  Globe,
  Link,
  PackageCheck,
  Puzzle,
  ReceiptText,
  RotateCcw,
  Settings2,
  ShieldCheck,
  SplitSquareHorizontal,
  UserCheck,
  Wallet,
  Webhook,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type {
  Capability,
  CapabilityCategory,
  ChannelKey,
  SupportStatus,
} from '@/lib/types'
import { CHANNEL_KEYS } from '@/lib/types'
import { CHANNEL_FULL_LABELS, classNames, slugify } from '@/lib/utils'
import { StatusSelect } from './StatusSelect'

const ICON_OPTIONS: Array<{ key: string; icon: LucideIcon }> = [
  { key: 'ArrowLeftRight', icon: ArrowLeftRight },
  { key: 'CreditCard', icon: CreditCard },
  { key: 'Building2', icon: Building2 },
  { key: 'Wallet', icon: Wallet },
  { key: 'PackageCheck', icon: PackageCheck },
  { key: 'ReceiptText', icon: ReceiptText },
  { key: 'CalendarClock', icon: CalendarClock },
  { key: 'Banknote', icon: Banknote },
  { key: 'Globe', icon: Globe },
  { key: 'Puzzle', icon: Puzzle },
  { key: 'ShieldCheck', icon: ShieldCheck },
  { key: 'SplitSquareHorizontal', icon: SplitSquareHorizontal },
  { key: 'UserCheck', icon: UserCheck },
  { key: 'Link', icon: Link },
  { key: 'RotateCcw', icon: RotateCcw },
  { key: 'Webhook', icon: Webhook },
  { key: 'BarChart3', icon: BarChart3 },
  { key: 'Zap', icon: Zap },
  { key: 'Settings2', icon: Settings2 },
]

type AddCapabilityModalProps = {
  open: boolean
  categories: CapabilityCategory[]
  onClose: () => void
  onAdd: (categoryId: string, capability: Capability) => void
}

type ChannelDraft = Record<ChannelKey, SupportStatus>

function uniqueId(name: string, categories: CapabilityCategory[]) {
  const existing = new Set(
    categories.flatMap((category) =>
      category.capabilities.map((capability) => capability.id),
    ),
  )
  const base = slugify(name) || 'capability'
  let next = base
  let index = 2

  while (existing.has(next)) {
    next = `${base}-${index}`
    index += 1
  }

  return next
}

export function AddCapabilityModal({
  open,
  categories,
  onClose,
  onAdd,
}: AddCapabilityModalProps) {
  const firstCategoryId = categories[0]?.id ?? ''
  const [categoryId, setCategoryId] = useState(firstCategoryId)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('CircleDot')
  const [showOnMerchantView, setShowOnMerchantView] = useState(true)
  const [internalOnly, setInternalOnly] = useState(false)
  const [statuses, setStatuses] = useState<ChannelDraft>({
    storefront: 'not-supported',
    storeOS: 'not-supported',
    agenticCheckout: 'not-supported',
  })

  const selectedIcon = useMemo(
    () => ICON_OPTIONS.find((option) => option.key === icon)?.icon ?? CircleDot,
    [icon],
  )
  const SelectedIcon = selectedIcon

  if (!open) return null

  function reset() {
    setCategoryId(firstCategoryId)
    setName('')
    setDescription('')
    setIcon('CircleDot')
    setShowOnMerchantView(true)
    setInternalOnly(false)
    setStatuses({
      storefront: 'not-supported',
      storeOS: 'not-supported',
      agenticCheckout: 'not-supported',
    })
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedDescription = description.trim()
    if (!trimmedName || !trimmedDescription || !categoryId) return

    onAdd(categoryId, {
      id: uniqueId(trimmedName, categories),
      name: trimmedName,
      description: trimmedDescription,
      icon,
      showOnMerchantView,
      internalOnly,
      channels: {
        storefront: { status: statuses.storefront },
        storeOS: { status: statuses.storeOS },
        agenticCheckout: { status: statuses.agenticCheckout },
      },
    })
    reset()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-fynd-text/30 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-capability-title"
    >
      <form
        onSubmit={onSubmit}
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg border border-fynd-border bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-fynd-iron px-5 py-4">
          <div>
            <h2
              id="add-capability-title"
              className="text-base font-semibold text-fynd-text"
            >
              Add capability
            </h2>
            <p className="mt-1 text-xs text-fynd-muted">
              New rows are saved to localStorage until exported.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded text-fynd-muted transition-colors hover:bg-fynd-surface-20 hover:text-fynd-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-4 px-5 py-5">
          <label className="grid gap-1.5 text-xs font-medium text-fynd-subdued">
            Category
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="h-10 rounded border border-fynd-border bg-white px-3 text-sm text-fynd-mako outline-none focus:border-fynd-primary"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-xs font-medium text-fynd-subdued">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-10 rounded border border-fynd-border px-3 text-sm text-fynd-mako outline-none focus:border-fynd-primary"
              required
            />
          </label>

          <label className="grid gap-1.5 text-xs font-medium text-fynd-subdued">
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="resize-none rounded border border-fynd-border px-3 py-2 text-sm text-fynd-mako outline-none focus:border-fynd-primary"
              required
            />
          </label>

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-fynd-subdued">
              <SelectedIcon
                className="h-4 w-4 text-fynd-primaryHover"
                aria-hidden="true"
              />
              Icon
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {ICON_OPTIONS.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  title={key}
                  onClick={() => setIcon(key)}
                  className={classNames(
                    'flex h-10 items-center justify-center rounded border border-fynd-border text-fynd-subdued transition-colors hover:bg-fynd-primarySoft hover:text-fynd-primaryHover',
                    icon === key &&
                      'border-fynd-primary bg-fynd-primarySoft text-fynd-primaryHover ring-2 ring-fynd-primary',
                  )}
                  aria-label={key}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {CHANNEL_KEYS.map((channel) => (
              <label
                key={channel}
                className="grid gap-1.5 text-xs font-medium text-fynd-subdued"
              >
                {CHANNEL_FULL_LABELS[channel]}
                <StatusSelect
                  value={statuses[channel]}
                  onChange={(status) =>
                    setStatuses((current) => ({ ...current, [channel]: status }))
                  }
                  label={`${CHANNEL_FULL_LABELS[channel]} default status`}
                />
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-fynd-subdued">
              <input
                type="checkbox"
                checked={showOnMerchantView}
                onChange={(event) => setShowOnMerchantView(event.target.checked)}
                className="h-4 w-4 rounded border-fynd-border accent-fynd-primary"
              />
              Show on merchant view
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-fynd-subdued">
              <input
                type="checkbox"
                checked={internalOnly}
                onChange={(event) => setInternalOnly(event.target.checked)}
                className="h-4 w-4 rounded border-fynd-border accent-fynd-primary"
              />
              Internal only
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-fynd-iron px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded border border-fynd-border px-3 text-sm font-medium text-fynd-subdued transition-colors hover:bg-fynd-surface-20"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-9 rounded bg-fynd-primary px-3 text-sm font-medium text-white transition-colors hover:bg-fynd-primaryHover"
          >
            Add capability
          </button>
        </div>
      </form>
    </div>
  )
}
