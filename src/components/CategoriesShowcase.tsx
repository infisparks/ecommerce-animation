"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Layers, Sparkles, ArrowRight } from "lucide-react";

interface CategoryPod {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  glowColor: string;
  borderColor: string;
}

export default function CategoriesShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  const yLeft = useTransform(smoothProgress, [0, 1], [25, -20]);
  const yCenter = useTransform(smoothProgress, [0, 1], [40, -35]); // Center elevated
  const yRight = useTransform(smoothProgress, [0, 1], [25, -20]);

  const categories: CategoryPod[] = [
    {
      id: "dresses",
      title: "Royal Dresses",
      subtitle: "Haute Couture",
      image: "/category/dress.png",
      href: "/dresses",
      glowColor: "rgba(234, 168, 56, 0.4)",
      borderColor: "from-[#F4C463] via-[#EAA838] to-[#8B4513]",
    },
    {
      id: "jewelry",
      title: "Royal Necklace",
      subtitle: "Polki & Jewels",
      image: "/category/nackles.png",
      href: "/dresses",
      glowColor: "rgba(244, 196, 99, 0.5)",
      borderColor: "from-[#FFE6A5] via-[#F4C463] to-[#EAA838]",
    },
    {
      id: "gadgets",
      title: "Creator Tech",
      subtitle: "4K Drone & Gear",
      image: "/category/drone.png",
      href: "/gadgets",
      glowColor: "rgba(56, 189, 248, 0.4)",
      borderColor: "from-[#38BDF8] via-[#818CF8] to-[#1E293B]",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="categories"
      className="relative w-full py-10 sm:py-16 px-2.5 sm:px-6 lg:px-12 max-w-[1300px] mx-auto z-10 scroll-mt-20 font-sans select-none"
    >
      {/* Background Ambient Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#EAA838]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto mb-6 sm:mb-12 px-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[9.5px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 backdrop-blur-md shadow-[0_0_15px_rgba(234,168,56,0.2)]">
          <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
          <span>Curated Categories</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Select Your <br />
          <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
            World of Luxury
          </span>
        </h2>
      </motion.div>

      {/* =========================================================================
          3 CIRCULAR 3D CATEGORY ORBS IN 1 ROW (Mobile & Desktop)
          ========================================================================= */}
      <div className="grid grid-cols-3 gap-3 sm:gap-8 lg:gap-12 max-w-4xl mx-auto items-end">
        {categories.map((cat, idx) => {
          const yTransform = idx === 0 ? yLeft : idx === 1 ? yCenter : yRight;
          const isCenter = idx === 1;

          return (
            <motion.div
              key={cat.id}
              style={{ y: yTransform }}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <Link href={cat.href} className="flex flex-col items-center w-full">
                
                {/* 3D CIRCULAR PORTAL ORB */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -8 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full p-[2.5px] bg-gradient-to-tr ${cat.borderColor} shadow-[0_12px_35px_rgba(0,0,0,0.85)] group-hover:shadow-[0_0_35px_rgba(234,168,56,0.6)] transition-all duration-500 ${
                    isCenter ? "scale-105 sm:scale-110" : ""
                  }`}
                >
                  {/* Rotating Dashed Outer Orbit Ring */}
                  <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-dashed border-[#F4C463]/40 group-hover:border-[#F4C463] animate-spin-slow pointer-events-none" />

                  {/* Inner Dark Glass Orb */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#181c28] via-[#0d1017] to-[#06080d] flex items-center justify-center p-2 sm:p-3">
                    
                    {/* Ambient Glow Aura */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: cat.glowColor }}
                    />

                    {/* 3D Category PNG Image */}
                    <div className="relative w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        priority
                        sizes="(max-width: 640px) 100px, 180px"
                        className="object-contain object-center scale-[1.05]"
                      />
                    </div>

                    {/* Subtle Holographic Glare */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </motion.div>

                {/* Category Title & Subtitle Below the Circle */}
                <div className="text-center mt-3 sm:mt-4 space-y-0.5">
                  <h3 className="text-xs sm:text-base font-extrabold text-white tracking-tight leading-tight group-hover:text-[#F4C463] transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs text-[#F4C463]/80 font-medium line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
