import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

interface ClipRevealTextProps {
  text: string;
  className?: string;
  tag?: React.ElementType;
  primaryClassName?: string;
  secondaryClassName?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}

export default function ClipRevealText({
  text,
  className = "",
  tag: Tag = "div",
  primaryClassName = "text-cream-dark", // revealed (front) layer
  secondaryClassName = "text-cream-gray", // dim (back) layer
  start = "top 80%",
  end = "bottom 50%",
  scrub = 1,
}: ClipRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLElement>(null);
  const frontRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let splitBack: SplitText | undefined;
      let splitFront: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

      const doSplit = () => {
        splitBack?.revert();
        splitFront?.revert();
        splitBack = new SplitText(backRef.current, { type: "lines" });
        splitFront = new SplitText(frontRef.current, { type: "lines" });
      };

      const setup = () => {
        doSplit();

        tween?.kill();
        tween = gsap.fromTo(
          frontRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start,
              end,
              scrub,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      // wait for fonts so line-splitting measures correctly, then set up
      document.fonts.ready.then(setup);

      // debounced resize: resplit (line wrap can change) + refresh trigger positions
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          doSplit();
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
        tween?.kill();
        splitBack?.revert();
        splitFront?.revert();
      };
    },
    { scope: containerRef, dependencies: [text] },
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Tag ref={backRef} className={secondaryClassName} aria-hidden="true">
        {text}
      </Tag>
      <Tag
        ref={frontRef}
        className={`absolute inset-0 ${primaryClassName}`}
        style={{ clipPath: "inset(0 0 100% 0)", willChange: "clip-path" }}
      >
        {text}
      </Tag>
    </div>
  );
}
