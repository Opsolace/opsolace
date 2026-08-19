import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { exploreLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-16 bg-[#eef2ed] px-6 py-16 lg:gap-20 lg:px-[max(24px,calc((100vw-1240px)/2))]">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Image src="/Opsolace SVG.svg" alt="Opsolace" width={145} height={32} />
          <p className="mt-5 text-[13px] text-muted">
            Systems that make work feel lighter.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[10px] font-bold uppercase tracking-[.14em] text-emerald">
            Explore
          </span>
          {exploreLinks.map((link) => (
            <a
              className="text-[13px] text-muted hover:text-emerald"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[10px] font-bold uppercase tracking-[.14em] text-emerald">
            Say hello
          </span>
          <a
            className="text-[13px] text-muted hover:text-emerald"
            href="mailto:hello.opsolace@outlook.com"
          >
            hello.opsolace@outlook.com
          </a>
          <a
            className="inline-flex items-center gap-1 text-[13px] text-muted hover:text-emerald"
            href="#contact"
          >
            Let&apos;s talk <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      </div>
      <div className="flex w-full justify-between self-end border-t border-line pt-5 text-[11px] text-[#87918d]">
        <span>© 2026 Opsolace</span>
        <span>Operations, at ease.</span>
      </div>
    </footer>
  );
}
