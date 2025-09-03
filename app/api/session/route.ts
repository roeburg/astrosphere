import { NextResponse } from "next/server"
import { getSession } from "@/utils/session"

export async function GET() {
  return NextResponse.json(getSession())
}
