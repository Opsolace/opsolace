import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function ArrowLink({ children, href = "#contact", light = false }: { children: ReactNode; href?: string; light?: boolean }) {
  return <a className={`group inline-flex items-center gap-3 border-b pb-2 text-[13px] font-semibold ${light ? "border-white text-white" : "border-current"}`} href={href}>{children}<ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></a>;
}