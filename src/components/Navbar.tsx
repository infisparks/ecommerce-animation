"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Home,
  Sparkles,
  LayoutGrid,
  Camera,
  Flame,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherWidget from "@/components/WeatherWidget";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVideo: () => void;
  isLoaded?: boolean;
}

interface NavItemConfig {
  name: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { name: "Home", icon: Home },
  { name: "Dresses", icon: Sparkles, badge: "Trending", badgeColor: "bg-amber-500/20 text-[#F4C463] border-amber-500/40" },
  { name: "Categories", icon: LayoutGrid },
  { name: "Gadgets", icon: Camera, badge: "New", badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  { name: "Deals", icon: Flame, badge: "Hot", badgeColor: "bg-red-500/20 text-red-300 border-red-500/40" },
  { name: "Support", icon: Headphones },
];

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenVideo,
  isLoaded = true,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");

  // Sync active navigation tab with route and scroll position
  useEffect(() => {
    if (pathname.startsWith("/dresses")) {
      setActiveNav("Dresses");
      return;
    }
    if (pathname.startsWith("/gadgets")) {
      setActiveNav("Gadgets");
      return;
    }
    if (pathname === "/") {
      setActiveNav("Home");

      // On home page, detect scroll position for in-page sections
      const handleScroll = () => {
        const categoriesEl = document.getElementById("categories");
        const flagshipEl = document.getElementById("flagship-products");
        const scrollY = window.scrollY + 200;

        if (flagshipEl && scrollY >= flagshipEl.offsetTop) {
          setActiveNav("Deals");
        } else if (categoriesEl && scrollY >= categoriesEl.offsetTop) {
          setActiveNav("Categories");
        } else {
          setActiveNav("Home");
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const handleNavClick = (item: string) => {
    setActiveNav(item);
    setMobileMenuOpen(false);

    if (item === "Dresses") {
      router.push("/dresses");
    } else if (item === "Gadgets") {
      router.push("/gadgets");
    } else if (item === "Categories") {
      if (pathname === "/") {
        const el = document.getElementById("categories");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/#categories");
      }
    } else if (item === "Deals") {
      if (pathname === "/") {
        const el = document.getElementById("flagship-products");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/#flagship-products");
      }
    } else if (item === "Support") {
      if (pathname === "/") {
        const el = document.getElementById("footer") || document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
      } else {
        router.push("/#footer");
      }
    } else if (item === "Home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 w-full px-3.5 sm:px-6 lg:px-12 pt-2.5 sm:pt-4 pb-1.5 sm:pb-3 font-sans"
      >
        <div className="max-w-[1540px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Mobile Left Hamburger Menu Button */}
          <div className="flex items-center lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 text-white/90 hover:text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center justify-center lg:justify-start">
            <Link
              href="/"
              className="relative block h-10 sm:h-12 w-36 sm:w-48 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Image
                src="/logo/line-logo.png"
                alt="Ashren Haute Marketplace"
                fill
                sizes="(max-width: 768px) 180px, 220px"
                className="object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_15px_rgba(244,196,99,0.6)]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeNav === item.name;
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: isLoaded ? 0.1 + idx * 0.05 : 0 }}
                  onClick={() => handleNavClick(item.name)}
                  className={`relative px-3.5 py-1.5 text-sm tracking-wide font-medium transition-colors flex items-center gap-1.5 ${
                    isActive ? "text-[#F4C463] font-semibold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded-full border ${item.badgeColor || "bg-white/10 text-white"}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#EAA838] to-transparent shadow-[0_0_10px_#EAA838]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Weather Widget, Search, Wishlist, Cart & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Weather Widget */}
            <div className="hidden lg:flex items-center">
              <WeatherWidget />
            </div>

            {/* Search Input Bar (Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: isLoaded ? 0.3 : 0 }}
              className="relative hidden md:flex items-center"
            >
              <div className="relative flex items-center w-60 lg:w-72 xl:w-80 rounded-full bg-[#10131A]/70 border border-white/15 px-3.5 py-1.5 focus-within:border-[#EAA838]/60 focus-within:ring-1 focus-within:ring-[#EAA838]/40 transition-all backdrop-blur-md">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search dresses, tech, creator gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3 text-gray-200">
              {/* Mobile Search Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                aria-label="Search"
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Search className="w-4 h-4" />
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Wishlist"
                className="hidden sm:flex p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-red-400 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </motion.button>

              {/* Cart Button with Count Badge */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenCart}
                aria-label="Shopping Cart"
                className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-[#EAA838]/20 to-[#C98418]/20 border border-[#EAA838]/50 hover:border-[#EAA838] text-[#F4C463] hover:text-white transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(234,168,56,0.2)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-bold">Bag</span>
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-black bg-[#EAA838] rounded-full shadow-[0_0_8px_#EAA838]">
                  {cartCount}
                </span>
              </motion.button>

              {/* Profile Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="User Profile"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Weather Status Bar */}
        <div className="flex lg:hidden justify-center items-center pt-2 pb-0.5">
          <WeatherWidget />
        </div>
      </motion.header>

      {/* =========================================================================
          MOBILE SLIDE-IN SIDEBAR DRAWER (Dynamic Active Section Tracking)
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] lg:hidden"
            />

            {/* Sidebar Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] sm:w-[340px] bg-gradient-to-b from-[#121622] via-[#0d1017] to-[#07090e] border-r border-[#EAA838]/30 z-[120] p-5 sm:p-6 flex flex-col justify-between lg:hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-y-auto"
            >
              <div>
                {/* Header with Logo and Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="relative h-9 w-32">
                    <Image
                      src="/logo/line-logo.png"
                      alt="Ashren Logo"
                      fill
                      className="object-contain filter brightness-125 drop-shadow-[0_0_10px_rgba(244,196,99,0.5)]"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close sidebar"
                    className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search Bar in Sidebar */}
                <div className="mt-4">
                  <div className="relative flex items-center w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 focus-within:border-[#EAA838]/60 transition-all">
                    <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search dresses, gadgets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Climate & Dynamic Day/Night Widget */}
                <div className="mt-4 p-3 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 flex flex-col gap-1.5 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] uppercase font-extrabold tracking-wider text-[#EAA838]">
                      Dynamic Climate & Theme
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <WeatherWidget />
                </div>

                {/* Nav list with Dynamic Active States */}
                <div className="mt-5 space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 px-3 pb-1">
                    Navigation
                  </p>
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeNav === item.name;
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.name}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavClick(item.name)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#EAA838]/25 via-[#EAA838]/10 to-transparent text-[#F4C463] border-l-4 border-[#EAA838] shadow-[0_4px_20px_rgba(234,168,56,0.15)]"
                            : "text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-xl ${isActive ? "bg-[#EAA838]/20 text-[#F4C463]" : "bg-white/5 text-gray-400"}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded-full border ${item.badgeColor || "bg-white/10 text-white"}`}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-[#EAA838] translate-x-0.5" : "text-gray-500"}`} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Drawer Quick Actions */}
              <div className="pt-5 mt-4 border-t border-white/10 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVideo();
                  }}
                  className="w-full py-3 px-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span className="w-2 h-2 rounded-full bg-[#EAA838] animate-ping" />
                  <span>Watch 4K Cinematic Demo</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FADB7F] via-[#EAA838] to-[#C98418] text-black font-extrabold text-xs shadow-[0_4px_25px_rgba(234,168,56,0.4)] flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Shopping Bag ({cartCount})</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
