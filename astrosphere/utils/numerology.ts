/**
 * @fileoverview A comprehensive numerology utility for calculating and interpreting birth dates.
 * It provides details on Driver/Conductor numbers, Lo Shu Grid, digit repetitions, and various Rajyogas.
 */

//=========== TYPE DEFINITIONS ===========//



export type NumberDetail = {
  number: number
  planet: string
  birthDates: number[]
  ishtaDevta: string
  personalityTraits: string[]
  advice: string
  compatibility: number[]
  strengths: string[]
  weaknesses: string[]
  bestDecision: string
}

export type RajyogaDetail = {
  name: string
  numbers: number[]
  description: string[]
  combination: string
}

export type OtherYogaDetail = {
  name: string
  condition: (counts: Record<number, number>, driver: number, conductor: number) => boolean
  result: string
}

export type NumerologyResult = {
  name: string
  dob: string
  driver: number
  conductor: number
  loshu: Record<number, number[]>
  digitCounts: Record<number, number>
  driverDetails?: NumberDetail
  conductorDetails?: NumberDetail
  presentYogas: (RajyogaDetail | { name: string; result: string })[]
  repetitionInterpretations: string[]
  fullInterpretation: string // A single formatted string for easy display
}

//=========== CORE DATA CONSTANTS ===========//

export const numberDetails: Record<number, NumberDetail> = {
  1: {
    number: 1,
    planet: "Sun",
    birthDates: [1, 10, 19, 28],
    ishtaDevta: "Surya Dev, Lord Ram",
    personalityTraits: [
      "Natural-born leaders",
      "Independent, enthusiastic, and self-driven",
      "Business-minded and quick to act",
      "Thrive on recognition and success",
    ],
    advice: "Don’t isolate yourself emotionally. Connect with others and share your light.",
    compatibility: [1, 2, 4, 7],
    strengths: ["Fame", "Government authority"],
    weaknesses: ["Ego", "Anger", "Headaches"],
    bestDecision: "Before 3 PM",
  },
  2: {
    number: 2,
    planet: "Moon",
    birthDates: [2, 11, 20, 29],
    ishtaDevta: "Lord Shiva",
    personalityTraits: [
      "Emotional, sensitive, and intuitive",
      "Artistic and diplomatic",
      "Loyal to family, but inward-looking",
      "Often seek emotional security from stronger personalities",
    ],
    advice: "Embrace your softness but avoid dependency.",
    compatibility: [1, 7], // Best with 1, compatible with 7
    strengths: ["Artistry", "Adaptability"],
    weaknesses: ["Indecisiveness", "Mood swings"],
    bestDecision: "After 8 PM",
  },
  3: {
    number: 3,
    planet: "Jupiter",
    birthDates: [3, 12, 21, 30],
    ishtaDevta: "Mahavishnu",
    personalityTraits: [
      "Optimistic, noble, and wise",
      "Strong sense of justice",
      "Idealistic, generous, and spiritual",
      "Natural educators and guides",
    ],
    advice: "Channel idealism practically and be decisive.",
    compatibility: [3, 6, 9],
    strengths: ["Wisdom", "Spiritual guidance"],
    weaknesses: ["Greed", "Indecision"],
    bestDecision: "Thursday",
  },
  4: {
    number: 4,
    planet: "Rahu",
    birthDates: [4, 13, 22, 31],
    ishtaDevta: "Kaal Bhairav, Goddess Saraswati",
    personalityTraits: [
      "Revolutionary and non-traditional",
      "Practical yet spiritual",
      "Highly determined and independent",
      "Workaholics and reformers",
    ],
    advice: "Use your rebel energy for meaningful reform.",
    compatibility: [1, 2, 7],
    strengths: ["Determination", "Mystical abilities"],
    weaknesses: ["Conflicts", "Rigidity"],
    bestDecision: "Saturday",
  },
  5: {
    number: 5,
    planet: "Mercury",
    birthDates: [5, 14, 23],
    ishtaDevta: "Lord Ganesh",
    personalityTraits: [
      "Clever, communicative, and quick-witted",
      "Energetic, adaptable, and persuasive",
      "Love freedom and exploration",
      "Think, act, and move fast",
    ],
    advice: "Avoid distractions; focus on your purpose.",
    compatibility: [], // Universal matchmaker
    strengths: ["Communication", "Business", "Money"],
    weaknesses: ["Impatience", "Impulsiveness"],
    bestDecision: "Wednesday",
  },
  6: {
    number: 6,
    planet: "Venus",
    birthDates: [6, 15, 24],
    ishtaDevta: "Goddess Lakshmi",
    personalityTraits: [
      "Sensual, graceful, and charismatic",
      "Attracted to beauty, luxury, and art",
      "Often surrounded by love and comfort",
      "Generous and peace-loving",
    ],
    advice: "Balance indulgence with discipline.",
    compatibility: [3, 6, 9],
    strengths: ["Charm", "Wealth", "Creativity"],
    weaknesses: ["Vanity", "Overindulgence"],
    bestDecision: "Friday",
  },
  7: {
    number: 7,
    planet: "Ketu",
    birthDates: [7, 16, 25],
    ishtaDevta: "Matsya Avatar (Vishnu)",
    personalityTraits: [
      "Deep thinkers, spiritual seekers",
      "Introverted, emotional, and philosophical",
      "Idealists who often avoid conflict",
      "Compassionate and intuitive",
    ],
    advice: "Strengthen follow-through on ideas.",
    compatibility: [2],
    strengths: ["Spirituality", "Healing", "Wisdom"],
    weaknesses: ["Overthinking", "Escapism"],
    bestDecision: "Tuesday",
  },
  8: {
    number: 8,
    planet: "Saturn",
    birthDates: [8, 17, 26],
    ishtaDevta: "Lord Shani, Lord Hanuman",
    personalityTraits: [
      "Disciplined, hardworking, and patient",
      "Seek control, structure, and stability",
      "May appear cold but deeply emotional",
      "Success through perseverance",
    ],
    advice: "Embrace warmth and open communication.",
    compatibility: [2, 7],
    strengths: ["Loyalty", "Maturity", "Long-term planning"],
    weaknesses: ["Isolation", "Fear", "Pessimism"],
    bestDecision: "Saturday",
  },
  9: {
    number: 9,
    planet: "Mars",
    birthDates: [9, 18, 27],
    ishtaDevta: "Lord Kartikeya, Lord Hanuman",
    personalityTraits: [
      "Bold, courageous, and high-energy",
      "Assertive and independent",
      "Quick to act, often impulsive",
      "Excellent organizers and warriors",
    ],
    advice: "Control impulsiveness and channel energy wisely.",
    compatibility: [3, 6, 9],
    strengths: ["Strength", "Leadership", "Initiative"],
    weaknesses: ["Anger", "Stubbornness"],
    bestDecision: "Tuesday",
  },
}

