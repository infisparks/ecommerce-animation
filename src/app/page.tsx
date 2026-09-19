"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import DesktopHero from "@/components/DesktopHero";
import MobileHero from "@/components/MobileHero";
import VideoModal from "@/components/VideoModal";
import CartDrawer from "@/components/CartDrawer";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoModalInfo, setVideoModalInfo] = useState({
    title: "Ashren 4K Ultra HD Gimbal Showcase",
    category: "CINEMATIC DEMO",
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: "ashren-4k-camera",
      name: "Ashren 4K Pocket Gimbal Camera",
      variant: "Midnight Onyx • 128GB Bundle",
      price: 24999,
      quantity: 1,
      image: "/camera/camera.png",
    },
  ]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenVideo = (title?: string, category?: string) => {
    if (title && category) {
      setVideoModalInfo({ title, category });
    }
    setIsVideoModalOpen(true);
  };

  const handleShopNow = () => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === "ashren-4k-camera");
      if (exists) {
        return prev.map((item) =>
          item.id === "ashren-4k-camera"
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: "ashren-4k-camera",
          name: "Ashren 4K Pocket Gimbal Camera",
          variant: "Midnight Onyx • 128GB Bundle",
          price: 24999,
          quantity: 1,
          image: "/camera/camera.png",
        },
      ];
    });

    setToastMessage("Added Ashren 4K Gimbal Camera to your cart!");
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
    <main className="relative min-h-screen text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Global Background Images (Responsive: Desktop vs Mobile) */}
      <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden">
        {/* Desktop Background */}
        <div className="hidden lg:block relative w-full h-full">
          <Image
            src="/background.png"
            alt="Ashren Cinematic Mountain Landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.01]"
          />
        </div>

        {/* Mobile Background */}
        <div className="block lg:hidden relative w-full h-full">
          <Image
            src="/background-mobile.png"
            alt="Ashren Mobile Cinematic Landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top scale-[1.01]"
          />
        </div>

        {/* Subtle cinematic ambient vignette for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
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
      />

      {/* Responsive View Switcher: Desktop layout for lg+ screens, Mobile layout for <lg screens */}
      <div className="w-full flex-1 flex flex-col justify-center">
        {/* Desktop View */}
        <div className="hidden lg:block w-full">
          <DesktopHero
            onShopNow={handleShopNow}
            onOpenVideo={handleOpenVideo}
          />
        </div>

        {/* Mobile View */}
        <div className="block lg:hidden w-full">
          <MobileHero
            onShopNow={handleShopNow}
            onOpenVideo={handleOpenVideo}
          />
        </div>
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
