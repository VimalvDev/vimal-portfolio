"use client"
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ClipRevealText from "../animations/text/ClipRevealText";
import LineRevealText from "../animations/text/LineRevealText";
import Parallax from "../animations/Parallax";

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Black card scroll-linked rotation/slide in (no fade)
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { rotation: -45, y: -600 },
          {
            rotation: 0,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current.parentElement ?? cardRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  const revealWords = ["interfaces", "systems", "databases", "deployments", "automations"];

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden pb-32">
      {/* ── Orange eyebrow banner ── */}
      <div className="w-full lg:flex lg:w-full">
        <div className="hidden lg:block lg:w-[52%]"></div>
        <div className="w-full lg:w-[48%] px-4 sm:px-6 lg:px-0 lg:pl-20 mt-8 lg:mt-0">
          <div className="flex justify-start w-full lg:pt-6">
            <div className="bg-accent text-cream-light flex justify-between rounded-sm items-center px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-4 w-full lg:w-auto lg:min-w-[500px]">
              <span className="text-[11px] sm:text-xs text-cream-light font-heading tracking-wide uppercase md:text-sm">
                The first thing you should know about me
              </span>
              <span className="ml-4 lg:ml-8 text-xl sm:text-2xl font-sans text-cream-light font-bold md:text-3xl">
                01
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content area with images + giant headline ── */}
      <div className="w-full  min-h-full    max-w-[1800px] mx-auto px-6 md:px-10 relative mt-16 md:mt-24">
        {/* Parallax images (behind text via z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Image 1: landscape top-left */}
          <Parallax
            yPercent={-90}
            rotation={-10}
            trigger={sectionRef}
            className="absolute left-0 md:left-[0%] w-28 md:w-[280px] lg:w-[350px] aspect-[4/3]"
            style={{ transform: "rotate(-2deg)" }}
          >
            <img
              src="/1.png"
              alt="Parallax image 1"
              className="w-full h-full object-cover shadow-xl"
            />
          </Parallax>
          {/* Image 2: portrait mid-right */}
          <Parallax
            yPercent={60}
            rotation={4}
            trigger={sectionRef}
            className="absolute top-[5%] md:top-[15%] right-[-0%] md:right-[0%] w-20 md:w-[240px] lg:w-[300px] aspect-[3/4]"
            style={{ transform: "rotate(4deg)" }}
          >
            <img
              src="/0.png"
              alt="Parallax image 2"
              className="w-full h-full object-cover shadow-xl"
            />
          </Parallax>
          {/* Image 3: landscape bottom-left */}
          <Parallax
            yPercent={-50}
            rotation={5}
            trigger={sectionRef}
            className="absolute bottom-[-50%] left-[-2%] md:left-[0%] w-34 md:w-[280px] lg:w-[340px] aspect-[16/9]"
            style={{ transform: "rotate(2deg)" }}
          >
            <img
              src="/2.png"
              alt="Parallax image 3"
              className="w-full h-full object-cover shadow-xl"
            />
          </Parallax>
        </div>

        {/* Giant headline — clip-path gray→black reveal */}
        <div className="relative z-10 flex justify-center w-full px-4 sm:px-6 mt-40 mb-40 md:px-24 md:mt-32">
          <ClipRevealText
            text="Two skills. One person. Nothing lost in the handoff."
            className="font-heading font-black uppercase text-center w-full block text-[11vw] sm:text-[9vw] md:text-7xl lg:text-[110px] leading-[0.86] tracking-tight max-w-[1000px]"
          />
        </div>
      </div>

      {/* ── Thin horizontal divider & Black rounded card ── */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 mt-32 md:mt-48">
        <hr className="border-t-2 border-neutral-600" />

        {/* <div className="flex justify-end w-full pb-20 overflow-hidden black-card-trigger">
          <div
            ref={cardRef}
            className="bg-black text-white rounded-xl md:rounded-xl p-10 md:p-12 lg:p-16 max-w-3xl mr-0 md:mr-[10%] w-full mt-12 md:mt-16 origin-top-left"
          >
            <LineRevealText 
              splitType="words" 
              stagger={0.02} 
              start="top 80%" 
              end="top 20%" 
              trigger=".black-card-trigger"
              className="space-y-6 text-2xl leading-relaxed font-body md:text-3xl"
            >
              <p>We could've had one sooner.</p>
              <p>
                But our success lived <em>in the work</em> and the stories we
                created for others.
              </p>
              <p>We learned, edited and perfected what was worth saying.</p>
              <p>
                So what's worth sharing now&hellip;is the POV the <em>real</em>{' '}
                work built.
              </p>
            </LineRevealText>
          </div>
        </div> */}
      </div>

      {/* ── "Creative direction" paragraph ── */}
      <div className="w-full px-4 sm:px-6 mx-auto mt-30 text-center md:mt-32 max-w-[90vw] md:max-w-[60vw]">
        <LineRevealText
          splitType="lines"
          stagger={0.17}
          start="top 100%"
          end="bottom 60%"
          className="leading-tight text-cream-dark text-2xl sm:text-xl md:text-[2.5vw] font-body font-semibold"
        >
          Working across both ends of a project means nothing gets lost between design and code.
        </LineRevealText>
      </div>

      {/* ── NUMBERS / VENDORS list (stagger reveal) ── */}
      <LineRevealText
        splitType="lines"
        direction="top"
        stagger={0.1}
        start="top 90%"
        end="bottom 70%"
        trigger=".list-trigger"
        className="list-trigger flex flex-col items-center w-full px-4 sm:px-6 mx-auto mt-12 text-center md:px-10 md:mt-24 font-black text-cream-dark uppercase text-[12.5vw] sm:text-[10vw] md:text-8xl lg:text-9xl xl:text-10xl leading-[0.87]"
      >
        {revealWords.map((text, i) => (
          <div key={i} className="font-heading font-black uppercase text-center w-full block text-[11vw] sm:text-[9vw] md:text-7xl lg:text-[110px] leading-[0.86] tracking-tight max-w-[1000px]"
>
            {text}
          </div>
        ))}
      </LineRevealText>

      {/* ── Italic note ── */}
      <p className="mt-10 italic text-center font-body text-neutral-500">
        (And bugs? Those don't survive here.)
      </p>

      {/* ── CTA link ── */}
      <div className="flex justify-center mt-16">
        <a
          href="/work"
          className="flex items-center gap-2 pb-1 text-sm font-bold tracking-widest uppercase transition-colors border-b-2 border-black group font-display hover:text-accent hover:border-accent"
        >
          see my work
          <svg
            className="transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-1"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </section>
  );
}