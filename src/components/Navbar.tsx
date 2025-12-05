"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/contexts/ContactModalContext";

const shouldUseDarkBackground = (pathname: string): boolean => {
  // Exact matches
  if (pathname === "/about" || pathname === "/case-studies") {
    return true;
  }

  if (pathname.startsWith("/blog/") || pathname === "/blog") {
    return true;
  }

  // Case study detail pages: /case-studies/[slug]
  if (pathname.startsWith("/case-studies/")) {
    return true;
  }

  return false;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navColor = isScrolled
    ? "bg-[#1A1A1A]/80 shadow-xl border-white/20"
    : shouldUseDarkBackground(pathname)
    ? "bg-black/30 border-white/10"
    : "bg-white/15 border-white/10";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center transition-all duration-300 ${
        isScrolled ? "pt-4 pb-4" : "pt-6 sm:pt-8"
      }`}
    >
      {/* Relative container for positioning dropdown */}
      <div className="relative max-w-4xl w-full mx-4">
        {/* The floating, glassmorphism bar */}
        <div
          className={`relative z-10 flex items-center justify-between w-full px-5 transition-all duration-300 ${
            isScrolled ? "py-2" : "py-2 sm:py-3"
          } ${navColor} backdrop-blur-md rounded-xl border`}
        >
          <Link href="/" className="flex items-center space-x-2 sm:ml-10">
            <Image
              src="/white_logo.svg"
              alt="Flexiana AI Logo"
              width={isScrolled ? 120 : 150}
              height={30}
              priority
              className="transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-8 text-white text-lg font-medium">
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/case-studies"
              className="hover:text-gray-300 transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="/blog"
              className="hover:text-gray-300 transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Desktop Contact Us Button (Hidden on mobile) */}
          <button
            type="button"
            onClick={openModal}
            className={`hidden md:block bg-gradient-to-r from-[#FF6F00] to-[#C33C00] text-white font-normal rounded-lg shadow-md hover:opacity-90 transition-all duration-300 ${
              isScrolled ? "py-1.5 px-5 text-sm" : "py-[8px] px-6 text-base"
            }`}
          >
            Contact Us
          </button>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden w-full bg-[#1A1A1A]/95 backdrop-blur-md rounded-xl shadow-lg border border-white/10 mt-2 p-5 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col items-center space-y-4">
              <Link
                href="/about"
                className="text-white text-lg hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/case-studies"
                className="text-white text-lg hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="/blog"
                className="text-white text-lg hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              {/* 'Contact Us' as a full-width button in the mobile menu */}
              <button
                type="button"
                className="w-full bg-gradient-to-r from-[#FF6F00] to-[#C33C00] text-white text-base font-normal py-2 px-6 rounded-lg text-center shadow-md hover:opacity-90 transition-opacity"
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
