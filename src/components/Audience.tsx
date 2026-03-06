import { MoveRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const audiences: {
    title: string;
    items: string[];
}[] = [
        {
            title: "People Leaders",
            items: [
                "Communicate with clarity under pressure",
                "Respond thoughtfully, not reactively",
                "Build deeper trust with each team member",
                "Spend less time drafting, more time leading",
            ],
        },
        {
            title: "HR & People Ops",
            items: [
                "Scalable manager development without the overhead",
                "Reduce communication-driven attrition risk",
                "Insight into communication health across teams",
                "Complement existing leadership programmes",
            ],
        },
        {
            title: "Organisations",
            items: [
                "Distributed & hybrid team environments",
                "High-growth companies scaling rapidly",
                "Tech, professional services, financial services",
                "Any business where retention is a priority",
            ],
        },
    ];

export default function Audience() {
    return (
        <section className="mx-auto max-w-[1200px] px-12 py-24">

            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[2.5px] text-terra">
                Who It's For
            </span>

            <div className="mt-15 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
                {audiences.map((a, i) => (
                    <RevealOnScroll key={a.title} delay={i * 100}>
                        <div key={a.title} className="bg-warm p-10">

                            <h3 className="mb-6 font-serif text-[22px] font-semibold text-ink">
                                {a.title}
                            </h3>

                            <ul className="flex flex-col">
                                {a.items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2.5 border-b border-rule py-3 text-sm leading-relaxed text-muted last:border-0"
                                    >
                                        <MoveRight
                                            size={14}
                                            strokeWidth={1.5}
                                            className="mt-0.5 shrink-0 text-terra"
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </RevealOnScroll>
                ))}
            </div>

        </section>
    );
}