import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Zill — Your Campus Marketplace",
  description:
    "The hyper-local marketplace where MTU students buy, sell, negotiate, and build real financial history — all on campus.",
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
      "Buy, sell, negotiate, and build a real credit trail. Made by MTU students, for MTU students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
