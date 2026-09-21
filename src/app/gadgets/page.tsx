"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ScrollExperience from "@/components/ScrollExperience";
import CartDrawer from "@/components/CartDrawer";
import VideoModal from "@/components/VideoModal";
import { WeatherProvider } from "@/context/WeatherContext";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, ProductItem } from "@/data/products";

function GadgetsPageContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoModalInfo, setVideoModalInfo] = useState({
    title: "Ashren 4K Ultra HD Gimbal Showcase",
    category: "CINEMATIC DEMO",
  });
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

  const handleOpenVideo = (title?: string, category?: string) => {
    if (title && category) {
      setVideoModalInfo({ title, category });
    }
    setIsVideoModalOpen(true);
  };

  const handleShopNow = (product?: ProductItem) => {
    const target = product || PRODUCTS[0];
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === target.id);
      if (exists) {
        return prev.map((item) =>
          item.id === target.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: target.id,
          name: target.name,
          variant: target.variant,
          price: target.price,
          quantity: 1,
          image: target.image,
        },
      ];
    });

    setToastMessage(`Added ${target.name} to your cart!`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
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

  return (
    <main className="relative min-h-screen text-white flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Gadgets Page Cinematic Background Image */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
        <Image
          src="/product/gadegetbackground.png"
          alt="Ashren Creator Tech Cinematic Drone Landscape Background"
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
        onOpenVideo={() => handleOpenVideo()}
        isLoaded={true}
      />

      {/* Header Banner & Breadcrumb */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-[#F4C463] font-semibold">Creator Gadgets & Cameras</span>
        </div>
      </div>

      {/* Flagship Gadgets Experience (2 in 1 Row on Mobile) */}
      <div className="flex-1">
        <ScrollExperience
          onShopNow={handleShopNow}
          onOpenVideo={handleOpenVideo}
        />
      </div>

      {/* Modals & Drawers */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoTitle={videoModalInfo.title}
        videoCategory={videoModalInfo.category}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  );
}

export default function GadgetsPage() {
  return (
    <WeatherProvider>
      <GadgetsPageContent />
    </WeatherProvider>
  );
}
