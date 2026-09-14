import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Every route under this group is the Marvlosphere Technologies company
// site and gets the shared nav/footer. The personal portfolio at
// /marvelous lives outside this group specifically so it does NOT get
// wrapped in company branding — see app/marvelous/page.js.
export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
