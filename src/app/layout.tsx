import type { Metadata } from "next";
import { Lora, DM_Sans } from "next/font/google";
import "@/app/globals.css"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rapport — Communication Intelligence for People Leaders",
  description: "Rapport learns how you lead, drafts responses in your voice, and gets smarter with every conversation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}