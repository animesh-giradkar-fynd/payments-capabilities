import type { CapabilityCategory } from '@/lib/types'

type TableCategoryRowProps = {
  category: CapabilityCategory
  visibleCount: number
}

export function TableCategoryRow({
  category,
  visibleCount,
}: TableCategoryRowProps) {
  return (
    <tr>
      <th colSpan={7} className="bg-fynd-surface-20 px-4 py-3 text-left">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-fynd-muted">
              {category.name}
            </p>
            {category.description ? (
              <p className="mt-1 text-xs font-normal normal-case tracking-normal text-fynd-muted">
                {category.description}
              </p>
            ) : null}
          </div>
          <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-medium text-fynd-subdued ring-1 ring-fynd-border">
            {visibleCount}
          </span>
        </div>
      </th>
    </tr>
  )
}
