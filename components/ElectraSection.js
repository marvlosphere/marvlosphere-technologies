const comparisons = [
  {
    against: "“Trust us, it's anonymous.”",
    claim: "Here's why it's structurally impossible to know.",
    body: "Most systems — including earlier versions of our own — record a ballot with a direct link back to the voter, and just promise not to look. Electra doesn't have that link. Who voted and what they voted for live in tables with no query, no join, no admin panel that connects them. We can't deanonymize a ballot if we wanted to. That's not a policy. It's the shape of the data.",
  },
  {
    against: "“The admin log looked fine.”",
    claim: "The database physically refused to let anyone edit it.",
    body: "If a result gets challenged six months later, the question is always whether the record you're showing people is the one that was actually written at the time. Electra's audit trail can't be edited or deleted after the fact — not by an app bug, not by a compromised admin session, not by us. The database itself rejects the attempt, no matter who's asking.",
  },
  {
    against: "“We locked it down.”",
    claim: "The account that could do the most damage is the one we protect hardest.",
    body: "Most breaches aren't clever hacks — they're one stolen admin password. Electra requires two-factor authentication for the accounts that control elections, because that's the account worth protecting first.",
  },
  {
    against: "“It won't double-count.”",
    claim: "It's mathematically incapable of double-counting.",
    body: "No student casts two ballots because a form was resubmitted, a network request retried, or two devices raced each other — the database enforces it at the write level, not the UI.",
  },
];

const chips = [
  "Live voting",
  "Unlimited concurrent elections",
  "2FA-protected admin",
  "Immutable audit log",
  "WhatsApp token delivery",
  "Structurally separated ballots",
];

const stats = [
  { value: "Unlimited", label: "Elections hosted concurrently" },
  { value: "Immutable", label: "Audit log, enforced at the database layer" },
  { value: "2FA", label: "Required for platform administrators" },
];

export default function ElectraSection() {
  return (
    <div className="mb-16">
      <div className="overflow-hidden rounded-2xl bg-navy text-white shadow-sm">
        <div className="px-8 py-14 sm:px-14">
          <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy-dark">
            The successor to FUTABallot
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Electra</h2>
          <p className="mt-2 text-sm font-medium text-gold">
            Everything FUTABallot proved, built to run at scale.
          </p>

          <p className="mt-8 max-w-3xl text-xl font-semibold leading-snug sm:text-2xl">
            Elections don't fail when the votes are counted wrong. They fail
            when nobody can prove they were counted right.
          </p>

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-200">
            Every disputed student union election follows the same shape: a
            result comes in, someone loses, and the loser's camp has a story
            — the committee was compromised, the count was manual and
            unverifiable, an admin had access to change things after the
            fact. Usually nobody can actually prove or disprove it. That
            ambiguity is the whole problem, and it's what ends in petitions,
            protests, and an electoral committee's credibility burned for a
            cycle.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-200">
            Electra is built so that story can't be told credibly, because
            the claims aren't claims — they're checkable.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
              >
                {chip}
              </span>
            ))}
          </div>

          <a
            href="https://electra-roan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
          >
            Visit Electra
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Stats band */}
        <div className="grid grid-cols-1 gap-6 border-t border-white/10 px-8 py-8 sm:grid-cols-3 sm:px-14">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-gold">{s.value}</p>
              <p className="mt-1 text-sm text-slate-300">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison blocks */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {comparisons.map((c) => (
          <div
            key={c.against}
            className="rounded-2xl border border-slate-200 bg-white p-7"
          >
            <p className="text-sm text-slate-400 line-through decoration-slate-300">
              {c.against}
            </p>
            <p className="mt-2 text-base font-bold text-navy">{c.claim}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {c.body}
            </p>
          </div>
        ))}
      </div>

      {/* One platform + sequel note */}
      <div className="mt-8 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:grid-cols-2 sm:p-10">
        <div>
          <p className="text-base font-bold text-navy">
            One platform, not one deployment per client.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            A single university running one election and a national
            professional body running fifty simultaneous chapter elections
            use the exact same platform, the same guarantees, with nothing
            custom-built per client. That matters for us commercially (it's
            how this scales past one campus) and for them (it means the
            platform has already been proven under load before their
            election is the one running on it).
          </p>
        </div>
        <div>
          <p className="text-base font-bold text-navy">
            This isn't the pitch. It's the sequel.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            FUTABallot already ran this model live, with real votes, at a
            real university. Electra is what we built after watching that
            hold up under real pressure — not a rewrite from a whiteboard.
          </p>
        </div>
      </div>

      {/* Closing line */}
      <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-relaxed text-navy">
        Ask any other election vendor how they guarantee your vote stays
        secret. If the honest answer is{" "}
        <span className="italic text-slate-500">
          &ldquo;we promise not to look&rdquo;
        </span>{" "}
        rather than{" "}
        <span className="font-bold text-gold-dark">
          &ldquo;we architecturally can't&rdquo;
        </span>{" "}
        — that's the entire difference between Electra and everything else
        in this space.
      </p>
    </div>
  );
}
