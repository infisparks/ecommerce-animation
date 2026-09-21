"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Crown,
  Camera,
  Layers,
  Zap,
  Flame,
  Star,
  ShieldCheck,
} from "lucide-react";

interface CategoryItem {
  id: string;
  title: string;
  shortTitle: string;
  headline: string;
  subtitle: string;
  tag: string;
  badge: string;
  image: string;
  href: string;
  itemCount: string;
  priceRange: string;
  accent: string;
  glowColor: string;
  highlights: string[];
}

function Card3D({ cat, idx }: { cat: CategoryItem; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth 3D tilt motion values with spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-14, 14]);

  // Dynamic light sheen gradient position
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isDresses = cat.id === "dresses";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: idx * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl p-[1.5px] cursor-pointer will-change-transform select-none perspective-[1200px]"
    >
      {/* 3D Animated Neon Border Gradient Halo */}
      <div
        className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${
          isDresses
            ? "from-[#F4C463] via-[#EAA838]/60 to-[#8B4513]/40 group-hover:from-[#FFE6A5] group-hover:via-[#F4C463] group-hover:to-[#EAA838]"
            : "from-[#F4C463] via-[#4A5568]/80 to-[#1A202C] group-hover:from-[#FFE6A5] group-hover:via-[#F4C463] group-hover:to-[#38BDF8]/60"
        } opacity-70 group-hover:opacity-100 blur-[2px] transition-all duration-500`}
      />

      {/* Outer 3D Glow Aura */}
      <div
        className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-700 pointer-events-none -z-10 ${
          isDresses ? "bg-[#EAA838]/30" : "bg-[#F4C463]/25"
        }`}
      />

      {/* Main Card Shell */}
      <Link
        href={cat.href}
        className="relative block w-full aspect-[3/4] sm:aspect-[4/5] rounded-[23px] overflow-hidden bg-[#0c0e15] text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Layer 0: High-Res Card Image with Smooth Deep Zoom */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            priority
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 45vw"
            className="object-cover object-center scale-[1.03] group-hover:scale-112 transition-transform duration-700 ease-out"
          />

          {/* Cinematic Multi-Stop Vignette Shadows */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 pointer-events-none" />
          
          {/* Radial Ambient Color Tone */}
          <div
            className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${
              isDresses
                ? "bg-[radial-gradient(circle_at_bottom_left,rgba(234,168,56,0.5),transparent_60%)]"
                : "bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.35),transparent_60%)]"
            }`}
          />
        </div>

        {/* 3D Holographic Dynamic Sheen Light (Follows Cursor) */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay z-20"
          style={{
            background:
              "radial-gradient(circle 320px at 50% 50%, rgba(255,255,255,0.28), transparent 70%)",
          }}
        />

        {/* ================= 3D FLOATING LAYER (Z: 35px) ================= */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="absolute top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-4 z-30 flex items-center justify-between gap-1 pointer-events-none"
        >
          {/* Top Category Badge */}
          <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-black/75 border border-[#EAA838]/60 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
            {isDresses ? (
              <Crown className="w-3 h-3 text-[#F4C463] animate-pulse" />
            ) : (
              <Zap className="w-3 h-3 text-[#F4C463] animate-pulse" />
            )}
            <span className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#F4C463] truncate">
              {cat.tag}
            </span>
          </div>

          {/* Item Count / Flagship Pill */}
          <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[8px] sm:text-[10px] font-bold text-gray-200 shadow-md">
            {cat.itemCount}
          </div>
        </div>

        {/* Floating Mini 3D Feature Pills (Desktop view only for extra luxury punch) */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="hidden sm:flex absolute top-14 left-4 right-4 z-30 flex-wrap gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0"
        >
          {cat.highlights.map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 rounded-md bg-black/70 border border-[#EAA838]/40 text-[9px] font-semibold text-gray-200 backdrop-blur-md shadow-sm flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#EAA838]" />
              {h}
            </span>
          ))}
        </div>

        {/* ================= 3D BOTTOM CONTENT (Z: 50px) ================= */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="absolute bottom-0 inset-x-0 p-3 sm:p-5 z-30 flex flex-col justify-end pointer-events-none"
        >
          {/* Price Range Pill with Glowing Dot */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-[#EAA838]/50 backdrop-blur-md text-[9px] sm:text-xs font-bold text-white mb-1.5 w-fit shadow-[0_2px_12px_rgba(234,168,56,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAA838] shadow-[0_0_8px_#EAA838] animate-ping" />
            <span className="text-[#F4C463]">{cat.priceRange}</span>
          </div>

          {/* Main Title */}
          <h3 className="text-xs sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:text-[#F4C463] transition-colors line-clamp-2">
            {cat.title}
          </h3>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-xs text-gray-300 font-medium mt-0.5 line-clamp-1 drop-shadow-md">
            {cat.subtitle}
          </p>

          {/* 3D Elevated CTA Button */}
          <div
            style={{ transform: "translateZ(25px)" }}
            className={`mt-2 sm:mt-3.5 w-full py-2 sm:py-2.5 px-3 rounded-xl font-extrabold text-[10px] sm:text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border transition-all duration-300 ${
              isDresses
                ? "bg-gradient-to-r from-[#F4C463] via-[#EAA838] to-[#D79728] text-black border-[#F4C463] group-hover:shadow-[0_0_25px_rgba(234,168,56,0.6)]"
                : "bg-gradient-to-r from-white/20 via-white/10 to-white/20 text-white border-white/30 group-hover:bg-gradient-to-r group-hover:from-[#F4C463] group-hover:via-[#EAA838] group-hover:to-[#D79728] group-hover:text-black group-hover:border-[#EAA838] group-hover:shadow-[0_0_25px_rgba(234,168,56,0.5)]"
            }`}
          >
            <span>Explore {cat.shortTitle}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategoriesShowcase() {
  const categories: CategoryItem[] = [
    {
      id: "dresses",
      title: "Haute Couture Dresses",
      shortTitle: "Dresses",
      headline: "Royal Bridal & Silk",
      subtitle: "17 Royal Silhouettes • Hand Zari",
      tag: "NEW COLLECTION",
      badge: "ROYAL LUXURY",
      image: "/category/dress-category.jpg",
      href: "/dresses",
      itemCount: "17 Designs",
      priceRange: "From ₹3,899",
      accent: "#EAA838",
      glowColor: "rgba(234,168,56,0.4)",
      highlights: ["Pure Raw Silk", "AI Virtual Try-On", "Zari & Organza"],
    },
    {
      id: "gadgets",
      title: "Creator Gadgets & Tech",
      shortTitle: "Gadgets",
      headline: "4K Cinematic Gear",
      subtitle: "Pocket 4K Gimbals & FPV Drones",
      tag: "FLAGSHIP TECH",
      badge: "4K CINEMA",
      image: "/category/gadget-category.jpg",
      href: "/gadgets",
      itemCount: "3 Flagships",
      priceRange: "From ₹24,999",
      accent: "#F4C463",
      glowColor: "rgba(56,189,248,0.35)",
      highlights: ["4K 60fps Ultra", "3-Axis Stabilizer", "360° FPV Flight"],
    },
  ];

  return (
    <section
      id="categories"
      className="relative w-full py-12 sm:py-20 px-3.5 sm:px-6 lg:px-12 max-w-[1380px] mx-auto z-10 scroll-mt-20 font-sans"
    >
      {/* Background Decorative Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#EAA838]/12 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 px-2"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
          <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
          <span>Curated Flagship Departments</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Select Your <br />
          <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
            World of Luxury
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
          Hover to experience interactive 3D perspectives across our royal bridal couture and cinema-grade gear.
        </p>
      </motion.div>

      {/* 2 Full 3D Interactive Cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-8 max-w-5xl mx-auto">
        {categories.map((cat, idx) => (
          <Card3D key={cat.id} cat={cat} idx={idx} />
        ))}
      </div>
    </section>
  );
}
