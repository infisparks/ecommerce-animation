"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Share2,
  ChevronRight,
  Info,
} from "lucide-react";
import { DressItem } from "@/data/dresses";

interface DressDetailModalProps {
  dress: DressItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dress: DressItem, selectedSize: string, selectedColor: string) => void;
}

export default function DressDetailModal({
  dress,
  isOpen,
  onClose,
  onAddToCart,
}: DressDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"details" | "craftsmanship" | "fit">("details");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!dress) return null;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddToCart = () => {
    const colorName = dress.colors[selectedColorIndex]?.name || "Default";
    onAddToCart(dress, selectedSize, colorName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-[#0c0e14] border border-[#EAA838]/40 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto z-10 text-white"
          >
            {/* Top Close & Action Bar */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              <button
                onClick={handleShare}
                aria-label="Share Dress"
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-gray-300 hover:text-white backdrop-blur-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to Wishlist"
                className={`p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 backdrop-blur-md transition-colors ${
                  isWishlisted ? "text-red-500 border-red-500/50" : "text-gray-300 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
              </button>

              <button
                onClick={onClose}
                aria-label="Close details"
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-gray-300 hover:text-white backdrop-blur-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto overflow-x-hidden flex-1 grid grid-cols-1 md:grid-cols-2">
              
              {/* LEFT: Dress Showcase Image */}
              <div className="relative bg-gradient-to-b from-[#161a24] to-[#0a0d13] p-6 flex items-center justify-center min-h-[360px] sm:min-h-[460px]">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,168,56,0.15),transparent_70%)] pointer-events-none" />

                {/* Tag Badge */}
                {dress.tag && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#EAA838]/20 border border-[#EAA838]/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F4C463] shadow-[0_0_15px_rgba(234,168,56,0.3)]">
                    {dress.tag}
                  </div>
                )}

                <div className="relative w-full h-[340px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* RIGHT: Product Details & Controls */}
              <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-[#0c0e14]">
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold tracking-widest text-[#EAA838] uppercase">
                      {dress.category}
                    </span>
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[11px] text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span className="font-bold">{dress.rating}</span>
                      <span className="text-gray-400">({dress.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {dress.name}
                  </h2>
                  <p className="text-xs text-gray-300 mt-1">{dress.subtitle}</p>

                  {/* Pricing with Discount */}
                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#F4C463] tracking-tight">
                      ₹{dress.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{dress.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 text-[11px] font-bold border border-green-500/30">
                      {dress.discount}
                    </span>
                  </div>

                  {/* Color Swatches */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-200">
                        Color:{" "}
                        <span className="text-[#F4C463]">
                          {dress.colors[selectedColorIndex]?.name}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {dress.colors.map((c, idx) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`w-7 h-7 rounded-full transition-all flex items-center justify-center border-2 ${
                            selectedColorIndex === idx
                              ? "border-[#EAA838] scale-110 shadow-[0_0_10px_#EAA838]"
                              : "border-white/30 hover:border-white"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColorIndex === idx && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-200">Select Size</span>
                      <button className="text-[10px] text-[#EAA838] hover:underline flex items-center gap-0.5">
                        <Info className="w-3 h-3" /> Size Guide
                      </button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {dress.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[40px] h-9 px-3 rounded-lg text-xs font-bold transition-all border ${
                            selectedSize === size
                              ? "bg-[#EAA838] text-black border-[#EAA838] shadow-[0_0_12px_rgba(234,168,56,0.5)]"
                              : "bg-white/5 text-gray-200 border-white/15 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Analysis Tabs */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                      <button
                        onClick={() => setActiveTab("details")}
                        className={`text-xs font-semibold pb-1 transition-colors relative ${
                          activeTab === "details" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Overview
                        {activeTab === "details" && (
                          <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("craftsmanship")}
                        className={`text-xs font-semibold pb-1 transition-colors relative ${
                          activeTab === "craftsmanship" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Fabric & Work
                        {activeTab === "craftsmanship" && (
                          <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("fit")}
                        className={`text-xs font-semibold pb-1 transition-colors relative ${
                          activeTab === "fit" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Silhouette & Package
                        {activeTab === "fit" && (
                          <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]" />
                        )}
                      </button>
                    </div>

                    <div className="pt-2 text-xs text-gray-300 leading-relaxed min-h-[60px]">
                      {activeTab === "details" && <p>{dress.description}</p>}
                      {activeTab === "craftsmanship" && (
                        <div className="space-y-1">
                          <p>
                            <strong className="text-white">Fabric:</strong> {dress.fabric}
                          </p>
                          <p>
                            <strong className="text-white">Work:</strong> {dress.embroideryWork}
                          </p>
                        </div>
                      )}
                      {activeTab === "fit" && (
                        <div className="space-y-1">
                          <p>
                            <strong className="text-white">Silhouette:</strong> {dress.silhouette}
                          </p>
                          <p>
                            <strong className="text-white">In Box:</strong> {dress.included}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trust Highlights */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/5 border border-white/10 mt-4 text-[10px] text-gray-300 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#EAA838]" />
                      <span>Free Express Shipping</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-[#EAA838]" />
                      <span>7-Day Easy Return</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#EAA838]" />
                      <span>100% Authentic Handcraft</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#F4C463] via-[#EAA838] to-[#D79728] text-black font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,168,56,0.4)] hover:shadow-[0_0_30px_rgba(234,168,56,0.6)] transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART • ₹{dress.price.toLocaleString("en-IN")}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
