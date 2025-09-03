export type NumerologyResult = {
  driver: number
  conductor: number
  loshu: Record<number, number[]> // cell number (1..9) -> stacked digits placed
  digitCounts: Record<number, number> // 1..9 counts
  interpretations: string[]
}

const digitToCell: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
} // mapping is direct; visual order will be arranged via grid

// Planet associations 1..9
const planetName: Record<number, string> = {
  1: "Sun",
  2: "Moon",
  3: "Jupiter",
  4: "Rahu",
  5: "Mercury",
  6: "Venus",
  7: "Ketu",
  8: "Saturn",
  9: "Mars",
}

export function reduceToSingle(n: number): number {
  while (n > 9)
    n = n
      .toString()
      .split("")
      .reduce((a, b) => a + Number.parseInt(b), 0)
  return n === 0 ? 9 : n
}

export function calcDriver(day: number): number {
  return reduceToSingle(day)
}

export function calcConductor(dobDigits: number[]): number {
  const sum = dobDigits.reduce((a, b) => a + b, 0)
  return reduceToSingle(sum)
}

export function loshuGrid(digits: number[]): Record<number, number[]> {
  const grid: Record<number, number[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }
  for (const d of digits) {
    if (d >= 1 && d <= 9) grid[digitToCell[d]].push(d)
  }
  return grid
}

export function countDigits(digits: number[]): Record<number, number> {
  const c: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (const d of digits) if (d >= 1 && d <= 9) c[d]++
  return c
}

export function repetitionInterpretations(counts: Record<number, number>): string[] {
  const out: string[] = []
  for (let d = 1; d <= 9; d++) {
    const planet = planetName[d]
    const c = counts[d]
    if (c === 1) out.push(`${planet}: Basic planet effect present.`)
    else if (c === 2) out.push(`${planet}: Full + Good effect (balanced strength, supportive outcomes).`)
    else if (c === 3) out.push(`${planet}: Bad basic effect (over-activation may cause challenges).`)
    else if (c >= 4) out.push(`${planet}: Full + Bad effect (excess energy may need remedies).`)
  }
  return out
}

export function makeNumerology(name: string, dobStr: string): NumerologyResult {
  // Expect dobStr as YYYY-MM-DD
  const [y, m, d] = dobStr.split("-").map((s) => Number.parseInt(s))
  const digitsRaw = `${y}${m.toString().padStart(2, "0")}${d.toString().padStart(2, "0")}`
    .split("")
    .map((x) => Number.parseInt(x))
    .filter((x) => x >= 0 && x <= 9)
  const digits = digitsRaw.map((x) => (x === 0 ? 9 : x)) // map 0 -> 9 by convention
  const driver = calcDriver(d)
  const conductor = calcConductor(digits)
  const loshu = loshuGrid(digits)
  const digitCounts = countDigits(digits)

  const intro = `Numerology for ${name} explores the vibrational essence of your birth date. The Driver (day of birth) represents your outer personality, while the Conductor (sum of all birth date digits) reflects your core path and inner drive.`
  const rules = `Repetition Rules: Single → Basic Planet Effect; Double → Full + Good Effect; Triple → Bad Basic Effect; Four or more → Full + Bad Effect.`
  const loshuInfo = `Loshu Grid maps digits 1–9 into a 3×3 energy matrix. Empty cells suggest areas to balance, while stacked digits show strengths.`

  const reps = repetitionInterpretations(digitCounts)

  return {
    driver,
    conductor,
    loshu,
    digitCounts,
    interpretations: [intro, rules, loshuInfo, ...reps],
  }
}
