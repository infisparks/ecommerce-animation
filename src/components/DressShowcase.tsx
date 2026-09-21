"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Search,
  ArrowUpDown,
  Check,
  ChevronRight,
} from "lucide-react";
import { DRESSES, DressItem } from "@/data/dresses";
import DressDetailModal from "@/components/DressDetailModal";

interface DressShowcaseProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  }) => void;
}

export default function DressShowcase({ onAddToCart }: DressShowcaseProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const categories = [
    "All",
    "Anarkali & Gowns",
    "Festive Silk",
    "Embroidered Suits",
    "Bridal & Luxury",
    "Chikankari & Organza",
  ];

  const filteredDresses = useMemo(() => {
    return DRESSES.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAdd = (e: React.MouseEvent, dress: DressItem) => {
    e.stopPropagation();
    onAddToCart({
      id: dress.id,
      name: dress.name,
      variant: `${dress.fabric} • Size M`,
      price: dress.price,
      quantity: 1,
      image: dress.image,
    });
  };

  const handleModalAddToCart = (dress: DressItem, size: string, color: string) => {
    onAddToCart({
      id: `${dress.id}-${size}-${color}`,
      name: dress.name,
      variant: `${color} • Size ${size}`,
      price: dress.price,
      quantity: 1,
      image: dress.image,
    });
    setSelectedDress(null);
  };

  return (
    <section id="dresses" className="relative w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 max-w-[1540px] mx-auto z-10 scroll-mt-20 font-sans">
      
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EAA838]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#EAA838]" />
          <span>Haute Couture Collection</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Handcrafted Luxury <br />
          <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
            Dresses & Royal Ensembles
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 mt-2.5 max-w-xl mx-auto leading-relaxed">
          Explore 17 masterfully curated ethnic silhouettes featuring pure Mulberry silk, Italian velvet, and hand-embossed zari threadwork.
        </p>
      </motion.div>

      {/* Filter and Search Bar Controls */}
      <div className="space-y-4 mb-8">
        
        {/* Category Filter Pills (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border shrink-0 ${
                  isActive
                    ? "bg-[#EAA838] text-black border-[#EAA838] shadow-[0_0_15px_rgba(234,168,56,0.4)] font-bold"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {cat === "All" ? `All Designs (${DRESSES.length})` : cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by silhouette, silk, zari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#EAA838]/60 focus:ring-1 focus:ring-[#EAA838]/40 backdrop-blur-md transition-all"
            />
          </div>

          {/* Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 text-xs text-gray-300">
            <span className="font-medium text-gray-400">
              Showing <strong className="text-[#F4C463]">{filteredDresses.length}</strong> of {DRESSES.length} dresses
            </span>

            <div className="flex items-center gap-1.5 bg-black/60 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#EAA838]" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#12151f] text-white">Featured</option>
                <option value="price-low" className="bg-[#12151f] text-white">Price: Low to High</option>
                <option value="price-high" className="bg-[#12151f] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#12151f] text-white">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HIGH-LUXURY DRESSES GRID (2 COLUMNS MOBILE, 3 MD, 4 LG)
          ========================================================================= */}
      {filteredDresses.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl p-8">
          <p className="text-sm text-gray-300">No dresses found matching &quot;{searchQuery}&quot;.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-[#EAA838] text-black font-semibold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {filteredDresses.map((dress, index) => {
            const wish = !!wishlist[dress.id];
            return (
              <motion.div
                key={dress.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
                onClick={() => router.push(`/dresses/${dress.id}`)}
                className="group relative rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-[#151926]/95 via-[#0d1018]/98 to-[#08090e]/100 border border-white/12 hover:border-[#EAA838]/60 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_45px_rgba(234,168,56,0.22)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* 1:1 Aspect Ratio Square Image Stage */}
                <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  />

                  {/* Top Left Floating Tag Badge */}
                  {dress.tag && (
                    <div className="absolute top-2 left-2 z-10 px-2 sm:px-2.5 py-0.5 rounded-full bg-black/75 border border-[#EAA838]/60 backdrop-blur-md text-[8px] sm:text-[9.5px] font-extrabold text-[#F4C463] uppercase tracking-wider shadow-md">
                      {dress.tag}
                    </div>
                  )}

                  {/* Top Right Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, dress.id)}
                    aria-label="Wishlist"
                    className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all active:scale-90 shadow-md"
                  >
                    <Heart className={`w-3.5 h-3.5 ${wish ? "fill-red-500 text-red-500" : "text-gray-200"}`} />
                  </button>

                  {/* Quick AI Try-On Hover Drawer */}
                  <div className="absolute bottom-2 inset-x-2 z-10 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 hidden sm:block pointer-events-none">
                    <div className="w-full py-1.5 px-2.5 rounded-xl bg-black/85 border border-[#EAA838]/80 backdrop-blur-md text-white font-bold text-[10px] sm:text-[11px] flex items-center justify-center gap-1.5 shadow-xl text-[#F4C463]">
                      <Sparkles className="w-3 h-3 text-[#EAA838] animate-pulse" />
                      <span>Virtual Try-On</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Dress Card Information Section */}
                <div className="p-2 sm:p-3 flex flex-col justify-between flex-1 space-y-2 mt-1">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#EAA838] tracking-wider truncate max-w-[68%]">
                        {dress.category}
                      </span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-[9px] sm:text-[10px] text-[#F4C463] font-bold shrink-0">
                        <Star className="w-2.5 h-2.5 fill-[#F4C463] text-[#F4C463]" />
                        <span>{dress.rating}</span>
                      </div>
                    </div>

                    {/* Dress Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-[#F4C463] transition-colors">
                      {dress.name}
                    </h3>

                    {/* Subtitle / Fabric Details */}
                    <p className="text-[9.5px] sm:text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                      {dress.subtitle}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1.5">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1 sm:gap-1.5">
                        <span className="text-xs sm:text-base font-extrabold text-[#F4C463] tracking-tight">
                          ₹{dress.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[9px] sm:text-xs text-gray-500 line-through">
                          ₹{dress.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-[8.5px] sm:text-[9.5px] text-emerald-400 font-bold">
                        {dress.discount}
                      </span>
                    </div>

                    {/* Quick Add To Cart Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleQuickAdd(e, dress)}
                      aria-label="Add to cart"
                      title="Add to cart"
                      className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-[#EAA838] text-gray-200 hover:text-black border border-white/20 hover:border-[#EAA838] transition-all shrink-0 shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Single Dress Details Personal Page / Modal */}
      <DressDetailModal
        dress={selectedDress}
        isOpen={selectedDress !== null}
        onClose={() => setSelectedDress(null)}
        onAddToCart={handleModalAddToCart}
      />
    </section>
  );
}
