import { CheckCircle2, AlertCircle } from "lucide-react";
import type { FormStatus as StatusType } from "@/types/contact";

export function StatusBanner({ status }: { status: StatusType }) {
  if (!status.type) return null;

  const isSuccess = status.type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  // Success uses the brand mint/emerald; errors fall back to red, which the
  // brand palette has no equivalent for.
  const styles = isSuccess
    ? "border-emerald/40 bg-mint/50 text-navy"
    : "border-red-300 bg-red-50 text-red-800";
  const iconStyles = isSuccess ? "text-emerald" : "text-red-600";

  return (
    <div
      className={`flex items-start gap-3 border p-4 text-sm ${styles}`}
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
    >
      <Icon className={`h-5 w-5 shrink-0 ${iconStyles}`} aria-hidden="true" />
      <p>{status.message}</p>
    </div>
  );
}
