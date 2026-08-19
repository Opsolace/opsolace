"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className={`scroll-reveal ${isVisible ? "scroll-reveal-visible" : ""}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}