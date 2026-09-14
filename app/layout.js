import "./globals.css";
import { company } from "../lib/company";

export const metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description:
    "Marvlosphere Technologies is a Nigerian software company building secure digital infrastructure for African universities, businesses, and institutions.",
  keywords: [
    "Marvlosphere Technologies",
    "Nigerian software company",
    "FUTABallot",
    "digital election platform",
    "African institutions",
  ],
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description:
      "A Nigerian software company building secure digital infrastructure for African universities, businesses, and institutions.",
    url: company.siteUrl,
    siteName: company.name,
    locale: "en_NG",
    type: "website",
  },
};

// Deliberately bare — no Header/Footer here. Every company-site route
// gets those from app/(site)/layout.js instead, so the personal
// portfolio at /marvelous (a sibling of the (site) group) can render
// without any Marvlosphere company branding.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
