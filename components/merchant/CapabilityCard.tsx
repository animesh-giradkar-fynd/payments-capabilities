import {
  ArrowLeftRight,
  Banknote,
  BarChart3,
  Building2,
  CalendarClock,
  CircleDot,
  CreditCard,
  Globe,
  Link,
  PackageCheck,
  Puzzle,
  ReceiptText,
  RotateCcw,
  Settings2,
  ShieldCheck,
  SplitSquareHorizontal,
  UserCheck,
  Wallet,
  Webhook,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { Capability, ChannelKey, SupportStatus } from '@/lib/types'
import {
  classNames,
  merchantStatus,
  statusDotColor,
  statusMerchantLabel,
} from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowLeftRight,
  CreditCard,
  Building2,
  Wallet,
  PackageCheck,
  ReceiptText,
  CalendarClock,
  Banknote,
  Globe,
  Puzzle,
  ShieldCheck,
  SplitSquareHorizontal,
  UserCheck,
  Link,
  RotateCcw,
  Webhook,
  BarChart3,
  Zap,
  Settings2,
}

type CapabilityCardProps = {
  capability: Capability
  channel: ChannelKey
}

function iconContainerClass(status: SupportStatus) {
  switch (merchantStatus(status)) {
    case 'supported':
      return 'bg-fynd-success-20 text-fynd-success-80 ring-fynd-success-20'
    case 'partial':
      return 'bg-fynd-warning-20 text-fynd-warning-80 ring-fynd-warning-20'
    case 'planned':
      return 'bg-fynd-primarySoft text-fynd-primaryHover ring-fynd-primarySoft'
    case 'not-supported':
    case 'na':
      return 'bg-fynd-surface-20 text-fynd-muted ring-fynd-border'
    default:
      return 'bg-fynd-surface-20 text-fynd-muted ring-fynd-border'
  }
}

function statusTextClass(status: SupportStatus) {
  switch (merchantStatus(status)) {
    case 'supported':
      return 'text-fynd-success-80'
    case 'partial':
      return 'text-fynd-warning-80'
    case 'planned':
      return 'text-fynd-primaryHover'
    default:
      return 'text-fynd-muted'
  }
}

export function CapabilityCard({ capability, channel }: CapabilityCardProps) {
  const support = capability.channels[channel]
  const status = support.status
  const merchantSafeStatus = merchantStatus(status)
  const Icon = ICON_MAP[capability.icon] ?? CircleDot
  const muted =
    merchantSafeStatus === 'not-supported' || merchantSafeStatus === 'na'
  const label = statusMerchantLabel(status)

  return (
    <article className="flex min-h-[96px] items-start gap-3 bg-white p-4 transition duration-150 hover:bg-fynd-surface-10 hover:shadow-fynd-hover">
      <div
        className={classNames(
          'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded ring-1',
          iconContainerClass(status),
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={classNames(
            'text-sm font-semibold',
            muted ? 'text-fynd-muted' : 'text-fynd-mako',
          )}
        >
          {capability.name}
        </h3>
        <p
          className={classNames(
            'mt-0.5 text-xs leading-relaxed',
            muted ? 'text-fynd-muted opacity-70' : 'text-fynd-subdued',
          )}
        >
          {capability.description}
        </p>
      </div>

      <div
        className={classNames(
          'mt-1 flex flex-shrink-0 items-center gap-1.5 text-[11px] font-medium',
          statusTextClass(status),
        )}
        aria-label={label}
      >
        {merchantSafeStatus === 'planned' ? (
          <span className="rounded-full bg-fynd-primarySoft px-1.5 py-0.5 text-[10px] font-medium text-fynd-primaryHover">
            Soon
          </span>
        ) : null}

        {merchantSafeStatus === 'supported' ? (
          <span
            className={classNames(
              'block h-1.5 w-1.5 rounded-full',
              statusDotColor(status),
            )}
          />
        ) : null}

        {merchantSafeStatus === 'partial' ? (
          support.note ? (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={classNames(
                      'block h-1.5 w-1.5 rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-fynd-warning-50',
                      statusDotColor(status),
                    )}
                    aria-label={`${label}: ${support.note}`}
                  />
                </TooltipTrigger>
                <TooltipContent>{support.note}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span
              className={classNames(
                'block h-1.5 w-1.5 rounded-full',
                statusDotColor(status),
              )}
            />
          )
        ) : null}

        {merchantSafeStatus === 'not-supported' ? (
          <span
            className={classNames(
              'block h-1.5 w-1.5 rounded-full',
              statusDotColor(status),
            )}
          />
        ) : null}
      </div>
    </article>
  )
}
