"use client"

import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function LoginPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="mb-4 text-center text-2xl font-semibold">Sign In</h1>
        <Tabs defaultValue="user">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Login (OTP)</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserLogin />
          </TabsContent>
          <TabsContent value="admin">
            <AdminLogin />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function UserLogin() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [sent, setSent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const requestOTP = async () => {
    setError(null)
    const res = await fetch("/api/request-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
    const json = await res.json()
    if (res.ok) setSent(json.otp)
    else setError(json.error || "Failed to send OTP")
  }

  const verify = async () => {
    setError(null)
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code: otp }),
      headers: { "Content-Type": "application/json" },
    })
    if (res.ok) window.location.href = "/"
    else setError((await res.json()).error || "Invalid OTP")
  }

  return (
    <div className="space-y-3 rounded-md border p-4">
      <label className="text-sm">Email</label>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <Button onClick={requestOTP} disabled={!email}>
        Send OTP
      </Button>
      {sent && <div className="text-sm text-muted-foreground">Demo OTP: {sent}</div>}
      <label className="mt-2 text-sm">Enter OTP</label>
      <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" />
      <Button onClick={verify} disabled={!otp}>
        Verify & Sign In
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}

function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const signIn = async () => {
    setError(null)
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
    if (res.ok) window.location.href = "/"
    else setError((await res.json()).error || "Invalid credentials")
  }

  return (
    <div className="space-y-3 rounded-md border p-4">
      <label className="text-sm">Username</label>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
      <label className="text-sm">Password</label>
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      <Button onClick={signIn} disabled={!username || !password}>
        Sign In
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
