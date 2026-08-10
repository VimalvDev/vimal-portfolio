"use client"
import { useRef } from "react"
import Navigation from "./Navigation"
import SmoothScrollMain from "./SmoothScrollMain"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navigation mainRef={mainRef} />
      <SmoothScrollMain ref={mainRef}>{children}</SmoothScrollMain>
    </div>
  )
}