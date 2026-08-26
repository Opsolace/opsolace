import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps {
  label: string;
  name: string;
  disabled?: boolean;
}

export function TextInput({ label, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 text-[11px] font-mono font-bold uppercase tracking-[.12em] text-navy">
      {label}
      <input
        className="border-b border-navy/35 bg-transparent px-0 py-3 text-sm font-sans tracking-normal outline-none placeholder:text-navy/50 focus:border-navy disabled:opacity-50"
        {...props}
      />
    </label>
  );
}

export function TextAreaInput({ label, ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-2 text-[11px] font-mono font-bold uppercase tracking-[.12em] text-navy">
      {label}
      <textarea
        className="min-h-24 resize-y border-b border-navy/35 bg-transparent px-0 py-3 text-sm font-sans tracking-normal outline-none placeholder:text-navy/50 focus:border-navy disabled:opacity-50"
        {...props}
      />
    </label>
  );
}