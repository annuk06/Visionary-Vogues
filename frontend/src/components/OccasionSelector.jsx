import { OCCASIONS } from "../data/occasions.js";

export default function OccasionSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose an occasion">
      {OCCASIONS.map((occ) => {
        const isActive = occ === value;
        return (
          <button
            key={occ}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(occ)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              isActive
                ? "border-gold bg-gold text-ink"
                : "border-ink-line text-muted hover:border-gold/50 hover:text-ivory"
            }`}
          >
            {occ}
          </button>
        );
      })}
    </div>
  );
}
