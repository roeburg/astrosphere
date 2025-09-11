"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { KundliChart } from "@/components/kundli-chart"
import { fetchKundliPlanets } from "@/utils/api"

// --- type for backend response ---
// It's good practice to match this interface to the full object from the API
interface PlanetPlacement {
  id: string
  name: string
  house: number
  sign: string
  nakshatra: string
  nakshatra_pad: number
  // You can add the other keys like 'fullDegree', 'isRetro', etc. if needed
}

export default function KundliPage() {
  const [name, setName] = useState("")
  const [dob, setDob] = useState("") // YYYY-MM-DD
  const [time, setTime] = useState("") // HH:mm
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")

  const [placements, setPlacements] = useState<PlanetPlacement[]>([])
  const [placementsByHouse, setPlacementsByHouse] = useState<PlanetPlacement[][]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async () => {
    if (!name || !dob || !time || !lat || !lon) {
      setError("Please fill in all the fields.")
      return
    }
    setError(null)
    setIsLoading(true)
    setPlacements([])
    setPlacementsByHouse([])

    try {
      const [year, month, day] = dob.split("-").map(Number)
      const [hour, minute] = time.split(":").map(Number)

      const res = await fetchKundliPlanets({
        dob: `${day}/${month}/${year}`,
        time: `${hour}:${minute}`,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        tz: 5.5, // IST
      })

      // Check for the correct data keys returned by your API
      if (res.data && res.data.placements && res.data.placementsByHouse) {
        setPlacements(res.data.placements)
        setPlacementsByHouse(res.data.placementsByHouse)
      } else {
        console.error("Unexpected API response structure:", res.data)
        setError("Received an unexpected data format from the server.")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || "An error occurred while generating the report.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Vedic Kundli Report</h1>
        <p className="text-muted-foreground">
          Input your birth details with exact coordinates to generate a Kundli chart and planetary placements.
        </p>

        {/* --- User Inputs --- */}
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
            <label className="text-sm">Latitude</label>
            <Input placeholder="e.g. 18.52" value={lat} onChange={(e) => setLat(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Longitude</label>
            <Input placeholder="e.g. 73.85" value={lon} onChange={(e) => setLon(e.target.value)} />
          </div>
        </div>

        <Button onClick={generate} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Report"}
        </Button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* --- Results Section --- */}
        {placements.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {/* --- Kundli Chart --- */}
            <Card>
              <CardHeader>
                <CardTitle>12-House Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <KundliChart placements={placementsByHouse} />
              </CardContent>
            </Card>

            {/* --- Interpretations --- */}
            <Card>
              <CardHeader>
                <CardTitle>Planetary Placements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* ✅ FIX IS HERE: Access specific properties like planet.name */}
                {placements.map((planet) => (
                  <div key={planet.id} className="space-y-1 border-b pb-2">
                    <p className="font-semibold">
                      {planet.name} in House {planet.house}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sign: {planet.sign}, Nakshatra: {planet.nakshatra} (Pada {planet.nakshatra_pad})
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          !isLoading &&
          !error && (
            <div className="rounded-md border p-4 text-sm text-muted-foreground">
              Enter your birth details to generate the report.
            </div>
          )
        )}
      </div>
    </main>
  )
}