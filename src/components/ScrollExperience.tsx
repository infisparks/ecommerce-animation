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
      <section className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-xs font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(234,168,56,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
            <span>The Flagship Trio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered For Every <br />
            <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.4)]">
              Dimension of Storytelling
            </span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300 mt-3 sm:mt-4 leading-relaxed max-w-xl mx-auto">
            Explore our precision-crafted ecosystem designed for creators, adventurers, and filmmakers.
          </p>
        </motion.div>

        {/* Mobile Swipeable Snap Carousel / Desktop 3-Column Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          {PRODUCTS.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center group relative rounded-3xl p-5 sm:p-6 lg:p-7 bg-[#0d1017]/90 hover:bg-[#111520]/95 border border-white/10 hover:border-[#EAA838]/50 backdrop-blur-xl shadow-2xl transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#EAA838]/10 group-hover:bg-[#EAA838]/15 blur-3xl rounded-full transition-all -z-10 pointer-events-none" />

              <div>
                {/* Badge Category & Price */}
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#F4C463] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {prod.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Product Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight group-hover:text-[#FFF1C5] transition-colors line-clamp-1">
                  {prod.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 mb-3 line-clamp-2 leading-relaxed">
                  {prod.subtitle}
                </p>

                {/* Floating Product Image Container */}
                <div className="relative w-full h-44 sm:h-52 lg:h-60 my-2 flex items-center justify-center">
                  {/* Glowing Orbit Ring */}
                  <div className="absolute w-36 sm:w-44 h-36 sm:h-44 rounded-full border border-[#EAA838]/20 group-hover:border-[#EAA838]/50 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
                  
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 85vw, 33vw"
                      className="object-contain filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.85)]"
                    />
                  </motion.div>
                </div>

                {/* 3 Spec Badges */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10 my-3 text-center">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs font-bold text-white">{prod.badge1.value}</p>
                    <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-tight truncate mt-0.5">{prod.badge1.label}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs font-bold text-white">{prod.badge2.value}</p>
                    <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-tight truncate mt-0.5">{prod.badge2.label}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs font-bold text-white">{prod.badge3.value}</p>
                    <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-tight truncate mt-0.5">{prod.badge3.label}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  onClick={() => onShopNow(prod)}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(234,168,56,0.3)] flex items-center justify-center gap-1.5 transition-transform group-hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => onOpenVideo(`${prod.name} 4K Cinematic Showcase`, prod.category)}
                  aria-label="Play video demo"
                  className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-3">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-[#EAA838]" : "w-1.5 bg-white/20"}`} />
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

            {/* Quick Stat Counter Pods */}
            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-2xl sm:text-3xl font-black text-white">0.002s</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mt-1">Motor Latency</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-2xl sm:text-3xl font-black text-[#F4C463]">120 Mbps</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mt-1">Bitrate Clarity</p>
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
          
          {/* Card 1: Mountain Alpine Expedition */}
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
                alt="Travel Showcase"
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

          {/* Card 2: Scuba Diving 4K Vlog */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group flex flex-col justify-between"
          >
            {/* 3D Floating Cutout Image */}
            <div
              onClick={() => onOpenVideo("Underwater Coral Reef Scuba 4K Vlog", "VLOG & EXPLORATION")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/camera/card2.png"
                alt="Vlog Showcase"
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
                &ldquo;Waterproof straight out of the box. Colors under the Andaman reef popped without needing tedious post-production grading.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Rhea Sen</p>
                  <p className="text-[10px] text-gray-400">Travel & Dive Creator</p>
                </div>
                <span className="text-[10px] text-[#EAA838] font-bold uppercase tracking-wider">Verified User</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Aerial Night Drone Cinematic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group flex flex-col justify-between"
          >
            {/* 3D Floating Cutout Image */}
            <div
              onClick={() => onOpenVideo("Cityscape Night 4K Drone Aerial", "CREATIVE TIMELAPSE")}
              className="relative cursor-pointer transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_25px_45px_rgba(234,168,56,0.4)] mb-4"
            >
              <Image
                src="/card/drone/card1.png"
                alt="Drone Showcase"
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

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onShopNow(PRODUCTS[0])}
              className="px-8 py-4 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(234,168,56,0.6)] flex items-center gap-2 transition-transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Complete Ashren Range</span>
              <span>➔</span>
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
