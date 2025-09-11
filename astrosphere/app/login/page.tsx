"use client"

import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { requestOtp, verifyOtp, adminLogin } from "@/utils/api"

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
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRequestOtp = async () => {
    setError(null)
    try {
      await requestOtp(email)
      setOtpSent(true)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP")
    }
  }

  const handleVerify = async () => {
    setError(null)
    try {
      const response = await verifyOtp(email, otp)
      const { token } = response.data
      if (token) {
        localStorage.setItem("authToken", token)
        window.location.href = "/" // redirect on success
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP")
    }
  }

  return (
    <div className="space-y-3 rounded-md border p-4">
      <label className="text-sm">Email</label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Button onClick={handleRequestOtp} disabled={!email}>
        Send OTP
      </Button>

      {otpSent && (
        <>
          <label className="mt-2 text-sm">Enter OTP</label>
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
          />
          <Button onClick={handleVerify} disabled={!otp}>
            Verify & Sign In
          </Button>
        </>
      )}

      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}

function AdminLogin() {
  const [email, setEmail] = useState("") // renamed for clarity
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    try {
      const response = await adminLogin(email, password)
      const { token } = response.data
      if (token) {
        localStorage.setItem("authToken", token)
        window.location.href = "/" // redirect on success
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials")
    }
  }

  return (
    <div className="space-y-3 rounded-md border p-4">
      <label className="text-sm">Email</label>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
      />
      <label className="text-sm">Password</label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      <Button onClick={handleLogin} disabled={!email || !password}>
        Sign In
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
