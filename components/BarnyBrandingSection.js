const comparisons = [
  {
    against: "“We just handle it over WhatsApp.”",
    claim: "Then the conversation belongs to a phone, not the business.",
    body: "The moment a quote moves off-platform, the business loses it. There's no record of what was quoted, no way for a manager to check in on a stalled conversation, no trace if the staff member goes on leave mid-negotiation. Barny Branding keeps the entire negotiation — messages, attachments, agreed price — attached to one order record the business owns, not a person's inbox.",
  },
  {
    against: "“Our staff know which customer is theirs.”",
    claim: "Nobody should have to guess who's covering what.",
    body: "A first-come, first-served group chat is what most small teams actually run on, and it means requests get answered twice or not at all. Barny Branding puts every new quote request into a shared waiting list any available agent can claim — and once claimed, it's theirs alone to work, with a supervisor able to step in and take over if it stalls.",
  },
  {
    against: "“Only the right people can see a customer's chat.”",
    claim: "That's not a policy here — it's enforced by the database.",
    body: "Most systems promise access control in the interface: hide the button, trust the frontend. Barny Branding enforces it in Postgres itself, at the row level. An agent's request to read another agent's chat isn't refused by a UI check that a clever request could route around — it returns zero rows, structurally, no matter how the request is made. This was verified with an actual adversarial test suite hitting the API directly, not just clicking through the app and confirming buttons were hidden.",
  },
  {
    against: "“We'll mark it paid once the money comes in.”",
    claim: "Payment status isn't something a browser gets to decide.",
    body: "A price is only real once a staff member has actually agreed it with the customer — never a cart total, never something a customer can set themselves. The same discipline carries through the whole order lifecycle: quote requested, negotiating, agreed, paid, in production, delivered — each stage moved forward deliberately, with a permanent history of who moved it and when.",
  },
];

const chips = [
  "Live quote negotiation",
  "Role-based staff access",
  "Full order lifecycle tracking",
];

const audience = [
  {
    label: "For customers",
    desc: "A real conversation with a real person, and a record of exactly what was agreed, from first message to delivery.",
  },
  {
    label: "For customer-facing staff",
    desc: "A shared queue instead of a shared inbox, every conversation tied to one order they own.",
  },
  {
    label: "For the business owner",
    desc: "Visibility into every open conversation and every claimed order, with the ability to step into any of them at any time.",
  },
];

export default function BarnyBrandingSection() {
  return (
    <div className="mb-16">
      <div className="overflow-hidden rounded-2xl bg-navy text-white shadow-sm">
        <div className="px-8 py-14 sm:px-14">
          <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy-dark">
            🎨 Quote-Based Branding Commerce
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Barny Branding</h2>
          <p className="mt-2 text-sm font-medium text-gold">
            A product of Marvlosphere Technologies
          </p>

          <p className="mt-8 max-w-3xl text-xl font-semibold leading-snug sm:text-2xl">
            Barny Branding is what happens when you refuse to accept that as
            the cost of doing business that can&apos;t have a price list.
          </p>

          <p className="mt-6 max-w-3xl leading-relaxed text-slate-200">
            Every branded product business hits the same wall: you can&apos;t
            put a price on a banner without knowing the size, or on a
            t-shirt run without knowing the quantity, or on an ID card batch
            without knowing the design. Fixed-price storefronts assume a
            world where none of that is true. So the business does what
            every business like it does — it moves the actual sale into
            WhatsApp.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-200">
            That works, until it doesn&apos;t. A customer&apos;s chat sits
            in one staff member&apos;s phone, not the business. Nobody else
            can see what was promised, what was agreed, or whether it was
            ever followed up. When that staff member is busy, or leaves, or
            simply forgets, the order — and the money — goes with them.
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
            href="https://barny.online"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy-dark transition-colors hover:bg-gold-dark"
          >
            Visit Barny Branding
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
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

      {/* Closing framing + audience */}
      <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-relaxed text-navy">
        This isn&apos;t a general-purpose storefront with the pricing turned
        off. It&apos;s built for the specific shape of a business where
        every job is a negotiation — and it treats that negotiation as the
        product, not a workaround.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {audience.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="font-bold text-navy">{item.label}</p>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
