"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVideo: () => void;
}

export default function Navbar({ cartCount, onOpenCart, onOpenVideo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");

  const navLinks = ["Home", "Shop", "Categories", "Deals", "About", "Support"];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 w-full px-3.5 sm:px-6 lg:px-12 pt-2.5 sm:pt-4 pb-1.5 sm:pb-3"
      >
        <div className="max-w-[1540px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Mobile Left Hamburger Menu Button */}
          <div className="flex items-center lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="p-1.5 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center justify-center lg:justify-start">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative block h-10 sm:h-12 w-36 sm:w-48 transition-transform duration-300"
            >
              <Image
                src="/logo/line-logo.png"
                alt="Ashren Haute Marketplace"
                fill
                sizes="(max-width: 768px) 180px, 220px"
                className="object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_15px_rgba(244,196,99,0.6)]"
                priority
              />
            </motion.a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item, idx) => {
              const isActive = activeNav === item;
              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                  onClick={() => setActiveNav(item)}
                  className={`relative px-3.5 py-1.5 text-sm tracking-wide font-medium transition-colors ${
                    isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item}
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

          {/* Search, Wishlist, Cart & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Input Bar (Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden md:flex items-center"
            >
              <div className="relative flex items-center w-60 lg:w-72 xl:w-80 rounded-full bg-[#10131A]/70 border border-white/15 px-3.5 py-1.5 focus-within:border-[#EAA838]/60 focus-within:ring-1 focus-within:ring-[#EAA838]/40 transition-all backdrop-blur-md">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search gadgets, cameras, accessories..."
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
                className="md:hidden p-2 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Wishlist"
                className="hidden sm:flex p-2 rounded-full hover:bg-white/10 hover:text-red-400 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              {/* Cart Button with Count Badge */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onOpenCart}
                aria-label="Shopping Cart"
                className="relative p-2 rounded-full hover:bg-white/10 hover:text-[#EAA838] transition-all group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute 0 top-0.5 right-0.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-bold text-black bg-[#EAA838] rounded-full shadow-[0_0_10px_#EAA838]"
                >
                  {cartCount}
                </motion.span>
              </motion.button>

              {/* Profile Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="User Profile"
                className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-In Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-[#0c0e14] border-r border-white/10 z-[100] p-6 flex flex-col justify-between lg:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="relative h-10 w-28">
                    <Image
                      src="/logo/line-logo.png"
                      alt="Ashren Logo"
                      fill
                      className="object-contain filter brightness-125 drop-shadow-[0_0_10px_rgba(244,196,99,0.5)]"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="mt-5">
                  <div className="relative flex items-center w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search gadgets..."
                      className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Nav list */}
                <div className="mt-6 flex flex-col gap-1">
                  {navLinks.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveNav(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeNav === item
                          ? "bg-gradient-to-r from-[#EAA838]/20 to-transparent text-[#F4C463] border-l-2 border-[#EAA838]"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom drawer buttons */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVideo();
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 text-sm font-medium text-white hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  <span>▶</span> Watch 4K Demo
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-sm shadow-[0_0_15px_rgba(234,168,56,0.4)] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Open Cart ({cartCount})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
