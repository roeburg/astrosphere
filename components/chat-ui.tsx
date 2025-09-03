"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type Message = { id: string; key: string; sender: "user" | "admin"; text: string; createdAt: number }
const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function ChatUI({
  role,
  defaultKey,
  autoValidate = false,
}: {
  role: "user" | "admin"
  defaultKey?: string
  autoValidate?: boolean
}) {
  const [key, setKey] = useState(defaultKey ? defaultKey.toUpperCase() : "")
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState("")

  const { data, mutate } = useSWR<Message[]>(
    validated ? `/api/chat/messages?key=${encodeURIComponent(key)}` : null,
    fetcher,
    { refreshInterval: 2000 },
  )

  const validateKey = async () => {
    setError(null)
    const res = await fetch("/api/chat/validate", {
      method: "POST",
      body: JSON.stringify({ key }),
      headers: { "Content-Type": "application/json" },
    })
    if (res.ok) setValidated(true)
    else setError((await res.json()).error || "Invalid or expired key")
  }

  useEffect(() => {
    if (autoValidate && defaultKey && !validated && key) {
      validateKey()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoValidate, defaultKey, key])

  const send = async () => {
    if (!text.trim()) return
    await fetch(`/api/chat/messages?key=${encodeURIComponent(key)}`, {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    })
    setText("")
    mutate()
  }

  return (
    <div className="space-y-4">
      {!validated ? (
        <div className="rounded-md border p-4">
          <div className="mb-2 text-sm">Enter your Appointment Key to unlock the chatbot.</div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter appointment key"
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
            />
            <Button onClick={validateKey}>Unlock</Button>
          </div>
          {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
          <p className="mt-3 text-sm text-muted-foreground">
            The chatbot is designed for time-bound consultation. Sessions auto-expire after your appointment slot.
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="text-sm">Chat Session</div>
            <Badge variant="secondary">{role === "admin" ? "Admin" : "User"}</Badge>
          </div>
          <div className="h-64 overflow-y-auto px-4 py-3 space-y-2">
            {data?.length ? (
              data.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[75%] rounded px-3 py-2 text-sm ${m.sender === "user" ? "bg-secondary ml-auto" : "bg-muted"}`}
                >
                  <div className="mb-1 text-[10px] opacity-60">
                    {m.sender} • {new Date(m.createdAt).toLocaleTimeString()}
                  </div>
                  <div>{m.text}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No messages yet. Start the conversation below.</div>
            )}
          </div>
          <div className="border-t p-3 flex gap-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="min-h-10"
            />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      )}
    </div>
  )
}
