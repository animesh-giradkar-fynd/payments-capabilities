'use client'

import { Bot, MonitorSmartphone, Store } from 'lucide-react'
import type { ChannelKey } from '@/lib/types'
import { CHANNEL_LABELS, classNames } from '@/lib/utils'

const CHANNELS: Array<{
  key: ChannelKey
  icon: typeof MonitorSmartphone
}> = [
  { key: 'storefront', icon: MonitorSmartphone },
  { key: 'storeOS', icon: Store },
  { key: 'agenticCheckout', icon: Bot },
]

type ChannelTabsProps = {
  activeChannel: ChannelKey
  onChange: (channel: ChannelKey) => void
}

export function ChannelTabs({ activeChannel, onChange }: ChannelTabsProps) {
  return (
    <div className="overflow-x-auto border-b border-zinc-100 bg-white">
      <div className="flex min-w-max px-2 py-2">
        {CHANNELS.map(({ key, icon: Icon }) => {
          const active = activeChannel === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={classNames(
                'inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors',
                active
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900',
              )}
              aria-pressed={active}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {CHANNEL_LABELS[key]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
