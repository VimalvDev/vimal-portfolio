"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TriggerTarget = string | Element | React.RefObject<Element | null> | null;

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  x?: number
  y?: number
  xPercent?: number
  yPercent?: number
  rotation?: number
  scale?: number
  opacity?: number
  ease?: string
  scrub?: number | boolean
  start?: string
  end?: string
  trigger?: TriggerTarget
  style?: React.CSSProperties
}

function resolveTrigger(trigger: TriggerTarget, fallback: Element): Element | string {
  if (!trigger) return fallback;
  if (typeof trigger === 'string') return trigger;
  if ('current' in trigger) return trigger.current ?? fallback;
  return trigger;
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
  opacity,
  ease = 'none',
  scrub = true,
  start = 'top bottom',
  end = 'bottom top',
  trigger = null,
  style,
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = containerRef.current;
      if (!target) return;

      const triggerEl = resolveTrigger(trigger, target);

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
      if (opacity !== undefined) animationProps.opacity = opacity;

      gsap.to(target, animationProps);
    },
    { scope: containerRef, dependencies: [trigger] },
  );

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}