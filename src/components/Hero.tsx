import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-12 pb-20 pt-32 md:px-12">

      {/* Background orbs */}
      <div className="animate-drift-slow pointer-events-none absolute -right-24 -top-24 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(196,97,58,0.08)_0%,transparent_70%)]" />
      <div className="animate-drift-slower pointer-events-none absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(122,158,142,0.10)_0%,transparent_70%)]" />

      {/* Eyebrow */}
      <p className="animate-fade-up animate-fade-up-1 mb-7 text-[11px] font-medium uppercase tracking-[2.5px] text-terra">
        Introducing Rapport
      </p>

      {/* Headline */}
      <h1 className="animate-fade-up animate-fade-up-2 max-w-3xl font-serif text-[clamp(48px,6vw,88px)] font-semibold leading-[1.05] tracking-[-2px]">
        Great managers<br />
        <em className="text-terra">communicate</em><br />
        differently.
      </h1>

      {/* Subheading */}
      <p className="animate-fade-up animate-fade-up-3 mt-7 max-w-xl text-lg font-light leading-relaxed text-muted">
        Rapport learns how you lead, drafts responses in your voice, and gets
        smarter with every conversation — so your team always gets the reply
        they deserve.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up animate-fade-up-4 mt-11 flex flex-wrap gap-4">
        <Link
          href="#waitlist"
          className="rounded-full bg-terra px-8 py-3.5 text-[15px] font-medium text-white shadow-[0_4px_24px_rgba(196,97,58,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b8512e] hover:shadow-[0_8px_32px_rgba(196,97,58,0.35)]"
        >
          Request Early Access
        </Link>
        <Link
          href="#how"
          className="flex items-center gap-1.5 py-3.5 text-[15px] text-ink/70 transition-opacity duration-200 hover:text-ink/100"
        >
          See how it works
          <ArrowDown size={15} />
        </Link>
      </div>

      {/* Scroll hint */}
      <div className="animate-fade-up animate-fade-up-5 absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="animate-scroll-pulse h-12 w-px bg-gradient-to-b from-terra to-transparent" />
      </div>
    </section>
  );
}