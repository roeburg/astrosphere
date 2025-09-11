"use client"

import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { bookAppointment, getAppointmentStatus } from "@/utils/api" // Import the new function
import { Loader2, CalendarClock, KeyRound, User, Info } from "lucide-react" // For better UI

// --- Component for Displaying Appointment Status ---
const AppointmentStatus = ({ appointment, onBookNew }: { appointment: any; onBookNew: () => void }) => {
	const isRejected = appointment.status === "rejected"
	// Check if the appointment time has passed
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
					text: "Unfortunately, your requested time slot was unavailable. Please book a new appointment.",
				}
			default: // pending
				return {
					color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
					text: "Your request is pending approval. Please check back later for updates.",
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
				<div className="flex items-center space-x-4">
					<KeyRound className="h-5 w-5 text-muted-foreground" />
					<div className="rounded-md bg-muted px-3 py-1">
						<span className="font-semibold">Your Key:</span>{" "}
						<span className="font-mono text-primary">{appointment.key}</span>
					</div>
				</div>

				<div className={`flex items-start space-x-4 p-4 rounded-lg ${statusInfo.color}`}>
					<Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
					<p className="text-sm font-medium">{statusInfo.text}</p>
				</div>

				{/* Show "Book New" if rejected, OR if the appointment time has passed */}
				{(isRejected || isAppointmentTimePassed) && (
					<Button onClick={onBookNew} className="w-full">
						Book a New Appointment
					</Button>
				)}
			</CardContent>
		</Card>
	)
}

// --- Main Appointments Page Component ---
export default function AppointmentsPage() {
	const [existingAppointment, setExistingAppointment] = useState<any>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [form, setForm] = useState({
		name: "",
		email: "",
		date: "",
		time: "",
		place: "",
		preferredDateTime: "",
	})
	const [error, setError] = useState<string | null>(null)

	// Fetch user's appointment status when the component mounts
	useEffect(() => {
		const checkStatus = async () => {
			try {
				const response = await getAppointmentStatus()
				if (response.data.success && response.data.appointment) {
					setExistingAppointment(response.data.appointment)
				}
			} catch (err) {
				// It's okay if this fails (e.g., 404 Not Found), it just means no appointment exists.
				console.log("No existing appointment found for user.")
			} finally {
				setIsLoading(false)
			}
		}

		checkStatus()
	}, []) // Empty dependency array means this runs only once on mount

	const submit = async () => {
		setError(null)
		try {
			const response = await bookAppointment(form)
			if (response.data.success) {
				setExistingAppointment(response.data.appointment)
			} else {
				setError("Failed to book appointment. Please try again.")
			}
		} catch (err: any) {
			const errorMessage = err.response?.data?.error || err.message || "An unexpected error occurred."
			setError(errorMessage)
		}
	}

	// Function to reset state and show the booking form again
	const handleBookNew = () => {
		setExistingAppointment(null)
	}

	// --- Render Logic ---

	if (isLoading) {
		return (
			<main>
				<Navbar />
				<div className="flex justify-center items-center py-20">
					<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					<p className="ml-4">Checking for existing appointments...</p>
				</div>
			</main>
		)
	}

	return (
		<main>
			<Navbar />
			<div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 px-4 py-10">
				{existingAppointment ? (
					// If an appointment exists, show the status component
					<AppointmentStatus appointment={existingAppointment} onBookNew={handleBookNew} />
				) : (
					// Otherwise, show the booking form, now wrapped in a Card
					<Card className="w-full">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl font-semibold">Book an Appointment</CardTitle>
							<CardDescription>
								Provide your details and choose a slot to schedule your session.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid w-full gap-4 md:grid-cols-2">
								<div className="space-y-1">
									<label className="text-sm font-medium">Name</label>
									<Input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">Email</label>
									<Input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">Date of Birth</label>
									<Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">Time of Birth</label>
									<Input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
								</div>
								<div className="space-y-1 md:col-span-2">
									<label className="text-sm font-medium">Place of Birth</label>
									<Input placeholder="City, Country" value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} />
								</div>
								<div className="space-y-1 md:col-span-2">
									<label className="text-sm font-medium">Preferred Date & Time for Appointment</label>
									<Input type="datetime-local" value={form.preferredDateTime} onChange={e => setForm({ ...form, preferredDateTime: e.target.value })} />
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col items-center">
							<Button onClick={submit} className="w-full md:w-auto">Submit Request</Button>
							{error && <p className="mt-3 text-sm text-red-500">{error}</p>}
						</CardFooter>
					</Card>
				)}
			</div>
		</main>
	)
}

