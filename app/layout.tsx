import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SHOP_NAME } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const APP_URL = "https://megastore.example.com"; // change when you deploy

export const metadata: Metadata = {
  title: `${SHOP_NAME} | Online Kirana & Daily Needs`,
  description:
    "Order pooja samagri, cleaning essentials, kitchen and daily-use items directly from Mega Store. Fast local delivery with WhatsApp checkout.",
  metadataBase: new URL(APP_URL),
  keywords: [
    "Mega Store",
    "kirana",
    "grocery",
    "pooja items",
    "cleaning products",
    "phenyl",
    "harpic",
    "bucket",
    "Alandi grocery",
    "daily needs"
  ],
  openGraph: {
    title: `${SHOP_NAME} | Your Local Smart Kirana`,
    description:
      "Browse products, add to cart and place orders via WhatsApp. Simple, fast and built for your local area.",
    url: APP_URL,
    siteName: SHOP_NAME,
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: `${SHOP_NAME} | Online Kirana & Daily Needs`,
    description:
      "Smart local kirana ordering with WhatsApp checkout and fast delivery."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-emerald-50`}
      >
        {children}
      </body>
    </html>
  );
}
