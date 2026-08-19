import { ArrowDownRight } from "lucide-react";
import { afterItems, beforeItems } from "@/lib/site-data";
import { SectionLabel } from "@/components/ui/section-label";
import type { CompareItem } from "@/types/site";

export function TransformationSection() {
  return (
    <section className="bg-[#e7eee8] px-6 py-28 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-36">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionLabel>The shift</SectionLabel>
        <h2 className="text-[clamp(42px,5.2vw,72px)] font-medium leading-[.98] tracking-[-.065em]">
          From firefighting
          <br />
          <em>to forward motion.</em>
        </h2>
      </div>
      <div className="mx-auto mt-14 grid max-w-232.5 gap-5 lg:mt-20 lg:grid-cols-[1fr_70px_1fr] lg:items-center">
        <Compare
          title="Before"
          subtitle="Where work gets heavy"
          items={beforeItems}
        />
        <div className="relative z-10 grid size-14 place-items-center justify-self-center rounded-full border border-emerald/30 bg-[#e7eee8] text-emerald shadow-sm">
          <ArrowDownRight size={24} />
        </div>
        <Compare
          title="After"
          subtitle="Where work gets lighter"
          items={afterItems}
          after
        />
      </div>
    </section>
  );
}

function Compare({
  title,
  subtitle,
  items,
  after = false,
}: {
  title: string;
  subtitle: string;
  items: readonly CompareItem[];
  after?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border p-6 shadow-[0_18px_45px_rgba(31,41,73,.08)] ${after ? "border-navy bg-navy text-white" : "border-white/70 bg-white/75"}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p
            className={`mb-2 font-mono text-[11px] font-bold uppercase tracking-[.14em] ${after ? "text-emerald" : "text-muted"}`}
          >
            {title}
          </p>
          <p className={`text-sm ${after ? "text-white/55" : "text-muted"}`}>
            {subtitle}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[.12em] ${after ? "bg-emerald/15 text-emerald" : "bg-navy/5 text-muted"}`}
        >
          {after ? "Clear" : "Friction"}
        </span>
      </div>
      <div>
        {items.map(({ icon: Icon, label }) => (
          <div
            className={`flex items-center gap-3 border-t py-3 text-sm ${after ? "border-white/15 text-[#dce5e0]" : "border-navy/10 text-muted"}`}
            key={label}
          >
            <span
              className={`grid size-8 place-items-center rounded-lg ${after ? "bg-emerald/10 text-emerald" : "bg-navy/5 text-navy/55"}`}
            >
              <Icon size={15} aria-hidden="true" />
            </span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
