'use client'

import { useState } from 'react'
import { CapabilityHero } from '@/components/merchant/CapabilityHero'
import { CapabilitySection } from '@/components/merchant/CapabilitySection'
import { ChannelTabs } from '@/components/merchant/ChannelTabs'
import { StatusLegend } from '@/components/merchant/StatusLegend'
import type { ChannelKey } from '@/lib/types'
import { useCapabilities } from '@/lib/useCapabilities'
import { CHANNEL_SUBTEXT } from '@/lib/utils'

export default function MerchantPage() {
  const [activeChannel, setActiveChannel] = useState<ChannelKey>('storefront')
  const { data, error } = useCapabilities()

  return (
    <main className="min-h-screen bg-zinc-50 pb-10">
      <CapabilityHero data={data} />

      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <ChannelTabs
          activeChannel={activeChannel}
          onChange={setActiveChannel}
        />
        <p className="border-b border-zinc-100 bg-zinc-50 px-6 py-3 text-xs text-zinc-500">
          {CHANNEL_SUBTEXT[activeChannel]}
        </p>

        {error ? (
          <div className="border-b border-amber-100 bg-amber-50 px-6 py-3 text-xs text-amber-700">
            Showing local capability data because the committed JSON could not
            be fetched.
          </div>
        ) : null}

        {data.categories
          .filter((category) => category.showOnMerchantView)
          .map((category) => (
            <CapabilitySection
              key={category.id}
              category={category}
              channel={activeChannel}
            />
          ))}

        <StatusLegend />
      </section>
    </main>
  )
}
