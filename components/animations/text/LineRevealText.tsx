"use client";

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

interface LineRevealTextProps{
  children: React.ReactNode
  className?: string
  splitType?: 'words' | 'lines'
  direction?: 'top' | 'bottom'
  scroll?: boolean
  scrub?: number | boolean
  stagger?: number
  duration?: number
  delay?: number
  start?: string
  end?: string
  trigger?: null | string | Element
}

export default function LineRevealText({
  children,
  className = '',
  splitType = 'words', // 'words' | 'lines'
  direction = 'bottom', // 'top' | 'bottom'
  scroll = true, // boolean, if false runs once on mount
  scrub = true,
  stagger = 0.02,
  duration = 1,
  delay = 0,
  start = 'top 80%',
  end = 'top 0%',
  trigger = null, // CSS selector string or DOM element
}:LineRevealTextProps) {

  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    let splitOuter: SplitText | undefined
    let splitInner: SplitText | undefined
    

    const splitClass = splitType === 'words' ? 'wordsClass' : 'linesClass'
    const wrapperClass = splitType === 'words' ? 'overflow-y-hidden inline-flex' : 'overflow-hidden block'

    const build = () => {
      // Split the text twice: outer for overflow: hidden, inner for animation
      splitOuter = new SplitText(containerRef.current, { 
        type: splitType, 
        [splitClass]: wrapperClass
      })
      splitInner = new SplitText(splitOuter[splitType], { 
        type: splitType 
      })

      const initialY = direction === 'top' ? -110 : 110;

      const animProps: gsap.TweenVars = {
        yPercent: 0,
        ease: 'power3.out',
        stagger: stagger,
        duration: duration,
        delay: delay,
      }

      if (scroll) {
        animProps.scrollTrigger = {
          trigger: trigger || containerRef.current?.parentElement,
          start: start,
          end: end,
          scrub: scrub,
        }
        if (!scrub) {
          animProps.scrollTrigger.toggleActions = 'play none none reverse';
        }
      }

      gsap.fromTo(
        splitInner[splitType],
        { yPercent: initialY },
        animProps
      )
    }

    // Small delay to ensure fonts/layout are ready before splitting
    const timeout = setTimeout(() => {
      build()
    }, 50)

    const handleResize = () => {
      if (splitOuter) splitOuter.revert()
      build()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', handleResize)
      if (splitOuter) splitOuter.revert()
    }
  }, { scope: containerRef, dependencies: [splitType, stagger, start, end, trigger] })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
