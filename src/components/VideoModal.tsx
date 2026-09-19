"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, ShieldCheck, Sparkles } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
  videoCategory?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoTitle = "Ashren 4K Ultra HD Gimbal Showcase",
  videoCategory = "TRAVEL & ADVENTURE",
}: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0e1017] border border-[#EAA838]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(234,168,56,0.25)] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-black bg-[#EAA838] rounded-full uppercase">
                  {videoCategory}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white truncate max-w-[280px] sm:max-w-md">
                  {videoTitle}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated 4K Cinematic Video Player */}
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/background.png"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-flying-through-the-clouds-in-the-sky-41406-large.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Overlay controls & Cinematic watermarks */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* 4K Live Watermark */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-white tracking-widest">4K UHD • 60 FPS</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs text-white/90">
                <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" /> 3-Axis Active Stabilization
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[#EAA838] font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Ultra-Wide Dynamic Range
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-300" />
                  <span>Stereo Studio Audio</span>
                </div>
              </div>
            </div>

            {/* Video Footer info */}
            <div className="p-4 sm:p-5 bg-[#0a0b0f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
              <p>Experience ultra-crisp cinematography with high dynamic range and 180° pan-tilt fluidity.</p>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-gold-gradient text-black font-semibold hover:bg-gold-gradient-hover transition-all whitespace-nowrap"
              >
                Explore Specifications
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
