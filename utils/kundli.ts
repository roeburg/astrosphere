import type { Planet, House } from "./kundliData"

export type KundliResult = {
  placements: Record<House, Planet[]>
  interpretations: string[]
}

const planets: Planet[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]

export function computePlacements(name: string, dob: string, time: string, place: string): Record<House, Planet[]> {
  // Deterministic pseudo-mapping: hash inputs into 12 buckets
  const seed = `${name}|${dob}|${time}|${place}`
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 131 + seed.charCodeAt(i)) >>> 0

  const placements: Record<House, Planet[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  }
  planets.forEach((p, idx) => {
    const house = ((h + idx * 97) % 12) + 1
    placements[house as House].push(p)
  })
  return placements
}
