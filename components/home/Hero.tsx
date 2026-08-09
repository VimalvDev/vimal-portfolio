"use client"
import LineRevealText from "../animations/text/LineRevealText";
import RollUpText from "../animations/text/RollUpText";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {

  return (
     <div className="relative w-full   ">

      <section className="min-h-dvh h-screen flex flex-col px-5 sm:px-8 lg:px-10 pt-8 py-12 lg:py-0 w-full max-w-[1800px] mx-auto relative">

        {/* Main Two-Column Layout */}
        <div className="flex flex-col grow w-full lg:flex-row gap-10 lg:gap-0">
          {/* Left Column  */}
          <div className="w-full lg:w-[52%] h-full flex flex-col justify-between pt-8 lg:pt-0 pr-0">
            <div className="w-full">
              <div className="font-serif uppercase text-accent leading-[0.85] tracking-normal sm:tracking-tight lg:tracking-tighter text-[clamp(5.5rem,15vw,20rem)]">
                <LineRevealText scroll={false} splitType="lines" stagger={0.25}>
                  VIMAL<br />VERMA
                </LineRevealText>
              </div>
              <LineRevealText scroll={false} delay={0.3} className="flex items-center justify-between gap-4 mt-2 sm:mt-3 lg:mt-4 font-semibold">
                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-accent">
                  Web designer
                </span>
                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-accent">
                  web developer
                </span>
              </LineRevealText>
            </div>

            <div className="mt-24 mb-10 lg:mt-auto lg:mb-8">
              <LineRevealText scroll={false} delay={0.7} splitType="lines" stagger={0.22} className="max-w-sm text-[clamp(0.9375rem,1.1vw,1.25rem)] leading-tight text-black font-body">
                Led by a self-taught, practical developer, who moved from design into full-stack development and won't call something finished until it actually is.
              </LineRevealText>
            </div>
          </div>

          {/* Right Column  */}
          <div className="w-full lg:w-[48%] flex h-full flex-col pl-0 lg:pl-20 justify-center lg:justify-end pb-10 lg:pb-8">
            
            <div className="flex items-center justify-start h-full">
              <LineRevealText scroll={false} delay={0.5} splitType="words" stagger={0.04} className="max-w-xl font-semibold text-[clamp(1.25rem,2.4vw,2.5rem)] leading-[1.15]">
                A developer merging clean design with backend systems, for founders and businesses who need their product built right, not just built fast.
              </LineRevealText>
            </div>

            <div className="flex justify-start mt-5 ">
              <LineRevealText scroll={false} delay={0.7} splitType="lines">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-1 px-4 py-3 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 tracking-wide text-cream-light uppercase transition-colors bg-cream-dark rounded-sm hover:bg-neutral-800 font-heading"
                >
                  <RollUpText className="lg:top-[0.1vw] text-xs sm:text-sm lg:text-base">About me</RollUpText>
                  <ArrowUpRight className="w-5 h-5 " />
                </a>
              </LineRevealText>
            </div>
            
            
          </div>
          
        </div>
      </section>
    </div>
  );
}
