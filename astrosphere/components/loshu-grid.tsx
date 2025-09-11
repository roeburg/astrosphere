"use client"

type Props = {
  loshu: Record<number, number[]>
}
const cellsOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6]

export function LoshuGrid({ loshu }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {cellsOrder.map((cell) => (
        <div key={cell} className="rounded-md border p-3 text-center">
          <div className="text-xs text-muted-foreground mb-1">Cell {cell}</div>
          <div className="flex flex-wrap justify-center gap-1">
            {(loshu[cell] ?? []).length === 0 ? (
              <span className="text-xs text-muted-foreground">empty</span>
            ) : (
              (loshu[cell] ?? []).map((d, i) => (
                <span key={i} className="inline-flex h-6 w-6 items-center justify-center rounded bg-secondary text-sm">
                  {d}
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
