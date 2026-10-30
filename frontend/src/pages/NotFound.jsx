import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="section-heading mt-4 text-3xl">This page wandered off-runway.</h1>
      <Link to="/" className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink">
        Back to Home
      </Link>
    </div>
  );
}
