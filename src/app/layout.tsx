import type { Metadata } from "next";
import { Inter, Playfair_Display, Kaushan_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  weight: "400",
  variable: "--font-kaushan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashren | Haute Marketplace - Pocket 4K Gimbal Camera",
  description: "Ashren brings you premium gadgets for creators, travelers and everyday adventurers. Discover 4K Ultra HD cameras with 180° rotation and AI stabilization.",
  keywords: ["Ashren", "Camera", "4K Gimbal", "Vlog Camera", "Haute Marketplace", "Pocket Camera"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${kaushan.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050608] text-white selection:bg-[#E5A93C] selection:text-black overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
