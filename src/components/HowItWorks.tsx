import { Inbox, PenLine, RefreshCw, Globe, LucideIcon } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const steps: {
    num: string;
    icon: LucideIcon;
    title: string;
    desc: string;
}[] = [
        {
            num: "01",
            icon: Inbox,
            title: "Ingest",
            desc: "Rapport reads your email threads with each team member, learning communication patterns, recurring topics, and relationship dynamics.",
        },
        {
            num: "02",
            icon: PenLine,
            title: "Draft",
            desc: "When you're ready to reply, Rapport surfaces a thoughtful draft — in your voice, tuned to this person, informed by what you've said before.",
        },
        {
            num: "03",
            icon: RefreshCw,
            title: "Learn",
            desc: "Every edit you make teaches Rapport something new. Your judgment shapes the model — it grows more accurate the more you use it.",
        },
        {
            num: "04",
            icon: Globe,
            title: "Contextualise",
            desc: "Rapport surfaces relevant external context — news, research, org updates — so your replies are always grounded in the bigger picture.",
        },
    ];

export default function HowItWorks() {
    return (
        <section id="how" className="w-full bg-warm py-24">
            <div className="mx-auto max-w-[1200px] px-12">

                <span className="mb-5 block text-[11px] font-medium uppercase tracking-[2.5px] text-terra">
                    How It Works
                </span>

                <RevealOnScroll>
                    <h2 className="max-w-[560px] font-serif text-[clamp(28px,3vw,40px)] leading-[1.25] tracking-[-0.8px]">
                        A quiet intelligence layer — built into the way you already work.
                    </h2>
                </RevealOnScroll>

                <div className="mt-15 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, i) => (
                        <RevealOnScroll key={step.num} delay={i * 100}>
                            <div
                                key={step.num}
                                className="group relative bg-cream px-8 py-10 transition-transform duration-200 hover:-translate-y-1"
                            >
                                {/* Step number — large faded background */}
                                <div className="mb-6 font-serif text-[64px] font-semibold leading-none text-rule">
                                    {step.num}
                                </div>

                                {/* Icon */}
                                <step.icon
                                    size={28}
                                    strokeWidth={1.5}
                                    className="mb-4 text-terra"
                                />

                                {/* Title */}
                                <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-muted">
                                    {step.desc}
                                </p>

                                {/* Hover underline sweep */}
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-terra transition-transform duration-300 group-hover:scale-x-100" />
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

            </div>
        </section>
    );
}