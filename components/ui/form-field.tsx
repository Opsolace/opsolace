import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps {
  label: string;
  name: string;
  /** Server-side message for this field, from the API's `fields` object. */
  error?: string;
}

const base =
  "border-b bg-transparent px-0 py-3 text-sm font-sans tracking-normal outline-none placeholder:text-navy/50 disabled:opacity-50";

const borderFor = (error?: string) =>
  error ? "border-red-600 focus:border-red-600" : "border-navy/35 focus:border-navy";

const labelClass =
  "grid gap-2 text-[11px] font-mono font-bold uppercase tracking-[.12em] text-navy";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <span id={id} className="font-sans text-[11px] normal-case tracking-normal text-red-600">
      {error}
    </span>
  );
}

export function TextInput({
  label,
  error,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${props.name}-error`;
  return (
    <label className={labelClass}>
      {label}
      <input
        className={`${base} ${borderFor(error)}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <FieldError id={errorId} error={error} />
    </label>
  );
}

export function TextAreaInput({
  label,
  error,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${props.name}-error`;
  return (
    <label className={labelClass}>
      {label}
      <textarea
        className={`min-h-24 resize-y ${base} ${borderFor(error)}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <FieldError id={errorId} error={error} />
    </label>
  );
}
