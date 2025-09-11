import { NextResponse } from "next/server"
import { store, randomOTP } from "@/utils/store"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 })
  }

  const code = randomOTP()
  store.otps.set(email.toLowerCase(), { code, expiresAt: Date.now() + 10 * 60 * 1000 })

  return NextResponse.json({
    ok: true,
    message: "OTP generated",
    otp: code, // only for demo
  })
}
