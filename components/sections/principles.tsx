import { principles } from "@/lib/site-data";

export function PrinciplesStrip() {
  return (
    <section
      className="overflow-x-auto border-y border-line py-4"
      aria-label="Opsolace principles"
    >
      <div className="flex min-w-max items-center justify-start gap-7 px-6 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-muted sm:justify-center sm:gap-10">
        {principles.map(({ icon: Icon, label }, index) => (
          <div className="flex items-center gap-3" key={label}>
            <Icon
              className="text-emerald"
              size={16}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <span>{label}</span>
            {index < principles.length - 1 && (
              <span className="text-emerald" aria-hidden="true">
                /
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
