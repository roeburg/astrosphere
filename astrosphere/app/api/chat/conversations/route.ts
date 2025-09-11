import { NextResponse } from "next/server"
import { getSession } from "@/utils/session"
import { listConversations } from "@/utils/store"

export async function GET() {
  const session = await getSession()
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const conversations = listConversations()
  return NextResponse.json({ conversations })
}
