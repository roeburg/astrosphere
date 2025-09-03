import { NextResponse } from "next/server"
import { setSession } from "@/utils/session"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setSession({ role: "admin", username })
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 })
}
