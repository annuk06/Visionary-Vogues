import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../context/AnalysisContext.jsx";
import StyleProfileCard from "../components/StyleProfileCard.jsx";
import ColorSwatch from "../components/ColorSwatch.jsx";
import OccasionSelector from "../components/OccasionSelector.jsx";
import OutfitCard from "../components/OutfitCard.jsx";

export default function Dashboard() {
  const { analysis, photo, occasion, setOccasion, savedLooks, saveLook, reset } = useAnalysis();
  const navigate = useNavigate();

  if (!analysis) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center sm:px-8">
        <h1 className="section-heading text-3xl">No analysis yet</h1>
        <p className="mt-4 text-sm text-muted">Upload a photo to generate your style profile.</p>
        <button
          onClick={() => navigate("/upload")}
          className="mt-8 rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink"
        >
          Start Your Analysis
        </button>
      </div>
    );
  }

  const { skinTone, faceShape, bodyShape, palette, recommendedStyle, styleTips } = analysis;
  const outfits = analysis.outfitsByOccasion[occasion] || [];
  const savedIds = new Set(savedLooks.map((l) => l.name + l.occasion));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {photo?.previewUrl && (
          <img
            src={photo.previewUrl}
            alt="Your uploaded photo"
            className="h-40 w-40 shrink-0 rounded-2xl border border-ink-line object-cover"
          />
        )}
        <div>
          <p className="eyebrow">Your style profile</p>
          <h1 className="section-heading mt-2">{recommendedStyle}</h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Estimates based on your photo — lighting and image quality affect accuracy.
            This is styling guidance, not a diagnosis.
          </p>
          <button
            onClick={() => { reset(); navigate("/upload"); }}
            className="mt-4 text-sm text-gold underline underline-offset-4"
          >
            Analyze a different photo
          </button>
        </div>
      </div>

      {/* Overall profile grid */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StyleProfileCard label="Skin Tone" value={skinTone.category} />
        <StyleProfileCard label="Undertone" value={skinTone.undertone} />
        <StyleProfileCard label="Face Shape" value={faceShape.category} />
        <StyleProfileCard label="Body Shape" value={bodyShape.category} />
      </div>

      {/* Face + body detail */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <p className="eyebrow">Face shape — {faceShape.category}</p>
          <p className="mt-3 text-sm text-muted">{faceShape.explanation}</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-ivory">Hairstyles</dt>
              <dd className="text-muted">{faceShape.recommendations.hairstyles.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-ivory">Glasses &amp; sunglasses</dt>
              <dd className="text-muted">{faceShape.recommendations.glasses.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-ivory">Necklines</dt>
              <dd className="text-muted">{faceShape.recommendations.necklines.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-ivory">Accessories</dt>
              <dd className="text-muted">{faceShape.recommendations.accessories.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <div className="card p-6">
          <p className="eyebrow">Body shape — {bodyShape.category}</p>
          <p className="mt-3 text-sm text-muted">
            Focused only on clothing proportion and styling — never on weight or body desirability.
          </p>
          <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-muted">
            {bodyShape.recommendations.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>

      {/* Color palette */}
      <div className="mt-16">
        <p className="eyebrow">Your color palette</p>
        <h2 className="mt-2 font-display text-2xl text-ivory">Best Colors</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {palette.best.map((c) => <ColorSwatch key={c.hex} {...c} />)}
        </div>

        <h3 className="mt-8 font-display text-lg text-ivory">Reliable Neutrals</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {palette.neutrals.map((c) => <ColorSwatch key={c.hex} {...c} size="sm" />)}
        </div>

        <h3 className="mt-8 font-display text-lg text-ivory">Use Carefully</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {palette.careful.map((c) => <ColorSwatch key={c.hex} {...c} size="sm" />)}
        </div>
      </div>

      {/* Occasion outfits */}
      <div className="mt-16">
        <p className="eyebrow">Choose your occasion</p>
        <div className="mt-4">
          <OccasionSelector value={occasion} onChange={setOccasion} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outfits.map((o) => (
            <OutfitCard
              key={o.name}
              outfit={o}
              onSave={saveLook}
              saved={savedIds.has(o.name + o.occasion)}
            />
          ))}
        </div>
      </div>

      {/* Style tips */}
      <div className="mt-16 card p-8">
        <p className="eyebrow">Style tips</p>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {styleTips.map((t) => (
            <li key={t} className="flex gap-3 text-sm text-muted">
              <span className="text-gold">—</span>{t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
