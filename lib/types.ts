export type SupportStatus =
  | 'supported'
  | 'partial'
  | 'wip'
  | 'planned'
  | 'not-supported'
  | 'na'

export type ChannelKey = 'storefront' | 'storeOS' | 'agenticCheckout'

export type ChannelSupport = {
  status: SupportStatus
  note?: string
}

export type Capability = {
  id: string
  name: string
  description: string
  icon: string
  showOnMerchantView: boolean
  internalOnly?: boolean
  channels: Record<ChannelKey, ChannelSupport>
}

export type CapabilityCategory = {
  id: string
  name: string
  description?: string
  showOnMerchantView: boolean
  capabilities: Capability[]
}

export type CapabilitiesData = {
  categories: CapabilityCategory[]
}

export type DiffSummaryStats = {
  total: number
  categoryChanges: number
  capabilityChanges: number
  statusChanges: number
}

export const CHANNEL_KEYS: ChannelKey[] = [
  'storefront',
  'storeOS',
  'agenticCheckout',
]

export const SUPPORT_STATUSES: SupportStatus[] = [
  'supported',
  'partial',
  'wip',
  'planned',
  'not-supported',
  'na',
]
