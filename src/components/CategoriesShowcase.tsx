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
import { Layers } from "lucide-react";

interface CategoryPod {
  id: string;
  title: string;
  image: string;
  href: string;
  glowColor: string;
}

export default function CategoriesShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics for scroll movement
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  const yLeft = useTransform(smoothProgress, [0, 1], [30, -20]);
  const yCenter = useTransform(smoothProgress, [0, 1], [55, -40]); // Center elevated for 3D royal triptych
  const yRight = useTransform(smoothProgress, [0, 1], [30, -20]);

  const rotateLeft = useTransform(smoothProgress, [0, 0.5, 1], [-2.5, 0, 2.5]);
  const rotateCenter = useTransform(smoothProgress, [0, 0.5, 1], [0, 0, 0]);
  const rotateRight = useTransform(smoothProgress, [0, 0.5, 1], [2.5, 0, -2.5]);

  const categories: CategoryPod[] = [
    {
      id: "dresses",
      title: "Haute Couture",
      image: "/category/dress.png",
      href: "/dresses",
      glowColor: "rgba(234, 168, 56, 0.4)",
    },
    {
      id: "bridal",
      title: "Royal Bridal",
      image: "/category/dress1.png",
      href: "/dresses",
      glowColor: "rgba(244, 196, 99, 0.45)",
    },
    {
      id: "gadgets",
      title: "Creator Tech",
      image: "/category/drone.png",
      href: "/gadgets",
      glowColor: "rgba(56, 189, 248, 0.35)",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="categories"
      className="relative w-full py-12 sm:py-20 px-2 sm:px-6 lg:px-12 max-w-[1440px] mx-auto z-10 scroll-mt-20 font-sans select-none"
    >
      {/* Background Ambient Radial Light Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#EAA838]/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 px-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[9.5px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 sm:mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
          <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
          <span>Departments of Excellence</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Select Your <br />
          <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
            World of Luxury
          </span>
        </h2>
        <p className="text-[11px] sm:text-xs text-gray-300 mt-1.5 max-w-md mx-auto leading-relaxed">
          Tap any department to explore our curated royal collections and cinema-grade gear.
        </p>
      </motion.div>

      {/* =========================================================================
          3 CATEGORIES IN 1 ROW (Clean Direct 3D PNG Showcase)
          ========================================================================= */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 max-w-5xl mx-auto items-end">
        {categories.map((cat, idx) => {
          // Staggered scroll parallax transform
          const yTransform = idx === 0 ? yLeft : idx === 1 ? yCenter : yRight;
          const rotateTransform = idx === 0 ? rotateLeft : idx === 1 ? rotateCenter : rotateRight;
          const isCenter = idx === 1;

          return (
            <motion.div
              key={cat.id}
              style={{
                y: yTransform,
                rotateZ: rotateTransform,
              }}
              initial={{ opacity: 0, scale: 0.9, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <Link href={cat.href} className="relative w-full block">
                
                {/* 3D Floating Graphic Container */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className={`relative w-full aspect-[3/4.8] sm:aspect-[3/4.6] flex items-center justify-center transition-all duration-300 ${
                    isCenter ? "scale-[1.04] sm:scale-105" : ""
                  }`}
                >
                  {/* Subtle 3D Ambient Glow Aura Behind the Cutout */}
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none -z-10"
                    style={{ backgroundColor: cat.glowColor }}
                  />

                  {/* Direct 3D Category PNG Render */}
                  <div className="relative w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_20px_45px_rgba(234,168,56,0.5)] transition-all duration-500">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      priority
                      sizes="(max-width: 640px) 33vw, 25vw"
                      className="object-contain object-center scale-[1.02] group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
