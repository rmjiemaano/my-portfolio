import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Remejie Maano | Computer Engineer & Full-Stack Developer",
  description: "Portfolio of Remejie Maano, a Computer Engineering graduate specializing in full-stack web development (Next.js, React, Vue) and technical IT infrastructure systems.",
  keywords: ["Remejie Maano", "Computer Engineer", "Full-Stack Developer", "Next.js Portfolio", "Philippines Tech"],
  authors: [{ name: "Remejie Maano" }],
  openGraph: {
    title: "Remejie Maano | Computer Engineer & Full-Stack Developer",
    description: "Explore my projects, full-stack technical stack, and engineering background.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <CursorGlow />
        <Navbar />
        {children}
      </body>
    </html>
  );
}