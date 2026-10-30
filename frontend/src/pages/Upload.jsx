import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../context/AnalysisContext.jsx";
import ImageUploader from "../components/ImageUploader.jsx";

const STYLE_GOALS = ["Minimal", "Classic", "Streetwear", "Bohemian", "Glam", "Athleisure", "Not sure yet"];
const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const BUDGETS = ["Budget-friendly", "Mid-range", "Premium", "No preference"];

export default function Upload() {
  const { photo, setUploadedPhoto, preferences, setPreferences, runAnalysis } = useAnalysis();
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!photo) return;
    navigate("/analysis");
    runAnalysis();
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="eyebrow">Step 1 of 2</p>
      <h1 className="section-heading mt-4">Upload your photo</h1>
      <p className="mt-4 text-sm text-muted">
        A clear, front-facing, well-lit photo gives the most reliable estimate.
        Nothing is stored unless you choose to save your results later.
      </p>

      <div className="mt-10">
        <ImageUploader photo={photo} onSelect={setUploadedPhoto} />
      </div>

      <div className="mt-14 border-t border-ink-line pt-10">
        <p className="eyebrow">Optional — helps us tailor results</p>
        <h2 className="mt-2 font-display text-xl text-ivory">Tell us a bit about your style</h2>
        <p className="mt-2 text-sm text-muted">Every field here is optional. Skip anything you&rsquo;d rather not share.</p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="styleGoal" className="mb-2 block text-sm text-ivory">Preferred style</label>
            <select
              id="styleGoal"
              value={preferences.styleGoal}
              onChange={(e) => setPreferences((p) => ({ ...p, styleGoal: e.target.value }))}
              className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory focus:border-gold"
            >
              <option value="">No preference</option>
              {STYLE_GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="ageRange" className="mb-2 block text-sm text-ivory">Age range</label>
            <select
              id="ageRange"
              value={preferences.ageRange}
              onChange={(e) => setPreferences((p) => ({ ...p, ageRange: e.target.value }))}
              className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory focus:border-gold"
            >
              <option value="">Prefer not to say</option>
              {AGE_RANGES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="favoriteColor" className="mb-2 block text-sm text-ivory">Favorite color</label>
            <input
              id="favoriteColor"
              type="text"
              placeholder="e.g. Forest green"
              value={preferences.favoriteColor}
              onChange={(e) => setPreferences((p) => ({ ...p, favoriteColor: e.target.value }))}
              className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory placeholder:text-muted focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="budget" className="mb-2 block text-sm text-ivory">Budget range</label>
            <select
              id="budget"
              value={preferences.budget}
              onChange={(e) => setPreferences((p) => ({ ...p, budget: e.target.value }))}
              className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory focus:border-gold"
            >
              <option value="">No preference</option>
              {BUDGETS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!photo}
        className="mt-12 w-full rounded-full bg-gold px-7 py-4 font-body text-sm font-medium text-ink transition-transform disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:scale-[1.01]"
      >
        Analyze My Style
      </button>
    </div>
  );
}
