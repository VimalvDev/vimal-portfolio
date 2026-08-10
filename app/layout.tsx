import type { Metadata } from "next";
import "./globals.css";
import 'lenis/dist/lenis.css'
import { Archivo, Playfair_Display } from "next/font/google";
import SiteShell from "@/components/shared/SiteShell";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vimal Verma",
  description: "Web designer & developer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${playfairDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}