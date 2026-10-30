import { Link } from "react-router-dom";

const steps = [
  {
    n: "01",
    title: "Upload a clear photo",
    copy: "A front-facing, well-lit photo works best. JPG, PNG, or WEBP, up to 10MB.",
  },
  {
    n: "02",
    title: "We read tone, shape, and proportion",
    copy: "Skin tone and undertone, face shape from facial landmarks, and body proportions where the photo allows.",
  },
  {
    n: "03",
    title: "Get your color palette",
    copy: "Best colors, dependable neutrals, and shades to reach for carefully — all tied to your estimated undertone.",
  },
  {
    n: "04",
    title: "Choose an occasion",
    copy: "Formal, casual, business, party, wedding, and more. Outfit cards update instantly.",
  },
  {
    n: "05",
    title: "Save the looks you like",
    copy: "Bookmark outfits to your saved looks — nothing is stored beyond your session unless you save it.",
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <p className="eyebrow">How it works</p>
      <h1 className="section-heading mt-4">From photo to profile in five steps.</h1>
      <p className="mt-5 max-w-xl text-sm text-muted">
        Everything below happens automatically once you upload a photo — no styling
        background required. Results are estimates, shaped by lighting and image quality,
        and never a judgment on how you look.
      </p>

      <ol className="mt-14 space-y-10">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-6">
            <span className="font-mono text-sm text-gold">{s.n}</span>
            <div className="border-l border-ink-line pl-6">
              <h3 className="font-display text-xl text-ivory">{s.title}</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{s.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-2xl border border-ink-line bg-ink-soft p-8">
        <h2 className="font-display text-lg text-ivory">What we won&rsquo;t do</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Infer race, ethnicity, health status, personality, income, or social status.</li>
          <li>Judge attractiveness, weight, or body desirability.</li>
          <li>Store your photo unless you explicitly choose to save your results.</li>
        </ul>
      </div>

      <Link
        to="/upload"
        className="mt-12 inline-block rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink"
      >
        Analyze My Style
      </Link>
    </div>
  );
}
