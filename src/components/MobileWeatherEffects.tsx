"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WeatherTheme } from "@/context/WeatherContext";

interface MobileWeatherEffectsProps {
  condition: WeatherTheme;
}

// ---------------------------------------------------------------------------
// Predefined deterministic data to guarantee zero hydration mismatch & zero lag
// ---------------------------------------------------------------------------

// Night: Wind Breeze streaks & floating wind particles
const WIND_STREAKS = [
  { top: "15%", delay: "0s", duration: "4.5s", width: "160px", height: "1.5px", opacity: 0.35 },
  { top: "28%", delay: "2.2s", duration: "5.5s", width: "220px", height: "1.5px", opacity: 0.28 },
  { top: "42%", delay: "1.1s", duration: "4.8s", width: "180px", height: "1.5px", opacity: 0.32 },
  { top: "58%", delay: "3.5s", duration: "6.0s", width: "240px", height: "2px", opacity: 0.25 },
  { top: "72%", delay: "0.8s", duration: "5.2s", width: "190px", height: "1.5px", opacity: 0.30 },
  { top: "85%", delay: "2.8s", duration: "4.2s", width: "150px", height: "1.5px", opacity: 0.35 },
];

const WIND_PARTICLES = [
  { top: "18%", delay: "0.4s", duration: "5s", size: 3 },
  { top: "32%", delay: "1.8s", duration: "6s", size: 2.5 },
  { top: "45%", delay: "3.2s", duration: "4.5s", size: 2 },
  { top: "62%", delay: "0.9s", duration: "5.8s", size: 3.5 },
  { top: "76%", delay: "2.5s", duration: "5.2s", size: 2 },
  { top: "88%", delay: "4.1s", duration: "4.8s", size: 2.5 },
];

// Rainy: Slanted rain drops (24 lightweight drops)
const RAIN_DROPS = [
  { left: "4%", delay: "0.1s", duration: "0.85s", height: "35px", opacity: 0.6 },
  { left: "8%", delay: "0.45s", duration: "0.75s", height: "42px", opacity: 0.75 },
  { left: "12%", delay: "0.2s", duration: "0.95s", height: "30px", opacity: 0.5 },
  { left: "16%", delay: "0.6s", duration: "0.7s", height: "38px", opacity: 0.7 },
  { left: "20%", delay: "0.3s", duration: "0.8s", height: "45px", opacity: 0.8 },
  { left: "24%", delay: "0.75s", duration: "0.9s", height: "32px", opacity: 0.55 },
  { left: "28%", delay: "0.15s", duration: "0.72s", height: "40px", opacity: 0.65 },
  { left: "32%", delay: "0.5s", duration: "0.82s", height: "36px", opacity: 0.6 },
  { left: "36%", delay: "0.35s", duration: "0.78s", height: "44px", opacity: 0.75 },
  { left: "40%", delay: "0.85s", duration: "0.88s", height: "30px", opacity: 0.5 },
  { left: "45%", delay: "0.25s", duration: "0.74s", height: "42px", opacity: 0.7 },
  { left: "49%", delay: "0.65s", duration: "0.85s", height: "35px", opacity: 0.6 },
  { left: "53%", delay: "0.05s", duration: "0.92s", height: "48px", opacity: 0.8 },
  { left: "57%", delay: "0.4s", duration: "0.76s", height: "34px", opacity: 0.55 },
  { left: "61%", delay: "0.8s", duration: "0.84s", height: "40px", opacity: 0.65 },
  { left: "65%", delay: "0.18s", duration: "0.7s", height: "36px", opacity: 0.7 },
  { left: "69%", delay: "0.55s", duration: "0.89s", height: "45px", opacity: 0.75 },
  { left: "73%", delay: "0.32s", duration: "0.75s", height: "32px", opacity: 0.5 },
  { left: "77%", delay: "0.7s", duration: "0.82s", height: "42px", opacity: 0.7 },
  { left: "81%", delay: "0.22s", duration: "0.95s", height: "38px", opacity: 0.6 },
  { left: "85%", delay: "0.62s", duration: "0.72s", height: "46px", opacity: 0.8 },
  { left: "89%", delay: "0.12s", duration: "0.86s", height: "30px", opacity: 0.55 },
  { left: "93%", delay: "0.48s", duration: "0.78s", height: "40px", opacity: 0.65 },
  { left: "97%", delay: "0.88s", duration: "0.83s", height: "35px", opacity: 0.6 },
];

