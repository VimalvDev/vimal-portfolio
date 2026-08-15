"use client"
import LineRevealText from "../animations/text/LineRevealText";
import RollUpText from "../animations/text/RollUpText";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {

  return (
     <div className="relative w-full">

      <section className="h-dvh flex flex-col px-5 sm:px-8 lg:px-10 pt-8 lg:py-0 w-full max-w-[1800px] mx-auto relative">

        {/* Main Layout: flex-col-reverse on mobile (right on top, left on bottom), flex-row on desktop */}
        <div className="flex flex-col-reverse grow w-full lg:flex-row">

          {/* ═══ Left Column ═══ */}
          {/* Desktop: VIMAL VERMA (absolute top) + "Led by" (relative bottom) */}
          {/* Mobile: "Led by" (relative) + "About me" (absolute bottom) */}
          <div className="w-full h-[20%] lg:w-[52%] lg:h-full relative">

            {/* VIMAL VERMA — DESKTOP ONLY, absolute top-left */}
            <div className="hidden lg:block absolute top-0 left-0 w-full">
              <div className="font-serif uppercase text-accent leading-[0.85] tracking-tighter text-[clamp(5.5rem,15vw,20rem)]">
                <LineRevealText scroll={false} splitType="lines" stagger={0.25}>
                  VIMAL<br />VERMA
                </LineRevealText>
              </div>
              <LineRevealText scroll={false} delay={0.3} className="flex items-center justify-between gap-4 mt-4 font-semibold">
                <span className="text-sm font-bold tracking-widest uppercase text-accent">
                  Web designer
                </span>
                <span className="text-sm font-bold tracking-widest uppercase text-accent">
                  web developer
                </span>
              </LineRevealText>
            </div>

            {/* "Led by a self-taught..." — relative, pushed to bottom */}
            <div className="lg:absolute lg:bottom-8 lg:left-0 lg:w-full">
              <LineRevealText scroll={false} delay={0.7} splitType="lines" stagger={0.22} className="max-w-sm text-[clamp(0.9375rem,2.8vw,1.25rem)] lg:text-[clamp(0.9375rem,1.1vw,1.25rem)] leading-tight text-black font-body">
                Led by a self-taught, practical developer, who moved from design into full-stack development and won't call something finished until it actually is.
              </LineRevealText>
            </div>

            {/* About me button — MOBILE ONLY, absolute bottom */}
            <div className="lg:hidden absolute bottom-2 left-0">
              <LineRevealText scroll={false} delay={0.7} splitType="lines">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-1 px-4 py-3 sm:px-5 sm:py-2.5 tracking-wide text-cream-light uppercase transition-colors bg-cream-dark rounded-sm hover:bg-neutral-800 font-heading"
                >
                  <RollUpText className="text-xs sm:text-sm">About me</RollUpText>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </LineRevealText>
            </div>
          </div>

          {/* ═══ Right Column ═══ */}
          {/* Desktop: "A developer merging" (relative center) + "About me" (absolute bottom) */}
          {/* Mobile: VIMAL VERMA (absolute top) + "A developer merging" (relative, pushed down) */}
          <div className="w-full h-[80%] lg:w-[48%] lg:h-full relative pl-0 lg:pl-20">

            {/* VIMAL VERMA — MOBILE ONLY, absolute top */}
            <div className="lg:hidden absolute top-0 left-0 w-full">
              <div className="font-serif uppercase text-accent leading-[0.85] tracking-normal sm:tracking-tight text-[clamp(5.5rem,15vw,20rem)]">
                <LineRevealText scroll={false} splitType="lines" stagger={0.25}>
                  VIMAL<br />VERMA
                </LineRevealText>
              </div>
              <LineRevealText scroll={false} delay={0.3} className="flex items-center justify-between gap-4 mt-2 sm:mt-3 font-semibold">
                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-accent">
                  Web designer
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-accent">
                  web developer
                </span>
              </LineRevealText>
            </div>

            {/* "A developer merging..." — relative, centered on desktop, pushed to bottom on mobile */}
            <div className="flex flex-col justify-end lg:justify-center h-full pb-4 lg:pb-0">
              <LineRevealText scroll={false} delay={0.5} splitType="words" stagger={0.04} className="max-w-xl font-semibold text-[clamp(1.25rem,5vw,2.5rem)] lg:text-[clamp(1.25rem,2.4vw,2.5rem)] leading-[1.15]">
                A developer merging clean design with backend systems, for founders and businesses who need their product built right, not just built fast.
              </LineRevealText>
            </div>

            {/* About me button — DESKTOP ONLY, absolute bottom */}
            <div className="hidden lg:flex absolute bottom-4 left-20 justify-start">
              <LineRevealText scroll={false} delay={0.7} splitType="lines">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-1 px-6 py-3 tracking-wide text-cream-light uppercase transition-colors bg-cream-dark rounded-sm hover:bg-neutral-800 font-heading"
                >
                  <RollUpText className="top-[0.1vw] text-base">About me</RollUpText>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </LineRevealText>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
