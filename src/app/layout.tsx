import type { Metadata } from "next";
import { Outfit, Playfair_Display, Alex_Brush, Cinzel } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
      className={`${outfit.variable} ${playfair.variable} ${alexBrush.variable} ${cinzel.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050608] text-white selection:bg-[#E5A93C] selection:text-black overflow-x-hidden font-outfit">
        {children}
      </body>
    </html>
  );
}
