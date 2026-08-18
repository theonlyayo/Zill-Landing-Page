import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Zill — Your Campus Marketplace",
  description:
    "The marketplace where students buy, sell, negotiate prices, and build a real financial history.",
  keywords: [
    "Zill",
    "campus marketplace",
    "MTU",
    "Mountain Top University",
    "student marketplace",
    "buy and sell",
    "Nigeria",
  ],
  openGraph: {
    title: "Zill — Your Campus Marketplace",
    description:
      "The marketplace where students buy, sell, negotiate prices, and build a real financial history.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <body className="antialiased dark:bg-[#111111] dark:text-[#ffffff]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
