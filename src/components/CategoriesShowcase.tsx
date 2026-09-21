"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Sparkles,
  Crown,
  Camera,
  Layers,
  ArrowUpRight,
  Gem,
  Zap,
} from "lucide-react";

interface CategoryPod {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  itemCount: string;
  tag: string;
  image: string;
  href: string;
  icon: React.ReactNode;
  accentColor: string;
  glowGradient: string;
}

export default function CategoriesShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics for scroll movement
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  const yLeft = useTransform(smoothProgress, [0, 1], [40, -30]);
  const yCenter = useTransform(smoothProgress, [0, 1], [70, -50]); // Center elevated for 3D royal triptych
  const yRight = useTransform(smoothProgress, [0, 1], [40, -30]);

  const rotateLeft = useTransform(smoothProgress, [0, 0.5, 1], [-4, 0, 4]);
  const rotateCenter = useTransform(smoothProgress, [0, 0.5, 1], [0, 0, 0]);
  const rotateRight = useTransform(smoothProgress, [0, 0.5, 1], [4, 0, -4]);

  const categories: CategoryPod[] = [
    {
      id: "dresses",
      title: "Haute Couture",
      shortTitle: "Dresses",
      subtitle: "Royal Silhouettes",
      itemCount: "17 Designs",
      tag: "Silk & Zari",
      image: "/category/dress-category.jpg",
      href: "/dresses",
      icon: <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4C463]" />,
      accentColor: "#EAA838",
      glowGradient: "from-[#F4C463]/40 via-[#EAA838]/20 to-transparent",
    },
    {
      id: "bridal",
      title: "Royal Bridal",
      shortTitle: "Bridal",
      subtitle: "Velvet & Banarasi",
      itemCount: "Heritage",
      tag: "Bridal Couture",
      image: "/product/dress/dress-3.jpeg",
      href: "/dresses",
      icon: <Gem className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4C463]" />,
      accentColor: "#F4C463",
      glowGradient: "from-[#FFE6A5]/50 via-[#EAA838]/25 to-transparent",
    },
    {
      id: "gadgets",
      title: "Creator Tech",
      shortTitle: "Gadgets",
      subtitle: "4K Gimbal & Drone",
      itemCount: "3 Flagships",
      tag: "4K Cinema",
      image: "/category/gadget-category.jpg",
      href: "/gadgets",
      icon: <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8]" />,
      accentColor: "#38BDF8",
      glowGradient: "from-[#38BDF8]/40 via-[#818CF8]/20 to-transparent",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="categories"
      className="relative w-full py-12 sm:py-20 px-2.5 sm:px-6 lg:px-12 max-w-[1440px] mx-auto z-10 scroll-mt-20 font-sans select-none"
    >
      {/* Background Ambient Radial Light Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#EAA838]/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 px-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#EAA838]/40 text-[#F4C463] text-[9.5px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-2 sm:mb-3 backdrop-blur-md shadow-[0_0_20px_rgba(234,168,56,0.25)]">
          <Layers className="w-3.5 h-3.5 text-[#EAA838]" />
          <span>Departments of Excellence</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Select Your <br />
          <span className="font-serif-luxury italic font-normal text-gold-shimmer drop-shadow-[0_4px_25px_rgba(244,196,99,0.5)]">
            World of Luxury
          </span>
        </h2>
        <p className="text-[11px] sm:text-xs text-gray-300 mt-1.5 max-w-md mx-auto leading-relaxed">
          Explore curated departments crafted in 3D royal arches with signature couture and creator gear.
        </p>
      </motion.div>

      {/* =========================================================================
          3 CATEGORIES IN 1 ROW ON MOBILE & DESKTOP (3D Royal Arch Portals)
          ========================================================================= */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto items-end">
        {categories.map((cat, idx) => {
          // Staggered scroll parallax transform
          const yTransform = idx === 0 ? yLeft : idx === 1 ? yCenter : yRight;
          const rotateTransform = idx === 0 ? rotateLeft : idx === 1 ? rotateCenter : rotateRight;
          const isCenter = idx === 1;

          return (
            <motion.div
              key={cat.id}
              style={{
                y: yTransform,
                rotateZ: rotateTransform,
              }}
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <Link href={cat.href} className="w-full flex flex-col items-center">
                
                {/* 3D ROYAL ARCH PORTAL POD (Architectural Dome Capsule Shape) */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -6 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`relative w-full aspect-[3/5] sm:aspect-[3/4.8] rounded-t-[100px] sm:rounded-t-[140px] rounded-b-2xl sm:rounded-b-3xl overflow-hidden p-[2px] bg-gradient-to-b from-[#F4C463]/80 via-white/15 to-[#EAA838]/60 shadow-[0_15px_40px_rgba(0,0,0,0.85)] group-hover:shadow-[0_20px_55px_rgba(234,168,56,0.45)] transition-all duration-500 ${
                    isCenter ? "ring-2 ring-[#EAA838]/40 scale-[1.03] sm:scale-105" : ""
                  }`}
                >
                  {/* Inner Content Chamber */}
                  <div className="relative w-full h-full rounded-t-[98px] sm:rounded-t-[138px] rounded-b-[14px] sm:rounded-b-[22px] overflow-hidden bg-[#0a0d14]">
                    
                    {/* Background Visual Asset with Smooth Zoom */}
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      priority
                      sizes="(max-width: 640px) 33vw, 25vw"
                      className="object-cover object-top scale-[1.02] group-hover:scale-115 transition-transform duration-700 ease-out"
                    />

                    {/* Multi-Stop Cinematic Vignette Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/50 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                    {/* Ambient Radial Color Flash on Hover */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${cat.glowGradient} pointer-events-none`}
                    />

                    {/* Rotating 3D Orbital Light Ring (Arch Top Corona) */}
                    <div className="absolute top-2 sm:top-4 inset-x-0 flex justify-center z-20 pointer-events-none">
                      <div className="relative p-1.5 sm:p-2.5 rounded-full bg-black/70 border border-[#EAA838]/60 backdrop-blur-md shadow-[0_0_15px_rgba(234,168,56,0.35)] group-hover:scale-110 group-hover:border-[#F4C463] transition-all">
                        {cat.icon}
                        
                        {/* Orbit Glow Particle */}
                        <div className="absolute -inset-1 rounded-full border border-dashed border-[#F4C463]/40 animate-spin-slow pointer-events-none" />
                      </div>
                    </div>

                    {/* Floating Count Badge in Middle */}
                    <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-center z-20 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-black/65 border border-white/20 backdrop-blur-md text-[7px] sm:text-[9px] font-bold tracking-wider text-gray-200 uppercase group-hover:border-[#EAA838]/60 group-hover:text-[#F4C463] transition-colors">
                        {cat.itemCount}
                      </span>
                    </div>

                    {/* Bottom Floating Arrow Indicator */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-20 p-1 sm:p-1.5 rounded-full bg-black/60 border border-white/20 text-gray-300 group-hover:bg-[#EAA838] group-hover:text-black group-hover:border-[#EAA838] transition-all">
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    </div>

                    {/* Bottom Mini Tag */}
                    <div className="absolute bottom-2.5 sm:bottom-3.5 left-2 sm:left-3 z-20 pointer-events-none">
                      <span className="text-[7.5px] sm:text-[10px] font-bold text-[#F4C463] uppercase tracking-wider line-clamp-1">
                        {cat.tag}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Outer Category Title & Subtitle Beneath the 3D Arch */}
                <div className="text-center mt-2.5 sm:mt-3.5 px-0.5 space-y-0.5">
                  <h3 className="text-[11px] sm:text-base font-extrabold text-white tracking-tight leading-tight group-hover:text-[#F4C463] transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[8.5px] sm:text-xs text-gray-400 font-medium line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
