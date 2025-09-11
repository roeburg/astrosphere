"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { makeNumerology, numberDetails, rajyogas, type NumerologyResult } from "@/utils/numerology"
import { LoshuGrid } from "@/components/loshu-grid"

function getRajyogsForNumber(num: number, digitCounts: Record<number, number>) {
  return rajyogas
    .filter((yoga) => yoga.numbers.includes(num) && yoga.numbers.every((n) => digitCounts[n] > 0))
    .map((yoga) => yoga.name)
}

export default function NumerologyPage() {
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [time, setTime] = useState("")
  const [place, setPlace] = useState("")
  const [result, setResult] = useState<NumerologyResult | null>(null)

  const generate = () => {
    if (!name || !dob) return
    setResult(makeNumerology(name, dob))
  }

  // Collect all numbers to show (unique, including driver and conductor)
  const getAllNumbers = () => {
    if (!result) return []
    const gridNumbers = Object.keys(result.loshu).filter((num) => result.loshu[Number(num)].length > 0).map(Number)
    const numbers = new Set<number>([result.driver, result.conductor, ...gridNumbers])
    return Array.from(numbers)
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
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Driver & Conductor Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Driver Number:</strong> {result.driver}
                </p>
                <p>
                  <strong>Conductor Number:</strong> {result.conductor}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lo Shu Grid</CardTitle>
              </CardHeader>
              <CardContent>
                <LoshuGrid loshu={result.loshu} highlight={[result.driver, result.conductor]} />
              </CardContent>
            </Card>
            <div>
              {getAllNumbers().map((num) => {
                const detail = numberDetails[num]
                if (!detail) return null
                const rajyogs = getRajyogsForNumber(num, result.digitCounts)
                return (
                  <Card key={num} className="mb-4">
                    <CardHeader>
                      <CardTitle>
                        Number {detail.number} ({detail.planet})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>Birthdates:</strong> {detail.birthDates.join(", ")}
                      </p>
                      <p>
                        <strong>Ishta Devta:</strong> {detail.ishtaDevta}
                      </p>
                      <p>
                        <strong>Personality Traits:</strong> {detail.personalityTraits.join("; ")}
                      </p>
                      <p>
                        <strong>Advice:</strong> {detail.advice}
                      </p>
                      <p>
                        <strong>Compatibility:</strong> {detail.compatibility.length > 0 ? detail.compatibility.join(", ") : "Universal"}
                      </p>
                      <p>
                        <strong>Strengths:</strong> {detail.strengths.join(", ")}
                      </p>
                      <p>
                        <strong>Weaknesses:</strong> {detail.weaknesses.join(", ")}
                      </p>
                      <p>
                        <strong>Best Decision:</strong> {detail.bestDecision}
                      </p>
                      <p>
                        <strong>Rajyog(s) Present:</strong> {rajyogs.length > 0 ? rajyogs.join(", ") : "None"}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Rajyogs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4">
                  {rajyogas.map((yoga) => (
                    <li key={yoga.name}>
                      <strong>{yoga.name}:</strong> {yoga.description}
                    </li>
                  ))}
                </ul>
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