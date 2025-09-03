"use client"

import type { Planet } from "@/utils/kundliData"

type Props = {
  placements: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, Planet[]>
}

export function KundliChart({ placements }: Props) {
  const houses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
  return (
    <div className="grid grid-cols-4 gap-2">
      {houses.map((h) => (
        <div key={h} className="rounded-md border p-2">
          <div className="mb-1 text-xs text-muted-foreground">House {h}</div>
          <div className="flex flex-wrap gap-1">
            {placements[h].length === 0 ? (
              <span className="text-xs text-muted-foreground">—</span>
            ) : (
              placements[h].map((p, i) => (
                <span key={i} className="rounded bg-secondary px-2 py-0.5 text-xs">
                  {p}
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
