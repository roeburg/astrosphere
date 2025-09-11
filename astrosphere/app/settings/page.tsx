"use client"

import { Navbar } from "@/components/navbar"
import useSWR from "swr"
import { ThemeToggle } from "@/components/theme-toggle"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function SettingsPage() {
  const { data } = useSWR("/api/session", fetcher)
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="rounded-md border p-4">
          <div className="mb-2 text-sm">Theme</div>
          <ThemeToggle />
        </div>
        <div className="rounded-md border p-4">
          <div className="mb-2 text-sm">Profile</div>
          <div className="text-sm text-muted-foreground">
            {data?.role === "admin"
              ? `Signed in as Admin (${data?.username || "admin"})`
              : data?.role === "user"
                ? `Signed in as ${data?.email}`
                : "You are not signed in."}
          </div>
        </div>
      </div>
    </main>
  )
}
