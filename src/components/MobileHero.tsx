"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  RotateCw,
  Video,
  Touchpad,
  Feather,
  BatteryCharging,
  ChevronDown,
  Diamond,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import { PRODUCTS, ProductItem } from "@/data/products";

interface MobileHeroProps {
  onShopNow: (product: ProductItem) => void;
  onOpenVideo: (title?: string, category?: string) => void;
  isLoaded?: boolean;
}

export default function MobileHero({
  onShopNow,
  onOpenVideo,
  isLoaded = true,
}: MobileHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = PRODUCTS[currentIndex];

  // Auto-Slide Timer (every 3 seconds on mobile)
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <div className="relative w-full flex flex-col px-3 sm:px-5 pt-0 pb-8 select-none overflow-hidden font-sans">
      
      {/* ================= TOP HEADER SCRIPT TEXT & TAGLINE ================= */}
      <div className="w-full flex items-start justify-between z-10 pt-0 pb-1">
        {/* Left Script */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -10 }}
          animate={isLoaded ? { opacity: 1, x: 0, rotate: -4 } : { opacity: 0, x: -30, rotate: -10 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="font-serif-luxury italic text-2xl sm:text-3xl text-gold-shimmer leading-tight drop-shadow-[0_2px_10px_rgba(234,168,56,0.5)] font-normal tracking-wide">
            Capture <br />
            More <br />
            Live Bolder
          </p>
        </motion.div>

        {/* Right Tagline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-right"
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-200 font-semibold uppercase">
            Compact
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-200 font-semibold uppercase">
            Powerful
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-400 font-normal uppercase">
            Everywhere
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={isLoaded ? { width: 28 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[2px] bg-[#EAA838] ml-auto mt-1 rounded-full shadow-[0_0_8px_#EAA838]"
          />
          
          <AnimatePresence mode="wait">
            <motion.p
              key={product.id + "-mobile-script"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="font-serif-luxury italic text-lg sm:text-xl text-gold-shimmer transform -rotate-4 mt-2 leading-tight drop-shadow-[0_2px_8px_rgba(234,168,56,0.4)] font-normal tracking-wide"
            >
              {product.scriptTop} <br />
              {product.scriptSub}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ================= CENTER HERO: 3-COLUMN BALANCED LAYOUT ================= */}
      <div className="relative w-full flex items-center justify-between my-1 z-10 min-h-[380px] sm:min-h-[420px]">
        
        {/* 1. LEFT COLUMN: 5 SPECS BADGES */}
        <div className="w-[88px] sm:w-[100px] flex flex-col gap-3 z-20 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-mobile-specs"}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              {product.mobileSpecs.map((badge, idx) => (
                <div key={badge.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/25 bg-black/60 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] shrink-0">
                    {badge.icon === "4k" ? (
                      "4K"
                    ) : badge.icon === "video" ? (
                      <Video className="w-3.5 h-3.5 text-gray-200" />
                    ) : badge.icon === "rotation" ? (
                      <RotateCw className="w-3.5 h-3.5 text-gray-200" />
                    ) : badge.icon === "touch" ? (
                      <Touchpad className="w-3.5 h-3.5 text-gray-200" />
                    ) : product.id === "ashren-t1-drone" ? (
                      <BatteryCharging className="w-3.5 h-3.5 text-[#EAA838]" />
                    ) : (
                      <Feather className="w-3.5 h-3.5 text-[#EAA838]" />
                    )}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">{badge.title}</span>
                    <span className="text-[7.5px] sm:text-[8px] text-gray-300 uppercase tracking-wider font-normal">
                      {badge.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. CENTER COLUMN: CAMERA/DRONE & 3D SHINY ORBIT RINGS */}
        <div className="flex-1 relative h-[360px] sm:h-[400px] flex items-center justify-center px-1 z-10">
          
          {/* Ambient Gold Halo */}
          <div className="absolute w-44 h-44 rounded-full bg-[#EAA838]/20 blur-xl -z-10 animate-pulse-glow" />

          {/* 3D Shining Golden Swirl Ring 1 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform: "perspective(800px) rotateX(68deg) rotateY(-14deg) rotateZ(18deg) translateZ(0)",
            }}
            className="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full border-[2px] border-transparent border-t-[#FFF1C5] border-r-[#EAA838] border-b-[#EAA838]/40 shadow-[0_0_15px_rgba(234,168,56,0.7)] animate-orbit-spin -z-10 will-change-transform"
          >
            <div className="absolute top-1 right-8 w-3 h-3 rounded-full bg-[#FFF] shadow-[0_0_12px_#FFF,0_0_20px_#EAA838]" />
            <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-[#EAA838] shadow-[0_0_10px_#EAA838]" />
          </motion.div>

          {/* 3D Shining Golden Swirl Ring 2 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              transform: "perspective(800px) rotateX(60deg) rotateY(20deg) rotateZ(-30deg) translateZ(0)",
            }}
            className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full border border-dashed border-[#F4C463]/70 shadow-[0_0_12px_rgba(244,196,99,0.35)] animate-orbit-spin-reverse -z-10 will-change-transform"
          >
            <div className="absolute top-6 left-3 w-2.5 h-2.5 rounded-full bg-[#FFF1C5] shadow-[0_0_10px_#FFF1C5]" />
          </motion.div>

          {/* Central Auto-Sliding Product Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ scale: 0.75, opacity: 0, x: 25 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.75, opacity: 0, x: -25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-[160px] sm:max-w-[190px] z-20 will-change-transform flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 180px, 220px"
                  className="object-contain filter drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)] brightness-105"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. RIGHT COLUMN: 3 SHOWCASE CARDS & ROTATION/FPV BADGE (Synchronized Motion) */}
        <div className="w-[96px] sm:w-[114px] flex flex-col gap-2.5 items-end z-20 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-mobile-cards"}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-2.5 items-end"
            >
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenVideo(`${product.name} Adventure Showcase`, product.category)}
                className="w-full cursor-pointer relative filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={product.cards[0]}
                  alt="Showcase 1"
                  width={160}
                  height={90}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenVideo(`${product.name} 4K Experience`, "VLOG & EXPLORATION")}
                className="w-full cursor-pointer relative filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={product.cards[1]}
                  alt="Showcase 2"
                  width={160}
                  height={90}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => onOpenVideo(`${product.name} Master Timelapse`, "CREATIVE TIMELAPSE")}
                className="w-full cursor-pointer relative filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src={product.cards[2]}
                  alt="Showcase 3"
                  width={160}
                  height={90}
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* 180° / 360° Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="px-2 py-1 rounded-full bg-black/80 border border-[#EAA838]/50 backdrop-blur-md flex items-center gap-1 shadow-[0_0_10px_rgba(234,168,56,0.3)]"
              >
                <RotateCw className="w-3 h-3 text-[#EAA838] animate-spin-slow" />
                <div className="text-[8px] font-bold text-white flex flex-col leading-tight">
                  <span>
                    {product.id === "ashren-t1-drone"
                      ? "360°"
                      : product.id === "ashren-aquago-4k"
                      ? "IPX8"
                      : "180°"}
                  </span>
                  <span className="text-[6.5px] text-gray-300 font-semibold uppercase">
                    {product.id === "ashren-t1-drone"
                      ? "FPV"
                      : product.id === "ashren-aquago-4k"
                      ? "WATERPROOF"
                      : "ROTATION"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ================= CTA BUTTON & PAGINATION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: isLoaded ? 0.5 : 0 }}
        className="w-full flex flex-col items-center gap-2.5 z-20 my-2"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onShopNow(product)}
          className="w-full max-w-[320px] py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(234,168,56,0.45)] flex items-center justify-center gap-2 transition-transform"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span>Shop {product.headline} (₹{product.price.toLocaleString("en-IN")})</span>
          <span className="text-base">➔</span>
        </motion.button>

        {/* Carousel Pagination Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3.5 py-1 text-xs font-medium tracking-wide transition-all rounded-full ${
                currentIndex === idx
                  ? "bg-[#EAA838] text-black shadow-[0_0_8px_#EAA838]"
                  : "bg-white/15 text-gray-300 hover:bg-white/25"
              }`}
            >
              {prod.headline}
            </button>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-0.5 text-[9px] text-gray-300 uppercase tracking-[0.25em] font-medium pt-1">
          <span>Scroll Down</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#EAA838] animate-bounce" />
        </div>
      </motion.div>

      {/* ================= GOLDEN CURVED ARCH SEPARATOR ================= */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isLoaded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: isLoaded ? 0.6 : 0 }}
        className="relative w-full my-4 flex justify-center items-center"
      >
        <svg
          viewBox="0 0 400 30"
          className="w-full max-w-md h-auto text-[#EAA838]"
          overflow="visible"
        >
          <path
            d="M 0,25 Q 200,-5 400,25"
            fill="none"
            stroke="url(#goldLineGrad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#EAA838" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ================= LOWER STORY & SPECS SECTION (Mobile) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="w-full text-center flex flex-col items-center z-10 space-y-2.5"
      >
        
        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.3em] text-gray-300 font-medium uppercase">
          Capture • Create • Explore
        </p>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + "-lower-title"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-0.5"
          >
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {product.headline}
            </h2>
            <h3 className="text-3xl font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_2px_20px_rgba(244,196,99,0.5)]">
              {product.headlineHighlight}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Subtext */}
        <p className="text-xs text-gray-300 max-w-xs font-normal leading-relaxed px-2">
          {product.subtitle}
        </p>

        {/* 4 Feature Badges in 2x2 Grid */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 max-w-sm">
          
          {/* Premium Gadgets */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Diamond className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">Premium Gadgets</p>
            <p className="text-[9px] text-gray-400">Curated for You</p>
          </motion.div>

          {/* 100% Secure Payment */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">100% Secure Payment</p>
            <p className="text-[9px] text-gray-400">Shop with Confidence</p>
          </motion.div>

          {/* Free Shipping Across India */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Truck className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">Free Shipping Across India</p>
            <p className="text-[9px] text-gray-400">Fast & Reliable</p>
          </motion.div>

          {/* Dedicated Support */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Headphones className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-semibold text-white">Dedicated Support</p>
            <p className="text-[9px] text-gray-400">We&apos;re Here to Help</p>
          </motion.div>

        </div>

      </motion.div>

    </div>
  );
}
