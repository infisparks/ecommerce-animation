"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  RotateCw,
  Video,
  Touchpad,
  Feather,
  ChevronDown,
  Diamond,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

interface MobileHeroProps {
  onShopNow: () => void;
  onOpenVideo: (title?: string, category?: string) => void;
}

export default function MobileHero({ onShopNow, onOpenVideo }: MobileHeroProps) {
  const [activeDot, setActiveDot] = useState(0);

  const leftBadges = [
    {
      id: "4k",
      icon: (
        <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] shrink-0">
          4K
        </div>
      ),
      title: "4K",
      subtitle: "Ultra HD",
    },
    {
      id: "video",
      icon: (
        <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] shrink-0">
          <Video className="w-3.5 h-3.5 text-gray-200" />
        </div>
      ),
      title: "HIGH",
      subtitle: "Frame Rate",
    },
    {
      id: "rotation",
      icon: (
        <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] shrink-0">
          <RotateCw className="w-3.5 h-3.5 text-gray-200" />
        </div>
      ),
      title: "180°",
      subtitle: "Rotation",
    },
    {
      id: "touch",
      icon: (
        <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] shrink-0">
          <Touchpad className="w-3.5 h-3.5 text-gray-200" />
        </div>
      ),
      title: "TOUCH",
      subtitle: "Screen",
    },
    {
      id: "feather",
      icon: (
        <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_12px_rgba(234,168,56,0.3)] shrink-0">
          <Feather className="w-3.5 h-3.5 text-[#EAA838]" />
        </div>
      ),
      title: "LIGHTWEIGHT",
      subtitle: "& Portable",
    },
  ];

  return (
    <div className="relative w-full flex flex-col px-3 sm:px-5 pt-0 pb-8 select-none overflow-hidden font-outfit">
      
      {/* ================= TOP HEADER SCRIPT TEXT & TAGLINE ================= */}
      <div className="w-full flex items-start justify-between z-10 pt-0 pb-1">
        {/* Left Script: "Capture More Live Bolder" */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="font-script text-2xl sm:text-3xl text-gold-shimmer leading-tight drop-shadow-[0_2px_10px_rgba(234,168,56,0.6)]">
            Capture <br />
            More <br />
            Live Bolder
          </p>
        </motion.div>

        {/* Right Tagline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-right"
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-100 font-extrabold uppercase">
            Compact
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-100 font-extrabold uppercase">
            Powerful
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-300 font-semibold uppercase">
            Everywhere
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 28 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-[2px] bg-[#EAA838] ml-auto mt-0.5 rounded-full shadow-[0_0_8px_#EAA838]"
          />
          
          <p className="font-script text-lg sm:text-xl text-gold-shimmer transform -rotate-6 mt-2 leading-tight drop-shadow-[0_2px_8px_rgba(234,168,56,0.5)]">
            Small Camera <br />
            Big Possibilities
          </p>
        </motion.div>
      </div>

      {/* ================= CENTER HERO: 3-COLUMN BALANCED LAYOUT (NO OVERLAP) ================= */}
      <div className="relative w-full flex items-center justify-between my-1 z-10 min-h-[380px] sm:min-h-[420px]">
        
        {/* 1. LEFT COLUMN: 5 SPECS BADGES (Cascading entrance animation) */}
        <div className="w-[82px] sm:w-[94px] flex flex-col gap-3 z-20 shrink-0">
          {leftBadges.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.08 }}
              className="flex items-center gap-2"
            >
              {badge.icon}
              <div className="flex flex-col leading-none">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white">{badge.title}</span>
                <span className="text-[7.5px] sm:text-[8px] text-gray-300 uppercase tracking-tight font-medium">
                  {badge.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. CENTER COLUMN: CAMERA & 3D SHINY ORBIT RINGS */}
        <div className="flex-1 relative h-[360px] sm:h-[400px] flex items-center justify-center px-1 z-10">
          
          {/* Ambient Gold Halo */}
          <div className="absolute w-44 h-44 rounded-full bg-[#EAA838]/25 blur-2xl -z-10 animate-pulse-glow" />

          {/* 3D Shining Golden Swirl Ring 1 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform: "perspective(800px) rotateX(68deg) rotateY(-14deg) rotateZ(18deg)",
            }}
            className="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full border-[2px] border-transparent border-t-[#FFF1C5] border-r-[#EAA838] border-b-[#EAA838]/40 shadow-[0_0_20px_rgba(234,168,56,0.8)] animate-orbit-spin -z-10"
          >
            <div className="absolute top-1 right-8 w-3 h-3 rounded-full bg-[#FFF] shadow-[0_0_15px_#FFF,0_0_25px_#EAA838]" />
            <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-[#EAA838] shadow-[0_0_10px_#EAA838]" />
          </motion.div>

          {/* 3D Shining Golden Swirl Ring 2 */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              transform: "perspective(800px) rotateX(60deg) rotateY(20deg) rotateZ(-30deg)",
            }}
            className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full border border-dashed border-[#F4C463]/70 shadow-[0_0_15px_rgba(244,196,99,0.4)] animate-orbit-spin-reverse -z-10"
          >
            <div className="absolute top-6 left-3 w-2.5 h-2.5 rounded-full bg-[#FFF1C5] shadow-[0_0_10px_#FFF1C5]" />
          </motion.div>

          {/* 3D Front Ring Arc crossing in front of camera */}
          <div
            style={{
              transform: "perspective(800px) rotateX(68deg) rotateY(-14deg) rotateZ(18deg)",
            }}
            className="absolute w-[200px] sm:w-[240px] h-[200px] sm:h-[240px] rounded-full pointer-events-none z-30"
          >
            <div className="w-full h-full rounded-full border-b-[2px] border-r-[2px] border-transparent border-b-[#FFF1C5] border-r-[#EAA838] shadow-[0_2px_15px_rgba(234,168,56,0.9)] opacity-90" />
          </div>

          {/* Central Camera Floating Image with Entrance Animation */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: "spring", damping: 18 }}
            className="relative w-full h-full max-w-[155px] sm:max-w-[185px] z-20"
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
                src="/camera/camera.png"
                alt="Ashren 4K Camera"
                fill
                priority
                sizes="(max-width: 640px) 180px, 220px"
                className="object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] brightness-105"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 3. RIGHT COLUMN: 3 SHOWCASE CARDS & 180° BADGE (Staggered spring entrance) */}
        <div className="w-[88px] sm:w-[104px] flex flex-col gap-2.5 items-end z-20 shrink-0">
          
          {/* Travel Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35, type: "spring", damping: 18 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onOpenVideo("Mountain Hiking in High Alpine 4K", "TRAVEL ADVENTURE")}
            className="w-full rounded-lg overflow-hidden border border-white/25 shadow-lg cursor-pointer relative"
          >
            <Image
              src="/card/card1.png"
              alt="Travel"
              width={140}
              height={80}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Vlog Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45, type: "spring", damping: 18 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onOpenVideo("Underwater Coral Reef Scuba 4K Vlog", "VLOG & EXPLORATION")}
            className="w-full rounded-lg overflow-hidden border border-white/25 shadow-lg cursor-pointer relative"
          >
            <Image
              src="/card/card2.png"
              alt="Vlog"
              width={140}
              height={80}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Create Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55, type: "spring", damping: 18 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onOpenVideo("Futuristic Cityscape Night Time Lapse 4K", "CREATIVE TIMELAPSE")}
            className="w-full rounded-lg overflow-hidden border border-white/25 shadow-lg cursor-pointer relative"
          >
            <Image
              src="/card/card3.png"
              alt="Create"
              width={140}
              height={80}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* 180° Rotation Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="px-2 py-1 rounded-full bg-black/80 border border-[#EAA838]/50 backdrop-blur-md flex items-center gap-1 shadow-[0_0_10px_rgba(234,168,56,0.3)]"
          >
            <RotateCw className="w-3 h-3 text-[#EAA838]" />
            <div className="text-[8px] font-bold text-white flex flex-col leading-tight">
              <span>180°</span>
              <span className="text-[6.5px] text-gray-300 font-semibold">ROTATION</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* ================= CTA BUTTON & PAGINATION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full flex flex-col items-center gap-2.5 z-20 my-2"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShopNow}
          className="w-full max-w-[320px] py-3.5 rounded-full bg-gold-gradient text-black font-extrabold text-sm shadow-[0_0_30px_rgba(234,168,56,0.55)] flex items-center justify-center gap-2 transition-transform"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span>Shop Now</span>
          <span className="text-base">➔</span>
        </motion.button>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className={`h-1.5 transition-all rounded-full ${
                activeDot === dot ? "w-6 bg-[#EAA838] shadow-[0_0_8px_#EAA838]" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-0.5 text-[9px] text-gray-300 uppercase tracking-widest pt-1">
          <span>Scroll Down</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#EAA838] animate-bounce" />
        </div>
      </motion.div>

      {/* ================= GOLDEN CURVED ARCH SEPARATOR ================= */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative w-full my-4 flex justify-center items-center"
      >
        <svg
          viewBox="0 0 400 30"
          className="w-full max-w-md h-auto text-[#EAA838] overflow-visible"
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
        <p className="text-[10px] tracking-[0.3em] text-gray-200 font-semibold uppercase">
          Capture • Create • Explore
        </p>

        {/* Title */}
        <div className="space-y-0.5">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Your Story
          </h2>
          <h3 className="text-3xl font-serif-luxury italic text-gold-shimmer drop-shadow-[0_2px_20px_rgba(244,196,99,0.5)]">
            Anywhere
          </h3>
        </div>

        {/* Subtext */}
        <p className="text-xs text-gray-300 max-w-xs font-normal leading-relaxed px-2">
          Ashren brings you premium gadgets for creators, travelers and everyday adventurers.
        </p>

        {/* 4 Feature Badges in 2x2 Grid */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 max-w-sm">
          
          {/* Premium Gadgets */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Diamond className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-bold text-white">Premium Gadgets</p>
            <p className="text-[9px] text-gray-300">Curated for You</p>
          </motion.div>

          {/* 100% Secure Payment */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-bold text-white">100% Secure Payment</p>
            <p className="text-[9px] text-gray-300">Shop with Confidence</p>
          </motion.div>

          {/* Free Shipping Across India */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Truck className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-bold text-white">Free Shipping Across India</p>
            <p className="text-[9px] text-gray-300">Fast & Reliable</p>
          </motion.div>

          {/* Dedicated Support */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="p-3 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg"
          >
            <Headphones className="w-4 h-4 text-[#EAA838] mb-1" />
            <p className="text-xs font-bold text-white">Dedicated Support</p>
            <p className="text-[9px] text-gray-300">We&apos;re Here to Help</p>
          </motion.div>

        </div>

      </motion.div>

    </div>
  );
}
