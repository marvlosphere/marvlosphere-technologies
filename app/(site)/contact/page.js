import { company } from "../../../lib/company";
import ContactForm from "../../../components/ContactForm";

export const metadata = {
  title: "Contact",
  description: `Contact ${company.name} — reach us by email, phone, or the form below.`,
};

export default function ContactPage() {
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

          <ContactForm email={company.email} />
        </div>
      </section>
    </>
  );
}
