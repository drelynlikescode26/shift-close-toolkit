import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shift Close Toolkit",
  description: "End-of-shift helper app for retail closing: quickly totals a cash drawer by entering bill/coin counts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
