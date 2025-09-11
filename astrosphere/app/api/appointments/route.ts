import { NextResponse } from "next/server"
import { getSession } from "@/utils/session"
import { store, type Appointment, randomKey, epochFromLocal } from "@/utils/store"

export async function GET() {
  const session = getSession()
  if (session.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json(Array.from(store.appointments.values()).sort((a, b) => b.expiresAt - a.expiresAt))
}

export async function POST(req: Request) {
  const session = getSession()
  if (session.role !== "user" || !session.email) return NextResponse.json({ error: "Login required" }, { status: 401 })
  const { name, dob, time, place, preferredDateTime } = await req.json()
  if (!name || !dob || !time || !place || !preferredDateTime)
    return NextResponse.json({ error: "All fields required" }, { status: 400 })

  // check simple availability: no approved/pending appointment at exact slot
  const slotMs = epochFromLocal(preferredDateTime)
  const conflict = Array.from(store.appointments.values()).find(
    (a) => a.preferredDateTime === preferredDateTime && a.status !== "rejected",
  )
  if (conflict) return NextResponse.json({ error: "Slot unavailable, pick another time" }, { status: 409 })

  const id = crypto.randomUUID()
  const key = randomKey(8)
  const appt: Appointment = {
    id,
    userEmail: session.email,
    name,
    dob,
    time,
    place,
    preferredDateTime,
    status: "pending",
    key,
    expiresAt: slotMs,
  }
  store.appointments.set(id, appt)
  return NextResponse.json({ ok: true, appointment: appt })
}
