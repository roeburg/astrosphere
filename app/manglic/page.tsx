import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, Heart, Home, BedDouble, Telescope } from "lucide-react";

// Helper component for a consistent section heading style
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl text-glow">
    {children}
  </h2>
);

export default function ManglicPage() {
  return (
    // UPDATED BACKGROUND: Changed from a radial gradient to a subtle grid pattern
    <main className="bg-slate-950 text-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="font-semibold text-red-400">Vedic Astrology</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-glow">
              Understanding Manglik Dosha
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              Manglik Dosha, or Mangal Dosha, is a celestial condition caused by the placement of the planet Mars (Mangal) in specific houses of a person's birth chart. It is known to influence energy, passion, and assertiveness, especially within relationships.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="/mars.jpg" 
              alt="Planet Mars" 
              className="w-full max-w-sm rounded-2xl object-cover shadow-2xl shadow-red-500/20"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:pb-32">
        {/* What is Manglik Dosha Section */}
        <section className="space-y-12">
          <SectionHeading>When Does Manglik Dosha Occur?</SectionHeading>
          <p className="text-center text-slate-400 max-w-3xl mx-auto">
            This condition arises when Mars is placed in one of the following five houses from the Ascendant (Lagna) in a birth chart. Each placement affects a different area of life.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <HouseEffectCard house="1st House" icon={<ShieldCheck />}>
              Affects self-identity and temperament, potentially leading to assertiveness or aggression.
            </HouseEffectCard>
            <HouseEffectCard house="4th House" icon={<Home />}>
              Impacts domestic peace and the home environment, sometimes creating turbulence.
            </HouseEffectCard>
            <HouseEffectCard house="7th House" icon={<Heart />}>
              Directly influences marriage and partnerships, causing potential conflicts or passion.
            </HouseEffectCard>
            <HouseEffectCard house="8th House" icon={<Telescope />}>
              Relates to longevity, in-laws, and sudden events, adding volatility to marital life.
            </HouseEffectCard>
            <HouseEffectCard house="12th House" icon={<BedDouble />}>
              Governs hidden matters and bed pleasures, potentially causing distance or dissatisfaction.
            </HouseEffectCard>
          </div>
        </section>

        {/* Special Condition Section */}
        <section className="rounded-xl border border-red-500/30 bg-red-900/20 p-8">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <AlertTriangle className="h-16 w-16 flex-shrink-0 text-red-400" />
                <div>
                    <h3 className="text-xl font-bold">A Special Condition to Note</h3>
                    <p className="mt-2 text-slate-300">
                        A person is considered to have a more pronounced Manglik Dosha if **Mars is in the 1st, 4th, 7th, 8th, or 12th house**, and at the same time, **Mercury (Budh) is located in either the 3rd or 8th house**. This specific combination can intensify the effects of Mars, requiring greater awareness and consideration.
                    </p>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="text-center rounded-xl border border-violet-700/50 bg-slate-900/50 px-6 py-16">
          <h2 className="text-3xl font-bold tracking-tight">Do You Have Manglik Dosha?</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            The only way to know for sure is by analyzing your personal birth chart. Our platform can generate your detailed Vedic Kundli instantly.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700">
              <Link href="/login">Generate Your Free Kundli Now</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}


// Helper Component for House Effect Cards
function HouseEffectCard({ house, icon, children }: { house: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-red-400">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold">{house}</h3>
      <p className="mt-2 text-sm text-slate-400">{children}</p>
    </div>
  );
}