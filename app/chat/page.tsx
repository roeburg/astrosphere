"use client"

import { Navbar } from "@/components/navbar"
import { ChatUI } from "@/components/chat-ui"

export default function ChatPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Consultation Chatbot</h1>
        <p className="text-muted-foreground">
          Enter your appointment key to unlock a secure, time-bound chat with your astrologer. Use this space to clarify
          remedies, timing, and practical next steps after your report.
        </p>
        <ChatUI role="user" />
      </div>
    </main>
  )
}
