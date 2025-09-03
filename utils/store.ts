type Role = "guest" | "user" | "admin"

export interface SessionData {
  role: Role
  email?: string
  username?: string
}

export interface Appointment {
  id: string
  userEmail: string
  name: string
  dob: string
  time: string
  place: string
  preferredDateTime: string
  status: "pending" | "approved" | "rejected"
  key: string // appointment key used to unlock chatbot
  expiresAt: number // ms epoch
}

export interface ChatMessage {
  id: string
  key: string
  sender: "user" | "admin"
  text: string
  createdAt: number
}

const OTP_TTL_MS = 10 * 60 * 1000
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000
const CHAT_SESSION_PADDING_MS = 2 * 60 * 60 * 1000 // chat valid until 2h after slot time

class Store {
  otps = new Map<string, { code: string; expiresAt: number }>() // email -> otp
  appointments = new Map<string, Appointment>() // id -> appointment
  chats = new Map<string, ChatMessage[]>() // key -> messages

  // Utility: purge expired OTPs and chats based on appointment expiration
  cleanup() {
    const now = Date.now()
    for (const [email, v] of this.otps) {
      if (v.expiresAt < now) this.otps.delete(email)
    }
    for (const [id, appt] of this.appointments) {
      // nothing to purge here, but keep entries for admin history
      void id
      void appt
    }
  }

  isChatAllowed(key: string): boolean {
    const appt = Array.from(this.appointments.values()).find((a) => a.key === key)
    if (!appt) return false
    if (appt.status !== "approved") return false
    const now = Date.now()
    return now <= appt.expiresAt + CHAT_SESSION_PADDING_MS
  }
}

export const store = globalThis.__ASTRO_STORE__ || new Store()
if (!(globalThis as any).__ASTRO_STORE__) {
  ;(globalThis as any).__ASTRO_STORE__ = store
}

// Helpers
export function randomOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function randomKey(len = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let out = ""
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}

export function epochFromLocal(dateTime: string): number {
  // dateTime: ISO or "YYYY-MM-DDTHH:mm"
  const t = new Date(dateTime)
  return t.getTime()
}

export function listConversations() {
  const items: Array<{
    id: string
    key: string
    name: string
    userEmail: string
    preferredDateTime: string
    expiresAt: number
    status: "pending" | "approved" | "rejected"
    messageCount: number
    lastMessageAt: number | null
    isActive: boolean
  }> = []
  for (const appt of store.appointments.values()) {
    if (appt.status !== "approved") continue
    const msgs = store.chats.get(appt.key) || []
    const last = msgs.length ? msgs[msgs.length - 1].createdAt : null
    items.push({
      id: appt.id,
      key: appt.key,
      name: appt.name,
      userEmail: appt.userEmail,
      preferredDateTime: appt.preferredDateTime,
      expiresAt: appt.expiresAt,
      status: appt.status,
      messageCount: msgs.length,
      lastMessageAt: last,
      isActive: store.isChatAllowed(appt.key),
    })
  }
  items.sort((a, b) => (b.lastMessageAt ?? 0) - (a.lastMessageAt ?? 0))
  return items
}
