import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import Header from "@/components/header";
import DebugFooter from "@/components/debug-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trepid Programmer",
  description: "A blog by a trepid programmer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${lora.variable} 
          antialiased
        `}
      >
        <Header />
        {children}
        <DebugFooter />
      </body>
    </html>
  );
}
