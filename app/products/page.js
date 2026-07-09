import { company } from "../../lib/company";

export const metadata = {
  title: "Products",
  description:
    "FUTABallot — a secure digital election platform for Nigerian universities, and a product of Marvlosphere Technologies.",
};

const features = [
  {
    title: "Secure voting",
    body: "Encrypted ballots and hardened infrastructure keep every vote confidential and tamper-resistant from cast to count.",
  },
  {
    title: "Token-based authentication",
    body: "Each eligible voter receives a unique access token, ensuring one person, one vote — without exposing personal identity in the results.",
  },
  {
    title: "Real-time integrity dashboard",
    body: "Administrators and observers watch turnout and system integrity live, making the entire election transparent and auditable.",
  },
];

export default function ProductsPage() {
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
        {/* FUTABallot card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="bg-navy p-10 text-white">
              <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy-dark">
                Flagship Product
              </span>
              <h2 className="mt-5 text-3xl font-bold">FUTABallot</h2>
              <p className="mt-2 text-sm font-medium text-gold">
                A product of {company.name}
              </p>
              <p className="mt-5 leading-relaxed text-slate-200">
                FUTABallot is a secure digital election platform built for
                Nigerian universities. It serves student unions, electoral
                committees, and university administrations that need to run
                credible, verifiable elections without the cost and delay of
                paper ballots.
              </p>
              <a
                href={company.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
              >
                Visit FUTABallot
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="p-10">
              <h3 className="text-lg font-bold text-navy">Key features</h3>
              <ul className="mt-6 space-y-6">
                {features.map((f) => (
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

        {/* Who it serves */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { label: "Student Unions", desc: "Credible union elections students can trust." },
            { label: "Electoral Committees", desc: "Tools to run and audit each vote end to end." },
            { label: "University Admins", desc: "Oversight and integrity reporting in real time." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold text-navy">{item.label}</p>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* More coming soon */}
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-bold text-navy">More products coming soon</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Marvlosphere Technologies is actively expanding its portfolio of
            secure digital tools for African institutions. New platforms are in
            development — check back as we grow.
          </p>
        </div>
      </section>
    </>
  );
}
