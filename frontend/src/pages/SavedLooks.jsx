import { useAnalysis } from "../context/AnalysisContext.jsx";
import OutfitCard from "../components/OutfitCard.jsx";
import { Link } from "react-router-dom";

export default function SavedLooks() {
  const { savedLooks, removeLook } = useAnalysis();

  if (savedLooks.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center sm:px-8">
        <p className="eyebrow">Saved looks</p>
        <h1 className="section-heading mt-4 text-3xl">Nothing saved yet.</h1>
        <p className="mt-4 text-sm text-muted">
          Bookmark outfits from your dashboard and they&rsquo;ll show up here.
        </p>
        <Link to="/upload" className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink">
          Start Your Analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <p className="eyebrow">Saved looks</p>
      <h1 className="section-heading mt-2">Your bookmarked outfits</h1>
      <p className="mt-3 text-sm text-muted">Stored on this device only.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedLooks.map((look) => (
          <div key={look.id} className="relative">
            <OutfitCard outfit={look} saved onSave={() => removeLook(look.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
