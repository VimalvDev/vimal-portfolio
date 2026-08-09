import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps{
  children: React.ReactNode
  className?: string
  x?: number 
  y?: number 
 xPercent?: number 
  yPercent?: number 
  rotation?: number 
  scale?: number
  ease?: string
  scrub?: number | boolean
  start?: string
  end?: string
  trigger?: null | string | Element

}

export default function Parallax({
  children,
  className = '',
  x,
  y,
  xPercent,
  yPercent,
  rotation,
  scale,
  ease = 'none',
  scrub = true,
  start = 'top bottom',
  end = 'bottom top',
  trigger,
}: ParallaxProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    // Resolve trigger: React ref → .current, string/element → as-is, fallback → target itself
    const triggerEl =
      trigger || target

    if (!triggerEl) return;

    const animationProps: gsap.TweenVars = {
      ease,
      scrollTrigger: {
        trigger: triggerEl,
        start,
        end,
        scrub,
      },
    };

    if (x !== undefined) animationProps.x = x;
    if (y !== undefined) animationProps.y = y;
    if (xPercent !== undefined) animationProps.xPercent = xPercent;
    if (yPercent !== undefined) animationProps.yPercent = yPercent;
    if (rotation !== undefined) animationProps.rotation = rotation;
    if (scale !== undefined) animationProps.scale = scale;

    const tween = gsap.to(target, animationProps);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
