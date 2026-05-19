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
    <main className="min-h-screen bg-fynd-surface-20 pb-10">
      <CapabilityHero data={data} />

      <section className="mx-auto w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-lg border border-fynd-border bg-white shadow-fynd sm:w-[calc(100%-3rem)]">
        <ChannelTabs
          activeChannel={activeChannel}
          onChange={setActiveChannel}
        />
        <div className="border-b border-fynd-iron bg-fynd-surface-10 px-5 py-3 sm:px-6">
          <p className="max-w-3xl text-xs leading-5 text-fynd-subdued">
            {CHANNEL_SUBTEXT[activeChannel]}
          </p>
        </div>

        {error ? (
          <div className="border-b border-fynd-warning-20 bg-fynd-warning-20 px-6 py-3 text-xs text-fynd-warning-80">
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
