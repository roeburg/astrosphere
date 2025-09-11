import { NextResponse } from "next/server"
import { setSession } from "@/utils/session"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json() as { email: string; password: string }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Trim to prevent extra spaces from breaking login
    if (email.trim() === ADMIN_EMAIL.trim() && password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ ok: true })
      setSession({ role: "admin", email: email.trim() }, res)
      return res
    } else {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
