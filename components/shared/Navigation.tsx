"use client";
import { createContext, useContext, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import RollUpText from "../animations/text/RollUpText";

gsap.registerPlugin(CustomEase);
CustomEase.create("tilt", "M0,0 C0.55,0 0.45,1 1,1");

interface NavContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

interface NavigationProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      if (!mainRef?.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as {
            isMobile: boolean;
            isTablet: boolean;
          };

          const xPercent = isMobile ? -85 : isTablet ? -60 : -40;
          const rotation = isMobile ? 3 : isTablet ? 5 : 7;

          gsap.to(mainRef.current, {
            xPercent: isMenuOpen ? xPercent : 0,
            rotation: isMenuOpen ? rotation : 0,
            duration: 0.77,
            ease: "tilt",
            overwrite: true,
          });
        },
      );

      return () => mm.revert();
    },
    { dependencies: [isMenuOpen] },
  );

  return (
    <NavContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <nav className="fixed inset-0 bg-cream-dark z-0 text-cream flex flex-col items-end justify-center px-6 sm:px-10">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-6 right-6 sm:top-8 sm:right-10 text-base sm:text-xl font-bold uppercase z-10 transition-colors hover:text-accent"
        >
          <RollUpText>Close</RollUpText>
        </button>

        <div className="flex flex-col items-end text-cream text-right font-heading pointer-events-auto gap-1 sm:gap-0">
          <a
            href="#about"
            className="text-[clamp(2rem,10vw,4.5rem)] uppercase leading-none hover:text-accent transition-colors"
          >
            <RollUpText>About</RollUpText>
          </a>
          <a
            href="#projects"
            className="text-[clamp(2rem,10vw,4.5rem)] uppercase leading-none hover:text-accent transition-colors"
          >
            <RollUpText>Projects</RollUpText>
          </a>
          <a
            href="#services"
            className="text-[clamp(2rem,10vw,4.5rem)] uppercase leading-none hover:text-accent transition-colors"
          >
            <RollUpText>Services</RollUpText>
          </a>
          <a
            href="#contact"
            className="text-[clamp(2rem,10vw,4.5rem)] uppercase leading-none hover:text-accent transition-colors"
          >
            <RollUpText>Contact</RollUpText>
          </a>
        </div>
      </nav>

      <main
        ref={mainRef}
        className="h-screen w-full overflow-y-auto relative z-10 bg-cream text-cream-dark origin-center will-change-transform selection:bg-accent selection:text-cream-light flex flex-col shadow-2xl"
      >
        <Navigation.MenuButton />
        {children}
      </main>
    </NavContext.Provider>
  );
}

Navigation.MenuButton = function MenuButton() {
  const context = useContext(NavContext);
  if (!context) throw new Error("MenuButton must be used within Navigation");
  const { setIsMenuOpen } = context;
  return (
    <header className="absolute top-0 left-0 w-full z-50 px-6 py-6 sm:px-10 sm:py-8 flex justify-end pointer-events-none">
      <button
        onClick={() => setIsMenuOpen(true)}
        className="text-base sm:text-xl font-bold uppercase pointer-events-auto text-cream-dark transition-colors hover:text-accent"
      >
        <RollUpText>Menu</RollUpText>
      </button>
    </header>
  );
};