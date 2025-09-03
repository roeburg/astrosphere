"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { makeNumerology, type NumerologyResult } from "@/utils/numerology"
import { LoshuGrid } from "@/components/loshu-grid"

export default function NumerologyPage() {
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [time, setTime] = useState("") // added
  const [place, setPlace] = useState("") // added
  const [result, setResult] = useState<NumerologyResult | null>(null)

  const generate = () => {
    if (!name || !dob || !time || !place) return
    setResult(makeNumerology(name, dob))
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Numerology Report</h1>
        <p className="text-muted-foreground">
          Enter your birth details. We will compute your Driver and Conductor numbers, populate the Loshu Grid, and
          summarize planetary effects based on digit repetitions.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
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
            <Input placeholder="City, Country" value={place} onChange={(e) => setPlace(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Button onClick={generate}>Generate</Button>
          </div>
        </div>

        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Numbers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  Driver Number: <span className="font-medium">{result.driver}</span>
                </div>
                <div>
                  Conductor Number: <span className="font-medium">{result.conductor}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Loshu Grid</CardTitle>
              </CardHeader>
              <CardContent>
                <LoshuGrid loshu={result.loshu} />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Interpretations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.interpretations.map((t, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {t}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {!result && (
          <div className="rounded-md border p-4 text-sm text-muted-foreground">
            Numerology Introduction: numbers mirror energetic patterns in your life. The Driver represents the outward
            self and default approach, while the Conductor reflects deeper motives and the path of integration. The
            Loshu grid reveals balance and excess across life domains.
          </div>
        )}
      </div>
    </main>
  )
}
