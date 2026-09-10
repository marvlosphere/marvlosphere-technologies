"use client";

import { useState } from "react";

export default function ContactForm({ email }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend: this opens the visitor's own email client with the
    // message pre-filled, rather than faking a "we received it" state
    // for a submission that actually goes nowhere.
    const subject = encodeURIComponent(`Message from ${form.name || "website visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || "(no name given)"} (${form.email || "no email given"})`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-navy">Send us a message</h2>
      {sent ? (
        <div className="mt-6 rounded-lg bg-green-50 p-6 text-green-800">
          <p className="font-semibold">Opening your email client…</p>
          <p className="mt-1 text-sm">
            If nothing opened, email us directly at{" "}
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-navy"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-navy"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-navy"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-light"
          >
            Send message
          </button>
          <p className="text-xs text-slate-400">
            This opens your own email app with the message pre-filled — we
            don't collect or store anything on this page.
          </p>
        </form>
      )}
    </div>
  );
}
