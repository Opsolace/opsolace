import { Activity, ArrowRight, CircleCheck } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";
import { TalkButton } from "@/components/ui/talk-button";
import { HeroSceneLoader } from "@/components/hero-scene-loader";

export function Hero() {
  return (
    <section className="relative isolate grid min-h-170 items-center gap-8 overflow-hidden bg-[radial-gradient(circle_at_78%_44%,rgba(35,168,117,.14),transparent_28%),var(--paper)] px-6 pb-14 pt-28 sm:gap-12 lg:min-h-180 lg:grid-cols-2 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:pb-16 lg:pt-24">
      <div className="relative z-10 max-w-152.5 animate-rise-in lg:py-20">
        <SectionLabel>Systems for the way work really happens</SectionLabel>
        <h1 className="mb-7 max-w-150 text-[clamp(60px,8vw,112px)] font-medium leading-[.91] tracking-[-.065em]">
          Operations,
          <br />
          <em>at ease.</em>
        </h1>
        <p className="max-w-117.5 text-[17px] leading-[1.65] text-muted">
          We build the systems behind better operations, fixing the messy,
          manual work so your business can run with less friction and your team
          can get their time back.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-8">
          <TalkButton />
          <ArrowLink href="#services">See what we do</ArrowLink>
        </div>
      </div>
      <div className="relative h-75 sm:h-90 lg:h-122.5">
        <div className="absolute inset-[10%] rounded-full bg-mint/80 blur-[1px]" />
        <div className="absolute inset-[8%] rounded-full border border-emerald/10 rotate-[-25deg]" />
        <HeroSceneLoader />
        <div className="absolute left-0 top-3 w-40 border-y border-navy/15 py-3 text-[10px] text-muted sm:top-8 sm:w-44">
          <div className="flex items-center justify-between font-mono uppercase tracking-[.14em]">
            <span>System pulse</span>
            <Activity size={13} className="text-emerald" aria-hidden="true" />
          </div>
          <div className="mt-3 flex items-center gap-2 text-navy">
            <CircleCheck size={14} className="text-emerald" aria-hidden="true" />
            <span className="font-medium">Work is moving</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden bg-navy/10">
            <div className="h-full w-[78%] bg-emerald" />
          </div>
        </div>
        <div className="absolute bottom-2 right-1 text-[11px] leading-5 text-muted sm:bottom-4 sm:right-4 sm:text-xs sm:leading-6">
          From complexity
          <br />
          <strong className="text-sm font-semibold text-navy">
            to clarity
          </strong>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-line" />
      <ArrowRight
        className="absolute bottom-5 right-6 text-emerald lg:right-[max(24px,calc((100vw-1240px)/2))]"
        size={18}
        aria-hidden="true"
      />
    </section>
  );
}
