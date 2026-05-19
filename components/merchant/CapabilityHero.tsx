import type { CapabilitiesData } from '@/lib/types'

type CapabilityHeroProps = {
  data: CapabilitiesData
}

export function CapabilityHero({ data }: CapabilityHeroProps) {
  const visibleCategories = data.categories.filter(
    (category) => category.showOnMerchantView,
  )
  const visibleCapabilities = visibleCategories.flatMap((category) =>
    category.capabilities.filter(
      (capability) =>
        capability.showOnMerchantView && capability.internalOnly !== true,
    ),
  )

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-6 pt-8 sm:px-6 sm:pt-10">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Fynd Payments
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
          Capability dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
          See which payment methods, checkout features, post-payment flows, and
          gateways are available across Online store, Store OS, and Agentic
          checkout.
        </p>
      </div>

      <div className="grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200">
        <div className="bg-white px-4 py-3">
          <p className="text-lg font-semibold text-zinc-900">
            {visibleCategories.length}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Categories
          </p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-lg font-semibold text-zinc-900">
            {visibleCapabilities.length}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Capabilities
          </p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-lg font-semibold text-zinc-900">3</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
            Channels
          </p>
        </div>
      </div>
    </section>
  )
}
