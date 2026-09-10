import fs from "fs";
import path from "path";
import Link from "next/link";
import { company } from "../../lib/company";

export const metadata = {
  title: "Products",
  description:
    "Products by Marvlosphere Technologies — secure, transparent software for African institutions.",
};

// Each product is its own file in data/products/*.json — see
// data/products/README.md for the shape and why it's structured this
// way (so multiple contributors can each add one without touching this
// file or conflicting with each other).
function loadProducts() {
  const dir = path.join(process.cwd(), "data", "products");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export default function ProductsPage() {
  const products = loadProducts();

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Our Products
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Products by {company.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            Secure, transparent software for African institutions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="space-y-14">
          {products.map((p) => (
            <div key={p.url}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="grid md:grid-cols-2">
                  <div className="bg-navy p-10 text-white">
                    <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy-dark">
                      {p.badge}
                    </span>
                    <h2 className="mt-5 text-3xl font-bold">{p.name}</h2>
                    <p className="mt-2 text-sm font-medium text-gold">
                      {p.tagline}
                    </p>
                    <p className="mt-5 leading-relaxed text-slate-200">
                      {p.description}
                    </p>
                    {p.chips?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
                    >
                      {p.ctaLabel}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>

                  <div className="p-10">
                    <h3 className="text-lg font-bold text-navy">Key features</h3>
                    <ul className="mt-6 space-y-6">
                      {p.features.map((f) => (
                        <li key={f.title} className="flex gap-4">
                          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-dark">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <div>
                            <p className="font-semibold text-navy">{f.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {f.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {p.audience?.length > 0 && (
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {p.audience.map((item) => (
                    <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-6">
                      <p className="font-bold text-navy">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* More coming soon */}
        <div className="mt-14 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-bold text-navy">More products coming soon</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Marvlosphere Technologies is actively expanding its portfolio of
            secure digital tools for African institutions. New platforms are in
            development — check back as we grow.
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-2 hover:text-gold-dark"
          >
            See our technical projects &amp; prototypes →
          </Link>
        </div>
      </section>
    </>
  );
}
