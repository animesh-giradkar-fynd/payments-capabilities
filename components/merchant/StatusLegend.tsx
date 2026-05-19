const LEGEND_ITEMS = [
  { label: 'Available', marker: 'h-1.5 w-1.5 rounded-full bg-green-600' },
  {
    label: 'Available with conditions',
    marker: 'h-1.5 w-1.5 rounded-full bg-amber-500',
  },
  { label: 'Coming soon', marker: 'rounded-full bg-violet-100 px-1.5 py-0.5' },
  { label: 'Not available', marker: 'h-1.5 w-1.5 rounded-full bg-zinc-300' },
]

export function StatusLegend() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-zinc-100 px-6 py-4">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex h-6 items-center gap-2">
          {item.label === 'Coming soon' ? (
            <span className={item.marker}>
              <span className="text-[10px] font-medium text-violet-700">Soon</span>
            </span>
          ) : (
            <span className={item.marker} />
          )}
          <span className="text-xs text-zinc-500">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
