import { NextResponse } from "next/server"
import { store } from "@/utils/store"
import { setSession } from "@/utils/session"

export async function POST(req: Request) {
  const { email, otp } = await req.json()
  if (!email || !otp)
    return NextResponse.json({ error: "Email and OTP required" }, { status: 400 })

  const record = store.otps.get(email.toLowerCase())
  if (!record || record.expiresAt < Date.now() || record.code !== otp) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 })
  }

  store.otps.delete(email.toLowerCase())

  const res = NextResponse.json({ ok: true })
  await setSession({ role: "user", email: email.toLowerCase() }, res) // ✅ await
  return res
}
