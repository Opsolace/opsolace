import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { PrinciplesStrip } from "@/components/sections/principles";
import { ProblemSection } from "@/components/sections/problem";
import { StorySection } from "@/components/sections/story";
import { ServicesSection } from "@/components/sections/services";
import { TransformationSection } from "@/components/sections/transformation";
import { ProcessSection } from "@/components/sections/process";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <main id="top">
      <SiteNav />
      <Hero />
      <ScrollReveal><PrinciplesStrip /></ScrollReveal>
      <ScrollReveal delay={60}><ProblemSection /></ScrollReveal>
      <ScrollReveal delay={80}><StorySection /></ScrollReveal>
      <ScrollReveal delay={60}><ServicesSection /></ScrollReveal>
      <ScrollReveal delay={80}><TransformationSection /></ScrollReveal>
      <ScrollReveal delay={60}><ProcessSection /></ScrollReveal>
      <ScrollReveal delay={80}><FinalCtaSection /></ScrollReveal>
      <ScrollReveal delay={60}><SiteFooter /></ScrollReveal>
    </main>
  );
}
