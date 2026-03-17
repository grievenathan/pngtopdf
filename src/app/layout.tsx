import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Free, Fast, Private | PNG To JPG",
  description:
    "Convert PNG images to JPG format instantly in your browser. Free, fast, and private - your files never leave your device. Batch convert up to 20 images at once.",
  keywords: ["png to jpg", "convert png to jpg", "image converter", "free jpg converter", "batch image converter"],
  openGraph: {
    title: "PNG to JPG Converter - Free, Fast, Private | PNG To JPG",
    description:
      "Convert PNG images to JPG format instantly in your browser. Free, fast, and private.",
    url: "https://pngtojpg.co.uk",
    siteName: "PNG To JPG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter - Free, Fast, Private",
    description:
      "Convert PNG images to JPG format instantly in your browser. Free, fast, and private.",
  },
  metadataBase: new URL("https://pngtojpg.co.uk"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="bg-glow" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
