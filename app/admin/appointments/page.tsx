"use client"

import useSWR from "swr"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const fetcher = (url: string) =>
  fetch("http://localhost:4000" + url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch appointments")
    return res.json()
  })

export default function AdminAppointmentsPage() {
  const { data, mutate, error } = useSWR<any>(
    "/api/appointments",
    fetcher,
    { refreshInterval: 4000 }
  )

  const setStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update appointment")
      await mutate()
    } catch (err) {
      console.error(err)
      alert("Error updating appointment")
    }
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Manage Appointments</CardTitle>
            <CardDescription>
              Review and approve or reject new appointment requests.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.appointments?.length ? (
                    data.appointments.slice(0, 10).map((a: any) => (
                      <TableRow key={a._id}>
                        <TableCell className="pl-6 font-medium">{a.name}</TableCell>
                        <TableCell>{a.email}</TableCell>
                        <TableCell>
                          {new Date(a.preferredDateTime).toLocaleString()}
                        </TableCell>
                        <TableCell>{a.status}</TableCell>
                        <TableCell className="pr-6">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => setStatus(a._id, "approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setStatus(a._id, "rejected")}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center"
                      >
                        No appointments yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card> 
      </div>
    </main>
  )
}