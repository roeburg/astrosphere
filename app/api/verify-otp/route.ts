import { NextResponse } from "next/server"
import { store } from "@/utils/store"
import { setSession } from "@/utils/session"

export async function POST(req: Request) {
  const { email, code } = await req.json()
  if (!email || !code) return NextResponse.json({ error: "Email and OTP code required" }, { status: 400 })
  const rec = store.otps.get(email.toLowerCase())
  if (!rec || rec.expiresAt < Date.now() || rec.code !== code) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
  }
  store.otps.delete(email.toLowerCase())
  setSession({ role: "user", email: email.toLowerCase() })
  return NextResponse.json({ ok: true })
}
