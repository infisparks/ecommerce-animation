import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ashren | Haute Marketplace - Pocket 4K Gimbal Camera & Drone",
  description: "Ashren brings you premium gadgets for creators, travelers and everyday adventurers. Discover 4K Ultra HD cameras with 180° rotation and AI stabilization.",
  keywords: ["Ashren", "Camera", "4K Gimbal", "Vlog Camera", "Drone", "FPV Drone", "Haute Marketplace"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050608] text-white selection:bg-[#E5A93C] selection:text-black overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
