"use client"

import { Navbar } from "@/components/navbar"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function AdminAppointmentsPage() {
  const { data, mutate } = useSWR<any[]>("/api/appointments", fetcher, { refreshInterval: 4000 })

  const setStatus = async (id: string, status: string) => {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    })
    mutate()
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Manage Appointments</h1>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length ? (
                data.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.userEmail}</TableCell>
                    <TableCell>{new Date(a.preferredDateTime).toLocaleString()}</TableCell>
                    <TableCell>{a.status}</TableCell>
                    <TableCell className="font-mono">{a.key}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" onClick={() => setStatus(a.id, "approved")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus(a.id, "rejected")}>
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No appointments yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
