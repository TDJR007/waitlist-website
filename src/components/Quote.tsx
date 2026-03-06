import RevealOnScroll from "@/components/RevealOnScroll";

export default function Quote() {
    return (
        <section className="w-full bg-ink py-24 px-12 text-center">
            <RevealOnScroll>
                <div className="mx-auto max-w-[780px]">

                    <p className="font-serif text-[clamp(28px,4vw,52px)] italic leading-[1.2] tracking-[-1px] text-cream">
                        "The quality of a manager's communication doesn't just affect
                        morale — it determines whether{" "}
                        <em className="not-italic text-gold">great people stay.</em>"
                    </p>

                    <p className="mt-8 text-[13px] uppercase tracking-[2px] text-muted">
                        The Rapport Thesis
                    </p>

                </div>
            </RevealOnScroll>
        </section>
    );
}