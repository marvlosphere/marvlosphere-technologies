// Personal portfolio — deliberately outside the (site) route group, so
// it renders without the Marvlosphere company Header/Footer (see
// app/layout.js and app/(site)/layout.js). Not linked from the company
// nav; this is a direct link handed to recruiters, not a page
// institutional visitors are meant to stumble onto.

export const metadata = {
  title: { absolute: "Marvelous Bayeri — Backend Engineer" },
  description:
    "Backend engineer and security-minded builder. Mechanical Engineering student at FUTA who ships production software — including an election platform that ran real votes at a real university.",
};

const EMAIL = "miraclemarvelous80@gmail.com";
const GITHUB = "https://github.com/marvlosphere99-web";
const LINKEDIN = "https://www.linkedin.com/in/marvelous-bayeri-3b7148371/";

const supportingProjects = [
  {
    name: "Barny Branding",
    tag: "Commercial product",
    description:
      "Quote-based commerce platform for branded-product businesses. Built row-level database access control for staff conversations — then wrote an adversarial test suite that hits the API directly to prove it can't be bypassed, not just that the UI hides the button.",
    url: "https://barny.online",
  },
  {
    name: "AI-Based Network Behaviour Profiler",
    tag: "Security tooling",
    description:
      "A statistical anomaly detector built from scratch — rolling z-score and EWMA baselines, no ML library — that profiles simulated traffic and flags injected attack patterns (DDoS, port scans, exfiltration) in real time.",
    url: "https://ai-behaviour-profiler.vercel.app",
  },
  {
    name: "Packet Journey Visualizer",
    tag: "Simulation tooling",
    description:
      "Animates simulated packets traveling across 5 network topologies with live stats and saved run history, wrapped as a desktop app with Electron.",
    url: "https://packet-journey-visualizer-chi.vercel.app",
  },
];

const skills = [
  {
    title: "Backend Development",
    items: [
      "Next.js / Node.js across every product I've shipped",
      "PostgreSQL & Supabase, including row-level security policies",
      "Real-time systems — live dashboards, atomic writes under concurrent load",
      "Packaging web apps as desktop software with Electron",
    ],
  },
  {
    title: "Security-Minded Design",
    items: [
      "Row-level access control verified with adversarial API testing, not just UI checks",
      "Immutable audit trails enforced at the database layer",
      "Structural data secrecy — designing schemas where a join simply can't exist",
      "Statistical anomaly detection (rolling z-score / EWMA) built from first principles",
    ],
  },
  {
    title: "AI-Assisted Development",
    items: [
      "Shipping production systems — architecture, security hardening, and all — using AI pair-programming as a core part of the workflow",
      "Doing this while carrying a full Mechanical Engineering course load, not as a full-time CS student",
    ],
  },
];

export default function MarvelousPortfolio() {
  return (
    <div className="bg-white font-sans text-slate-800">
        {/* Hero */}
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-4xl px-5 py-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Marvelous Bayeri
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Backend engineer & security-minded builder.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
              I ship production software — from an election platform that
              ran real votes at a real university, to hand-built security
              tooling and simulation systems. Currently a 400-level
              Mechanical Engineering student at the Federal University of
              Technology, Akure (FUTA) — software is what I do alongside
              that, not instead of it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
              >
                See my work
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Flagship case study */}
        <section id="work" className="mx-auto max-w-4xl px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
            Flagship work
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy">
            FUTABallot & Electra
          </h2>
          <p className="mt-2 text-base font-medium text-slate-500">
            A digital election platform that ran real votes at a real
            university, then became the architecture for a platform that
            runs any number of elections at once.
          </p>

          <div className="mt-8 space-y-8 text-slate-700">
            <div>
              <h3 className="text-lg font-bold text-navy">The problem</h3>
              <p className="mt-2 leading-relaxed">
                Every disputed student union election follows the same
                shape: a result comes in, someone loses, and the loser's
                camp has a story — the count was manual, an admin could
                have changed something after the fact, nobody can actually
                prove otherwise. That ambiguity is what ends in petitions,
                protests, and a burned electoral committee.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">What I built</h3>
              <p className="mt-2 leading-relaxed">
                A voting platform where the claims aren't claims — they're
                checkable. Ballot secrecy that's structural: voter
                identity and vote choice live in tables with no query path
                between them, so deanonymizing a ballot isn't a policy
                violation, it's a mathematical impossibility. An audit
                trail the database itself refuses to let anyone edit or
                delete after the fact, no matter who's asking. Token-based
                voter authentication delivered over WhatsApp, so there's no
                account to create and no password to lose. I later
                generalized this architecture into Electra, hardening it
                further with two-factor-protected administration and
                support for running unlimited elections concurrently on
                one platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">The result</h3>
              <p className="mt-2 leading-relaxed">
                FUTABallot ran real votes at FUTA — not a demo, not a
                staged pilot. It held up under real pressure, which is the
                only kind of proof that actually counts for something
                whose entire premise is trustworthiness.
              </p>
            </div>
          </div>

          {/* Not a screenshot, not a claim to take on faith — a link to
              the actual public page, live, right now. This is the kind
              of independently-checkable proof the whole project is
              built around, so it gets a direct link rather than an
              embed that could go stale or render inconsistently. */}
          <a
            href="https://futaballot.site/integrity"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 transition-colors hover:border-gold hover:bg-white"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">
                Don&apos;t take my word for it
              </p>
              <p className="mt-1 font-semibold text-navy">
                Open the live, public integrity dashboard — updates every 10 seconds
              </p>
            </div>
            <span className="shrink-0 text-lg text-gold-dark">↗</span>
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://electra-roan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Visit Electra ↗
            </a>
            <a
              href="https://futaballot.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy"
            >
              Visit FUTABallot ↗
            </a>
          </div>
        </section>

        {/* Supporting projects */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-5 py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              Also built
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy">
              A few more things worth a look
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {supportingProjects.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {p.tag}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-navy">
                    {p.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
                    Open
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mx-auto max-w-4xl px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
            What I bring
          </p>
          <h2 className="mt-2 text-2xl font-bold text-navy">Skills</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {skills.map((s) => (
              <div key={s.title}>
                <h3 className="text-base font-bold text-navy">{s.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-5 py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              About
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy">
              Software isn&apos;t my major. It&apos;s what I do anyway.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate-700">
              I&apos;m a 400-level Mechanical Engineering student at the
              Federal University of Technology, Akure (FUTA). Everything on
              this page — the election platform, the security tooling, the
              simulation systems — was built alongside that degree, not
              instead of it. I&apos;m self-taught in backend development,
              and my interest in cybersecurity is where the security
              discipline in my work comes from — it shows up as secure
              system design (access control, audit trails, data
              architecture that makes certain failures structurally
              impossible), not penetration testing. I lean heavily on
              AI-assisted development to move fast without cutting
              corners on the parts that actually matter: data integrity,
              access control, and being able to prove a system does what
              it claims to do.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center">
            <h2 className="text-2xl font-bold">Let&apos;s talk</h2>
            <p className="mx-auto mt-3 max-w-md text-slate-300">
              Open to backend, full-stack, or security-focused roles.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
              >
                {EMAIL}
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                LinkedIn ↗
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
    </div>
  );
}
