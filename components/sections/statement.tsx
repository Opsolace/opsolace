import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";

export function StatementSection() {
  return <section className="bg-navy px-6 py-24 text-white lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-32"><div className="mb-16 h-px w-full bg-white/20" /><div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-[12%]"><div><SectionLabel>Operations, at ease</SectionLabel><h2 className="mt-10 max-w-170 text-[clamp(44px,5.2vw,76px)] font-medium leading-[.98] tracking-[-.065em]">Take the weight<br /><em>off your shoulders.</em></h2></div><div className="flex flex-col justify-end lg:pb-2"><p className="max-w-82.5 text-base leading-[1.7] text-[#b9c2cc]">Good operations should make work feel lighter, not heavier.</p><div className="mt-10"><ArrowLink light>Let&apos;s build something lighter</ArrowLink></div></div></div></section>;
}