import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PNG to PDF Converter - Free, Fast, Private | PNG To PDF",
  description:
    "Convert PNG images to PDF format instantly in your browser. Free, fast, and private - your files never leave your device. Batch convert up to 20 images or merge into a single PDF.",
  keywords: ["png to pdf", "convert png to pdf", "image to pdf converter", "free pdf converter", "batch image to pdf", "merge png to pdf"],
  openGraph: {
    title: "PNG to PDF Converter - Free, Fast, Private | PNG To PDF",
    description:
      "Convert PNG images to PDF format instantly in your browser. Free, fast, and private.",
    url: "https://pngtopdf.co.uk",
    siteName: "PNG To PDF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to PDF Converter - Free, Fast, Private",
    description:
      "Convert PNG images to PDF format instantly in your browser. Free, fast, and private.",
  },
  metadataBase: new URL("https://pngtopdf.co.uk"),
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
