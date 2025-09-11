import { NextResponse } from "next/server"
import { getSession } from "@/utils/session"
import { store } from "@/utils/store"

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const session = getSession()
  if (session.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = ctx.params
  const appt = store.appointments.get(id)
  if (!appt) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const { status } = await req.json()
  if (!["approved", "rejected", "pending"].includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  appt.status = status
  store.appointments.set(id, appt)
  return NextResponse.json({ ok: true, appointment: appt })
}
