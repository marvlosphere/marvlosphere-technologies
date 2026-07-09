import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
