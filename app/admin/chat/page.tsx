"use client"

import { Navbar } from "@/components/navbar"
import { ChatUI } from "@/components/chat-ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

type Conversation = {
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
}

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function AdminChatPage() {
  const { data } = useSWR<{ conversations: Conversation[] }>("/api/chat/conversations", fetcher, {
    refreshInterval: 4000,
  })
  const rows = data?.conversations ?? []
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined)

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Admin Chat Console</h1>

        <Card>
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Join</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length ? (
                    rows.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.userEmail}</TableCell>
                        <TableCell>{new Date(c.preferredDateTime).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="uppercase">
                            {c.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {c.isActive ? <Badge>Active</Badge> : <Badge variant="outline">Expired</Badge>}
                        </TableCell>
                        <TableCell>{c.messageCount}</TableCell>
                        <TableCell>{c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleString() : "—"}</TableCell>
                        <TableCell className="font-mono">{c.key}</TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => setSelectedKey(c.key)}>
                            Join Chat
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">
                        No conversations yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Browse all approved sessions and join any conversation instantly. Access may be limited to the scheduled
              time window.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Auto-validates when a key is selected for seamless access */}
            <ChatUI role="admin" defaultKey={selectedKey} autoValidate={Boolean(selectedKey)} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
