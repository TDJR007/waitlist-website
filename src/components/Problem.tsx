import RevealOnScroll from "@/components/RevealOnScroll";

export default function Problem() {
    return (
        <section className="mx-auto max-w-[1200px] px-12 py-24">

            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[2.5px] text-terra">
                The Problem
            </span>

            <RevealOnScroll>
                <div className="mt-15 grid grid-cols-1 gap-20 md:grid-cols-2">

                    {/* Left — statement */}
                    <div className="font-serif text-[clamp(28px,3vw,40px)] leading-[1.25] tracking-[-0.8px]">
                        Most managers <em className="text-terra">want</em> to communicate
                        better.<br />
                        They just never have enough time — or the right words.
                    </div>

                    {/* Right — stats */}
                    <div className="flex flex-col gap-9">

                        <div className="border-l-2 border-gold pl-5">
                            <div className="font-serif text-[42px] font-semibold leading-none text-ink">
                                70%
                            </div>
                            <div className="mt-1.5 text-sm leading-relaxed text-muted">
                                of team engagement variance is driven directly by manager
                                communication quality
                            </div>
                        </div>

                        <div className="border-l-2 border-gold pl-5">
                            <div className="font-serif text-[42px] font-semibold leading-none text-ink">
                                $1.2T
                            </div>
                            <div className="mt-1.5 text-sm leading-relaxed text-muted">
                                lost annually to poor workplace communication across US businesses
                            </div>
                        </div>

                        <div className="border-l-2 border-gold pl-5">
                            <div className="font-serif text-[42px] font-semibold leading-none text-ink">
                                3×
                            </div>
                            <div className="mt-1.5 text-sm leading-relaxed text-muted">
                                higher retention on teams with managers who communicate with
                                clarity and empathy
                            </div>
                        </div>

                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}