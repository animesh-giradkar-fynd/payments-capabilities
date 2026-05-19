'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { classNames } from '@/lib/utils'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={classNames(
          'z-50 max-w-xs rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs leading-relaxed text-zinc-600 shadow-lg',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}
