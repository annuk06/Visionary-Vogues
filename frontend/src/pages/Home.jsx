import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScanSilhouette from "../components/ScanSilhouette.jsx";
import { FiDroplet, FiUser, FiGrid, FiCalendar } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const analyzeCards = [
  { icon: <FiDroplet />, title: "Skin Tone & Undertone", copy: "A palette built around your estimated tone — warm, cool, or neutral." },
  { icon: <FiUser />, title: "Face & Body Shape", copy: "Hairstyles, necklines, and silhouettes chosen to balance your proportions." },
  { icon: <FiGrid />, title: "Color Palette", copy: "Best colors, dependable neutrals, and shades to reach for carefully." },
  { icon: <FiCalendar />, title: "Occasion Styling", copy: "Outfits that shift with you — interview one day, wedding the next." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grain [background-size:18px_18px] opacity-40" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <p className="eyebrow">AI color &amp; style analysis</p>
            <h1 className="section-heading mt-4">
              Discover the Style<br />That Fits <span className="italic text-gold">You.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Upload your photo and get personalized color, face-shape, body-shape,
              and outfit recommendations for every occasion.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/upload"
                className="rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                Analyze My Style
              </Link>
              <Link
                to="/how-it-works"
                className="rounded-full border border-ink-line px-7 py-3 font-body text-sm text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                How It Works
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted">
              Estimates only — lighting and camera quality affect results. Photos aren&rsquo;t stored unless you choose to save them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto w-64 sm:w-72"
          >
            <ScanSilhouette active className="h-[420px] w-full" />
          </motion.div>
        </div>
      </section>

      {/* What we analyze */}
      <section className="border-t border-ink-line bg-ink-soft/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <motion.p
            className="eyebrow"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          >
            What we read from one photo
          </motion.p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {analyzeCards.map((c, i) => (
              <motion.div
                key={c.title}
                className="card p-6"
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div className="text-2xl text-gold">{c.icon}</div>
                <h3 className="mt-4 font-display text-lg text-ivory">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions strip */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="eyebrow">Built for real occasions</p>
            <h2 className="section-heading mt-4">One profile.<br />Eleven occasions.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Interview, wedding, first date, or a Tuesday commute — your color
              palette and proportions stay the same, but the outfit changes.
              Switch occasions on your dashboard and watch recommendations update instantly.
            </p>
            <Link to="/upload" className="mt-6 inline-block font-body text-sm text-gold underline underline-offset-4">
              Start your analysis →
            </Link>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="flex flex-wrap gap-3"
          >
            {["Formal", "Casual", "Business", "Party", "Wedding", "Date", "Interview", "College", "Travel", "Traditional", "Athleisure"].map((o) => (
              <span key={o} className="rounded-full border border-ink-line px-4 py-2 text-sm text-muted">
                {o}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-line bg-ink-soft/40">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <h2 className="section-heading">Ready to see your palette?</h2>
          <p className="mt-4 text-sm text-muted">Takes under a minute. No account required.</p>
          <Link
            to="/upload"
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-body text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Analyze My Style
          </Link>
        </div>
      </section>
    </div>
  );
}
