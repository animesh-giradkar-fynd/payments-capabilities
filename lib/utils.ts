import type { ChannelKey, SupportStatus } from './types'

export const CHANNEL_LABELS: Record<ChannelKey, string> = {
  storefront: 'Online store',
  storeOS: 'Store OS',
  agenticCheckout: 'Agentic',
}

export const CHANNEL_FULL_LABELS: Record<ChannelKey, string> = {
  storefront: 'Online store',
  storeOS: 'Store OS / POS',
  agenticCheckout: 'Agentic checkout',
}

export const CHANNEL_SUBTEXT: Record<ChannelKey, string> = {
  storefront:
    'The full payments stack — every method your online customers expect, all in one checkout.',
  storeOS:
    'Fast, reliable in-store payments — cards, cash, UPI QR, and split tender at the counter.',
  agenticCheckout:
    'Conversational checkout — payments via link today, with UPI and wallets coming soon.',
}

export function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function merchantStatus(status: SupportStatus): SupportStatus {
  return status === 'wip' ? 'partial' : status
}

export function statusDotColor(status: SupportStatus): string {
  switch (merchantStatus(status)) {
    case 'supported':
      return 'bg-green-600'
    case 'partial':
      return 'bg-amber-500'
    case 'planned':
      return 'bg-violet-500'
    case 'not-supported':
      return 'bg-zinc-300'
    case 'na':
      return 'bg-zinc-200'
    default:
      return 'bg-zinc-300'
  }
}

export function statusMerchantLabel(status: SupportStatus): string {
  switch (merchantStatus(status)) {
    case 'supported':
      return 'Available'
    case 'partial':
      return 'Available with conditions'
    case 'planned':
      return 'Coming soon'
    case 'not-supported':
      return 'Not available'
    case 'na':
      return 'Not applicable'
    default:
      return 'Not available'
  }
}

export function statusAdminLabel(status: SupportStatus): string {
  switch (status) {
    case 'supported':
      return 'Supported'
    case 'partial':
      return 'Partial'
    case 'wip':
      return 'WIP'
    case 'planned':
      return 'Planned'
    case 'not-supported':
      return 'Not supported'
    case 'na':
      return 'N/A'
    default:
      return status
  }
}

export function statusAdminColors(status: SupportStatus): string {
  switch (status) {
    case 'supported':
      return 'border-green-200 bg-green-50 text-green-700'
    case 'partial':
      return 'border-amber-200 bg-amber-50 text-amber-700'
    case 'wip':
      return 'border-orange-200 bg-orange-50 text-orange-700'
    case 'planned':
      return 'border-violet-200 bg-violet-50 text-violet-700'
    case 'not-supported':
      return 'border-zinc-200 bg-zinc-50 text-zinc-500'
    case 'na':
      return 'border-zinc-200 bg-white text-zinc-400'
    default:
      return 'border-zinc-200 bg-white text-zinc-600'
  }
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
