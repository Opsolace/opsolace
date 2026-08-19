import type { ReactNode } from "react";

export function SectionLabel({ children, light = false, dark = false }: { children: ReactNode; light?: boolean; dark?: boolean }) {
  const accentClass = dark ? "bg-navy" : "bg-emerald";
  const textClass = dark ? "text-navy" : light ? "text-emerald" : "text-emerald";

  return <p className={`mb-7 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${textClass}`}><span className="flex items-center gap-2" aria-hidden="true"><span className={`size-1.5 rounded-full ${accentClass}`} /><span className={`h-px w-8 ${accentClass}`} /></span><span>{children}</span></p>;
}