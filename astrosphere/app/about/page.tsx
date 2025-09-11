import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, ShieldCheck, HeartHandshake, BrainCircuit, Dna, Telescope } from "lucide-react";

// Helper component for a consistent section heading style
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold tracking-tight text-center text-glow sm:text-4xl">
    {children}
  </h2>
);

export default function AboutPage() {
  return (
    // UPDATED BACKGROUND: Reverted to the subtle grid pattern for consistency.
    <main className="bg-slate-950 text-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 text-center sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4">
          <p className="font-semibold text-violet-400">Our Story</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-glow">
            Demystifying the Cosmos, One Chart at a Time.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            AstroSphere was born from a desire to bridge the gap between ancient celestial wisdom and the clarity of modern technology. We believe that the answers to our life's biggest questions are written in the stars, and our mission is to help you read them.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:space-y-32 sm:pb-32">
        {/* Mission & Philosophy Section */}
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Philosophy</h2>
            <p className="text-slate-400">
              We see astrology and numerology not as fortune-telling, but as powerful tools for self-awareness and personal growth. Our platform is designed to be a sanctuary for self-discovery, providing you with insights that are both profound and practical. We translate complex cosmic patterns into actionable guidance to help you navigate your life's journey with confidence.
            </p>
            <p className="text-slate-400">
              By blending meticulous astrological calculations with an intuitive, AI-enhanced interface, we make this ancient knowledge accessible to everyone, from curious beginners to seasoned practitioners.
            </p>
          </div>
          <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-8">
            <PrincipleItem icon={<HeartHandshake />} title="Empowerment">
              Providing you with the knowledge to make conscious, informed decisions.
            </PrincipleItem>
            <PrincipleItem icon={<ShieldCheck />} title="Authenticity & Privacy">
              Upholding the integrity of Vedic traditions while ensuring your data is always secure and private.
            </PrincipleItem>
            <PrincipleItem icon={<Zap />} title="Clarity & Accessibility">
              Making complex astrological concepts simple, clear, and easy to understand.
            </PrincipleItem>
          </div>
        </section>

        {/* Features/Technology Section */}
        <section className="space-y-12">
          <SectionHeading>Where Ancient Wisdom Meets Modern Tech</SectionHeading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard icon={<Dna />} title="In-Depth Numerology">
              Our algorithms calculate your Driver, Conductor, and Name numbers, presenting them in a comprehensive Loshu Grid to reveal your personality's core blueprint.
            </FeatureCard>
            <FeatureCard icon={<Telescope />} title="Vedic Kundli Analysis">
              Explore your 12 houses with detailed interpretations of planetary placements. Understand your strengths, challenges, and life's purpose with clarity.
            </FeatureCard>
            <FeatureCard icon={<BrainCircuit />} title="AI-Enhanced Insights">
              We leverage an AI-inspired interface to synthesize complex data points into clear, concise, and actionable guidance, helping you connect the dots in your cosmic profile.
            </FeatureCard>
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-12">
          <SectionHeading>Meet the Team</SectionHeading>
          <div className="mx-auto max-w-md">
            <TeamMemberCard
              name="Sahil Thakur"
              role="Founder & Astrologer"
              imageUrl="/profile.jpg"
            >
              With 2+ years of dedicated astrology practice, Sahil founded AstroSphere to make cosmic wisdom accessible to everyone through modern, easy-to-use tools.
            </TeamMemberCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-16">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Discover Your Cosmic Blueprint?</h2>
          <p className="mt-4 text-slate-400">Your journey of self-discovery is just a click away. Get started for free.</p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/login">Explore Your Chart</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

// Sub-components for cleaner structure

function PrincipleItem({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-violet-400">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{children}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="mb-4 inline-block rounded-lg bg-slate-800 p-3 text-violet-400">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{children}</p>
    </div>
  );
}

function TeamMemberCard({ name, role, imageUrl, children }: { name: string; role: string; imageUrl: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
      <img src={imageUrl} alt={name} className="mx-auto h-24 w-24 rounded-full object-cover" />
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-sm font-semibold text-violet-400">{role}</p>
      <p className="mt-2 text-sm text-slate-400">{children}</p>
    </div>
  );
}