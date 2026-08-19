"use client";

import { ArrowUpRight } from "lucide-react";
import type { FormEvent } from "react";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Opsolace enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:hello.opsolace@outlook.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="mt-10 grid max-w-xl gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-[11px] font-mono font-bold uppercase tracking-[.12em] text-navy">
          Name
          <input
            className="border-b border-navy/35 bg-transparent px-0 py-3 text-sm font-sans tracking-normal outline-none placeholder:text-navy/50 focus:border-navy"
            name="name"
            placeholder="Your name"
            required
          />
        </label>
        <label className="grid gap-2 text-[11px] font-mono font-bold uppercase tracking-[.12em] text-navy">
          Email
          <input
            className="border-b border-navy/35 bg-transparent px-0 py-3 text-sm font-sans tracking-normal outline-none placeholder:text-navy/50 focus:border-navy"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
          />
        </label>
      </div>
      <label className="grid gap-2 text-[11px] font-mono font-bold uppercase tracking-[.12em] text-navy">
        How can we help?
        <textarea
          className="min-h-24 resize-y border-b border-navy/35 bg-transparent px-0 py-3 text-sm font-sans tracking-normal outline-none placeholder:text-navy/50 focus:border-navy"
          name="message"
          placeholder="Tell us a little about what you need"
          required
        />
      </label>
      <button
        className="group mt-3 inline-flex w-max items-center gap-3 border border-navy bg-navy px-5 py-4 text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy cursor-pointer"
        type="submit"
      >
        Send enquiry{" "}
        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
