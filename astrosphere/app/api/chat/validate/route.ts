import { NextResponse } from "next/server"
import { getSession } from "@/utils/session"
import { store } from "@/utils/store"

export async function POST(req: Request) {
  const session = getSession()
  if (session.role === "guest") return NextResponse.json({ error: "Login required" }, { status: 401 })
  const { key } = await req.json()
  const appt = Array.from(store.appointments.values()).find((a) => a.key === key)
  if (!appt) return NextResponse.json({ error: "Invalid key" }, { status: 400 })
  if (appt.status !== "approved") return NextResponse.json({ error: "Appointment not approved yet" }, { status: 403 })
  if (!store.isChatAllowed(key)) return NextResponse.json({ error: "Session expired" }, { status: 403 })
  if (session.role === "user" && session.email !== appt.userEmail) {
    return NextResponse.json({ error: "This key does not belong to your account" }, { status: 403 })
  }
  return NextResponse.json({ ok: true })
}
