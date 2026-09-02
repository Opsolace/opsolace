import { problemPoints } from "@/lib/site-data";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowDown, Check, ClipboardList, UserRoundCheck, Workflow } from "lucide-react";

export function ProblemSection() {
  return (
    <section id="about" className="px-6 py-20 sm:py-24 lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-40">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-[12%]">
        <div>
          <SectionLabel>The weight of admin</SectionLabel>
          <h2 className="max-w-155 text-[clamp(42px,5.2vw,76px)] font-medium leading-[.98] tracking-[-.065em]">
            Too much time goes into work that should be <em>easier.</em>
          </h2>
          <div className="mt-12 max-w-xl border-y border-line py-5 sm:mt-16 sm:py-6">
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[.14em] text-muted">
              <span>A better handoff</span>
              <span className="text-emerald">Built around people</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:gap-3">
              <WorkflowStep icon={ClipboardList} label="Capture" detail="The request arrives" />
              <ArrowDown className="mx-auto text-emerald sm:-rotate-90" size={16} aria-hidden="true" />
              <WorkflowStep icon={Workflow} label="Automate" detail="The repeatable work runs" active />
              <ArrowDown className="mx-auto text-emerald sm:-rotate-90" size={16} aria-hidden="true" />
              <WorkflowStep icon={UserRoundCheck} label="Review" detail="A human makes the call" />
            </div>
          </div>
        </div>
        <div className="pt-0 text-base leading-[1.6] text-muted lg:pt-18">
          <p>As your business grows, small admin tasks can quietly take over the day, pulling your team away from the work that needs their judgment.</p>
          <div className="my-7 border-t border-line sm:my-9">
            {problemPoints.map((item) => <span className="block border-b border-line py-3 text-[13px] text-navy before:mr-4 before:text-emerald before:content-['↳']" key={item}>{item}</span>)}
          </div>
          <p className="max-w-90">We find the pattern, design the workflow, and automate the repeatable parts, leaving your team to make the decisions only people can make.</p>
        </div>
      </div>
    </section>
  );
}

function WorkflowStep({
  icon: Icon,
  label,
  detail,
  active = false,
}: {
  icon: typeof ClipboardList;
  label: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 sm:block">
      <div className={`grid size-9 shrink-0 place-items-center rounded-full border ${active ? "border-emerald bg-emerald text-navy" : "border-line bg-paper text-muted"}`}>
        <Icon size={15} aria-hidden="true" />
      </div>
      <div className="sm:mt-3">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-semibold text-navy">{label}</p>
          {active && <Check size={13} className="text-emerald" aria-hidden="true" />}
        </div>
        <p className="text-[11px] leading-5 text-muted">{detail}</p>
      </div>
    </div>
  );
}