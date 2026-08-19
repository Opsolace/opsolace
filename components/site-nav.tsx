"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "What we do", href: "#services" },
  { label: "How we work", href: "#process" },
  { label: "About", href: "#about" },
];

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-nav fixed inset-x-0 top-3 z-50 lg:top-4">
      <nav
        className={`nav-shell mx-3 flex max-w-310 items-center justify-between rounded-2xl px-5 py-3.5 lg:mx-auto lg:rounded-full lg:px-7 ${isScrolled ? "nav-shell-scrolled" : ""}`}
      >
        <a href="#top" aria-label="Opsolace home" onClick={closeMenu}>
          <Image
            src="/Opsolace SVG.svg"
            alt="Opsolace"
            width={145}
            height={32}
            priority
          />
        </a>
        <div className="ml-auto mr-12 hidden gap-8 text-[13px] text-[#4c566d] lg:flex">
          {links.map((link) => (
            <a
              className="transition-colors hover:text-emerald"
              key={link.href}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          className="hidden border-b border-navy pb-2 pt-1 text-[13px] font-semibold lg:inline-flex lg:items-center lg:gap-3"
          href="#contact"
        >
          Let&apos;s talk <ArrowUpRight size={16} />
        </a>
        <button
          className="nav-menu-button inline-flex size-10 items-center justify-center rounded-full border border-navy/10 bg-white/60 text-navy transition-colors hover:border-emerald hover:bg-mint lg:hidden cursor-pointer"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div
        id="mobile-nav"
        aria-hidden={!isOpen}
        className={`mobile-menu-panel mx-3 rounded-b-2xl border-t border-line bg-paper px-6 py-6 text-[15px] shadow-lg lg:hidden ${isOpen ? "mobile-menu-panel-open" : ""}`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            tabIndex={isOpen ? 0 : -1}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a
          className="inline-flex items-center gap-2 font-semibold text-emerald"
          href="#contact"
          tabIndex={isOpen ? 0 : -1}
          onClick={closeMenu}
        >
          Let&apos;s talk <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}
