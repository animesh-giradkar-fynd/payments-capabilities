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
      <div className="border-y border-fynd-iron bg-fynd-surface-20 px-5 py-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-fynd-muted">
              {category.name}
            </h2>
            {category.description ? (
              <p className="mt-0.5 text-xs normal-case text-fynd-muted">
                {category.description}
              </p>
            ) : null}
          </div>
          <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-fynd-subdued ring-1 ring-fynd-border">
            {capabilities.length}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-px bg-fynd-iron sm:grid-cols-2">
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
