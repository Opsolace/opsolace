import { CheckCircle2, AlertCircle } from "lucide-react";
import { FormStatus as StatusType } from "@/types/contact";

export function StatusBanner({ status }: { status: StatusType }) {
  if (!status.type) return null;

  const isSuccess = status.type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;
  const styles = isSuccess
    ? "bg-emerald-50 text-emerald-800 border-emerald-200 icon-text-emerald-600"
    : "bg-rose-50 text-rose-800 border-rose-200 icon-text-rose-600";

  return (
    <div className={`flex items-center gap-3 rounded-md p-4 text-sm border ${styles}`}>
      <Icon className="h-5 w-5 shrink-0" />
      <p>{status.message}</p>
    </div>
  );
}