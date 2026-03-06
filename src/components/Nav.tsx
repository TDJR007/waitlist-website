"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <span className="font-serif text-[22px] font-semibold tracking-tight text-ink">
        Rapport<span className="text-terra">.</span>
      </span>

      <Link
        href="#waitlist"
        className="rounded-full border border-terra px-5 py-2 text-[13px] font-medium tracking-wide text-terra transition-all duration-200 hover:bg-terra hover:text-white"
      >
        Request Access
      </Link>
    </nav>
  );
}

/*
    "use client" — Next.js App Router renders components on the server by default. The Nav needs to detect scroll position to add a backdrop, so it needs browser APIs. "use client" opts it into client-side rendering.
    Components that are purely presentational (no interactivity, no browser APIs) won't need this directive. You'll see the pattern emerge as we go.
*/