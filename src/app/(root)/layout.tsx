import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import Navbar from "@/components/Navbar";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import ContactModal from "@/components/ui/ContactModal";
import ContactModalWrapper from "@/components/ui/ContactModalWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContactModalProvider>
      <Navbar />
      <main>{children}</main>
      <FooterCTA />
      <Footer />
      <ContactModalWrapper />
    </ContactModalProvider>
  );
}
