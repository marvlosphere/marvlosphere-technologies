import Link from "next/link";
import Logo from "./Logo";
import { company } from "../lib/company";

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-dark text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-lg font-bold text-white">{company.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {company.tagline}. Registered in {company.country}.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phoneHref}`} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li>{company.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {company.name} (BN: {company.cac}) &middot; Registered in {company.country}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
