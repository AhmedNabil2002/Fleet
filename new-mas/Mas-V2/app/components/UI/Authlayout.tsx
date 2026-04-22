"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  // Re-check on route change (covers login/logout redirects)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [pathname]);

  // Listen for manual sign-out events from Navbar
  useEffect(() => {
    const sync = () => setIsLoggedIn(!!localStorage.getItem("accessToken"));
    window.addEventListener("authChanged", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("authChanged", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Avoid hydration mismatch — render nothing until client mounts
  if (!mounted) {
    return <main className="flex-1">{children}</main>;
  }

  const isAuthPage = pathname === "/auth" || pathname === "/login";
  const showNavbar = isLoggedIn && !isAuthPage;

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
    </>
  );
}