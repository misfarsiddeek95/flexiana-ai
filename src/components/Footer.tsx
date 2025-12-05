"use client";

import Image from "next/image";
import Link from "next/link";

// --- Data for Links ---
const products = [
  { name: "Gitrevio", href: "https://gitrev.io/" },
  { name: "Workrevio", href: "https://flexiana.com/workrevio" },
  { name: "Frankie", href: "https://frankie.pro/" },
  { name: "Flexdoc", href: "https://flexdoc.flexiana.com/" },
  { name: "Kaleidux", href: "https://flexiana.com/kaleidux" },
  { name: "Xiana", href: "https://github.com/Flexiana/framework" },
  { name: "Margin Boost", href: "https://flexiana.com/marginboost" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "https://flexiana.com/privacy-policy" },
  // { name: "Terms & Conditions", href: "/terms-conditions" },
  // { name: "Cookie Policy", href: "/cookie-policy" },
];

// --- Main Component ---
export default function Footer() {
  return (
    <footer className="bg-white">
      {/* ===== LAYER 1: Main Content Layer ===== */}
      <div className="bg-linear-to-br from-[#F8F9FA] via-[#F5F7FA] to-[#F0F4F8] relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-[#42A5F5]/10 to-[#7E57C2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-[#FF6F00]/10 to-[#C33C00]/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          {/* Top Row: CTA Section - Moved to FooterCTA component */}

          {/* Bottom Row: Logo & Links */}
          <div className="pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left: Logo */}
              <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                <Image
                  src="/logo.svg"
                  alt="Flexiana AI Logo"
                  width={200}
                  height={40}
                  className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                  priority
                />
              </div>

              {/* Right: All Links Section */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
                {/* Products Links - 2 Columns */}
                <div className="w-full lg:w-auto">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md mx-auto lg:mx-0">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="font-sans text-[15px] text-[#1A1A1A] hover:text-[#42A5F5] transition-colors duration-200 font-medium text-center lg:text-left"
                        target="_blank"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Legal Links - Horizontal on Mobile, Vertical on Desktop */}
                <div className="flex flex-row flex-wrap lg:flex-col justify-center lg:justify-start gap-4 lg:gap-3 items-center lg:items-start w-full lg:w-auto">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="font-sans text-[14px] text-[#616161] hover:text-[#42A5F5] transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-[#42A5F5] after:to-[#7E57C2] hover:after:w-full after:transition-all after:duration-300"
                      target="_blank"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== LAYER 2: Copyright Layer ===== */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="font-sans text-[14px] text-[#616161]">
              © {new Date().getFullYear()} Flexiana AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
