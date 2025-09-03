import { Navbar } from "@/components/navbar"

export default function ManglicPage() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Manglic Dosha: Understanding Mars Influence</h1>
        <p className="text-muted-foreground">
          Manglic Dosha (Mangal Dosha) arises from Mars placement in certain houses (traditionally 1, 2, 4, 7, 8, 12).
          It can signify heightened energy in relationships, assertiveness, or conflict if unbalanced. Dosha does not
          doom compatibility; it calls for awareness, matching strengths, and appropriate remedies.
        </p>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>Mars in 7th: Intense partnership dynamics; needs mutual respect and space.</li>
          <li>Mars in 8th: Transformational intimacy; cultivate patience and trust practices.</li>
          <li>Remedies: Align marriage timing, spiritual practices, and balanced lifestyle choices.</li>
        </ul>
        <p className="text-muted-foreground">
          Remember, full charts, aspects, and timings refine the story—Manglic is one factor among many.
        </p>
      </div>
    </main>
  )
}
