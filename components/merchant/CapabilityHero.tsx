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
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-6 pt-7 sm:px-6 sm:pt-9">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-fynd-primary text-sm font-semibold text-white shadow-fynd">
              F
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-fynd-muted">
                Fynd Platform
              </p>
              <p className="mt-0.5 text-xs font-medium text-fynd-primaryHover">
                Payments
              </p>
            </div>
          </div>
          <h1 className="mt-5 text-2xl font-semibold leading-tight text-fynd-text sm:text-[32px]">
            Capability dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-fynd-subdued">
            A merchant-ready view of payment methods, checkout extensions,
            post-payment flows, and gateways across Fynd channels.
          </p>
        </div>
      </div>

      <div className="grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-fynd-border bg-fynd-border shadow-fynd">
        <div className="bg-white px-4 py-3">
          <p className="text-lg font-semibold text-fynd-text">
            {visibleCategories.length}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-fynd-muted">
            Categories
          </p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-lg font-semibold text-fynd-text">
            {visibleCapabilities.length}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-fynd-muted">
            Capabilities
          </p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-lg font-semibold text-fynd-text">3</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-fynd-muted">
            Channels
          </p>
        </div>
      </div>
    </section>
  )
}
