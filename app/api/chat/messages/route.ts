import { NextResponse } from "next/server"
import { getSession } from "@/utils/session"
import { store, type ChatMessage } from "@/utils/store"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const key = url.searchParams.get("key") || ""
  const session = getSession()
  const appt = Array.from(store.appointments.values()).find((a) => a.key === key)
  if (!appt) return NextResponse.json({ error: "Invalid key" }, { status: 400 })
  if (!store.isChatAllowed(key)) return NextResponse.json({ error: "Session expired" }, { status: 403 })
  if (session.role === "user" && session.email !== appt.userEmail)
    return NextResponse.json({ error: "Not your session" }, { status: 403 })
  const msgs = store.chats.get(key) || []
  return NextResponse.json(msgs)
}

export async function POST(req: Request) {
  const url = new URL(req.url)
  const key = url.searchParams.get("key") || ""
  const { text } = await req.json()
  if (!text || !text.trim()) return NextResponse.json({ error: "Empty message" }, { status: 400 })
  const session = getSession()
  const appt = Array.from(store.appointments.values()).find((a) => a.key === key)
  if (!appt) return NextResponse.json({ error: "Invalid key" }, { status: 400 })
  if (!store.isChatAllowed(key)) return NextResponse.json({ error: "Session expired" }, { status: 403 })
  if (session.role === "user" && session.email !== appt.userEmail)
    return NextResponse.json({ error: "Not your session" }, { status: 403 })
  if (session.role === "guest") return NextResponse.json({ error: "Login required" }, { status: 401 })

  const msg: ChatMessage = {
    id: crypto.randomUUID(),
    key,
    sender: session.role === "admin" ? "admin" : "user",
    text: text.toString(),
    createdAt: Date.now(),
  }
  const arr = store.chats.get(key) || []
  arr.push(msg)
  store.chats.set(key, arr)
  return NextResponse.json({ ok: true })
}
