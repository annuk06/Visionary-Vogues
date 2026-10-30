import { FiBookmark, FiCheck } from "react-icons/fi";

export default function OutfitCard({ outfit, onSave, saved = false }) {
  const { name, occasion, items, shoes, accessories, colors, styleScore, why } = outfit;

  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{occasion}</p>
          <h3 className="mt-1 font-display text-xl text-ivory">{name}</h3>
        </div>
        <button
          onClick={() => onSave?.(outfit)}
          aria-label={saved ? "Saved to your looks" : "Save this look"}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
            saved ? "border-gold bg-gold text-ink" : "border-ink-line text-muted hover:border-gold hover:text-gold"
          }`}
        >
          {saved ? <FiCheck /> : <FiBookmark />}
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        {colors.map((c) => (
          <span
            key={c.hex}
            title={c.name}
            className="h-6 w-6 rounded-full border border-ink-line"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-1 text-sm text-ivory">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
        <li className="text-muted">{shoes}</li>
      </ul>

      {accessories?.length > 0 && (
        <p className="mt-2 text-xs text-muted">Accessories: {accessories.join(", ")}</p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <div className="h-1.5 w-full rounded-full bg-ink-line">
          <div
            className="h-1.5 rounded-full bg-gold"
            style={{ width: `${styleScore}%` }}
          />
        </div>
        <span className="font-mono text-xs text-gold">{styleScore}</span>
      </div>

      <p className="mt-4 flex-1 text-xs leading-relaxed text-muted">
        <span className="text-blush">Why this works: </span>
        {why}
      </p>
    </article>
  );
}
