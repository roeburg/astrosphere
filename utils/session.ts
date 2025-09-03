import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import type { SessionData } from "./store"

const COOKIE_NAME = "session"
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 days

export function getSessionFromRequest(req: NextRequest): SessionData {
  const cookie = req.cookies.get(COOKIE_NAME)?.value
  if (!cookie) return { role: "guest" }
  try {
    const json = Buffer.from(cookie, "base64").toString("utf-8")
    const data = JSON.parse(json) as SessionData
    return data
  } catch {
    return { role: "guest" }
  }
}

export function getSession(): SessionData {
  const cookie = cookies().get(COOKIE_NAME)?.value
  if (!cookie) return { role: "guest" }
  try {
    const json = Buffer.from(cookie, "base64").toString("utf-8")
    const data = JSON.parse(json) as SessionData
    return data
  } catch {
    return { role: "guest" }
  }
}

export function setSession(data: SessionData) {
  const encoded = Buffer.from(JSON.stringify(data)).toString("base64")
  cookies().set(COOKIE_NAME, encoded, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })
}

export function clearSession() {
  cookies().set(COOKIE_NAME, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 })
}
