"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Play,
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

  return (
    <div className="relative w-full flex flex-col px-4 pt-1 pb-10 select-none overflow-hidden">
      


      {/* Top Header Script Text & Tagline */}
      <div className="w-full flex items-start justify-between z-10 pt-1 pb-2">
        {/* Left Script: "Capture More Live Bolder" */}
        <div className="flex flex-col">
          <p className="font-script text-xl sm:text-2xl text-gold-shimmer transform -rotate-6 leading-tight drop-shadow-[0_2px_10px_rgba(234,168,56,0.4)]">
            Capture <br />
            More <br />
            Live Bolder
          </p>
        </div>

        {/* Right Tagline */}
        <div className="text-right">
          <p className="text-[9px] tracking-[0.2em] text-gray-300 font-bold uppercase">
            Compact
          </p>
          <p className="text-[9px] tracking-[0.2em] text-gray-300 font-bold uppercase">
            Powerful
          </p>
          <p className="text-[9px] tracking-[0.2em] text-gray-400 font-medium uppercase">
            Everywhere
          </p>
          <div className="w-6 h-[2px] bg-[#EAA838] ml-auto mt-1 rounded-full shadow-[0_0_6px_#EAA838]" />
          
          <p className="font-script text-base text-gold-shimmer transform -rotate-6 mt-3 leading-tight">
            Small Camera <br />
            Big Possibilities
          </p>
        </div>
      </div>

      {/* ================= CENTER HERO SECTION (Camera + Left Specs + Right Cards) ================= */}
      <div className="relative w-full flex items-center justify-between my-2 z-10 min-h-[380px]">
        
        {/* LEFT COLUMN: 5 VERTICAL SPECS BADGES */}
        <div className="flex flex-col gap-3.5 z-20">
          
          {/* 4K ULTRA HD */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              4K
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-extrabold text-white">4K</span>
              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">Ultra HD</span>
            </div>
          </div>

          {/* HIGH FRAME RATE */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <Video className="w-3.5 h-3.5 text-gray-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold text-white">HIGH</span>
              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">Frame Rate</span>
            </div>
          </div>

          {/* 180° ROTATION */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <RotateCw className="w-3.5 h-3.5 text-gray-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold text-white">180°</span>
              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">Rotation</span>
            </div>
          </div>

          {/* TOUCH SCREEN */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <Touchpad className="w-3.5 h-3.5 text-gray-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold text-white">TOUCH</span>
              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">Screen</span>
            </div>
          </div>

          {/* LIGHTWEIGHT & PORTABLE */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <Feather className="w-3.5 h-3.5 text-[#EAA838]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold text-white">LIGHTWEIGHT</span>
              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">& Portable</span>
            </div>
          </div>

        </div>

        {/* CENTER: FLOATING CAMERA */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-44 sm:w-52 h-[340px] flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute w-48 h-48 rounded-full bg-[#EAA838]/20 blur-2xl pointer-events-none" />
          
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
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
              sizes="220px"
              className="object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3 INTERACTIVE CARDS & 180° BADGE */}
        <div className="flex flex-col gap-2.5 items-end z-20">
          
          {/* Travel Card */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenVideo("Mountain Hiking in High Alpine 4K", "TRAVEL ADVENTURE")}
            className="w-24 sm:w-28 rounded-xl overflow-hidden border border-white/20 shadow-lg cursor-pointer relative"
          >
            <Image
              src="/card/card1.png"
              alt="Travel"
              width={120}
              height={70}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Vlog Card */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenVideo("Underwater Coral Reef Scuba 4K Vlog", "VLOG & EXPLORATION")}
            className="w-24 sm:w-28 rounded-xl overflow-hidden border border-white/20 shadow-lg cursor-pointer relative"
          >
            <Image
              src="/card/card2.png"
              alt="Vlog"
              width={120}
              height={70}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Create Card */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenVideo("Futuristic Cityscape Night Time Lapse 4K", "CREATIVE TIMELAPSE")}
            className="w-24 sm:w-28 rounded-xl overflow-hidden border border-white/20 shadow-lg cursor-pointer relative"
          >
            <Image
              src="/card/card3.png"
              alt="Create"
              width={120}
              height={70}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* 180° Rotation Badge */}
          <div className="px-2 py-1 rounded-full bg-black/60 border border-[#EAA838]/40 backdrop-blur-md flex items-center gap-1 shadow-md">
            <RotateCw className="w-3 h-3 text-[#EAA838]" />
            <div className="text-[8px] font-bold text-white flex flex-col leading-tight">
              <span>180°</span>
              <span className="text-[7px] text-gray-400">ROTATION</span>
            </div>
          </div>

        </div>

      </div>

      {/* CTA Button & Pagination Dots */}
      <div className="w-full flex flex-col items-center gap-3 z-20 my-3">
        <button
          onClick={onShopNow}
          className="w-full max-w-[280px] py-3 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-[0_0_25px_rgba(234,168,56,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span>Shop Now</span>
          <span className="text-base">➔</span>
        </button>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-1.5 pt-1">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className={`h-1.5 transition-all rounded-full ${
                activeDot === dot ? "w-6 bg-[#EAA838]" : "w-1.5 bg-white/30"
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-0.5 text-[9px] text-gray-400 uppercase tracking-widest pt-2">
          <span>Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-[#EAA838] animate-bounce" />
        </div>
      </div>

      {/* ================= GOLDEN CURVED ARCH SEPARATOR ================= */}
      <div className="relative w-full my-6 flex justify-center items-center">
        <svg
          viewBox="0 0 400 30"
          className="w-full max-w-md h-auto text-[#EAA838]/60 overflow-visible"
        >
          <path
            d="M 0,25 Q 200,-5 400,25"
            fill="none"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.5"
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
        <p className="text-[10px] tracking-[0.3em] text-gray-300 font-semibold uppercase">
          Capture • Create • Explore
        </p>

        {/* Title */}
        <div className="space-y-0.5">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Your Story
          </h2>
          <h3 className="text-3xl font-serif-luxury italic text-gold-shimmer drop-shadow-[0_2px_15px_rgba(244,196,99,0.4)]">
            Anywhere
          </h3>
        </div>

        {/* Subtext */}
        <p className="text-xs text-gray-300 max-w-xs font-normal leading-relaxed px-2">
          Ashren brings you premium gadgets for creators, travelers and everyday adventurers.
        </p>

        {/* 4 Feature Badges in 2x2 Grid or Row */}
        <div className="w-full grid grid-cols-2 gap-3 pt-4 max-w-sm">
          
          {/* Premium Gadgets */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
            <Diamond className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">Premium Gadgets</p>
            <p className="text-[10px] text-gray-400">Curated for You</p>
          </div>

          {/* 100% Secure Payment */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
            <ShieldCheck className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">100% Secure Payment</p>
            <p className="text-[10px] text-gray-400">Shop with Confidence</p>
          </div>

          {/* Free Shipping Across India */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
            <Truck className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">Free Shipping Across India</p>
            <p className="text-[10px] text-gray-400">Fast & Reliable</p>
          </div>

          {/* Dedicated Support */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center">
            <Headphones className="w-5 h-5 text-[#EAA838] mb-1.5" />
            <p className="text-xs font-bold text-white">Dedicated Support</p>
            <p className="text-[10px] text-gray-400">We&apos;re Here to Help</p>
          </div>

        </div>

      </div>

    </div>
  );
}
