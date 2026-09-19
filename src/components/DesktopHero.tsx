"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShoppingBag,
  Play,
  RotateCw,
  Feather,
  BatteryCharging,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PRODUCTS, ProductItem } from "@/data/products";

interface DesktopHeroProps {
  onShopNow: (product: ProductItem) => void;
  onOpenVideo: (title?: string, category?: string) => void;
  isLoaded?: boolean;
}

export default function DesktopHero({
  onShopNow,
  onOpenVideo,
  isLoaded = true,
}: DesktopHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const product = PRODUCTS[currentIndex];

  // Auto-Slide Timer (every 6 seconds)
  useEffect(() => {
    if (!isLoaded || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isLoaded, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  // Direct GPU Motion Values (0 React re-renders on mousemove)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 22 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsPaused(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between px-6 lg:px-12 pb-6 pt-2 select-none overflow-hidden font-outfit"
    >
      {/* Top Right Tagline */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex justify-end items-center max-w-[1540px] mx-auto z-10 pt-1"
      >
        <div className="text-right">
          <p className="text-[11px] sm:text-xs tracking-[0.25em] text-gray-200 font-bold uppercase">
            Premium Gadgets
          </p>
          <p className="text-[11px] sm:text-xs tracking-[0.25em] text-gray-400 font-normal uppercase">
            For A Bolder Tomorrow
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={isLoaded ? { width: 32 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-[2px] bg-[#EAA838] ml-auto mt-1 rounded-full shadow-[0_0_8px_#EAA838]"
          />
        </div>
      </motion.div>

      {/* Main Hero Container */}
      <div className="relative max-w-[1540px] w-full mx-auto grid grid-cols-12 items-center my-auto py-4 z-10 gap-4">
        
        {/* ================= LEFT COLUMN: HERO TEXT & CTAs ================= */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center z-20">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs tracking-[0.35em] text-gray-300 font-semibold uppercase">
                  {product.eyebrow}
                </span>
              </div>

              {/* Main Title */}
              <div className="space-y-1 mb-4">
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-none">
                  {product.headline}
                </h1>
                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-serif-luxury italic font-normal text-gold-shimmer leading-tight drop-shadow-[0_4px_25px_rgba(244,196,99,0.4)]">
                  {product.headlineHighlight}
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-sm xl:text-base text-gray-300 max-w-md font-normal leading-relaxed mb-6">
                {product.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {/* Primary Shop Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onShopNow(product)}
              className="relative group px-7 py-3.5 rounded-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold text-sm tracking-wide flex items-center gap-2.5 shadow-[0_0_30px_rgba(234,168,56,0.5)] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>Shop Now (₹{product.price.toLocaleString("en-IN")})</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
            </motion.button>

            {/* Watch Video Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenVideo(`${product.name} Cinematic 4K Showcase`, product.category)}
              className="px-6 py-3.5 rounded-full bg-black/40 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-medium text-sm flex items-center gap-2.5 backdrop-blur-md transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#EAA838] group-hover:text-black transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>Watch Video</span>
            </motion.button>
          </motion.div>

          {/* 4 Feature Badges Grid (Synchronized with product) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-badges"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 sm:gap-6 py-3 border-y border-white/10 max-w-lg mb-6"
            >
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">{product.badge1.value}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge1.label}
                </span>
              </div>
              <div className="w-[1px] h-7 bg-white/15" />

              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">{product.badge2.value}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge2.label}
                </span>
              </div>
              <div className="w-[1px] h-7 bg-white/15" />

              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">{product.badge3.value}</span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge3.label}
                </span>
              </div>
              <div className="w-[1px] h-7 bg-white/15" />

              <div className="flex flex-col items-start">
                {product.badge4.iconType === "battery" ? (
                  <BatteryCharging className="w-5 h-5 text-[#EAA838] mb-0.5" />
                ) : (
                  <Feather className="w-5 h-5 text-[#EAA838] mb-0.5" />
                )}
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
                  {product.badge4.label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            {/* Creator Avatars */}
            <div className="flex -space-x-2">
              <div className="relative w-8 h-8 rounded-full ring-2 ring-[#0d0f15] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Creator"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full ring-2 ring-[#0d0f15] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Creator"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full ring-2 ring-[#0d0f15] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Creator"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text & Stars */}
            <div className="flex flex-col text-xs">
              <span className="text-gray-300 font-medium">Trusted by 50,000+ Creators</span>
              <div className="flex items-center gap-1.5 text-[#F4C463]">
                <div className="flex text-xs">
                  {"★★★★★".split("").map((_, i) => (
                    <span key={i} className="text-[#F4C463]">★</span>
                  ))}
                </div>
                <span className="text-gray-300 font-semibold text-[11px]">4.8/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= CENTER / RIGHT VISUAL HERO: PRODUCT & CARDS ================= */}
        <div className="col-span-12 lg:col-span-7 relative h-[480px] xl:h-[540px] flex items-center justify-center">
          
          {/* Animated Glowing Orbital Rings */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute w-[440px] h-[440px] xl:w-[500px] xl:h-[500px] rounded-full border border-[#EAA838]/25 animate-orbit-spin pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFF] shadow-[0_0_15px_#FFF,0_0_25px_#EAA838]" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute w-[360px] h-[360px] xl:w-[420px] xl:h-[420px] rounded-full border border-[#EAA838]/35 animate-orbit-spin-reverse pointer-events-none"
          >
            <div className="absolute bottom-4 right-10 w-2.5 h-2.5 rounded-full bg-[#FFF1C5] shadow-[0_0_12px_#FFF1C5]" />
          </motion.div>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous Product"
            className="absolute left-2 xl:-left-2 z-40 p-2.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-[#EAA838] hover:bg-[#EAA838]/20 transition-all backdrop-blur-md shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Product"
            className="absolute right-2 xl:right-0 z-40 p-2.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-white hover:border-[#EAA838] hover:bg-[#EAA838]/20 transition-all backdrop-blur-md shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Central Sliding Product with Direct GPU Gyro Parallax */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ scale: 0.8, opacity: 0, x: 40 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: -40 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1000,
              }}
              className="relative z-20 w-[270px] sm:w-[310px] xl:w-[360px] h-[400px] sm:h-[440px] xl:h-[500px] shrink-0 will-change-transform flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
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
                  sizes="(max-width: 768px) 270px, (max-width: 1200px) 310px, 360px"
                  className="object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)] filter brightness-105"
                />
              </motion.div>

              {/* Glowing Golden Light Swirl Aura at Base */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#EAA838]/20 blur-2xl rounded-full -z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Top Script Text (Synchronized with product) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id + "-script"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute top-2 xl:top-6 right-24 xl:right-32 z-30 pointer-events-none"
            >
              <p className="font-script text-3xl xl:text-4xl text-gold-shimmer drop-shadow-[0_2px_12px_rgba(234,168,56,0.6)] transform -rotate-6">
                {product.scriptTop} <br />
                <span className="ml-4">{product.scriptSub}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 180° / 360° Indicator Badge next to product head */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-24 xl:top-28 right-1/4 translate-x-8 z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#EAA838]/50 backdrop-blur-md shadow-[0_0_15px_rgba(234,168,56,0.35)] cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#EAA838]" />
              <span className="text-[10px] font-bold text-white tracking-wider uppercase">
                {product.id === "ashren-t1-drone"
                  ? "360° FPV"
                  : product.id === "ashren-aquago-4k"
                  ? "IPX8 WATERPROOF"
                  : "180° ROTATION"}
              </span>
            </motion.div>
          </motion.div>

          {/* ================= CURVED ARC CARDS ================= */}
          
          {/* LEFT CARD: TRAVEL (card1.png) */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            animate={isLoaded ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -60, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.4, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            onClick={() => onOpenVideo("Mountain Alpine 4K Expedition", "TRAVEL ADVENTURE")}
            className="absolute left-0 xl:left-4 top-1/3 -translate-y-8 z-10 w-44 sm:w-52 xl:w-60 cursor-pointer group will-change-transform"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/20 group-hover:border-[#EAA838] transition-all shadow-2xl group-hover:shadow-[0_0_30px_rgba(234,168,56,0.5)]">
              <Image
                src="/card/card1.png"
                alt="Travel Card"
                width={260}
                height={160}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#EAA838] text-black flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT TOP CARD: VLOG (card2.png) */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 4 }}
            animate={isLoaded ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 60, rotate: 4 }}
            transition={{ duration: 0.9, delay: 0.5, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            onClick={() => onOpenVideo("Underwater Coral Reef Scuba 4K Vlog", "VLOG & EXPLORATION")}
            className="absolute right-0 xl:right-4 top-10 xl:top-14 z-10 w-44 sm:w-52 xl:w-60 cursor-pointer group will-change-transform"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/20 group-hover:border-[#EAA838] transition-all shadow-2xl group-hover:shadow-[0_0_30px_rgba(234,168,56,0.5)]">
              <Image
                src="/card/card2.png"
                alt="Vlog Card"
                width={260}
                height={160}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#EAA838] text-black flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT BOTTOM CARD: CREATE (card3.png) */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 30 }}
            animate={isLoaded ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 60, y: 30 }}
            transition={{ duration: 0.9, delay: 0.6, type: "spring", damping: 20 }}
            whileHover={{ scale: 1.08, zIndex: 40 }}
            onClick={() => onOpenVideo("Futuristic Cityscape Aerial Night 4K", "CREATIVE TIMELAPSE")}
            className="absolute right-4 xl:right-12 bottom-12 xl:bottom-14 z-10 w-44 sm:w-52 xl:w-56 cursor-pointer group will-change-transform"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/20 group-hover:border-[#EAA838] transition-all shadow-2xl group-hover:shadow-[0_0_30px_rgba(234,168,56,0.5)]">
              <Image
                src="/card/card3.png"
                alt="Create Card"
                width={260}
                height={160}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#EAA838] text-black flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Badge: "Adventure in 4K" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute bottom-6 right-1/4 translate-x-12 z-20 flex flex-col items-center"
          >
            <span className="font-script text-2xl xl:text-3xl text-gold-shimmer transform -rotate-12 mb-1 drop-shadow-[0_2px_10px_rgba(234,168,56,0.5)]">
              Adventure in 4K
            </span>
            <div className="w-16 h-16 rounded-full border-2 border-[#EAA838] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-1 shadow-[0_0_20px_rgba(234,168,56,0.5)]">
              <span className="text-xs font-black text-white">4K</span>
              <span className="text-[7px] text-[#F4C463] font-bold text-center tracking-tighter">
                ULTRA HD CLARITY
              </span>
            </div>
          </motion.div>

          {/* Far Right Tagline: "Explore Without Limits" */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-4 right-0 z-20 text-right hidden xl:block"
          >
            <p className="font-script text-4xl text-gold-shimmer transform -rotate-12 mb-2 drop-shadow-[0_2px_12px_rgba(234,168,56,0.6)]">
              Explore Without Limits
            </p>
            <p className="text-[10px] tracking-[0.2em] text-gray-200 font-bold uppercase">
              Compact. Powerful. Everywhere.
            </p>
            <div className="w-6 h-[2px] bg-[#EAA838] ml-auto mt-1" />
          </motion.div>

        </div>
      </div>

      {/* ================= BOTTOM BAR: VALUE PROPS & CAROUSEL DOTS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative max-w-[1540px] w-full mx-auto z-10 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Left: Life Looks Better In 4K */}
        <div className="flex items-center gap-2 text-xs">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 font-bold uppercase">
              Life Looks Better In
            </p>
            <p className="text-sm font-extrabold text-[#F4C463]">4K</p>
          </div>
          <div className="w-6 h-[1.5px] bg-[#EAA838]" />
        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:gap-8 text-xs text-gray-300">
          
          {/* Free Shipping */}
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Free Shipping</p>
              <p className="text-[11px] text-gray-400">Across India</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Secure Payment</p>
              <p className="text-[11px] text-gray-400">100% Safe</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Easy Returns</p>
              <p className="text-[11px] text-gray-400">Hassle Free</p>
            </div>
          </div>

          {/* Dedicated Support */}
          <div className="flex items-center gap-2.5">
            <Headphones className="w-4 h-4 text-[#EAA838] shrink-0" />
            <div>
              <p className="font-semibold text-white">Dedicated Support</p>
              <p className="text-[11px] text-gray-400">We&apos;re Here to Help</p>
            </div>
          </div>
        </div>

        {/* Center/Right: Product Slide Switcher Dots */}
        <div className="flex items-center gap-2.5">
          {PRODUCTS.map((prod, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#EAA838] text-black shadow-[0_0_12px_#EAA838]"
                    : "bg-white/10 text-gray-400 hover:text-white"
                }`}
              >
                <span>{prod.headline}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
