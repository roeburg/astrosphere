"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import base, { type Planet, type House } from "@/utils/kundliData"
import { computePlacements } from "@/utils/kundli"
import { KundliChart } from "@/components/kundli-chart"

export default function KundliPage() {
  const [name, setName] = useState("")
  const [dob, setDob] = useState("") // YYYY-MM-DD
  const [time, setTime] = useState("") // HH:mm
  const [place, setPlace] = useState("")
  const [placements, setPlacements] = useState<Record<House, Planet[]> | null>(null)

  const generate = () => {
    if (!name || !dob || !time || !place) return
    setPlacements(computePlacements(name, dob, time, place) as any)
  }

  const interps = (() => {
    if (!placements) return []
    const out: string[] = []
    ;(Object.keys(placements) as unknown as House[]).forEach((h) => {
      placements[h].forEach((p) => out.push(`${p} in House ${h} → ${base[p][h]}`))
    })
    return out
  })()

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Vedic Kundli Report</h1>
        <p className="text-muted-foreground">
          Input your details to generate a Kundli-style placement map. We place the nine grahas (Sun to Ketu) across the
          twelve houses and summarize core effects. This is a simplified model for demo—exact positions require
          astronomical data.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Date of Birth</label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Time of Birth</label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Place of Birth</label>
            <Input placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} />
          </div>
        </div>
        <Button onClick={generate}>Generate</Button>

        {placements && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>12-House Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <KundliChart placements={placements as any} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interpretations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {interps.map((t, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {t}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {!placements && (
          <div className="rounded-md border p-4 text-sm text-muted-foreground">
            Intro to Vedic Astrology: The twelve houses describe life arenas from self and family to career and
            liberation. Planetary placements color each house’s expression. While this demo uses a deterministic model,
            the interpretive framework mirrors classical insights.
          </div>
        )}
      </div>
    </main>
  )
}
