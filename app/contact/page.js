"use client";

import { useState } from "react";
import { company } from "../../lib/company";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend: this is a front-end demonstration form.
    setSent(true);
  };

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            We&rsquo;d love to hear from you. Reach the {company.name} team using
            the details below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="text-2xl font-bold text-navy">Company details</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${company.email}`} className="text-lg text-navy hover:text-gold-dark">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${company.phoneHref}`} className="text-lg text-navy hover:text-gold-dark">
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">Address</dt>
                <dd className="mt-1 text-lg text-navy">{company.address}</dd>
              </div>
            </dl>

            <div className="mt-8 rounded-xl border-l-4 border-gold bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Registration
              </p>
              <p className="mt-1 text-lg font-bold text-navy">
                CAC Business Name No. BN: {company.cac}
              </p>
              <p className="text-sm text-slate-600">
                Corporate Affairs Commission of {company.country}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-navy">Send us a message</h2>
            {sent ? (
              <div className="mt-6 rounded-lg bg-green-50 p-6 text-green-800">
                <p className="font-semibold">Thanks, {form.name || "there"}!</p>
                <p className="mt-1 text-sm">
                  Your message has been noted. We&rsquo;ll get back to you at{" "}
                  {form.email || "your email"} soon. You can also reach us
                  directly at {company.email}.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
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
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-navy"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-lg bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-light"
                >
                  Send message
                </button>
                <p className="text-xs text-slate-400">
                  This form is for demonstration and does not store data. Please
                  email us directly for a guaranteed response.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
