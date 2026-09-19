"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {
    id: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[130] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md bg-[#0d0f15] border-l border-white/10 h-full flex flex-col justify-between z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/30">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#EAA838]" />
                <h2 className="text-lg font-semibold text-white">Your Cart</h2>
                <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#EAA838]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-medium text-base mb-1">Your cart is empty</h3>
                  <p className="text-xs text-gray-400 max-w-xs mb-6">
                    Add the Ashren 4K Pocket Gimbal Camera to start capturing cinematic memories.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex gap-3.5 items-center hover:border-[#EAA838]/40 transition-colors"
                  >
                    <div className="relative w-16 h-20 bg-black/40 rounded-lg p-1 shrink-0 flex items-center justify-center border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.variant}</p>
                      <p className="text-sm font-bold text-[#F4C463] mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-black/40 border border-white/15 rounded-md px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold text-white px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-black/40 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span className="text-emerald-400 font-medium">FREE (Across India)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                    <span className="font-semibold text-white">Estimated Total</span>
                    <span className="font-bold text-lg text-[#F4C463]">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-400 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#EAA838]" />
                  <span>100% Encrypted & Safe Checkout</span>
                </div>

                <button
                  onClick={() => alert("Proceeding to secure payment gateway...")}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-sm shadow-[0_0_20px_rgba(234,168,56,0.4)] hover:bg-gold-gradient-hover flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
