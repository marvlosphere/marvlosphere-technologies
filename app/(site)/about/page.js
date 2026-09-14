import { company } from "../../../lib/company";

export const metadata = {
  title: "About",
  description:
    "Marvlosphere Technologies is a Nigerian software company and the parent company of Electra and FUTABallot, registered with the Corporate Affairs Commission (BN: 9652069).",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            About Us
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {company.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">
            {company.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="prose-lg space-y-6 text-lg leading-relaxed text-slate-700">
          <p>
            Marvlosphere Technologies is a Nigerian software company that builds
            secure digital infrastructure for universities, businesses, and
            institutions across Africa. Founded in 2025, the company was created
            to solve a persistent problem on the continent: critical
            institutional processes — from elections to record-keeping — often
            still rely on manual, paper-based systems that are slow, costly, and
            difficult to audit.
          </p>
          <p>
            We close that gap by designing software that is secure by default,
            transparent in operation, and dependable at scale. Our work centres
            on trust: the institutions we serve need to know that results are
            accurate, data is protected, and every action can be verified.
          </p>

          <h2 className="text-2xl font-bold text-navy">What we do</h2>
          <p>
            Our flagship platform, Electra, delivers end-to-end digital
            elections for institutions of any size — two-factor-protected
            administration, an audit trail the database itself won't let
            anyone alter, and ballot secrecy that's structural rather than
            a policy someone has to follow. Electra is the architecture
            FUTABallot pioneered for student unions and university bodies,
            generalized and hardened to run any number of elections at
            once. FUTABallot itself still runs live elections today.
            Beyond both, we continue to develop tools that bring the same
            standards of security and transparency to other institutional
            needs.
          </p>
        </div>

        {/* Registration block */}
        <div id="registration" className="mt-12 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy">
            Company Registration Details
          </h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Registered Name
              </dt>
              <dd className="mt-1 text-lg text-navy">{company.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Business Name Registration No.
              </dt>
              <dd className="mt-1 text-lg font-bold text-navy">
                BN: {company.cac}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Registration Authority
              </dt>
              <dd className="mt-1 text-lg text-navy">
                Corporate Affairs Commission (CAC) of Nigeria
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Country of Registration
              </dt>
              <dd className="mt-1 text-lg text-navy">{company.country}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Owned Products
              </dt>
              <dd className="mt-1 text-lg text-navy">
                Electra and FUTABallot — developed, owned, and operated by{" "}
                {company.name}.
              </dd>
            </div>
          </dl>
        </div>

        {/* Contact block */}
        <div className="mt-8 rounded-2xl bg-navy p-8 text-white">
          <h2 className="text-xl font-bold">Contact</h2>
          <div className="mt-4 space-y-2 text-slate-200">
            <p>
              Email:{" "}
              <a href={`mailto:${company.email}`} className="text-gold hover:underline">
                {company.email}
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href={`tel:${company.phoneHref}`} className="text-gold hover:underline">
                {company.phone}
              </a>
            </p>
            <p>Address: {company.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
