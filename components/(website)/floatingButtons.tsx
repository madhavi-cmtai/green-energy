"use client";

import React, { useState, useEffect } from "react";
import { User2, MailCheck, Info, MessageSquareMore } from "lucide-react"; // Updated icons

const actions = [
  {
    icon: <User2 />,
    label: "Profile",
    color: "bg-emerald-500 hover:bg-emerald-600",
    href: "#",
  },
  {
    icon: <MailCheck />,
    label: "Messages",
    color: "bg-teal-400 hover:bg-teal-500 text-black",
    href: "#",
  },
  {
    icon: <Info />,
    label: "Info",
    color: "bg-cyan-500 hover:bg-cyan-600",
    href: "#",
  },
];

const FloatingButtons = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#fab-root")) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div id="fab-root" className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {/* Action Buttons */}
      <div
        className={`flex flex-col gap-3 mb-2 transition-all duration-300 ${open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
          }`}
      >
        {actions.map((action, i) => (
          <button
            key={action.label}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white font-semibold text-base transition-transform hover:scale-105 hover:shadow-xl focus:outline-none ${action.color}`}
            aria-label={action.label}
            style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
            onClick={() => {
              window.location.href = action.href;
            }}
          >
            {action.icon}
          </button>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-700 text-white shadow-xl text-2xl transition-all focus:outline-none"
        aria-label="Open actions"
      >
        <MessageSquareMore
          className={`transition-transform duration-300 ${open ? "rotate-90 scale-110" : ""}`}
          size={28}
        />
      </button>
    </div>
  );
};

export default FloatingButtons;
