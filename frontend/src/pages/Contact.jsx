import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:px-8">
      <p className="eyebrow">Contact</p>
      <h1 className="section-heading mt-4">Get in touch</h1>
      <p className="mt-4 text-sm text-muted">Questions, feedback, or a partnership idea — send it over.</p>

      {sent ? (
        <div className="mt-10 rounded-2xl border border-gold/40 bg-gold/5 p-6 text-sm text-ivory">
          Thanks — your message has been sent. We'll reply soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-ivory">Name</label>
            <input id="name" required type="text" className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory focus:border-gold" />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-ivory">Email</label>
            <input id="email" required type="email" className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory focus:border-gold" />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-ivory">Message</label>
            <textarea id="message" required rows={5} className="w-full rounded-lg border border-ink-line bg-ink-soft px-4 py-3 text-sm text-ivory focus:border-gold" />
          </div>
          <button type="submit" className="rounded-full bg-gold px-7 py-3 font-body text-sm font-medium text-ink">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
