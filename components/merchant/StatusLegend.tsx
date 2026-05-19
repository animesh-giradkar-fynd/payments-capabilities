const LEGEND_ITEMS = [
  { label: 'Available', marker: 'h-1.5 w-1.5 rounded-full bg-fynd-success-50' },
  {
    label: 'Available with conditions',
    marker: 'h-1.5 w-1.5 rounded-full bg-fynd-warning-50',
  },
  { label: 'Coming soon', marker: 'rounded-full bg-fynd-primarySoft px-1.5 py-0.5' },
  { label: 'Not available', marker: 'h-1.5 w-1.5 rounded-full bg-fynd-border' },
]

export function StatusLegend() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-fynd-iron bg-white px-6 py-4">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex h-6 items-center gap-2">
          {item.label === 'Coming soon' ? (
            <span className={item.marker}>
              <span className="text-[10px] font-medium text-fynd-primaryHover">Soon</span>
            </span>
          ) : (
            <span className={item.marker} />
          )}
          <span className="text-xs text-fynd-subdued">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