export const rajyogas: RajyogaDetail[] = [
  {
    name: "Golden Rajyog",
    numbers: [4, 5, 6],
    combination: "4, 5, 6",
    description: [
      "Powerful balance between stability (4), change (5), and prosperity (6).",
      "Brings strong success in business, family harmony, and leadership.",
      "Yields wealth, creativity, and steady growth.",
      "Often seen in people who achieve both material and emotional fulfillment.",
    ],
  },
  {
    name: "Silver Rajyog",
    numbers: [2, 5, 8],
    combination: "2, 5, 8",
    description: [
      "Blends diplomacy (2), adaptability (5), and discipline (8).",
      "Brings excellent negotiation skills, resilience, and financial acumen.",
      "Perfect for corporate careers, politics, and finance.",
      "Signifies a person who can handle pressure gracefully and rise to prominence.",
    ],
  },
  {
    name: "Suryodaya Rajyog",
    numbers: [1, 3, 9],
    combination: "1 (Sun), 3 (Jupiter), 9 (Mars)",
    description: [
      "Best combination for leadership, government service, or high positions.",
      "Makes one powerful, dominant, authoritative, and visionary.",
    ],
  },
  {
    name: "Vijay Rajyog",
    numbers: [1, 5, 6],
    combination: "1 (Sun), 5 (Mercury), 6 (Venus)",
    description: [
      "Brings wealth, luxury, charm, and persuasive leadership.",
      "Excellent for entrepreneurs, influencers, politicians, and diplomats.",
    ],
  },
  {
    name: "Adhyatmika Rajyog",
    numbers: [2, 4, 7],
    combination: "2 (Moon), 4 (Rahu), 7 (Ketu)",
    description: [
      "Grants strong spiritual, occult, and psychic powers.",
      "Makes the person deep, intuitive, and an unconventional visionary.",
      "Best for spiritual leaders, healers, and researchers.",
    ],
  },
  {
    name: "Kalpavriksha Rajyog",
    numbers: [3, 6, 9],
    combination: "3 (Jupiter), 6 (Venus), 9 (Mars)",
    description: [
      "A combination for being creative, magnetic, artistic, and philanthropic.",
      "Often seen in film stars, designers, poets, and teachers.",
    ],
  },
  {
    name: "Vishwaroopa Rajyog",
    numbers: [1, 4, 7],
    combination: "1 (Sun), 4 (Rahu), 7 (Ketu)",
    description: [
      "A rare combination for mystical leadership and sudden rise after struggles.",
      "Works well for military personnel, inventors, or revolutionaries.",
    ],
  },
]

export const otherYogas: OtherYogaDetail[] = [
  {
    name: "Dhan Yoga",
    condition: (counts) => [5, 6, 8].every((num) => counts[num] > 0),
    result: "Extreme wealth and material success.",
  },
  {
    name: "Bhagya Yoga",
    condition: (_, driver, conductor) => {
      const sum = reduceToSingle(driver + conductor)
      return sum === 1 || sum === 3
    },
    result: "Great luck and divine help.",
  },
  {
    name: "Chamatkari Yoga",
    condition: (counts) => Object.values(counts).every((count) => count > 0),
    result: "Miracles, divine protection, and full blessings.",
  },
]

