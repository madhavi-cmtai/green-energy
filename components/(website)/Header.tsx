"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
];

const Header = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let u = null;
      try {
        u = JSON.parse(localStorage.getItem("user") || "null");
      } catch { }
      if (!u) {
        const match = document.cookie.match(/user=([^;]+)/);
        if (match) {
          try {
            u = JSON.parse(decodeURIComponent(match[1]));
          } catch { }
        }
      }
      setUser(u);
    }
  }, [pathname]);

  let profileHref = "/profile";
  let profileLabel = "Profile";
  if (user?.role === "admin") {
    profileHref = "/dashboard";
    profileLabel = "Dashboard";
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-[var(--primary-light-green)]">
      <div className="container mx-auto px-4 flex items-center justify-between py-1.5 min-h-[46px]">
        <div className="flex items-center gap-0">
          <Link href="/" className="inline-flex items-center">
            <Image src="/logo.jpg" alt="Logo" width={100} height={67} className="mr-2 rounded-md" />
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav
          className="hidden md:flex gap-5 items-center text-base font-bold text-end ml-36 "
          style={{ fontFamily: 'var(--font-main)' }}
        >
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${isActive
                    ? "text-[var(--primary-green)] font-bold"
                    : "hover:text-[var(--primary-green)] hover:underline hover:bg-[rgba(245,255,250,0.4)]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <Link href="/contact" passHref>
          <Button className="mr-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Contact Us
          </Button>
        </Link>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-green)]"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7 text-[var(--primary-green)]" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-64 h-full shadow-lg flex flex-col p-6 relative animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-[var(--primary-green)]" />
            </button>

            <nav
              className="flex flex-col gap-4 mt-10 text-lg font-bold"
              style={{ fontFamily: 'var(--font-main)' }}
            >
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${pathname === link.href
                      ? "text-[var(--primary-green)] font-bold"
                      : "text-[var(--primary-light-green)] hover:text-[var(--primary-green)] hover:bg-[rgba(245,255,250,0.4)]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
