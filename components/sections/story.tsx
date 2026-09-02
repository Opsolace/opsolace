import { Activity, HeartHandshake, Settings2 } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";

export function StorySection() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-20 text-white sm:py-24 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-36">
      <div className="absolute right-0 top-0 h-full w-1/3 border-l border-white/6 max-lg:hidden" aria-hidden="true" />
      <div className="relative grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-[12%]">
        <div className="relative min-h-75 border-y border-white/15 py-6 sm:min-h-92.5 sm:py-8 lg:min-h-117.5">
          <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[.16em] text-white/40">
            <span>01 / The operating layer</span>
            <Activity size={15} className="text-emerald" aria-hidden="true" />
          </div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald shadow-[0_0_0_8px_rgba(35,168,117,.12),0_0_30px_rgba(35,168,117,.7)]" aria-hidden="true" />
          <div className="absolute bottom-6 left-0 flex items-end gap-4 sm:bottom-8 sm:gap-6">
            <Settings2 className="mb-2 text-emerald" size={24} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-emerald">The work</p>
              <p className="mt-1 text-[clamp(42px,7vw,76px)] font-medium leading-none tracking-[-.07em]">Ops</p>
            </div>
          </div>
          <div className="absolute right-0 top-[calc(50%+24px)] text-right sm:top-[calc(50%+32px)]">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-emerald">The feeling</p>
            <p className="mt-1 text-[clamp(42px,7vw,76px)] font-medium leading-none tracking-[-.07em] text-[#f1f7f1]">Solace</p>
            <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-white/45"><HeartHandshake size={14} className="text-emerald" aria-hidden="true" /> Room to breathe</div>
          </div>
        </div>
        <div className="max-w-122.5">
        <SectionLabel>Why Opsolace</SectionLabel>
        <h2 className="mb-7 text-[clamp(42px,5.2vw,76px)] font-medium leading-[.98] tracking-[-.065em]">
          Ops is the work
          <br />
          behind the work.
        </h2>
        <p className="max-w-107.5 text-base leading-[1.7] text-[#b9c2cc]">
          Processes, systems, workflows, and infrastructure. The things that
          keep a business moving, even when no one is talking about them.
        </p>
        <h3 className="my-9 text-[23px] font-normal leading-[1.18] tracking-[-.04em] sm:my-12 sm:text-[25px]">
          Solace is what happens
          <br />
          <em>when they finally work.</em>
        </h3>
        <ArrowLink light>Take the weight off your shoulders</ArrowLink>
        </div>
      </div>
    </section>
  );
}
