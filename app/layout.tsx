import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Doe — Portfolio",
  description: "A portfolio for John Doe, Computer Science student and developer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
