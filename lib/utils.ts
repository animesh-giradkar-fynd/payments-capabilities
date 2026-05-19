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
      return 'bg-fynd-success-50'
    case 'partial':
      return 'bg-fynd-warning-50'
    case 'planned':
      return 'bg-fynd-primary'
    case 'not-supported':
      return 'bg-fynd-border'
    case 'na':
      return 'bg-fynd-iron'
    default:
      return 'bg-fynd-border'
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
      return 'border-fynd-success-20 bg-fynd-success-20 text-fynd-success-80'
    case 'partial':
      return 'border-fynd-warning-20 bg-fynd-warning-20 text-fynd-warning-80'
    case 'wip':
      return 'border-fynd-warning-20 bg-fynd-warning-20 text-fynd-warning-80'
    case 'planned':
      return 'border-fynd-primarySoft bg-fynd-primarySoft text-fynd-primaryHover'
    case 'not-supported':
      return 'border-fynd-border bg-fynd-surface-20 text-fynd-muted'
    case 'na':
      return 'border-fynd-border bg-white text-fynd-muted'
    default:
      return 'border-fynd-border bg-white text-fynd-subdued'
  }
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
