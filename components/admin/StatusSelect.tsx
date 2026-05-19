'use client'

import type { SupportStatus } from '@/lib/types'
import { SUPPORT_STATUSES } from '@/lib/types'
import { classNames, statusAdminColors, statusAdminLabel } from '@/lib/utils'

type StatusSelectProps = {
  value: SupportStatus
  onChange: (value: SupportStatus) => void
  label: string
}

export function StatusSelect({ value, onChange, label }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as SupportStatus)}
      aria-label={label}
      className={classNames(
        'h-8 w-full min-w-32 rounded-md border px-2 text-xs font-medium outline-none transition-colors focus:ring-2 focus:ring-zinc-300',
        statusAdminColors(value),
      )}
    >
      {SUPPORT_STATUSES.map((status) => (
        <option key={status} value={status}>
          {statusAdminLabel(status)}
        </option>
      ))}
    </select>
  )
}
