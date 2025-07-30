"use client";

import { Mail, Phone, MapPinned } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-12 pb-6 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Green Energy</h2>
          <p className="text-sm text-gray-400">
            Leading innovation in magnetic electricity and green energy solutions.
            Clean, sustainable power for a better planet.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/projects" className="hover:underline">Projects</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPinned className="w-16 h-6 text-green-400" />
              Office :
              Muscat Grand Mall
              5th Floor, Building No. 6, Gubrah, Muscat, Sultanate of Oman
              P.O. Box: 670, PC 116, Mina Al Fahal, Muscat, Sultanate of Oman, 
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" />
              ++91 85274 49007
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-400" />
              info@greenenergy.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Privacy & Policy</h3>
          <li className="flex items-center gap-2">
            Terms & Conditions
          </li>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Own Silent. All rights reserved.
      </div>
    </footer>
  );
}
