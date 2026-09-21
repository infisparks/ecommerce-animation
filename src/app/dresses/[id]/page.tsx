"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import VideoModal from "@/components/VideoModal";
import TryOnModal from "@/components/TryOnModal";
import { WeatherProvider } from "@/context/WeatherContext";
import { DRESSES, DressItem } from "@/data/dresses";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  Info,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SingleDressContent({ dressId }: { dressId: string }) {
  const router = useRouter();
  const dress = DRESSES.find((d) => d.id === dressId) || DRESSES[0];

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"fabric" | "styling" | "care">("fabric");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  // Cart State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState([
    {
      id: "ashren-4k-camera",
      name: "Ashren 4K Pocket Gimbal Camera",
      variant: "Midnight Onyx • 128GB Bundle",
      price: 24999,
      quantity: 1,
      image: "/product/camera.png",
    },
  ]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddToCart = () => {
    const colorName = dress.colors[selectedColorIdx]?.name || "Default";
    const itemToAdd = {
      id: `${dress.id}-${selectedSize}-${colorName}`,
      name: dress.name,
      variant: `${colorName} • Size ${selectedSize}`,
      price: dress.price,
      quantity,
      image: dress.image,
    };

    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === itemToAdd.id);
      if (exists) {
        return prev.map((p) =>
          p.id === itemToAdd.id ? { ...p, quantity: p.quantity + itemToAdd.quantity } : p
        );
      }
      return [...prev, itemToAdd];
    });

    setToastMessage(`Added ${quantity}x ${dress.name} (${selectedSize}) to your bag!`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof cartItems
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Similar dresses excluding current
  const relatedDresses = DRESSES.filter((d) => d.id !== dress.id).slice(0, 4);

  return (
    <main className="relative min-h-screen text-white flex flex-col justify-between overflow-x-hidden font-sans pb-24 md:pb-12">
      
      {/* Dress Detail Background Image */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <Image
          src="/product/dress/background.png"
          alt="Ashren Haute Couture Royal Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01]"
        />
        {/* Cinematic Vignette Overlay for Crisp Contrast and Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65 pointer-events-none" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[150] px-4 py-2.5 rounded-full bg-[#12151f] border border-[#EAA838]/60 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(234,168,56,0.35)] backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#EAA838]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVideo={() => setIsVideoModalOpen(true)}
        isLoaded={true}
      />

      {/* Top Breadcrumb Bar */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 pt-3 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400 truncate">
            <Link href="/" className="hover:text-white transition-colors shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/dresses" className="hover:text-[#F4C463] transition-colors shrink-0">
              Dresses
            </Link>
            <span>/</span>
            <span className="text-[#F4C463] font-semibold truncate">{dress.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
              title="Share Dress"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors ${
                isWishlisted ? "text-red-500 border-red-500/40" : "text-gray-300 hover:text-white"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section (2-Column Desktop, 1-Column Mobile) */}
      <div className="w-full max-w-[1540px] mx-auto px-3.5 sm:px-8 lg:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Full Portrait Showcase Image (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[640px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#141824] to-[#0a0d14] border border-[#EAA838]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Tag Badge */}
              {dress.tag && (
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-black/70 border border-[#EAA838]/70 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F4C463] shadow-lg">
                  {dress.tag}
                </div>
              )}

              {/* Main Image with Zoom on Hover */}
              <Image
                src={dress.image}
                alt={dress.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Subtle Gradient Edge Shadows */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </motion.div>
          </div>

          {/* RIGHT: Detailed Purchasing & Specification Console (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold tracking-widest text-[#EAA838] uppercase">
                  {dress.category}
                </span>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span className="font-bold">{dress.rating}</span>
                  <span className="text-gray-400">({dress.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {dress.name}
              </h1>
              <p className="text-sm text-[#F4C463] font-medium mt-1.5">{dress.subtitle}</p>

              {/* Pricing Display with Discount */}
              <div className="flex items-baseline gap-3 my-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#F4C463] tracking-tight">
                  ₹{dress.price.toLocaleString("en-IN")}
                </span>
                <span className="text-base text-gray-400 line-through">
                  ₹{dress.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/40">
                  {dress.discount}
                </span>
                <span className="ml-auto text-[11px] text-gray-400">Inclusive of all taxes</span>
              </div>

              {/* ✨ AI Virtual Try-On Button ✨ */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsTryOnOpen(true)}
                className="w-full my-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#2A1E0E] via-[#1B150D] to-[#12151f] border border-[#EAA838]/70 hover:border-[#EAA838] text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-[0_0_20px_rgba(234,168,56,0.3)] hover:shadow-[0_0_30px_rgba(234,168,56,0.5)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#EAA838] text-black shadow-[0_0_12px_#EAA838]">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-white group-hover:text-[#F4C463] transition-colors">
                      Try This Dress on Me
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Upload from gallery or take a live photo with camera
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-[#F4C463] uppercase tracking-wider shrink-0">
                  <span>AI Fitting</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              {/* Narrative Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {dress.description}
              </p>

              {/* Color Swatch Selection */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-gray-200">
                    Selected Color:{" "}
                    <strong className="text-[#F4C463] font-semibold">
                      {dress.colors[selectedColorIdx]?.name}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {dress.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`w-9 h-9 rounded-full transition-all flex items-center justify-center border-2 ${
                        selectedColorIdx === idx
                          ? "border-[#EAA838] scale-110 shadow-[0_0_12px_#EAA838]"
                          : "border-white/20 hover:border-white"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColorIdx === idx && (
                        <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-gray-200">Select Size</span>
                  <span className="text-[11px] text-[#EAA838] flex items-center gap-1 cursor-pointer hover:underline">
                    <Info className="w-3 h-3" /> Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {dress.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                        selectedSize === size
                          ? "bg-[#EAA838] text-black border-[#EAA838] shadow-[0_0_15px_rgba(234,168,56,0.5)]"
                          : "bg-white/5 text-gray-200 border-white/15 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Desktop Action Buttons */}
              <div className="hidden sm:flex items-center gap-3 mt-6">
                {/* Quantity */}
                <div className="flex items-center bg-white/5 border border-white/15 rounded-xl px-2 h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-full text-lg font-bold text-gray-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-full text-lg font-bold text-gray-300 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </motion.button>

                {/* Instant Buy Now */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#F4C463] via-[#EAA838] to-[#D79728] text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(234,168,56,0.4)] hover:shadow-[0_0_35px_rgba(234,168,56,0.6)] transition-all"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>INSTANT BUY</span>
                </motion.button>
              </div>

              {/* Tabs: Specifications & Craftsmanship */}
              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="flex items-center gap-4 border-b border-white/10 pb-2">
                  <button
                    onClick={() => setActiveTab("fabric")}
                    className={`text-xs font-bold pb-1.5 transition-colors relative ${
                      activeTab === "fabric" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Fabric & Work
                    {activeTab === "fabric" && (
                      <motion.div layoutId="detailTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("styling")}
                    className={`text-xs font-bold pb-1.5 transition-colors relative ${
                      activeTab === "styling" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Silhouette & Inclusions
                    {activeTab === "styling" && (
                      <motion.div layoutId="detailTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("care")}
                    className={`text-xs font-bold pb-1.5 transition-colors relative ${
                      activeTab === "care" ? "text-[#EAA838]" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Care & Delivery
                    {activeTab === "care" && (
                      <motion.div layoutId="detailTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAA838]" />
                    )}
                  </button>
                </div>

                <div className="pt-3 text-xs text-gray-300 leading-relaxed min-h-[80px]">
                  {activeTab === "fabric" && (
                    <div className="space-y-1.5">
                      <p><strong className="text-white">Fabric Material:</strong> {dress.fabric}</p>
                      <p><strong className="text-white">Embroidery Details:</strong> {dress.embroideryWork}</p>
                    </div>
                  )}
                  {activeTab === "styling" && (
                    <div className="space-y-1.5">
                      <p><strong className="text-white">Silhouette:</strong> {dress.silhouette}</p>
                      <p><strong className="text-white">Package Contents:</strong> {dress.included}</p>
                    </div>
                  )}
                  {activeTab === "care" && (
                    <div className="space-y-1.5">
                      <p><strong className="text-white">Washing Instructions:</strong> Dry Clean Only to preserve hand zari threadwork.</p>
                      <p><strong className="text-white">Dispatch:</strong> Ships within 24 hours with premium gift packaging.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-white/[0.04] border border-white/10 mt-6 text-[10px] text-gray-300 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#EAA838]" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#EAA838]" />
                  <span>7-Day Return Policy</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#EAA838]" />
                  <span>100% Authentic Handcraft</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SIMILAR / RELATED DRESSES SECTION ================= */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#EAA838]">Curated Matches</p>
              <h2 className="text-lg sm:text-2xl font-bold text-white">More Royal Silhouettes</h2>
            </div>
            <Link
              href="/dresses"
              className="text-xs font-semibold text-[#EAA838] hover:underline flex items-center gap-1"
            >
              <span>View All 17</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2 in 1 row on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {relatedDresses.map((rel) => (
              <Link
                key={rel.id}
                href={`/dresses/${rel.id}`}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#141824] to-[#0c0e14] border border-white/10 hover:border-[#EAA838]/70 transition-all p-2.5 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-2">
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-106 transition-transform duration-500"
                  />
                  {rel.tag && (
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/70 text-[8px] font-bold text-[#F4C463] uppercase">
                      {rel.tag}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#F4C463]">
                    {rel.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xs font-extrabold text-[#F4C463]">
                      ₹{rel.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] text-gray-400 line-through">
                      ₹{rel.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= STICKY MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden bg-[#0c0e14]/95 border-t border-[#EAA838]/40 p-3 backdrop-blur-xl shadow-2xl flex items-center gap-2.5">
        <div className="flex flex-col shrink-0 min-w-[90px]">
          <span className="text-[10px] text-gray-400">Total Price</span>
          <span className="text-base font-extrabold text-[#F4C463]">
            ₹{(dress.price * quantity).toLocaleString("en-IN")}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="flex-1 py-3 px-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>ADD TO BAG</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyNow}
          className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#F4C463] via-[#EAA838] to-[#D79728] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(234,168,56,0.4)]"
        >
          <Zap className="w-3.5 h-3.5 fill-black" />
          <span>BUY NOW</span>
        </motion.button>
      </div>

      {/* Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoTitle="Ashren Haute Couture Showcase"
        videoCategory="ETHNIC LUXURY DEMO"
      />

      {/* AI Virtual Try-On Modal */}
      <TryOnModal
        dress={dress}
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        onAddToCart={(d, size, color) => {
          setSelectedSize(size);
          const idx = d.colors.findIndex((c) => c.name === color);
          if (idx !== -1) setSelectedColorIdx(idx);
          handleAddToCart();
        }}
      />
    </main>
  );
}

export default function SingleDressPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  return (
    <WeatherProvider>
      <SingleDressContent dressId={unwrappedParams.id} />
    </WeatherProvider>
  );
}
