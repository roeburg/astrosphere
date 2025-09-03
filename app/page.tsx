import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold md:text-4xl">
              Astrology, Numerology, and Vedic Guidance—All in One Place
            </h1>
            <p className="text-pretty text-muted-foreground">
              AstroSense blends ancient wisdom with a modern, AI-inspired interface. Generate numerology reports,
              explore your Vedic Kundli, book sessions, and chat securely with an astrologer using appointment keys.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <img
              src="/astrology-constellations-dashboard.jpg"
              alt="Astrology dashboard illustration"
              className="h-auto w-full rounded"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          <CardItem
            title="Numerology"
            desc="Driver & Conductor numbers with Loshu grid and planet effects."
            href="/numerology"
          />
          <CardItem
            title="Vedic Kundli"
            desc="12-house placements with concise, actionable interpretations."
            href="/kundli"
          />
          <CardItem
            title="Appointments"
            desc="Book and receive a unique key to unlock the chatbot."
            href="/appointments"
          />
        </div>
      </section>
    </main>
  )
}

function CardItem({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border p-4 transition-colors hover:bg-muted">
      <div className="mb-1 font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </Link>
  )
}
