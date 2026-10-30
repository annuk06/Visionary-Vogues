import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const links = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/upload", label: "Analyze" },
  { to: "/saved-looks", label: "Saved Looks" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/80 bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="font-display text-xl tracking-tight text-ivory" onClick={() => setOpen(false)}>
          Visionary <span className="text-gold">Vogues</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wide transition-colors ${
                    isActive ? "text-gold" : "text-muted hover:text-ivory"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/upload"
          className="hidden rounded-full border border-gold/60 px-5 py-2 font-body text-sm text-gold transition-colors hover:bg-gold hover:text-ink md:inline-block"
        >
          Start Analysis
        </Link>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-2xl text-ivory md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-line bg-ink px-5 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block font-body text-base ${isActive ? "text-gold" : "text-ivory"}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/upload"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full border border-gold px-5 py-2 text-sm text-gold"
              >
                Start Analysis
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
