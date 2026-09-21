"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Play,
  Sparkles,
  Zap,
  RotateCw,
  Layers,
  Award,
  Star,
  Camera,
  Tv,
  Droplets,
  Radio,
} from "lucide-react";
import { PRODUCTS, ProductItem } from "@/data/products";

interface ScrollExperienceProps {
  onShopNow: (product: ProductItem) => void;
  onOpenVideo: (title?: string, category?: string) => void;
}

export default function ScrollExperience({
  onShopNow,
  onOpenVideo,
}: ScrollExperienceProps) {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput("");
    }
  };

  return (
    <div className="relative w-full z-10 space-y-24 sm:space-y-32 py-16 px-4 sm:px-8 lg:px-16 max-w-[1540px] mx-auto font-sans">
      
      {/* =========================================================================
          SECTION 1: 3D FLAGSHIP COLLECTION SHOWCASE
          ========================================================================= */}
      {/* =========================================================================
          SECTION 1: 3D FLAGSHIP COLLECTION SHOWCASE
          ========================================================================= */}
      <section id="flagship-products" className="relative scroll-mt-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>The Flagship Trio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered For Every <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.45)]">
              Dimension of Storytelling
            </span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300/90 mt-3 sm:mt-4 leading-relaxed max-w-xl mx-auto">
            Explore our precision-crafted ecosystem designed for creators, adventurers, and filmmakers.
          </p>
        </motion.div>

        {/* 3 Master Glassmorphic Product Cards (2 in 1 Row on Mobile: grid-cols-2 md:grid-cols-3) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 bg-gradient-to-b from-[#141824]/90 via-[#0d1017]/95 to-[#080a0f]/98 hover:from-[#191e2e]/95 hover:via-[#10141f]/98 hover:to-[#0a0d14]/100 border border-white/15 hover:border-[#EAA838]/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_55px_rgba(234,168,56,0.28)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Luxury Top Light Sheen Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              
              {/* Subtle Radial Ambient Core Glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 sm:w-52 h-40 sm:h-52 bg-[#EAA838]/15 group-hover:bg-[#EAA838]/25 blur-[70px] sm:blur-[90px] rounded-full transition-all duration-700 pointer-events-none -z-10" />

              <div>
                {/* Eyebrow Category & Pricing */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.06] border border-[#EAA838]/30 backdrop-blur-md shadow-sm truncate max-w-[60%] sm:max-w-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAA838] animate-pulse shrink-0" />
                    <span className="text-[8.5px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-[#F4C463] truncate">
                      {prod.category}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 shrink-0">
                    <span className="text-[9px] sm:text-[11px] text-gray-400 font-medium line-through opacity-70 hidden xs:inline">
                      ₹{(prod.price * 1.25).toFixed(0)}
                    </span>
                    <span className="text-xs sm:text-lg lg:text-xl font-extrabold text-[#F4C463] tracking-tight drop-shadow-sm">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Product Title & Subtitle */}
                <h3 className="text-xs sm:text-lg lg:text-xl font-extrabold text-white tracking-tight group-hover:text-[#FFF1C5] transition-colors leading-snug line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-[9.5px] sm:text-xs text-gray-300/80 mt-0.5 sm:mt-1.5 mb-2 sm:mb-4 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                  {prod.subtitle}
                </p>

                {/* Hero Product Image Stage */}
                <div className="relative w-full h-32 sm:h-48 lg:h-56 my-2 sm:my-4 flex items-center justify-center">
                  {/* Outer Holographic Halo Orbit Ring */}
                  <div className="absolute w-28 sm:w-44 h-28 sm:h-44 rounded-full border border-dashed border-[#EAA838]/25 group-hover:border-[#EAA838]/60 group-hover:rotate-45 transition-all duration-700 pointer-events-none" />
                  
                  {/* Inner Solid Gold Glow Ring */}
                  <div className="absolute w-24 sm:w-36 h-24 sm:h-36 rounded-full border border-[#EAA838]/30 group-hover:scale-105 transition-all duration-500 pointer-events-none shadow-[0_0_15px_rgba(234,168,56,0.2)]" />
                  
                  {/* Bottom Radial Floor Shadow */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 sm:w-32 h-4 sm:h-6 bg-black/80 blur-md rounded-full pointer-events-none" />

                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full will-change-transform"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_15px_35px_rgba(234,168,56,0.35)] transition-all duration-500"
                    />
                  </motion.div>
                </div>

                {/* Refined Glassmorphic 3-Spec Pods */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 my-2 sm:my-3.5">
                  <div className="p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.07] border border-white/10 group-hover:border-[#EAA838]/30 transition-all text-center flex flex-col justify-center">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-tight leading-tight">{prod.badge1.value}</p>
                    <p className="text-[7.5px] sm:text-[9px] font-semibold text-[#EAA838] uppercase tracking-wider mt-0.5 truncate">{prod.badge1.label}</p>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.07] border border-white/10 group-hover:border-[#EAA838]/30 transition-all text-center flex flex-col justify-center">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-tight leading-tight">{prod.badge2.value}</p>
                    <p className="text-[7.5px] sm:text-[9px] font-semibold text-[#EAA838] uppercase tracking-wider mt-0.5 truncate">{prod.badge2.label}</p>
                  </div>
                  <div className="p-1.5 sm:p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.07] border border-white/10 group-hover:border-[#EAA838]/30 transition-all text-center flex flex-col justify-center">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-tight leading-tight">{prod.badge3.value}</p>
                    <p className="text-[7.5px] sm:text-[9px] font-semibold text-[#EAA838] uppercase tracking-wider mt-0.5 truncate">{prod.badge3.label}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-3 pt-1 sm:pt-2">
                <button
                  onClick={() => onShopNow(prod)}
                  className="flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FADB7F] via-[#EAA838] to-[#C98418] hover:from-[#FFF1C5] hover:via-[#F4C463] hover:to-[#EAA838] text-black font-extrabold text-[10px] sm:text-xs lg:text-sm tracking-wide shadow-[0_4px_20px_rgba(234,168,56,0.35)] flex items-center justify-center gap-1 sm:gap-2 transition-all active:scale-95 group/btn"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-black group-hover/btn:scale-110 transition-transform shrink-0" />
                  <span className="truncate">Add to Cart</span>
                </button>
                <button
                  onClick={() => onOpenVideo(`${prod.name} 4K Cinematic Showcase`, prod.category)}
                  aria-label="Play video demo"
                  className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.06] hover:bg-[#EAA838] hover:text-black border border-white/20 hover:border-[#EAA838] text-white flex items-center justify-center transition-all shadow-md active:scale-95 group/play shrink-0"
                >
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5 group-hover/play:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE TECH & INNOVATION MATRIX
          ========================================================================= */}
      <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#0e111a]/80 via-[#0a0c12]/90 to-[#07080b]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Glow Halo */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#EAA838]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EAA838]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAA838]/10 border border-[#EAA838]/30 text-[#F4C463] text-xs font-semibold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-[#EAA838]" />
              <span>Next-Gen Architecture</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Pioneering Optical <br />
              <span className="font-serif-luxury italic font-normal text-gold-shimmer">
                Precision & AI Tracking
              </span>
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              Every millimeter of Ashren hardware is calibrated for cinematic excellence. From multi-layer nano-coated optical lenses to brushless mechanical gimbal motors responding in 0.002 seconds.
            </p>

            {/* Quick Stat Counter Pods (Single Row Balanced) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white whitespace-nowrap">0.002s</p>
                <p className="text-[10px] sm:text-[11px] text-gray-300 font-semibold uppercase tracking-wider mt-1 whitespace-nowrap">Motor Latency</p>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F4C463] whitespace-nowrap">120 Mbps</p>
                <p className="text-[10px] sm:text-[11px] text-[#EAA838] font-semibold uppercase tracking-wider mt-1 whitespace-nowrap">Bitrate Clarity</p>
              </div>
            </div>
          </motion.div>

          {/* Right 4-Card Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* Feature 1: 4K 60FPS Sensor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#EAA838]/50 transition-all shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">4K UHD Optical Sensor</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                1/1.3-inch Sony HDR CMOS sensor capturing vibrant dynamic range even in low-light twilight scenes.
              </p>
            </motion.div>

            {/* Feature 2: 3-Axis Active Stabilization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#EAA838]/50 transition-all shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
                <RotateCw className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Active AI HorizonLock</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                Proprietary 3-axis mechanical gimbal with real-time neural gyro balancing for butter-smooth cinematic tracks.
              </p>
            </motion.div>

            {/* Feature 3: IPX8 Waterproof & Rugged */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#EAA838]/50 transition-all shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">IPX8 All-Weather Build</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                Hydrophobic nano-coating and sealed aluminum chassis designed for diving, snow blizzards, and desert dust.
              </p>
            </motion.div>

            {/* Feature 4: Live FPV Screen & Long Range */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#EAA838]/50 transition-all shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAA838]/15 border border-[#EAA838]/30 flex items-center justify-center text-[#EAA838] mb-3 group-hover:scale-110 transition-transform">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">5.8GHz Zero-Lag Remote</h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                Dedicated FPV remote with high-nit sunlight readable screen and automatic emergency GPS return-to-home.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CREATOR CINEMATIC REELS & REVIEWS (Parallax Cards)
          ========================================================================= */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
            <Tv className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>Captured on Ashren</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Loved By 50,000+ <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer">
              Creators & Filmmakers
            </span>
          </h2>
        </motion.div>

        {/* 3 Story Showcase Cards with Natural 3D Cutout Pop-Out */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
          
          {/* Card 1: Camera Card 1 (Mountain Alpine Expedition) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group flex flex-col justify-between"
          >
            {/* 3D Floating Cutout Image */}
            <div
              onClick={() => onOpenVideo("Mountain Alpine 4K Expedition", "TRAVEL ADVENTURE")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/camera/card1.png"
                alt="Camera Travel Showcase"
                width={500}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Testimonial Box */}
            <div className="p-5 rounded-2xl bg-[#0d1017]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-1 text-[#F4C463]">
                {"★★★★★".split("").map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-gray-300 font-semibold ml-1.5">5.0</span>
              </div>
              <p className="text-xs text-gray-200 italic leading-relaxed">
                &ldquo;The gimbal stability in sub-zero Himalayan altitudes blew me away. Replaced 5kg of heavy gear in my backpack.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Aarav Sharma</p>
                  <p className="text-[10px] text-gray-400">National Geographic Explorer</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">Verified User</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Drone Card 2 (Aerial FPV Flight & Sunset) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group flex flex-col justify-between"
          >
            {/* 3D Floating Cutout Image */}
            <div
              onClick={() => onOpenVideo("Sunset Ridge 4K FPV Flight", "AERIAL CINEMATOGRAPHY")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/drone/card2.png"
                alt="Drone Aerial Showcase"
                width={500}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Testimonial Box */}
            <div className="p-5 rounded-2xl bg-[#0d1017]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-1 text-[#F4C463]">
                {"★★★★★".split("").map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-gray-300 font-semibold ml-1.5">5.0</span>
              </div>
              <p className="text-xs text-gray-200 italic leading-relaxed">
                &ldquo;The built-in screen controller means zero phone battery drain or connectivity hiccups during live sunset shoots.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Devendra Patel</p>
                  <p className="text-[10px] text-gray-400">Cinematographer & VFX Artist</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">Verified User</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Camera Card 3 (Cityscape Creative Timelapse) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group flex flex-col justify-between"
          >
            {/* 3D Floating Cutout Image */}
            <div
              onClick={() => onOpenVideo("Cityscape Night 4K Vlog & Timelapse", "CREATIVE TIMELAPSE")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/camera/card3.png"
                alt="Camera Create Showcase"
                width={500}
                height={280}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Testimonial Box */}
            <div className="p-5 rounded-2xl bg-[#0d1017]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center gap-1 text-[#F4C463]">
                {"★★★★★".split("").map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-gray-300 font-semibold ml-1.5">4.9</span>
              </div>
              <p className="text-xs text-gray-200 italic leading-relaxed">
                &ldquo;Vibrant color rendering and night stabilization make handheld nighttime street photography a breeze.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Rhea Sen</p>
                  <p className="text-[10px] text-gray-400">Travel & Creative Filmmaker</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">Verified User</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SIDE-BY-SIDE TECH COMPARISON TABLE
          ========================================================================= */}
      <section className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>Specifications Matchup</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Compare The Ecosystem</h3>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-4 px-4 text-gray-400 font-medium">Feature</th>
                <th className="py-4 px-4 text-white font-bold text-center">4K Pocket Camera</th>
                <th className="py-4 px-4 text-[#F4C463] font-bold text-center">T1 Falcon Drone</th>
                <th className="py-4 px-4 text-white font-bold text-center">AquaGo Action Cam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              <tr>
                <td className="py-4 px-4 font-medium text-white">Resolution & FPS</td>
                <td className="py-4 px-4 text-center">4K @ 60 FPS HDR</td>
                <td className="py-4 px-4 text-center text-[#FFF1C5]">4K @ 60 FPS HDR</td>
                <td className="py-4 px-4 text-center">4K @ 60 FPS Ultra</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Stabilization</td>
                <td className="py-4 px-4 text-center">3-Axis Motor Gimbal</td>
                <td className="py-4 px-4 text-center text-[#FFF1C5]">Optical Flow + GPS</td>
                <td className="py-4 px-4 text-center">AI HorizonLock 360°</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Weather Resistance</td>
                <td className="py-4 px-4 text-center">Splash Resistant</td>
                <td className="py-4 px-4 text-center text-[#FFF1C5]">Wind Level 6 Safe</td>
                <td className="py-4 px-4 text-center">IPX8 Submersible</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Battery Run Time</td>
                <td className="py-4 px-4 text-center">140 Mins Continuous</td>
                <td className="py-4 px-4 text-center text-[#FFF1C5]">45 Mins Flight</td>
                <td className="py-4 px-4 text-center">160 Mins Continuous</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Price (Incl. Taxes)</td>
                <td className="py-4 px-4 text-center font-bold text-white">₹24,999</td>
                <td className="py-4 px-4 text-center font-extrabold text-[#F4C463]">₹38,999</td>
                <td className="py-4 px-4 text-center font-bold text-white">₹19,999</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-white">Quick Buy</td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onShopNow(PRODUCTS[0])}
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#EAA838] hover:text-black text-white text-xs font-semibold transition-all"
                  >
                    Select
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onShopNow(PRODUCTS[1])}
                    className="px-4 py-1.5 rounded-full bg-[#EAA838] text-black text-xs font-bold shadow-[0_0_10px_#EAA838] hover:scale-105 transition-all"
                  >
                    Select
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onShopNow(PRODUCTS[2])}
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#EAA838] hover:text-black text-white text-xs font-semibold transition-all"
                  >
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: LUXURY PRE-FOOTER CTA & NEWSLETTER
          ========================================================================= */}
      <section className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-r from-[#14100a] via-[#221a10] to-[#14100a] border border-[#EAA838]/40 shadow-[0_0_50px_rgba(234,168,56,0.15)] overflow-hidden text-center flex flex-col items-center">
        {/* Glow Aura */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,168,56,0.2),transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-2xl space-y-6"
        >
          <div className="w-14 h-14 rounded-full bg-[#EAA838] text-black flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(234,168,56,0.7)]">
            <Award className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to Capture <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
              Your World In 4K?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Order today and enjoy Complimentary Express Delivery across India, 2-Year Full Hardware Warranty, and 30-Day Money-Back Guarantee.
          </p>

          <div className="w-full flex items-center justify-center pt-2">
            <button
              onClick={() => onShopNow(PRODUCTS[0])}
              className="w-full sm:w-auto max-w-md px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_30px_rgba(234,168,56,0.6)] flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Shop Complete Ashren Range</span>
              <span className="shrink-0">➔</span>
            </button>
          </div>

          {/* VIP Newsletter Signup */}
          <div className="pt-8 border-t border-white/10 max-w-md mx-auto">
            <p className="text-xs text-[#F4C463] font-semibold uppercase tracking-wider mb-3">
              Join Ashren Creator Club — Get ₹1,500 Off First Order
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 py-2.5 px-4 rounded-full">
                ✓ Welcome! Your exclusive ₹1,500 coupon code has been sent to your email.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-white/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#EAA838]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-[#EAA838] hover:text-black text-white text-xs font-bold transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="pt-8 border-t border-white/10 text-xs text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-white tracking-widest text-sm">ASHREN</span>
          <span className="text-[11px] text-gray-500">| Haute Marketplace</span>
        </div>
        <p>© 2026 Ashren Technologies Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
          <a href="#" className="hover:text-white transition-colors">Warranty</a>
        </div>
      </footer>

    </div>
  );
}
