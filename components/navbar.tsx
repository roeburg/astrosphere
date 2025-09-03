"use client"

import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { LogOut } from "lucide-react"

type Session = { role: "guest" | "user" | "admin"; email?: string; username?: string }

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function Navbar() {
  const { data } = useSWR<Session>("/api/session", fetcher)
  const role = data?.role ?? "guest"

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" })
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          AstroSense
        </Link>
        <nav className="flex items-center gap-3">
          {role === "guest" && (
            <>
              <Link href="/" className="text-sm">
                Home
              </Link>
              <Link href="/about" className="text-sm">
                About
              </Link>
              <Link href="/manglic" className="text-sm">
                Manglic Report
              </Link>
              <Link href="/login" className="text-sm">
                Login
              </Link>
            </>
          )}
          {role === "user" && (
            <>
              <Link href="/" className="text-sm">
                Home
              </Link>
              <Link href="/about" className="text-sm">
                About
              </Link>
              <Link href="/numerology" className="text-sm">
                Numerology
              </Link>
              <Link href="/kundli" className="text-sm">
                Vedic Kundli
              </Link>
              <Link href="/appointments" className="text-sm">
                Book Appointment
              </Link>
              <Link href="/chat" className="text-sm">
                Chatbot
              </Link>
              <Link href="/settings" className="text-sm">
                Settings
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
          {role === "admin" && (
            <>
              <Link href="/" className="text-sm">
                Home
              </Link>
              <Link href="/about" className="text-sm">
                About
              </Link>
              <Link href="/admin/appointments" className="text-sm">
                Manage Appointments
              </Link>
              <Link href="/admin/chat" className="text-sm">
                Chatbot
              </Link>
              <Link href="/settings" className="text-sm">
                Settings
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
