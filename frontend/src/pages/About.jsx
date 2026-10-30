export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="eyebrow">About</p>
      <h1 className="section-heading mt-4">Styling guidance, not judgment.</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Visionary Vogues estimates skin tone, undertone, face shape, and body shape
        from a single uploaded photo, then turns those estimates into a color palette
        and occasion-based outfit recommendations. Results are approximate — lighting,
        camera quality, and image processing all affect the outcome — and are meant as
        a starting point, not a fixed identity.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        We do not infer race, ethnicity, medical conditions, health status, personality,
        income, or social status, and we never judge attractiveness or body desirability.
        Body-shape guidance is limited to clothing proportion and fit.
      </p>

      <div id="privacy" className="mt-14 card p-8 scroll-mt-24">
        <h2 className="font-display text-xl text-ivory">Privacy</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="text-ivory">Why we process your image</dt>
            <dd className="mt-1 text-muted">Solely to generate skin tone, face shape, and body shape estimates for styling recommendations.</dd>
          </div>
          <div>
            <dt className="text-ivory">Do we store it?</dt>
            <dd className="mt-1 text-muted">No — your photo is processed for the analysis request and then discarded. It's only kept if you explicitly save a result to your account.</dd>
          </div>
          <div>
            <dt className="text-ivory">How long is it retained?</dt>
            <dd className="mt-1 text-muted">Unsaved photos and analyses are not retained beyond the active session.</dd>
          </div>
          <div>
            <dt className="text-ivory">How can you delete your data?</dt>
            <dd className="mt-1 text-muted">Saved looks live only in your browser's local storage — clear them anytime from the Saved Looks page or your browser settings.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
