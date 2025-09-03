"use client"

import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function AppointmentsPage() {
  const [form, setForm] = useState({ name: "", dob: "", time: "", place: "", preferredDateTime: "" })
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setError(null)
    const res = await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
    const json = await res.json()
    if (res.ok) setResult(json.appointment)
    else setError(json.error || "Failed to book appointment")
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Book an Appointment</h1>
        <p className="text-muted-foreground">
          Provide birth details and choose a preferred slot. If confirmed, you’ll receive a unique appointment key to
          unlock the chatbot at the scheduled time.
        </p>
        {!result ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm">Name</label>
              <Input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm">Date of Birth</label>
              <Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </div>

            <div className="space-y-1">
              <label className="text-sm">Time of Birth</label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>

            <div className="space-y-1">
              <label className="text-sm">Place of Birth</label>
              <Input
                placeholder="City, Country"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm">Preferred Date & Time</label>
              <Input
                type="datetime-local"
                value={form.preferredDateTime}
                onChange={(e) => setForm({ ...form, preferredDateTime: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <Button onClick={submit}>Submit</Button>
              {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
            </div>

            <div className="md:col-span-2 rounded-md border p-4 text-sm text-muted-foreground">
              Instructions: Use the appointment key on the Chatbot page to begin your session. The chat unlocks around
              your scheduled time and auto-expires afterward.
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Request Submitted</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-muted-foreground">Name:</span> {result.name}
              </div>
              <div>
                <span className="text-muted-foreground">Slot:</span>{" "}
                {new Date(result.preferredDateTime).toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span> {result.status}
              </div>
              <div className="rounded bg-muted p-2 text-sm">
                Your Appointment Key: <span className="font-mono text-base">{result.key}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Keep this key private. You’ll need it to unlock the Chatbot. Admin may approve the slot before chat
                opens.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
