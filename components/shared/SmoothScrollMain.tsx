"use client"
import { ReactLenis } from 'lenis/react'
import { forwardRef, ReactNode, useEffect, useState } from 'react'

interface SmoothScrollMainProps {
  children: ReactNode
}

const SmoothScrollMain = forwardRef<HTMLDivElement, SmoothScrollMainProps>(
  ({ children }, ref) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768)
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const lenisOptions = {
      lerp: isMobile ? 0.08 : 0.05,
      duration: isMobile ? 0.8 : 1.2,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: isMobile ? 0.08 : 0.05,
    }

    return (
      <main
        ref={ref}
        className="h-screen w-full overflow-hidden relative z-10 bg-cream text-cream-dark origin-center will-change-transform selection:bg-accent selection:text-cream-light flex flex-col shadow-2xl"
      >
        <ReactLenis root={false} options={lenisOptions} className="h-full w-full overflow-y-auto">
          {children}
        </ReactLenis>
      </main>
    )
  }
)
SmoothScrollMain.displayName = "SmoothScrollMain"
export default SmoothScrollMain