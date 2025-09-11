// utils/numerologyUtils.js

//----------- CORE DATA -----------//

export const numberDetails = {
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
    compatibility: [1, 7],
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
    compatibility: [],
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
};

//----------- HELPERS -----------//

export function reduceToSingle(n) {
  while (n > 9 && n !== 11 && n !== 22) {
    n = n
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return n;
}

export function loshuGrid(digits) {
  const grid = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
  for (const d of digits) {
    if (d >= 1 && d <= 9) grid[d].push(d);
  }
  return grid;
}

export function countDigits(digits) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (const d of digits) {
    if (d >= 1 && d <= 9) counts[d]++;
  }
  return counts;
}

export function repetitionInterpretations(counts) {
  const out = [];
  for (let d = 1; d <= 9; d++) {
    const planet = numberDetails[d].planet;
    const c = counts[d];
    if (c === 0) continue;
    if (c === 1) out.push(`${d} (${planet}) x1: Basic planet effect present.`);
    else if (c === 2) out.push(`${d} (${planet}) x2: Full + Good effect (balanced strength).`);
    else if (c === 3) out.push(`${d} (${planet}) x3: Over-activation, challenges may occur.`);
    else if (c >= 4) out.push(`${d} (${planet}) x${c}: Excess energy, remedies may be needed.`);
  }
  return out;
}

//----------- MAIN FUNCTION -----------//

export function makeNumerology(name, dobStr) {
  const [y, m, d] = dobStr.split("-").map(Number);
  const digits = `${y}${m.toString().padStart(2, "0")}${d.toString().padStart(2, "0")}`
    .split("")
    .map(Number);

  const driver = reduceToSingle(d);
  const conductor = reduceToSingle(digits.reduce((a, b) => a + b, 0));
  const loshu = loshuGrid(digits);
  const digitCounts = countDigits(digits);
  const reps = repetitionInterpretations(digitCounts);

  const driverDetails = numberDetails[driver];
  const conductorDetails = numberDetails[conductor];

  const fullInterpretation = `
✨ Numerology Report for ${name} (${dobStr}) ✨

👤 Driver Number: ${driver} (${driverDetails.planet})
Represents your outer personality. ${driverDetails.personalityTraits[0]}. Advice: ${driverDetails.advice}

🛤️ Conductor Number: ${conductor} (${conductorDetails.planet})
Reflects your life's path. ${conductorDetails.personalityTraits[0]}. Advice: ${conductorDetails.advice}

🔢 Digit Repetitions & Strengths:
${reps.join("\n")}
`;

  return {
    name,
    dob: dobStr,
    driver,
    conductor,
    loshu,
    digitCounts,
    driverDetails,
    conductorDetails,
    repetitionInterpretations: reps,
    fullInterpretation,
  };
}
