"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { sendContactEnquiry } from "@/services/contact";
import type { FieldErrors, FormStatus } from "@/types/contact";
import { StatusBanner } from "./form-status";
import { TextAreaInput, TextInput } from "./form-field";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });
    setFieldErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    const result = await sendContactEnquiry({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    });

    if (result.ok) {
      setStatus({ type: "success", message: "Thank you! Your enquiry is on its way." });
      form.reset();
    } else {
      setStatus({ type: "error", message: result.message });
      setFieldErrors(result.fields);
    }

    setLoading(false);
  }

  return (
    <form className="mt-10 grid max-w-xl gap-4" onSubmit={handleSubmit}>
      <StatusBanner status={status} />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          error={fieldErrors.name}
          required
          disabled={loading}
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={fieldErrors.email}
          required
          disabled={loading}
        />
      </div>

      <TextAreaInput
        label="How can we help?"
        name="message"
        placeholder="Tell us a little about what you need"
        error={fieldErrors.message}
        required
        disabled={loading}
      />

      {/* Honeypot: hidden from people, tempting to bots. The API discards any
          submission that arrives with this filled, so it must stay empty. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        className="group mt-3 inline-flex w-full items-center justify-center gap-3 border border-navy bg-navy px-5 py-4 text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 sm:w-max"
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
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </form>
  );
}
