"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react" // A popular icon library, often used with shadcn/ui

// A simple component for numbered list items to make the instructions pop
const Step = ({ number, children }: { number: number; children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
      {number}
    </div>
    <p className="pt-1 text-left text-muted-foreground">{children}</p>
  </div>
)

export default function WhatsAppRedirectPage() {
  const whatsappLink = "https://wa.me/qr/TEUDNC4RJMC6F1"

  return (
    <main>
      <Navbar />
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-10">
        <Card className="w-full max-w-2xl overflow-hidden shadow-lg">
          <CardHeader className="bg-muted/30 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <MessageSquare size={32} />
            </div>
            <CardTitle className="text-3xl font-bold">Connect on WhatsApp</CardTitle>
            <CardDescription className="text-md mt-2">
              Ready to schedule your appointment? We're here to help you directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <h2 className="mb-6 text-center text-xl font-semibold">Follow These Simple Steps</h2>
            <div className="space-y-6">
              <Step number={1}>
                Click the button below to be redirected to our official WhatsApp chat. It's fast, secure, and easy.
              </Step>
              <Step number={2}>
                To start the process, please send us your unique <Badge variant="secondary">appointment key</Badge> in
                the chat.
              </Step>
              <Step number={3}>
                Once you've sent the key, our team will be notified. Please wait for a reply to confirm your appointment
                details.
              </Step>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-6">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" className="w-full text-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}