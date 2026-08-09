import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface RollUpTextProps{
  children: React.ReactNode
  className?: string
}

export default function RollUpText({ children, className = "" }:RollUpTextProps ) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const outSpan = el.querySelector(".roll-out");
      const intoSpan = el.querySelector(".roll-into");

      const outSplit = new SplitText(outSpan, { type: "chars" });
      const intoSplit = new SplitText(intoSpan, { type: "chars" });

      // Wrap each char in an overflow-hidden wrapper so they are masked when translating
      const wrapChars = (split: SplitText) => {
        split.chars.forEach((char) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "inline-block";
          char.parentNode?.insertBefore(wrapper, char);
          wrapper.appendChild(char);
        });
      };

      wrapChars(outSplit);
      wrapChars(intoSplit);

      gsap.set(intoSplit.chars, { yPercent: 100 });

      const textLength = typeof children === "string" ? children.length : 10;

      tlRef.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 0.45,
            ease: "power3.inOut",
            stagger: Math.min(0.022, 0.25 / textLength),
          },
        })
        .to(outSplit.chars, { yPercent: -100 })
        .to(intoSplit.chars, { yPercent: 0 }, 0);
    },
    { scope: containerRef },
  );

  const handleMouseEnter = () => tlRef.current?.play();
  const handleMouseLeave = () => tlRef.current?.reverse();

  return (
    <span
      ref={containerRef}
      className={`relative inline-block whitespace-nowrap cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="roll-out inline-block">{children}</span>
      <span
        className="roll-into absolute top-0 left-0 inline-block"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
