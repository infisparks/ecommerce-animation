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
  Play,
} from "lucide-react";

interface MobileHeroProps {
  onShopNow: () => void;
  onOpenVideo: (title?: string, category?: string) => void;
}

export default function MobileHero({ onShopNow, onOpenVideo }: MobileHeroProps) {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <div className="relative w-full flex flex-col px-3 sm:px-6 pt-1 pb-10 select-none overflow-hidden">
      
      {/* Top Header Script Text & Tagline */}
      <div className="w-full flex items-start justify-between z-10 pt-1 pb-2">
        {/* Left Script: "Capture More Live Bolder" */}
        <div className="flex flex-col">
          <p className="font-script text-2xl sm:text-3xl text-gold-shimmer transform -rotate-6 leading-tight drop-shadow-[0_2px_12px_rgba(234,168,56,0.5)]">
            Capture <br />
            More <br />
            Live Bolder
          </p>
        </div>

        {/* Right Tagline */}
        <div className="text-right">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-200 font-bold uppercase">
            Compact
          </p>
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-200 font-bold uppercase">
            Powerful
          </p>
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-300 font-medium uppercase">
            Everywhere
          </p>
          <div className="w-8 h-[2px] bg-[#EAA838] ml-auto mt-1 rounded-full shadow-[0_0_8px_#EAA838]" />
          
          <p className="font-script text-lg sm:text-xl text-gold-shimmer transform -rotate-6 mt-3 leading-tight drop-shadow-[0_2px_10px_rgba(234,168,56,0.4)]">
            Small Camera <br />
            Big Possibilities
          </p>
        </div>
      </div>

      {/* ================= CENTER HERO SECTION (Camera + 3D Shiny Rings + Left Specs + Right Cards) ================= */}
      <div className="relative w-full flex items-center justify-between my-3 z-10 min-h-[460px] sm:min-h-[500px]">
        
        {/* LEFT COLUMN: 5 VERTICAL SPECS BADGES */}
        <div className="flex flex-col gap-3.5 z-20 shrink-0">
          
          {/* 4K ULTRA HD */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-xs font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              4K
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-extrabold text-white tracking-tight">4K</span>
              <span className="text-[8px] text-gray-300 uppercase tracking-tighter font-semibold">Ultra HD</span>
            </div>
          </div>

          {/* HIGH FRAME RATE */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <Video className="w-4 h-4 text-gray-100" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-white tracking-tight">HIGH</span>
              <span className="text-[8px] text-gray-300 uppercase tracking-tighter font-semibold">Frame Rate</span>
            </div>
          </div>

          {/* 180° ROTATION */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <RotateCw className="w-4 h-4 text-gray-100" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-white tracking-tight">180°</span>
              <span className="text-[8px] text-gray-300 uppercase tracking-tighter font-semibold">Rotation</span>
            </div>
          </div>

          {/* TOUCH SCREEN */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <Touchpad className="w-4 h-4 text-gray-100" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-white tracking-tight">TOUCH</span>
              <span className="text-[8px] text-gray-300 uppercase tracking-tighter font-semibold">Screen</span>
            </div>
          </div>

          {/* LIGHTWEIGHT & PORTABLE */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_15px_rgba(234,168,56,0.3)]">
              <Feather className="w-4 h-4 text-[#EAA838]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-bold text-white tracking-tight">LIGHTWEIGHT</span>
              <span className="text-[8px] text-gray-300 uppercase tracking-tighter font-semibold">& Portable</span>
            </div>
          </div>

        </div>

        {/* ================= CENTER: 3D SHINY ORBIT RINGS & CAMERA ================= */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-64 sm:w-72 h-[440px] sm:h-[480px] flex items-center justify-center pointer-events-none">
          
          {/* Ambient Glow */}
          <div className="absolute w-60 h-60 rounded-full bg-[#EAA838]/30 blur-3xl -z-10 animate-pulse-glow" />

          {/* 3D Shining Golden Swirl Ring 1 (Tilted & Orbiting in 3D around the camera body) */}
          <div
            style={{
              transform: "perspective(800px) rotateX(68deg) rotateY(-16deg) rotateZ(20deg)",
            }}
            className="absolute w-[290px] sm:w-[330px] h-[290px] sm:h-[330px] rounded-full border-[2.5px] border-transparent border-t-[#FFF1C5] border-r-[#EAA838] border-b-[#EAA838]/40 border-l-[#EAA838]/10 shadow-[0_0_25px_rgba(234,168,56,0.8),inset_0_0_15px_rgba(234,168,56,0.4)] animate-orbit-spin -z-10"
          >
            {/* Luminous Shining Spark Orb on Ring */}
            <div className="absolute top-1 right-12 w-4 h-4 rounded-full bg-[#FFF] shadow-[0_0_20px_#FFF,0_0_35px_#EAA838]" />
            <div className="absolute bottom-6 left-12 w-2.5 h-2.5 rounded-full bg-[#EAA838] shadow-[0_0_15px_#EAA838]" />
          </div>

          {/* 3D Shining Golden Swirl Ring 2 (Secondary Counter-Orbiting Ring) */}
          <div
            style={{
              transform: "perspective(800px) rotateX(60deg) rotateY(24deg) rotateZ(-35deg)",
            }}
            className="absolute w-[260px] sm:w-[300px] h-[260px] sm:h-[300px] rounded-full border-[1.5px] border-dashed border-[#F4C463]/70 shadow-[0_0_20px_rgba(244,196,99,0.5)] animate-orbit-spin-reverse -z-10"
          >
            <div className="absolute top-8 left-4 w-3 h-3 rounded-full bg-[#FFF1C5] shadow-[0_0_15px_#FFF1C5]" />
          </div>

          {/* 3D Front Crossing Ring Arc */}
          <div
            style={{
              transform: "perspective(800px) rotateX(68deg) rotateY(-16deg) rotateZ(20deg)",
            }}
            className="absolute w-[290px] sm:w-[330px] h-[290px] sm:h-[330px] rounded-full pointer-events-none z-30"
          >
            {/* Lower half of the ring that crosses in FRONT of the camera body */}
            <div className="w-full h-full rounded-full border-b-[2.5px] border-r-[2.5px] border-transparent border-b-[#FFF1C5] border-r-[#EAA838] shadow-[0_4px_25px_rgba(234,168,56,0.9)] opacity-90" />
          </div>

          {/* Floating High-Impact Camera */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full z-20"
          >
            <Image
              src="/camera/camera.png"
              alt="Ashren 4K Camera"
              fill
              priority
              sizes="(max-width: 640px) 280px, 340px"
              className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] brightness-105"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3 LARGE PROMINENT INTERACTIVE CARDS & 180° BADGE */}
        <div className="flex flex-col gap-3.5 items-end z-20 shrink-0">
          
          {/* Travel Card */}
          <motion.div
            whileTap={{ scale: 0.94 }}
            onClick={() => onOpenVideo("Mountain Hiking in High Alpine 4K", "TRAVEL ADVENTURE")}
            className="w-32 sm:w-40 rounded-xl overflow-hidden border border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer relative group"
          >
            <Image
              src="/card/card1.png"
              alt="Travel"
              width={180}
              height={110}
              className="w-full h-auto object-cover group-active:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-[#EAA838] text-black flex items-center justify-center shadow-lg">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </motion.div>

          {/* Vlog Card */}
          <motion.div
            whileTap={{ scale: 0.94 }}
            onClick={() => onOpenVideo("Underwater Coral Reef Scuba 4K Vlog", "VLOG & EXPLORATION")}
            className="w-32 sm:w-40 rounded-xl overflow-hidden border border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer relative group"
          >
            <Image
              src="/card/card2.png"
              alt="Vlog"
              width={180}
              height={110}
              className="w-full h-auto object-cover group-active:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-[#EAA838] text-black flex items-center justify-center shadow-lg">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </motion.div>

          {/* Create Card */}
          <motion.div
            whileTap={{ scale: 0.94 }}
            onClick={() => onOpenVideo("Futuristic Cityscape Night Time Lapse 4K", "CREATIVE TIMELAPSE")}
            className="w-32 sm:w-40 rounded-xl overflow-hidden border border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer relative group"
          >
            <Image
              src="/card/card3.png"
              alt="Create"
              width={180}
              height={110}
              className="w-full h-auto object-cover group-active:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/20 group-active:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-[#EAA838] text-black flex items-center justify-center shadow-lg">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </motion.div>

          {/* 180° Rotation Badge */}
          <div className="px-3 py-1.5 rounded-full bg-black/80 border border-[#EAA838]/60 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,168,56,0.4)]">
            <RotateCw className="w-4 h-4 text-[#EAA838]" />
            <div className="text-[10px] font-bold text-white flex flex-col leading-tight">
              <span>180°</span>
              <span className="text-[8px] text-gray-300 font-semibold">ROTATION</span>
            </div>
          </div>

        </div>

      </div>

      {/* CTA Button & Pagination Dots */}
      <div className="w-full flex flex-col items-center gap-3.5 z-20 my-4">
        <button
          onClick={onShopNow}
          className="w-full max-w-[340px] py-4 rounded-full bg-gold-gradient text-black font-extrabold text-base shadow-[0_0_35px_rgba(234,168,56,0.6)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-5 h-5 text-black" />
          <span>Shop Now</span>
          <span className="text-lg">➔</span>
        </button>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 pt-1">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className={`h-2 transition-all rounded-full ${
                activeDot === dot ? "w-8 bg-[#EAA838] shadow-[0_0_10px_#EAA838]" : "w-2 bg-white/40"
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-0.5 text-[10px] text-gray-200 uppercase tracking-widest pt-2">
          <span>Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-[#EAA838] animate-bounce" />
        </div>
      </div>

      {/* ================= GOLDEN CURVED ARCH SEPARATOR ================= */}
      <div className="relative w-full my-6 flex justify-center items-center">
        <svg
          viewBox="0 0 400 30"
          className="w-full max-w-md h-auto text-[#EAA838] overflow-visible"
        >
          <path
            d="M 0,25 Q 200,-5 400,25"
            fill="none"
            stroke="url(#goldLineGrad)"
            strokeWidth="2.5"
          />
          <defs>
            <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#EAA838" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ================= LOWER STORY & SPECS SECTION (Mobile) ================= */}
      <div className="w-full text-center flex flex-col items-center z-10 space-y-3">
        
        {/* Eyebrow */}
        <p className="text-[11px] tracking-[0.35em] text-gray-200 font-semibold uppercase">
          Capture • Create • Explore
        </p>

        {/* Title */}
        <div className="space-y-0.5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Story
          </h2>
          <h3 className="text-3xl sm:text-4xl font-serif-luxury italic text-gold-shimmer drop-shadow-[0_2px_20px_rgba(244,196,99,0.5)]">
            Anywhere
          </h3>
        </div>

        {/* Subtext */}
        <p className="text-xs sm:text-sm text-gray-300 max-w-xs sm:max-w-sm font-normal leading-relaxed px-2">
          Ashren brings you premium gadgets for creators, travelers and everyday adventurers.
        </p>

        {/* 4 Feature Badges in 2x2 Grid */}
        <div className="w-full grid grid-cols-2 gap-3.5 pt-4 max-w-sm sm:max-w-md">
          
          {/* Premium Gadgets */}
          <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg">
            <Diamond className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">Premium Gadgets</p>
            <p className="text-[10px] text-gray-300">Curated for You</p>
          </div>

          {/* 100% Secure Payment */}
          <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg">
            <ShieldCheck className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">100% Secure Payment</p>
            <p className="text-[10px] text-gray-300">Shop with Confidence</p>
          </div>

          {/* Free Shipping Across India */}
          <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg">
            <Truck className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">Free Shipping Across India</p>
            <p className="text-[10px] text-gray-300">Fast & Reliable</p>
          </div>

          {/* Dedicated Support */}
          <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 backdrop-blur-md flex flex-col items-center text-center shadow-lg">
            <Headphones className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">Dedicated Support</p>
            <p className="text-[10px] text-gray-300">We&apos;re Here to Help</p>
          </div>

        </div>

      </div>

    </div>
  );
}
