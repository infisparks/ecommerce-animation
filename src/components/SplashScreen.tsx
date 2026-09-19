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
  minDuration = 2200,
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
            scale: 1.06,
            filter: "blur(12px)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050608] overflow-hidden select-none"
        >
          {/* Ambient Golden Background Auras */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#EAA838]/15 blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FFF1C5]/10 blur-[80px] pointer-events-none" />

          {/* 3D Orbit Ring Accent */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              scale: { duration: 1.2, ease: "easeOut" },
              opacity: { duration: 0.8 },
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            }}
            className="absolute w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-full border border-[#EAA838]/20 pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FFF] shadow-[0_0_20px_#FFF,0_0_35px_#EAA838]" />
          </motion.div>

          {/* Logo Container with Shine Effect */}
          <div className="relative flex flex-col items-center z-10">
            {/* Logo Image */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-44 sm:w-56 h-44 sm:h-56 overflow-hidden flex items-center justify-center drop-shadow-[0_0_35px_rgba(244,196,99,0.55)]"
            >
              <Image
                src="/logo/logo.png"
                alt="Ashren Logo"
                fill
                priority
                sizes="(max-width: 640px) 180px, 230px"
                className="object-contain filter brightness-110"
              />

              {/* Sweeping Light Shine Beam */}
              <motion.div
                initial={{ x: "-150%", opacity: 0 }}
                animate={{
                  x: ["-150%", "200%"],
                  opacity: [0, 0.85, 0],
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.8) 50%, transparent 80%)",
                }}
                className="absolute inset-y-0 w-full transform -skew-x-25 pointer-events-none"
              />
            </motion.div>

            {/* Glowing Tagline with expanding tracking */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-center"
            >
              <motion.p
                initial={{ letterSpacing: "0.2em" }}
                animate={{ letterSpacing: "0.35em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-xs sm:text-sm font-semibold uppercase text-gold-shimmer drop-shadow-[0_2px_10px_rgba(234,168,56,0.5)] font-outfit"
              >
                Haute Marketplace
              </motion.p>

              {/* Progress Line */}
              <div className="w-36 sm:w-44 h-[2px] bg-white/10 rounded-full mx-auto mt-3 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#EAA838] to-[#FFF1C5] shadow-[0_0_10px_#EAA838]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
