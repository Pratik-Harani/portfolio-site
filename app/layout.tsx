import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { jost, googleSans } from './ui/fonts';

export const metadata: Metadata = {
  title: "Pratik's Portfolio",
  description: "A portfolio for Pratik Harani, software engineer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${googleSans.variable}`}>
      <body>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
