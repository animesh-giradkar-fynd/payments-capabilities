import type { CapabilityCategory, ChannelKey } from '@/lib/types'
import { CapabilityCard } from './CapabilityCard'

type CapabilitySectionProps = {
  category: CapabilityCategory
  channel: ChannelKey
}

export function CapabilitySection({ category, channel }: CapabilitySectionProps) {
  const capabilities = category.capabilities.filter((capability) => {
    if (!capability.showOnMerchantView || capability.internalOnly === true) {
      return false
    }

    const status = capability.channels[channel]?.status
    if (status === 'na' && category.id !== 'methods') {
      return false
    }

    return true
  })

  if (capabilities.length === 0) return null

  return (
    <section>
      <div className="border-y border-zinc-100 bg-zinc-50 px-5 py-2.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          {category.name}
        </h2>
        {category.description ? (
          <p className="mt-0.5 text-xs normal-case text-zinc-400">
            {category.description}
          </p>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-px bg-zinc-100 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <CapabilityCard
            key={capability.id}
            capability={capability}
            channel={channel}
          />
        ))}
      </div>
    </section>
  )
}
