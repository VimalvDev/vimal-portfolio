"use client"
import { ReactLenis, useLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { forwardRef, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollMainProps {
  children: ReactNode
}

/**
 * Bridge component: syncs Lenis scroll events → GSAP ScrollTrigger.
 * Must be rendered inside <ReactLenis> to have access to the lenis context.
 */
function LenisScrollTriggerBridge() {
  useLenis(() => {
    ScrollTrigger.update()
  })
  return null
}

const SmoothScrollMain = forwardRef<HTMLDivElement, SmoothScrollMainProps>(
  ({ children }, ref) => {
    const [isLargeScreen, setIsLargeScreen] = useState(false)
    const [scrollerReady, setScrollerReady] = useState(false)
    const lenisRef = useRef<LenisRef>(null)
    const nativeScrollRef = useRef<HTMLDivElement>(null)

    // Only enable Lenis on lg+ screens (1024px and above)
    useEffect(() => {
      const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024)
      checkScreen()
      window.addEventListener("resize", checkScreen)
      return () => window.removeEventListener("resize", checkScreen)
    }, [])

    // Set up the scroller BEFORE children render their ScrollTrigger instances.
    // We use a ref callback to configure ScrollTrigger as soon as the scroll container mounts.
    const nativeScrollCallback = useCallback((node: HTMLDivElement | null) => {
      (nativeScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      if (node && !isLargeScreen) {
        ScrollTrigger.defaults({ scroller: node })
        setScrollerReady(true)
      }
    }, [isLargeScreen])

    // Bridge scroll container → ScrollTrigger scroller
    useEffect(() => {
      if (!isLargeScreen) {
        const nativeWrapper = nativeScrollRef.current
        if (!nativeWrapper) return

        ScrollTrigger.defaults({ scroller: nativeWrapper })
        ScrollTrigger.refresh()

        // Delayed refresh to catch late-mounting components
        const timer = setTimeout(() => ScrollTrigger.refresh(), 150)

        return () => {
          clearTimeout(timer)
          ScrollTrigger.defaults({ scroller: undefined })
          setScrollerReady(false)
        }
      }

      // On large screens: use the Lenis wrapper as the scroller
      const wrapper = lenisRef.current?.wrapper
      if (!wrapper) return

      ScrollTrigger.defaults({ scroller: wrapper })
      setScrollerReady(true)

      // Set up scrollerProxy so ScrollTrigger reads scroll position from the Lenis wrapper
      ScrollTrigger.scrollerProxy(wrapper, {
        scrollTop(value) {
          const lenis = lenisRef.current?.lenis
          if (!lenis) return 0
          if (arguments.length) {
            lenis.scrollTo(value as number, { immediate: true })
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
      })

      ScrollTrigger.refresh()

      return () => {
        ScrollTrigger.defaults({ scroller: undefined })
        setScrollerReady(false)
      }
    }, [isLargeScreen])

    const lenisOptions = {
      lerp: 0.05,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      syncTouchLerp: 0.05,
    }

    return (
      <main
        ref={ref}
        className="h-screen w-full overflow-hidden relative z-10 bg-cream text-cream-dark origin-center will-change-transform selection:bg-accent selection:text-cream-light flex flex-col shadow-2xl"
      >
        {isLargeScreen ? (
          <ReactLenis ref={lenisRef} root={false} options={lenisOptions} className="h-full w-full overflow-y-auto">
            <LenisScrollTriggerBridge />
            {children}
          </ReactLenis>
        ) : (
          <div ref={nativeScrollCallback} className="h-full w-full overflow-y-auto">
            {children}
          </div>
        )}
      </main>
    )
  }
)
SmoothScrollMain.displayName = "SmoothScrollMain"
export default SmoothScrollMain