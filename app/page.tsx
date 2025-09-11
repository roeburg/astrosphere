import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    // UPDATED BACKGROUND: Replaced the radial gradient with a subtle grid pattern
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-glow sm:text-5xl md:text-6xl">
              Astrology, Numerology, and Vedic Guidance—All in One Sphere
            </h1>
            <p className="animate-fade-in-up animation-delay-300 text-pretty text-lg text-slate-400">
              <span className="font-semibold text-white">AstroSphere</span> blends ancient wisdom with a modern, AI-inspired
              interface. Generate numerology reports, explore your Vedic Kundli, and chat securely with an astrologer.
            </p>
            <div className="animate-fade-in-up animation-delay-500 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="group">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          {/* Rotating Image Wheel */}
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-80 animate-fade-in lg:h-[450px] lg:w-[450px]">
              <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl"></div>
              <img
                src="/astrology-constellations-dashboard.jpg"
                alt="Astrology Wheel"
                className="animate-spin-slow h-full w-full rounded-full border-2 border-violet-900/50 object-cover shadow-2xl shadow-violet-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:pb-24 lg:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          <CardItem
            title="Numerology Reports"
            desc="Uncover your Driver & Conductor numbers with a detailed Loshu grid analysis."
            href="/numerology"
          />
          <CardItem
            title="Vedic Kundli"
            desc="Receive clear, actionable interpretations of your 12-house placements."
            href="/kundli"
          />
          <CardItem
            title="Secure Chat"
            desc="Book a session and use your unique key to unlock a private chat with an astrologer."
            href="/appointments"
          />
        </div>
      </section>
    </main>
  );
}

// Enhanced CardItem Component
function CardItem({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-700/50 hover:bg-slate-900"
    >
      {/* Background glow effect on hover */}
      <div className="absolute right-0 top-0 h-24 w-24 bg-violet-600/20 blur-3xl transition-all duration-500 group-hover:h-32 group-hover:w-32"></div>
      
      <div className="relative">
        <div className="mb-2 text-lg font-semibold text-slate-100">{title}</div>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </Link>
  );
}