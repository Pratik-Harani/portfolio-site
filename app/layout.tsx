import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratik's Portfolio",
  description: "A portfolio for Pratik Harani, software engineer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
