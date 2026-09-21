"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWeather, WeatherTheme } from "@/context/WeatherContext";
import {
  Sun,
  Sunrise,
  Moon,
  CloudRain,
  Snowflake,
  Flame,
  ThermometerSnowflake,
  ExternalLink,
  ChevronDown,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherWidgetProps {
  className?: string;
  variant?: "pill" | "compact" | "badge";
}

export default function WeatherWidget({ className = "", variant = "pill" }: WeatherWidgetProps) {
  const {
    temperature,
    condition,
    conditionLabel,
    isNight,
    city,
    isLoading,
    isOverride,
    manualOverride,
    googleWeatherUrl,
    setManualTheme,
    refreshWeather,
  } = useWeather();

  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    await refreshWeather();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const getConditionIcon = (theme: WeatherTheme, sizeClass = "w-3.5 h-3.5") => {
    switch (theme) {
      case "morning":
        return <Sunrise className={`${sizeClass} text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]`} />;
      case "night":
        return <Moon className={`${sizeClass} text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.8)]`} />;
      case "hot":
        return <Flame className={`${sizeClass} text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]`} />;
      case "sunny":
        return <Sun className={`${sizeClass} text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]`} />;
      case "cold":
        return <ThermometerSnowflake className={`${sizeClass} text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]`} />;
      case "rainy":
        return <CloudRain className={`${sizeClass} text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]`} />;
      case "snow":
        return <Snowflake className={`${sizeClass} text-indigo-200 drop-shadow-[0_0_8px_rgba(199,210,254,0.8)]`} />;
    }
  };

  const themeOptions: { key: WeatherTheme | null; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: null,
      label: "Live Time & Weather (Auto)",
      desc: "Auto-switches Morning / Night & Live forecast",
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      key: "morning",
      label: "Morning (Day)",
      desc: "Loads background-morning-mobile.png",
      icon: <Sunrise className="w-3.5 h-3.5 text-amber-300" />,
    },
    {
      key: "night",
      label: "Night (Evening)",
      desc: "Loads background-night-mobile.png",
      icon: <Moon className="w-3.5 h-3.5 text-indigo-300" />,
    },
    {
      key: "hot",
      label: "Very Hot",
      desc: "Loads background-mobile.png",
      icon: <Flame className="w-3.5 h-3.5 text-orange-400" />,
    },
    {
      key: "sunny",
      label: "Sunny",
      desc: "Loads background-sunny-mobile.png",
      icon: <Sun className="w-3.5 h-3.5 text-amber-300" />,
    },
    {
      key: "cold",
      label: "Cold",
      desc: "Loads background-cold-mobile.png",
      icon: <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-300" />,
    },
    {
      key: "rainy",
      label: "Rainy",
      desc: "Loads background-rainy-mobile.png",
      icon: <CloudRain className="w-3.5 h-3.5 text-blue-400" />,
    },
    {
      key: "snow",
      label: "Snowy",
      desc: "Loads background-snow-mobile.png",
      icon: <Snowflake className="w-3.5 h-3.5 text-indigo-200" />,
    },
  ];

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left z-40 ${className}`}>
      {/* Compact Weather Chip Button */}
      <div className="flex items-center gap-1">
        {/* Main Temperature & Condition Pill - Opens Dropdown to switch themes */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Current Weather & Theme Selector"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#EAA838]/60 shadow-[0_2px_12px_rgba(0,0,0,0.5)] backdrop-blur-md text-white transition-all group"
        >
          {isLoading ? (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
              <RefreshCw className="w-3 h-3 animate-spin text-[#EAA838]" />
              <span>Checking weather...</span>
            </div>
          ) : (
            <>
              {getConditionIcon(condition)}
              <span className="text-[11px] sm:text-xs font-bold text-[#EAA838] tracking-tight">
                {temperature !== null ? `${temperature}°C` : "--"}
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-200 font-medium hidden xs:inline capitalize">
                {conditionLabel}
              </span>
              {isOverride && (
                <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                  Test
                </span>
              )}
              <ChevronDown
                className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </motion.button>

        {/* Small Direct Link to Google Weather */}
        <motion.a
          whileTap={{ scale: 0.9 }}
          href={googleWeatherUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${city || "Local"} weather on Google`}
          className="p-1.5 rounded-full bg-black/60 hover:bg-[#EAA838]/20 border border-white/20 hover:border-[#EAA838]/70 text-gray-300 hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all flex items-center justify-center"
        >
          <ExternalLink className="w-3 h-3 text-[#EAA838]" />
        </motion.a>
      </div>

      {/* Dropdown Menu for Switching / Previewing Weather Themes & Google Weather */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-64 rounded-xl bg-[#0e1118]/95 border border-[#EAA838]/40 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl p-2.5 z-50 text-white"
          >
            {/* Header with City & Google Link */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2 px-1">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Current Weather</p>
                <p className="text-xs font-semibold text-white flex items-center gap-1">
                  <span>{city || "Local Weather"}</span>
                  {temperature !== null && <span className="text-[#EAA838]">({temperature}°C)</span>}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleRefresh}
                  title="Refresh weather"
                  className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#EAA838]" : ""}`} />
                </button>

                <a
                  href={googleWeatherUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-md bg-[#EAA838]/20 hover:bg-[#EAA838]/30 border border-[#EAA838]/40 text-[#EAA838] text-[10px] font-semibold flex items-center gap-1 transition-all"
                >
                  <span>Google</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Weather Theme Preview Selector */}
            <p className="text-[9px] uppercase tracking-wider font-semibold text-gray-400 px-1 mb-1.5">
              Switch Mobile Background Theme:
            </p>

            <div className="space-y-1">
              {themeOptions.map((opt) => {
                const isSelected = opt.key === manualOverride;
                return (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setManualTheme(opt.key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                      isSelected
                        ? "bg-[#EAA838]/20 border border-[#EAA838]/60 text-white font-semibold"
                        : "hover:bg-white/10 text-gray-300 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">{opt.icon}</div>
                      <div>
                        <p className="text-xs">{opt.label}</p>
                        <p className="text-[9px] text-gray-400 leading-tight">{opt.desc}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EAA838] shadow-[0_0_6px_#EAA838]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 text-center px-1">
              <a
                href={googleWeatherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gray-400 hover:text-[#EAA838] flex items-center justify-center gap-1 transition-colors"
              >
                <span>View full forecast on Google Weather</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
