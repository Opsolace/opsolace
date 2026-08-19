import { Activity, HeartHandshake, Settings2 } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";

export function StorySection() {
  return (
    <section className="grid gap-12 bg-navy px-6 py-24 text-white lg:grid-cols-2 lg:gap-[12%] lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-36">
      <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.04] p-8 lg:min-h-[470px]">
        <div className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 bg-gradient-to-r from-emerald/20 via-emerald to-emerald/20" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald shadow-[0_0_0_8px_rgba(35,168,117,.12),0_0_30px_rgba(35,168,117,.7)]" aria-hidden="true" />
        <div className="relative z-10 flex w-full max-w-sm items-center justify-between gap-3">
          <div className="flex w-[46%] flex-col gap-5 rounded-2xl border border-emerald/30 bg-navy p-5 shadow-2xl shadow-black/20">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald text-navy"><Settings2 size={24} strokeWidth={1.7} /></div>
            <div><p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-emerald">The work</p><h3 className="text-2xl font-medium tracking-[-.05em]">Ops</h3></div>
            <div className="flex items-center gap-2 text-[11px] text-white/55"><Activity size={14} className="text-emerald" /> Systems in motion</div>
          </div>
          <div className="flex w-[46%] flex-col gap-5 rounded-2xl border border-white/15 bg-[#f1f7f1] p-5 text-navy shadow-2xl shadow-black/20">
            <div className="flex size-12 items-center justify-center rounded-xl bg-mint text-emerald"><HeartHandshake size={24} strokeWidth={1.7} /></div>
            <div><p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-emerald">The feeling</p><h3 className="text-2xl font-medium tracking-[-.05em]">Solace</h3></div>
            <div className="flex items-center gap-2 text-[11px] text-navy/55"><span className="size-1.5 rounded-full bg-emerald" /> Room to breathe</div>
          </div>
        </div>
        <span className="absolute bottom-6 left-7 font-mono text-[10px] uppercase tracking-[.16em] text-white/35">From the work</span><span className="absolute right-7 top-6 font-mono text-[10px] uppercase tracking-[.16em] text-emerald/70">To the feeling</span>
      </div>
      <div className="max-w-122.5">
        <SectionLabel>Why Opsolace</SectionLabel>
        <h2 className="mb-7 text-[clamp(44px,5.2vw,76px)] font-medium leading-[.98] tracking-[-.065em]">
          Ops is the work
          <br />
          behind the work.
        </h2>
        <p className="max-w-107.5 text-base leading-[1.7] text-[#b9c2cc]">
          Processes, systems, workflows, and infrastructure. The things that
          keep a business moving, even when no one is talking about them.
        </p>
        <h3 className="my-12 text-[25px] font-normal leading-[1.18] tracking-[-.04em]">
          Solace is what happens
          <br />
          <em>when they finally work.</em>
        </h3>
        <ArrowLink light>Take the weight off your shoulders</ArrowLink>
      </div>
    </section>
  );
}
