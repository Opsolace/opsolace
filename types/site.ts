import type { LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  number: string;
  title: string;
  text: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type CompareItem = {
  label: string;
  icon: LucideIcon;
};

export type Principle = {
  label: string;
  icon: LucideIcon;
};