// Morning / Hot / Sunny: Golden Sun Rays & Sun motes
const SUN_DUST_MOTES = [
  { top: "18%", left: "65%", delay: "0s", duration: "4s", size: 3 },
  { top: "25%", left: "82%", delay: "1.2s", duration: "5s", size: 4 },
  { top: "32%", left: "72%", delay: "2.4s", duration: "4.5s", size: 2.5 },
  { top: "40%", left: "88%", delay: "0.6s", duration: "5.5s", size: 3.5 },
  { top: "22%", left: "55%", delay: "1.8s", duration: "4.2s", size: 2 },
  { top: "48%", left: "78%", delay: "3.1s", duration: "4.8s", size: 3 },
];

// Cold / Snow: Soft snowflakes (17 flakes)
const SNOW_FLAKES = [
  { left: "5%", delay: "0s", duration: "6.5s", size: 3.5, sway: "28px" },
  { left: "10%", delay: "2.2s", duration: "8.0s", size: 2.5, sway: "-22px" },
  { left: "15%", delay: "4.1s", duration: "7.2s", size: 4.0, sway: "30px" },
  { left: "20%", delay: "1.2s", duration: "6.0s", size: 3.0, sway: "-25px" },
  { left: "26%", delay: "3.5s", duration: "8.5s", size: 2.0, sway: "20px" },
  { left: "31%", delay: "0.8s", duration: "7.0s", size: 4.5, sway: "-32px" },
  { left: "37%", delay: "4.8s", duration: "6.8s", size: 3.0, sway: "25px" },
  { left: "43%", delay: "2.0s", duration: "7.8s", size: 2.5, sway: "-20px" },
  { left: "48%", delay: "0.3s", duration: "6.2s", size: 4.0, sway: "28px" },
  { left: "54%", delay: "3.2s", duration: "8.2s", size: 3.0, sway: "-26px" },
  { left: "60%", delay: "1.7s", duration: "6.9s", size: 2.0, sway: "22px" },
  { left: "66%", delay: "4.5s", duration: "7.5s", size: 4.0, sway: "-30px" },
  { left: "72%", delay: "0.9s", duration: "6.4s", size: 3.5, sway: "25px" },
  { left: "78%", delay: "2.8s", duration: "8.0s", size: 2.5, sway: "-22px" },
  { left: "84%", delay: "4.0s", duration: "7.1s", size: 4.5, sway: "30px" },
  { left: "89%", delay: "1.5s", duration: "6.6s", size: 3.0, sway: "-28px" },
  { left: "95%", delay: "3.8s", duration: "7.6s", size: 2.5, sway: "24px" },
];

