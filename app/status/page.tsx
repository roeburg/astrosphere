"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { getAppointmentStatus } from "@/utils/api"
import { Loader2, CalendarClock, KeyRound, User, Info } from "lucide-react"

// Component to show appointment status
const AppointmentStatus = ({ appointment }: { appointment: any }) => {
  const isRejected = appointment.status === "rejected"
  const appointmentTime = new Date(appointment.preferredDateTime).getTime()
  const currentTime = new Date().getTime()
  const isAppointmentTimePassed = currentTime > appointmentTime

  const getStatusInfo = () => {
    switch (appointment.status) {
      case "approved":
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          text: "Your appointment is confirmed. The chat will be available at the scheduled time.",
        }
      case "rejected":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          text: "Unfortunately, your requested time slot was unavailable.",
        }
      default:
        return {
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          text: "Your request is pending approval. Please check back later.",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Your Appointment Status</CardTitle>
        <CardDescription className="text-center">Here are the details for your upcoming session.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <span className="font-semibold">Name:</span> {appointment.name}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <div>
            <span className="font-semibold">Scheduled Time:</span>{" "}
            {new Date(appointment.preferredDateTime).toLocaleString()}
          </div>
        </div>
        <div className={`flex items-start space-x-4 p-4 rounded-lg ${statusInfo.color}`}>
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{statusInfo.text}</p>
        </div>

        {(isRejected || isAppointmentTimePassed) && (
          <Button className="w-full">Book a New Appointment</Button>
        )}
      </CardContent>
    </Card>
  )
}

// Main status page
export default function StatusPage() {
  const [appointment, setAppointment] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getAppointmentStatus()
        if (response.data.success && response.data.appointment) {
          setAppointment(response.data.appointment)
        }
      } catch (err) {
        console.log("No existing appointment found.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStatus()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-4">Checking appointment status...</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 px-4 py-10">
        {appointment ? (
          <AppointmentStatus appointment={appointment} />
        ) : (
          <p className="text-center text-muted-foreground">No appointment found.</p>
        )}
      </div>
    </main>
  )
}
