import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function TalkButton({
  children = "Let’s talk",
  href = "#contact",
  light = false,
}: {
  children?: ReactNode;
  href?: string;
  light?: boolean;
}) {
  return (
    <a
      className={`group inline-flex w-max items-center gap-3 whitespace-nowrap border px-5 py-4 text-[13px] font-semibold tracking-[0.02em] transition-colors ${light ? "border-white bg-white text-navy hover:border-navy hover:bg-navy" : "border-navy bg-navy hover:border-emerald hover:bg-emerald"}`}
      href={href}
    >
      <span className={light ? "text-navy transition-colors group-hover:text-white" : "text-white transition-colors group-hover:text-white"}>
        {children}
      </span>
      <ArrowUpRight
        size={17}
        className={`transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${light ? "text-navy group-hover:text-white" : "text-white"}`}
        aria-hidden="true"
      />
    </a>
  );
}
