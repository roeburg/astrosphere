import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">About AstroSense</h1>
        <p className="text-pretty text-muted-foreground">
          AstroSense is a role-based astrology platform that unifies Numerology, Vedic astrology, and guided sessions in
          a seamless experience. Our mission is to make ancient sciences accessible, interpretable, and useful for
          meaningful life decisions.
        </p>
        <p className="text-pretty text-muted-foreground">
          We blend tradition with modern UI and thoughtful automation. From Driver and Conductor numbers to 12-house
          Kundli insights, each report surfaces key themes with clarity. Appointments and a key-secured chatbot enable
          personalized guidance when you need it.
        </p>
        <p className="text-pretty text-muted-foreground">
          Vision: Empower users with self-knowledge, practical remedies, and timely counsel—delivered through secure,
          intuitive tools.
        </p>
      </div>
    </main>
  )
}
