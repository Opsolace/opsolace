"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { sendContactEnquiry } from "@/services/contact";
import { FormStatus } from "@/types/contact";
import { StatusBanner } from "./form-status";
import { TextAreaInput, TextInput } from "./form-field";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await sendContactEnquiry({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });

      setStatus({ type: "success", message: "Thank you! Message sent." });
      form.reset();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-10 grid max-w-xl gap-4" onSubmit={handleSubmit}>
      <StatusBanner status={status} />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput label="Name" name="name" placeholder="Your name" required disabled={loading} />
        <TextInput label="Email" name="email" type="email" placeholder="you@company.com" required disabled={loading} />
      </div>

      <TextAreaInput label="How can we help?" name="message" placeholder="Tell us a little about what you need" required disabled={loading} />

      <button
        className="group mt-3 inline-flex w-max items-center gap-3 border border-navy bg-navy px-5 py-4 text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <>
            Sending...
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Send enquiry{" "}
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}