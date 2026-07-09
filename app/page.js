import Link from "next/link";
import { company } from "../lib/company";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-navy-light blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <p className="mb-4 inline-block rounded-full border border-gold/40 px-4 py-1 text-sm font-medium text-gold">
            Nigerian Software Company
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {company.name}
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-medium text-gold">
            {company.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
            Marvlosphere Technologies is a Nigerian software company building
            secure digital infrastructure for African universities, businesses,
            and institutions.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
            >
              Explore Our Products
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              About the Company
            </Link>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
            Our Products
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy">
            Software built for real institutions
          </h2>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Product visual (geometric mockup, no fake stock photo) */}
          <div className="flex flex-col justify-center rounded-2xl bg-navy p-8 text-white">
            <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gold" />
                <span className="h-3 w-3 rounded-full bg-white/40" />
                <span className="h-3 w-3 rounded-full bg-white/40" />
                <span className="ml-3 text-xs text-slate-300">futaballot.site</span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-3 w-2/3 rounded bg-gold/70" />
                <div className="h-2 w-full rounded bg-white/20" />
                <div className="h-2 w-5/6 rounded bg-white/20" />
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-white/10 p-4 text-center">
                    <div className="text-2xl font-bold text-gold">100%</div>
                    <div className="text-[10px] text-slate-300">Integrity</div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 text-center">
                    <div className="text-2xl font-bold text-white">Live</div>
                    <div className="text-[10px] text-slate-300">Dashboard</div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 text-center">
                    <div className="text-2xl font-bold text-white">Secure</div>
                    <div className="text-[10px] text-slate-300">Voting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-navy">FUTABallot</h3>
            <p className="mt-1 text-sm font-medium text-gold-dark">
              A product of {company.name}
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              FUTABallot is a secure digital election platform for Nigerian
              universities. It gives student unions and institutions a
              transparent, token-authenticated voting system with a real-time
              integrity dashboard — replacing paper ballots with verifiable
              digital results.
            </p>
            <div className="mt-8">
              <a
                href={company.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-light"
              >
                Visit FUTABallot
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About brief */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
                About Us
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy">
                A software company rooted in Nigeria
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                We design and operate digital platforms that African
                institutions can trust — with security, transparency, and
                reliability at the core of everything we build.
              </p>
              <p>
                Marvlosphere Technologies is registered with the Corporate
                Affairs Commission of Nigeria (BN: {company.cac}) and is the
                parent company of FUTABallot.
              </p>
              <Link
                href="/about"
                className="inline-block font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-navy-light"
              >
                Read more about us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-2xl bg-navy px-8 py-12 text-white md:px-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Let&rsquo;s work together
              </h2>
              <p className="mt-3 max-w-md text-slate-200">
                Have a project or a question? Reach out to the Marvlosphere
                Technologies team directly.
              </p>
            </div>
            <div className="space-y-3 md:justify-self-end">
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-lg hover:text-gold">
                <span className="text-gold">✉</span> {company.email}
              </a>
              <a href={`tel:${company.phoneHref}`} className="flex items-center gap-3 text-lg hover:text-gold">
                <span className="text-gold">☎</span> {company.phone}
              </a>
              <Link
                href="/contact"
                className="mt-4 inline-block rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark hover:bg-gold-dark"
              >
                Go to Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
