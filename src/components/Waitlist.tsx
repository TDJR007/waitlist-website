"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setErrorMsg(message);
            setStatus("error");
        }
    }

    return (
        <section id="waitlist" className="relative w-full overflow-hidden px-12 py-32 text-center">

            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,97,58,0.06)_0%,transparent_70%)]" />
            <RevealOnScroll>
                <div className="relative mx-auto max-w-[640px]">

                    <h2 className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-1.5px] text-ink">
                        Ready to build<br />
                        <em className="text-terra">Rapport</em>?
                    </h2>

                    <p className="mx-auto mt-5 max-w-md text-base font-light leading-relaxed text-muted">
                        We're inviting a small group of forward-thinking people leaders into
                        our early access programme. Be among the first to experience it.
                    </p>

                    {status === "success" ? (
                        <p className="mt-12 font-serif text-lg italic text-sage">
                            You're on the list. We'll be in touch. ✦
                        </p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto mt-11 flex max-w-[440px] gap-2.5"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrorMsg("");
                                    if (status === "error") setStatus("idle");
                                }}
                                placeholder="your@email.com"
                                className={`flex-1 rounded-full border bg-white px-5 py-3.5 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-ink/30 focus:border-terra ${errorMsg ? "border-terra" : "border-rule"
                                    }`}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-terra px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b8512e] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {status === "loading" && (
                                    <Loader2 size={15} className="animate-spin" />
                                )}
                                {status === "loading" ? "Joining..." : "Join Waitlist"}
                            </button>
                        </form>
                    )}

                    {errorMsg && (
                        <p className="mt-3 text-sm text-terra">{errorMsg}</p>
                    )}

                    {status !== "success" && (
                        <p className="mt-4 text-xs text-muted">
                            No commitment. We'll reach out when your spot is ready.
                        </p>
                    )}

                </div>
            </RevealOnScroll>
        </section>
    );
}