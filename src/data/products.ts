export interface ProductItem {
  id: string;
  name: string;
  category: string;
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  scriptTop: string;
  scriptSub: string;
  badge1: { value: string; label: string };
  badge2: { value: string; label: string };
  badge3: { value: string; label: string };
  badge4: { value: string; label: string; iconType: "feather" | "battery" };
  price: number;
  variant: string;
  image: string;
  cards: [string, string, string];
  mobileSpecs: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  }[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "ashren-4k-camera",
    name: "Ashren 4K Pocket Gimbal Camera",
    category: "CREATOR GADGETS",
    eyebrow: "CAPTURE • CREATE • EXPLORE",
    headline: "Your Story",
    headlineHighlight: "Anywhere",
    subtitle: "Ashren brings you premium gadgets for creators, travelers and everyday adventurers.",
    scriptTop: "Small Camera",
    scriptSub: "Big Possibilities",
    badge1: { value: "4K", label: "Ultra HD" },
    badge2: { value: "180°", label: "Rotation" },
    badge3: { value: "AI", label: "Stabilization" },
    badge4: { value: "LIGHTWEIGHT", label: "& Portable", iconType: "feather" },
    price: 24999,
    variant: "Midnight Onyx • 128GB Bundle",
    image: "/product/camera.png",
    cards: [
      "/card/camera/card1.png",
      "/card/camera/card2.png",
      "/card/camera/card3.png",
    ],
    mobileSpecs: [
      { id: "4k", title: "4K", subtitle: "Ultra HD", icon: "4k" },
      { id: "video", title: "HIGH", subtitle: "Frame Rate", icon: "video" },
      { id: "rotation", title: "180°", subtitle: "Rotation", icon: "rotation" },
      { id: "touch", title: "TOUCH", subtitle: "Screen", icon: "touch" },
      { id: "feather", title: "LIGHTWEIGHT", subtitle: "& Portable", icon: "feather" },
    ],
  },
  {
    id: "ashren-t1-drone",
    name: "Ashren T1 Falcon 4K FPV Drone",
    category: "AERIAL CINEMATOGRAPHY",
    eyebrow: "FLY • EXPLORE • DISCOVER",
    headline: "Sky View",
    headlineHighlight: "Unlimited",
    subtitle: "Ultra-compact quadcopter with 4K HDR camera, live FPV screen controller & optical flow stability.",
    scriptTop: "Fly Higher",
    scriptSub: "See Beyond",
    badge1: { value: "4K", label: "HDR Camera" },
    badge2: { value: "360°", label: "Prop Guard" },
    badge3: { value: "FPV", label: "Live Remote" },
    badge4: { value: "45 MIN", label: "Flight Time", iconType: "battery" },
    price: 38999,
    variant: "Arctic White • FPV Controller Bundle",
    image: "/product/drone.png",
    cards: [
      "/card/drone/card1.png",
      "/card/drone/card2.png",
      "/card/drone/card3.png",
    ],
    mobileSpecs: [
      { id: "4k", title: "4K", subtitle: "HDR Video", icon: "4k" },
      { id: "fpv", title: "FPV", subtitle: "Live Screen", icon: "video" },
      { id: "guard", title: "360°", subtitle: "Obstacle Safe", icon: "rotation" },
      { id: "gps", title: "AUTO", subtitle: "Hover & Return", icon: "touch" },
      { id: "battery", title: "45 MIN", subtitle: "Flight Time", icon: "feather" },
    ],
  },
  {
    id: "ashren-aquago-4k",
    name: "Ashren AquaGo 4K Waterproof Action Cam",
    category: "WATERPROOF & ACTION",
    eyebrow: "DIVE • RECORD • ADVENTURE",
    headline: "Pure Action",
    headlineHighlight: "Unstoppable",
    subtitle: "All-weather waterproof 4K action camera with magnetic mount, HorizonLock stabilization & ultra-wide lens.",
    scriptTop: "Go Deeper",
    scriptSub: "Capture Adventure",
    badge1: { value: "4K 60", label: "FPS Video" },
    badge2: { value: "IPX8", label: "Waterproof" },
    badge3: { value: "AI", label: "HorizonLock" },
    badge4: { value: "MAGNETIC", label: "Snap Mount", iconType: "feather" },
    price: 19999,
    variant: "Obsidian Black • Waterproof Explorer Kit",
    image: "/product/camera2.png",
    cards: [
      "/card/camera/card2.png",
      "/card/camera/card1.png",
      "/card/camera/card3.png",
    ],
    mobileSpecs: [
      { id: "4k", title: "4K 60", subtitle: "FPS Ultra HD", icon: "4k" },
      { id: "ipx8", title: "IPX8", subtitle: "Waterproof", icon: "video" },
      { id: "horizon", title: "360°", subtitle: "Horizon Lock", icon: "rotation" },
      { id: "touch", title: "SNAP", subtitle: "Magnetic Quick", icon: "touch" },
      { id: "feather", title: "FEATHER", subtitle: "Ultra Compact", icon: "feather" },
    ],
  },
];
