import { NextResponse } from "next/server"
import { clearSession } from "@/utils/session"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  clearSession(res) // clear the HTTP-only cookie
  return res
}
