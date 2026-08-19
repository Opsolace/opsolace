import { AlertCircle, Blocks, CheckCircle2, CircleAlert, Clock3, Eye, GitBranch, Layers3, Link2, Network, Repeat2, Route, Settings2, Workflow } from "lucide-react";
import type { CompareItem, FooterLink, Principle, ProcessStep, Service } from "@/types/site";

export const services: readonly Service[] = [
  { icon: Blocks, number: "01", title: "Operational systems", text: "Design and build the systems that make day-to-day work easier to manage, measure, and improve." },
  { icon: Link2, number: "02", title: "Workflow automation", text: "Remove repetitive manual processes and connect the tools your team already uses." },
  { icon: Layers3, number: "03", title: "Custom software", text: "Build software around the way your business actually works, instead of forcing it into a template." },
  { icon: Settings2, number: "04", title: "Operations improvement", text: "Find bottlenecks, simplify processes, and improve how work moves through the business." },
];

export const problemPoints = ["Spreadsheets that run the business", "Tools that don't talk to each other", "Processes that live in people's heads", "Follow-ups that never seem to end"] as const;
export const beforeItems: readonly CompareItem[] = [
  { label: "Manual processes", icon: Repeat2 },
  { label: "Scattered information", icon: AlertCircle },
  { label: "Repetitive tasks", icon: Clock3 },
  { label: "Operational bottlenecks", icon: CircleAlert },
  { label: "Constant follow-ups", icon: GitBranch },
];
export const afterItems: readonly CompareItem[] = [
  { label: "Connected systems", icon: Network },
  { label: "Clear workflows", icon: Route },
  { label: "Automated processes", icon: Workflow },
  { label: "Better visibility", icon: Eye },
  { label: "More time for the team", icon: CheckCircle2 },
];
export const processSteps: readonly ProcessStep[] = [
  { number: "01", title: "Understand", text: "We learn how your business actually works." },
  { number: "02", title: "Untangle", text: "We identify bottlenecks, unnecessary complexity, and repetitive work." },
  { number: "03", title: "Build", text: "We design and implement systems around your actual needs." },
  { number: "04", title: "Improve", text: "We refine the system as your business grows." },
];
export const exploreLinks: readonly FooterLink[] = [{ label: "What we do", href: "#services" }, { label: "How we work", href: "#process" }, { label: "About", href: "#about" }];
export const principles: readonly Principle[] = [{ label: "Less friction", icon: Workflow }, { label: "More clarity", icon: Eye }, { label: "Better work", icon: CheckCircle2 }];