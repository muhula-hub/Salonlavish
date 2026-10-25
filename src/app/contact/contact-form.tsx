"use client";

import { useState } from "react";
import { store } from "@/lib/data";

// Opens the visitor's email app until a server action sends messages directly (for example with Resend).
export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="card gap-4 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        window.location.href = `mailto:${store.email}?subject=${encodeURIComponent(`${d.topic}: ${d.name}`)}&body=${encodeURIComponent(`${d.message}\n\n${d.name}\n${d.phone}`)}`;
        setSent(true);
      }}
    >
      <h2 className="text-3xl">Send a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field"><span className="label">Name</span><input id="ct-name" name="name" required autoComplete="name" className="input" /></label>
        <label className="field"><span className="label">Phone</span><input id="ct-phone" name="phone" type="tel" autoComplete="tel" className="input" /></label>
      </div>
      <label className="field">
        <span className="label">Topic</span>
        <select id="ct-topic" name="topic" className="input">
          <option>Product question</option>
          <option>My order</option>
          <option>Booking</option>
          <option>Other</option>
        </select>
      </label>
      <label className="field"><span className="label">Message</span><textarea id="ct-message" name="message" required className="input min-h-32" /></label>
      <button className="btn self-start" type="submit">Send message</button>
      {sent && <p className="text-sm text-muted">Your email app should open with the message ready to send.</p>}
    </form>
  );
}
