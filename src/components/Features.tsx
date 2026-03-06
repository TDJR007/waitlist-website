import {
    Mic,
    BrainCircuit,
    Users,
    Newspaper,
    Lock,
    Hand,
    LucideIcon,
} from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const features: {
    icon: LucideIcon;
    title: string;
    desc: string;
}[] = [
        {
            icon: Mic,
            title: "Truly your voice",
            desc: "Rapport doesn't impose a generic tone. It learns the specific way you write — your cadence, your warmth, your directness.",
        },
        {
            icon: BrainCircuit,
            title: "Gets smarter over time",
            desc: "Every edit you make is a training signal. The model continuously improves to reflect your evolving judgment as a leader.",
        },
        {
            icon: Users,
            title: "Knows your team",
            desc: "Rapport builds a communication profile for each team member — adapting tone and approach based on what resonates with each individual.",
        },
        {
            icon: Newspaper,
            title: "In-context intelligence",
            desc: "Relevant articles, company updates, and research surfaced at the right moment — so you lead with insight, not just instinct.",
        },
        {
            icon: Lock,
            title: "Private by design",
            desc: "Communication data stays within your organisation's environment. Rapport never trains on your data externally.",
        },
        {
            icon: Hand,
            title: "You're always in control",
            desc: "Drafts are suggestions, never commands. Rapport augments your judgment — it never replaces it.",
        },
    ];

export default function Features() {
    return (
        <section className="mx-auto max-w-[1200px] px-12 py-24">

            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[2.5px] text-terra">
                What Makes Rapport Different
            </span>

            <div className="mt-15 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => (
                    <RevealOnScroll key={f.title} delay={i * 100}>
                        <div
                            key={f.title}
                            className="group border-t border-rule py-8 transition-colors duration-200 hover:border-terra"
                        >
                            <f.icon
                                size={24}
                                strokeWidth={1.5}
                                className="mb-4 text-terra"
                            />
                            <h3 className="mb-2.5 font-serif text-[18px] font-semibold text-ink">
                                {f.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted">
                                {f.desc}
                            </p>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>

        </section>
    );
}