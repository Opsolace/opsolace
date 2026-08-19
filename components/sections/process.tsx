import { processSteps } from "@/lib/site-data";
import { SectionLabel } from "@/components/ui/section-label";

export function ProcessSection() {
  return <section id="process" className="px-6 py-28 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-36"><SectionLabel>A better way forward</SectionLabel><h2 className="text-[clamp(44px,5.2vw,76px)] font-medium leading-[.98] tracking-[-.065em]">Good work starts<br />with <em>understanding.</em></h2><div className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-7">{processSteps.map(({ number, title, text }) => <div className="border-t border-navy pt-4" key={number}><span className="text-[11px] text-emerald">{number}</span><h3 className="mt-12 text-[22px] font-medium tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-[190px] text-[13px] leading-[1.6] text-muted">{text}</p></div>)}</div></section>;
}