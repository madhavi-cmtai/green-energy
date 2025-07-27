"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image,
  LogOut,
  MapPin,
  Package,
  Menu,
  Users2Icon
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  { name: "Blogs", href: "/dashboard/blogs", icon: <FileText /> },
  { name: "Products", href: "/dashboard/products", icon: <Package /> },
  { name: "Services", href: "/dashboard/services", icon: <MapPin /> },
  { name: "Team", href: "/dashboard/team", icon: < Users2Icon /> },
  { name: "Leads", href: "/dashboard/leads", icon: <FileText /> },
  { name: "Logout", href: "/logout", icon: <LogOut /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Branding */}
      <div className="flex flex-col items-center mb-4 border-b border-gray-200 pb-4 sticky top-0 z-10 bg-white">
        <h1 className="text-2xl font-bold text-[var(--primary-green)]">Green Energy</h1>
        
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-0 overflow-y-auto flex-1 min-h-0">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-base select-none
                border-l-4
                ${isActive
                  ? "text-[var(--primary-green)] font-bold border-[var(--primary-green)] bg-white shadow-sm"
                  : "font-medium text-gray-700 hover:bg-[var(--primary-light-green)]/10 hover:text-[var(--primary-green)] border-transparent"}`}
              style={{ fontFamily: 'var(--font-main)' }}
              onClick={() => setOpen(false)}
            >
              <span
                className={`flex items-center justify-center transition-all
                  ${isActive
                    ? "text-[var(--primary-green)] font-bold scale-110"
                    : "text-gray-500"}`}
                style={{ minWidth: 32, minHeight: 32 }}
              >
                {React.cloneElement(link.icon, {
                  size: isActive ? 24 : 20,
                  strokeWidth: isActive ? 2.5 : 1.8,
                  className: isActive ? "text-[var(--primary-green)]" : "text-gray-500",
                })}
              </span>
              <span className="truncate">{link.name}</span>
            </a>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="flex flex-col h-screen sticky top-0 z-[9999]">
      {/* Mobile Hamburger */}
      <button
        className="absolute top-4 left-4 md:hidden bg-white rounded-full p-2 shadow border border-gray-200 cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-[var(--primary-green)]" />
      </button>

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl border-r border-gray-200 py-8 px-4 flex flex-col gap-6 transition-transform duration-300
          overflow-y-auto min-h-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:min-h-screen md:block
        `}
        style={{ maxWidth: 280 }}
      >
        {sidebarContent}
      </aside>
    </div>
  );
};

export default Sidebar;
