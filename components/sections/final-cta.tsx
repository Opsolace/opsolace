import { SectionLabel } from "@/components/ui/section-label";
import { ContactForm } from "@/components/ui/contact-form";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="grid gap-10 bg-mint px-6 py-20 text-navy sm:gap-12 sm:py-24 lg:grid-cols-2 lg:items-end lg:gap-[5%] lg:px-[max(24px,calc((100vw-1240px)/2))] lg:py-36"
    >
      <div className="max-w-2xl">
        <SectionLabel dark>Start a conversation</SectionLabel>
        <h2 className="text-[clamp(40px,5.2vw,72px)] font-medium leading-[.98] tracking-[-.065em] text-navy">
          Ready to put your
          <br />
          <em className="text-emerald">operations at ease?</em>
        </h2>
        <p className="mt-5 max-w-md text-base text-navy sm:mt-7">
          Let&apos;s build systems that give your team time back.
        </p>
      </div>
      <div className="lg:justify-self-end lg:w-full lg:max-w-xl">
        <ContactForm />
      </div>
    </section>
  );
}
