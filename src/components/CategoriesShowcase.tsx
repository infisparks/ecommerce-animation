"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowRight, Sparkles } from "lucide-react";

export default function CategoriesShowcase() {
  const categories = [
    {
      id: "dresses",
      title: "Haute Couture Dresses",
      shortTitle: "Dresses",
      subtitle: "17 Royal Silhouettes",
      tag: "NEW COLLECTION",
      image: "/category/dress-category.jpg",
      href: "/dresses",
      itemCount: "17 Designs",
      priceRange: "From ₹3,899",
      accent: "#EAA838",
    },
    {
      id: "gadgets",
      title: "Creator Gadgets & Tech",
      shortTitle: "Gadgets",
      subtitle: "4K Gimbal & FPV Drones",
      tag: "FLAGSHIP TECH",
      image: "/category/gadget-category.jpg",
      href: "/gadgets",
      itemCount: "3 Flagships",
      priceRange: "From ₹24,999",
      accent: "#F4C463",
    },
  ];

  return (
    <section id="categories" className="relative w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 max-w-[1540px] mx-auto z-10 scroll-mt-20 font-sans">
      
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#EAA838]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 px-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(234,168,56,0.2)]">
          <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
          <span>Curated Departments</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Select Your <br />
          <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_20px_rgba(244,196,99,0.4)]">
            World of Luxury
          </span>
        </h2>
      </motion.div>

      {/* 2 Full-Card Showcase: 2 in 1 Row on Mobile (grid-cols-2) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 hover:border-[#EAA838]/80 shadow-[0_15px_45px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_60px_rgba(234,168,56,0.35)] transition-all duration-500 cursor-pointer"
          >
            <Link href={cat.href} className="block relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
              
              {/* Full Card Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 45vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Luxury Multi-Stop Vignette & Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-[#EAA838]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top Bar on Card: Tag & Count */}
              <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-10 flex items-center justify-between gap-1">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 border border-[#EAA838]/50 backdrop-blur-md text-[8px] sm:text-[10px] font-bold tracking-wider text-[#F4C463] uppercase shadow-md truncate max-w-[70%]">
                  {cat.tag}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[8px] sm:text-[11px] font-semibold text-gray-200 shrink-0">
                  {cat.itemCount}
                </span>
              </div>

              {/* Bottom Information on Card */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-6 z-10 flex flex-col justify-end">
                
                {/* Price Range Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/70 border border-[#EAA838]/40 backdrop-blur-md text-[9px] sm:text-xs font-bold text-white mb-1.5 w-fit shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAA838] animate-pulse" />
                  <span>{cat.priceRange}</span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-2xl font-extrabold text-white tracking-tight leading-tight group-hover:text-[#F4C463] transition-colors line-clamp-2">
                  {cat.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[10px] sm:text-xs text-gray-300 font-medium mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>

                {/* Explore Action Button */}
                <div className="mt-2.5 sm:mt-4 w-full py-2 sm:py-3 px-3 rounded-xl bg-white/15 hover:bg-[#EAA838] border border-white/25 hover:border-[#EAA838] text-white hover:text-black font-extrabold text-[10px] sm:text-xs tracking-wide flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-[#EAA838] group-hover:text-black">
                  <span>Explore {cat.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
