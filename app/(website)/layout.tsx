"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/(website)/Header";
import Footer from "../../components/(website)/Footer";
import FloatingButtons from "../../components/(website)/floatingButtons";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setPopupOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Add all auth paths where you don't want header/footer
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
       <Header />
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <FloatingButtons />}
    </div>
  );
}
