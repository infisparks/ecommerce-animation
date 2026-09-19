"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function SplashScreen({
  onComplete,
  minDuration = 1800,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050608] overflow-hidden select-none will-change-transform"
        >
          {/* Ambient Golden Background Auras (GPU optimized) */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[#EAA838]/15 blur-[60px] pointer-events-none animate-pulse-glow" />

          {/* 3D Orbit Ring Accent */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              scale: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.6 },
            }}
            className="absolute w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] rounded-full border border-[#EAA838]/20 pointer-events-none animate-orbit-spin"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FFF] shadow-[0_0_15px_#FFF,0_0_25px_#EAA838]" />
          </motion.div>

          {/* Logo Container */}
          <div className="relative flex flex-col items-center z-10">
            
            {/* Logo Image & Alpha-Masked Shine Layer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-40 sm:w-52 h-40 sm:h-52 flex items-center justify-center drop-shadow-[0_0_25px_rgba(244,196,99,0.5)]"
            >
              {/* Base Logo */}
              <Image
                src="/logo/logo.png"
                alt="Ashren Logo"
                fill
                priority
                sizes="(max-width: 640px) 160px, 210px"
                className="object-contain filter brightness-110"
              />

              {/* 
                ALPHA-MASKED SHINE LAYER:
                Clipped strictly using mask-image so it renders ONLY inside solid pixels
              */}
              <div
                style={{
                  WebkitMaskImage: "url('/logo/logo.png')",
                  maskImage: "url('/logo/logo.png')",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{
                    x: ["-120%", "220%"],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-white/90 to-transparent transform -skew-x-25 mix-blend-overlay"
                />
              </div>
            </motion.div>

            {/* Glowing Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 text-center"
            >
              <motion.p
                initial={{ letterSpacing: "0.2em" }}
                animate={{ letterSpacing: "0.3em" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-xs sm:text-sm font-semibold uppercase text-gold-shimmer drop-shadow-[0_2px_8px_rgba(234,168,56,0.4)] font-outfit"
              >
                Haute Marketplace
              </motion.p>

              {/* Progress Line */}
              <div className="w-32 sm:w-40 h-[2px] bg-white/10 rounded-full mx-auto mt-2.5 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#EAA838] to-[#FFF1C5] shadow-[0_0_8px_#EAA838]"
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