export default function MobileWeatherEffects({ condition }: MobileWeatherEffectsProps) {
  // STRICT RULE: This component is rendered with `block lg:hidden` in parent,
  // ensuring zero overhead, zero rendering and zero layout calculations on PC/Desktop.

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      <AnimatePresence mode="wait">
        {/* ===================================================================
            1. NIGHT TIME: WIND EFFECT
            Subtle luminous night breeze streaks & floating stardust wind motes
            =================================================================== */}
        {condition === "night" && (
          <motion.div
            key="weather-wind-night"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Ambient cool night wind sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/15 via-transparent to-cyan-950/20 pointer-events-none" />

            {/* Horizontal Wind Streaks */}
            {WIND_STREAKS.map((streak, i) => (
              <div
                key={`wind-streak-${i}`}
                style={{
                  top: streak.top,
                  width: streak.width,
                  height: streak.height,
                  animation: `mobileWindBreeze ${streak.duration} cubic-bezier(0.25, 0.1, 0.25, 1) infinite`,
                  animationDelay: streak.delay,
                  opacity: streak.opacity,
                  willChange: "transform, opacity",
                }}
                className="absolute left-0 rounded-full bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent blur-[0.4px]"
              />
            ))}

            {/* Floating Wind Dust / Micro-particles riding the breeze */}
            {WIND_PARTICLES.map((particle, i) => (
              <div
                key={`wind-particle-${i}`}
                style={{
                  top: particle.top,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animation: `mobileWindParticle ${particle.duration} ease-in-out infinite`,
                  animationDelay: particle.delay,
                  willChange: "transform, opacity",
                }}
                className="absolute left-0 rounded-full bg-cyan-200/80 shadow-[0_0_8px_rgba(165,243,252,0.9)]"
              />
            ))}
          </motion.div>
        )}

        {/* ===================================================================
            2. RAINY: RAIN EFFECT
            Lightweight smooth slanted rain streaks & subtle mist
            =================================================================== */}
        {condition === "rainy" && (
          <motion.div
            key="weather-rain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Soft rain overcast hue */}
            <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

            {/* Falling Rain Drops */}
            {RAIN_DROPS.map((drop, i) => (
              <div
                key={`rain-drop-${i}`}
                style={{
                  left: drop.left,
                  height: drop.height,
                  width: "1.2px",
                  animation: `mobileRainDrop ${drop.duration} linear infinite`,
                  animationDelay: drop.delay,
                  opacity: drop.opacity,
                  willChange: "transform, opacity",
                }}
                className="absolute -top-10 rounded-full bg-gradient-to-b from-transparent via-cyan-100/70 to-blue-200"
              />
            ))}

            {/* Subtle bottom rain mist */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-950/25 to-transparent pointer-events-none blur-sm" />
          </motion.div>
        )}

        {/* ===================================================================
            3. MORNING / HOT / SUNNY: SUN EFFECT
            Radiant warm sun flare in top-right, subtle rotating sun rays,
            and gentle rising sun specks
            =================================================================== */}
        {(condition === "morning" || condition === "hot" || condition === "sunny") && (
          <motion.div
            key="weather-sun"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Extra warm atmospheric wash for 'hot' */}
            {condition === "hot" && (
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent pointer-events-none" />
            )}

            {/* Top-Right Glowing Celestial Sun Disc */}
            <div
              style={{
                animation: "mobileSunGlow 5s ease-in-out infinite",
                willChange: "transform, opacity",
              }}
              className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200/50 via-amber-400/30 to-orange-500/10 blur-3xl pointer-events-none"
            />

            {/* Subtle Rotating Sun Ray Burst Halo */}
            <div
              style={{
                animation: "mobileSunRotate 45s linear infinite",
                willChange: "transform",
              }}
              className="absolute -top-20 -right-20 w-80 h-80 pointer-events-none opacity-25"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-300">
                <circle cx="100" cy="100" r="28" fill="url(#sunGradient)" opacity="0.6" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <rect
                    key={`sun-ray-${deg}`}
                    x="98.5"
                    y="10"
                    width="3"
                    height="45"
                    rx="1.5"
                    transform={`rotate(${deg} 100 100)`}
                    opacity="0.35"
                  />
                ))}
                <defs>
                  <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="70%" stopColor="#F5B84A" />
                    <stop offset="100%" stopColor="#DA9524" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Gentle rising sun dust motes */}
            {SUN_DUST_MOTES.map((mote, i) => (
              <div
                key={`sun-mote-${i}`}
                style={{
                  top: mote.top,
                  left: mote.left,
                  width: `${mote.size}px`,
                  height: `${mote.size}px`,
                  animation: `mobileSunDust ${mote.duration} ease-in-out infinite`,
                  animationDelay: mote.delay,
                  willChange: "transform, opacity",
                }}
                className="absolute rounded-full bg-amber-200/70 shadow-[0_0_8px_rgba(245,184,74,0.8)]"
              />
            ))}
          </motion.div>
        )}

        {/* ===================================================================
            4. COLD / SNOW: SNOW EFFECT
            Soft, gentle snowflakes drifting downwards with natural swaying
            =================================================================== */}
        {(condition === "cold" || condition === "snow") && (
          <motion.div
            key="weather-snow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Subtle winter frost vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/15 via-transparent to-blue-950/20 pointer-events-none" />

            {/* Falling & Swaying Snowflakes */}
            {SNOW_FLAKES.map((flake, i) => (
              <div
                key={`snow-flake-${i}`}
                style={{
                  left: flake.left,
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  // @ts-ignore
                  "--sway-x": flake.sway,
                  animation: `mobileSnowFlake ${flake.duration} ease-in-out infinite`,
                  animationDelay: flake.delay,
                  willChange: "transform, opacity",
                }}
                className="absolute -top-6 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)] blur-[0.3px]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
