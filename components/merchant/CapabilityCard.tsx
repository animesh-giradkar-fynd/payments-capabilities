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
      return 'bg-green-50 text-green-700'
    case 'partial':
      return 'bg-amber-50 text-amber-700'
    case 'planned':
      return 'bg-violet-50 text-violet-600'
    case 'not-supported':
    case 'na':
      return 'bg-zinc-100 text-zinc-400'
    default:
      return 'bg-zinc-100 text-zinc-400'
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
    <article className="flex min-h-[80px] items-start gap-3 bg-white p-4 transition-colors duration-100 hover:bg-zinc-50">
      <div
        className={classNames(
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
          iconContainerClass(status),
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={classNames(
            'text-sm font-medium',
            muted ? 'text-zinc-400' : 'text-zinc-800',
          )}
        >
          {capability.name}
        </h3>
        <p
          className={classNames(
            'mt-0.5 text-xs leading-relaxed',
            muted ? 'text-zinc-400 opacity-70' : 'text-zinc-500',
          )}
        >
          {capability.description}
        </p>
      </div>

      <div className="mt-1 flex-shrink-0" aria-label={label}>
        {merchantSafeStatus === 'planned' ? (
          <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-medium text-violet-700">
            Soon
          </span>
        ) : null}

        {merchantSafeStatus === 'supported' ? (
          <span
            className={classNames('block h-1.5 w-1.5 rounded-full', statusDotColor(status))}
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
                      'block h-1.5 w-1.5 rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-amber-400',
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
            className={classNames('block h-1.5 w-1.5 rounded-full', statusDotColor(status))}
          />
        ) : null}
      </div>
    </article>
  )
}
