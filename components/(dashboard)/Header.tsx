"use client";

import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="sticky top-0 w-full h-16 flex flex-col justify-center px-6 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-between h-full">
        {/* Optional: Add title or logo here */}
        <div className="text-lg font-semibold text-[var(--primary-green)]">
          {title}
        </div>

        <div className="flex items-center gap-4">
          {/* User avatar or profile dropdown */}
          <div className="w-9 h-9 rounded-full bg-[var(--primary-light-green)] flex items-center justify-center font-bold text-[var(--primary-green)] border-2 border-[var(--primary-green)]">
            GE
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
