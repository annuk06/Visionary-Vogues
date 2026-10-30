import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg text-ivory">
              Visionary <span className="text-gold">Vogues</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Personalized color, face-shape, body-shape, and outfit guidance —
              generated from one photo, refined for every occasion.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Explore</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/how-it-works" className="hover:text-ivory">How It Works</Link></li>
              <li><Link to="/upload" className="hover:text-ivory">Start Your Analysis</Link></li>
              <li><Link to="/saved-looks" className="hover:text-ivory">Saved Looks</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/about" className="hover:text-ivory">About</Link></li>
              <li><Link to="/contact" className="hover:text-ivory">Contact</Link></li>
              <li><Link to="/about#privacy" className="hover:text-ivory">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Follow</p>
            <div className="flex gap-4 text-xl text-muted">
              <a href="#" aria-label="Instagram" className="hover:text-gold"><FiInstagram /></a>
              <a href="#" aria-label="Twitter" className="hover:text-gold"><FiTwitter /></a>
              <a href="mailto:hello@visionaryvogues.app" aria-label="Email" className="hover:text-gold"><FiMail /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Visionary Vogues. Style estimates, not diagnoses.</p>
          <p className="font-mono">Made for every body, every tone, every occasion.</p>
        </div>
      </div>
    </footer>
  );
}