//=========== HELPER FUNCTIONS ===========//

export function reduceToSingle(n: number): number {
  while (n > 9 && n !== 11 && n !== 22) {
    n = n
      .toString()
      .split("")
      .reduce((a, b) => a + Number.parseInt(b), 0)
  }
  return n
}

function calcDriver(day: number): number {
  return reduceToSingle(day)
}

function calcConductor(dobDigits: number[]): number {
  const sum = dobDigits.reduce((a, b) => a + b, 0)
  return reduceToSingle(sum)
}

function loshuGrid(digits: number[]): Record<number, number[]> {
  const grid: Record<number, number[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }
  for (const d of digits) {
    if (d >= 1 && d <= 9) grid[d].push(d)
  }
  return grid
}

function countDigits(digits: number[]): Record<number, number> {
  const c: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  for (const d of digits) {
    if (d >= 1 && d <= 9) c[d]++
  }
  return c
}

function repetitionInterpretations(counts: Record<number, number>): string[] {
  const out: string[] = []
  for (let d = 1; d <= 9; d++) {
    const planet = numberDetails[d].planet
    const c = counts[d]
    if (c === 0) continue
    if (c === 1) out.push(`${d} (${planet}) x1: Basic planet effect present.`)
    else if (c === 2) out.push(`${d} (${planet}) x2: Full + Good effect (balanced strength, supportive outcomes).`)
    else if (c === 3) out.push(`${d} (${planet}) x3: Bad basic effect (over-activation may cause challenges).`)
    else if (c >= 4) out.push(`${d} (${planet}) x${c}: Full + Bad effect (excess energy may need remedies).`)
  }
  return out
}

function checkYogas(
  digitCounts: Record<number, number>,
  driver: number,
  conductor: number
): (RajyogaDetail | { name: string; result: string })[] {
  const present = []

  // Check Rajyogas
  for (const yoga of rajyogas) {
    if (yoga.numbers.every((num) => digitCounts[num] > 0)) {
      present.push(yoga)
    }
  }

  // Check Other Yogas
  for (const yoga of otherYogas) {
    if (yoga.condition(digitCounts, driver, conductor)) {
      present.push({ name: yoga.name, result: yoga.result })
    }
  }

  return present
}

//=========== MAIN CALCULATION FUNCTION ===========//

/**
 * Calculates a full numerology profile from a name and date of birth.
 * @param name The person's name.
 * @param dobStr The date of birth in "YYYY-MM-DD" format.
 * @returns A detailed NumerologyResult object.
 */
export function makeNumerology(name: string, dobStr: string): NumerologyResult {
  const [y, m, d] = dobStr.split("-").map((s) => Number.parseInt(s))
  const digits = `${y}${m.toString().padStart(2, "0")}${d.toString().padStart(2, "0")}`
    .split("")
    .map((x) => Number.parseInt(x))

  const driver = calcDriver(d)
  const conductor = calcConductor(digits)
  const loshu = loshuGrid(digits)
  const digitCounts = countDigits(digits)

  const driverDetails = numberDetails[driver]
  const conductorDetails = numberDetails[conductor]
  const reps = repetitionInterpretations(digitCounts)
  const presentYogas = checkYogas(digitCounts, driver, conductor)

  // Assemble a single comprehensive interpretation string
  let fullInterpretation = `✨ Numerology Report for ${name} (${dobStr}) ✨\n\n`
  fullInterpretation += `👤 Driver Number: ${driver} (${driverDetails?.planet})\n`
  fullInterpretation += `Represents your outer personality and how you are perceived. You are a natural ${driverDetails?.personalityTraits[0].toLowerCase()}.\n`
  fullInterpretation += `Advice: ${driverDetails?.advice}\n\n`

  fullInterpretation += `🛤️ Conductor Number: ${conductor} (${conductorDetails?.planet})\n`
  fullInterpretation += `Reflects your life's path, inner drive, and destiny. Your journey involves being ${conductorDetails?.personalityTraits[0].toLowerCase()}.\n`
  fullInterpretation += `Advice: ${conductorDetails?.advice}\n\n`

  if (reps.length > 0) {
    fullInterpretation += "🔢 Digit Repetitions & Strengths:\n"
    fullInterpretation += reps.join("\n") + "\n\n"
  }

  if (presentYogas.length > 0) {
    fullInterpretation += "🌟 Present Yogas (Special Combinations):\n"
    presentYogas.forEach((yoga) => {
      fullInterpretation += `  • ${yoga.name}: ${
        "result" in yoga ? yoga.result : (yoga as RajyogaDetail).description[0]
      }\n`
    })
  } else {
    fullInterpretation += "🌟 No major yogas are prominent in your chart, indicating a balanced path."
  }

  return {
    name,
    dob: dobStr,
    driver,
    conductor,
    loshu,
    digitCounts,
    driverDetails,
    conductorDetails,
    presentYogas,
    repetitionInterpretations: reps,
    fullInterpretation,
  }
}