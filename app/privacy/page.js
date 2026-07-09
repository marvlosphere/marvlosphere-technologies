import { company } from "../../lib/company";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Marvlosphere Technologies and FUTABallot — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-300">Last updated: January 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="space-y-8 text-slate-700">
          <p className="text-lg leading-relaxed">
            This Privacy Policy explains how {company.name} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects
            information when you use our website and our products, including
            FUTABallot. By using our services, you agree to the practices
            described below.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-navy">1. Information we collect</h2>
            <p className="mt-3 leading-relaxed">
              We collect information you provide directly to us, such as your
              name, email address, and any message you send through our contact
              form. When you use FUTABallot, we process the data necessary to
              authenticate eligible voters and administer elections, such as
              authentication tokens and voting records. We do not link an
              individual&rsquo;s identity to how they voted.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">2. How we use your data</h2>
            <p className="mt-3 leading-relaxed">
              We use the information we collect to operate and improve our
              services, respond to enquiries, authenticate users, run and secure
              elections on FUTABallot, and maintain the integrity and security of
              our platforms. We do not sell your personal information to third
              parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">3. Third-party services</h2>
            <p className="mt-3 leading-relaxed">
              We may rely on trusted third-party providers for hosting, security,
              and analytics. These providers process data only as needed to
              deliver their services to us and are expected to protect your
              information. Our products may link to external websites; we are not
              responsible for the privacy practices of sites we do not operate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">4. Data security</h2>
            <p className="mt-3 leading-relaxed">
              We apply appropriate technical and organisational measures to
              protect your data against unauthorised access, alteration, or
              loss. Security is central to how FUTABallot is designed and
              operated.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">5. Your rights</h2>
            <p className="mt-3 leading-relaxed">
              You may request access to, correction of, or deletion of the
              personal information we hold about you, subject to applicable law.
              To make a request, contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">6. Contact for privacy questions</h2>
            <p className="mt-3 leading-relaxed">
              If you have any questions about this Privacy Policy or how your
              data is handled, please contact {company.name}:
            </p>
            <ul className="mt-4 space-y-1">
              <li>
                Email:{" "}
                <a href={`mailto:${company.email}`} className="font-medium text-navy hover:text-gold-dark">
                  {company.email}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href={`tel:${company.phoneHref}`} className="font-medium text-navy hover:text-gold-dark">
                  {company.phone}
                </a>
              </li>
              <li>Address: {company.address}</li>
              <li>Registration: CAC BN {company.cac}, {company.country}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
