"use client";

import { useState } from "react";

// Not connected yet: wire this to an email list (for example Resend audiences) when the backend is added.
export function Newsletter() {
  const [done, setDone] = useState(false);
  if (done) return <p className="text-gold-soft">You&apos;re on the list. Watch your inbox for new drops.</p>;
  return (
    <form
      className="flex w-full flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        className="w-full border border-white/30 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
      />
      <button className="btn-light shrink-0" type="submit">Subscribe</button>
    </form>
  );
}
