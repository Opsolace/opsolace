import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/section-label";
import { TalkButton } from "@/components/ui/talk-button";
import { HeroSceneLoader } from "@/components/hero-scene-loader";

export function Hero() {
  return (
    <section className="relative isolate grid min-h-[720px] items-center gap-14 overflow-hidden bg-[radial-gradient(circle_at_78%_44%,rgba(35,168,117,.14),transparent_28%),var(--paper)] px-6 pb-16 pt-36 lg:grid-cols-2 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:pt-24">
      <div className="relative z-10 max-w-[610px] animate-rise-in lg:py-20">
        <SectionLabel>Systems for the way work really happens</SectionLabel>
        <h1 className="mb-7 max-w-[600px] text-[clamp(60px,8vw,112px)] font-medium leading-[.91] tracking-[-.065em]">
          Operations,
          <br />
          <em>at ease.</em>
        </h1>
        <p className="max-w-[470px] text-[17px] leading-[1.65] text-muted">
          We build the systems behind better operations, fixing the messy,
          manual work so your business can run with less friction and your team
          can get their time back.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-8">
          <TalkButton />
          <ArrowLink href="#services">See what we do</ArrowLink>
        </div>
      </div>
      <div className="relative h-[390px] lg:h-[490px]">
        <div className="absolute inset-[10%] rounded-full bg-mint/80 blur-[1px]" />
        <div className="absolute inset-[8%] rounded-full border border-emerald/10 rotate-[-25deg]" />
        <HeroSceneLoader />
        <div className="absolute bottom-4 right-4 text-xs leading-6 text-muted">
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
