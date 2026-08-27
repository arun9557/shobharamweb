"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ===================================================================
//  BRAND COLOR CONSTANTS (exact from Shobharam's logo)
// ===================================================================
const C = {
  green:       "#1B4D30",
  greenDark:   "#0F3320",
  greenLight:  "#2A6B43",
  gold:        "#C8952A",
  goldLight:   "#E8C46A",
  goldMuted:   "#F0DC9A",
  cream:       "#F5EDD7",
  creamLight:  "#FBF6EC",
  creamDark:   "#EAD9B8",
  textDark:    "#1C2B1F",
  textMuted:   "#4A6352",
} as const;

// ===================================================================
//  DATA
// ===================================================================
interface MenuItem {
  id: number;
  name: string;
  hindiName: string;
  category: "sweets" | "restaurant" | "snacks";
  tag: string;
  price: string;
  desc: string;
  icon: string;
  rating: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Royal Kaju Katli",
    hindiName: "शाही काजू कतली",
    category: "sweets",
    tag: "Bestseller ⭐",
    price: "₹950 / kg",
    desc: "Premium Goan cashews, pure cardamom, and edible silver vark. Silky melt-in-mouth luxury, crafted daily.",
    icon: "💎",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Desi Ghee Gulab Jamun",
    hindiName: "देसी घी गुलाब जामुन",
    category: "sweets",
    tag: "Chef's Special 👑",
    price: "₹480 / kg",
    desc: "Soft khoya dumplings fried in 100% pure desi ghee, soaked in rose-saffron syrup. A timeless classic.",
    icon: "🍯",
    rating: 5.0,
  },
  {
    id: 3,
    name: "Malai Roll",
    hindiName: "मलाई रोल",
    category: "sweets",
    tag: "Fan Favourite 💚",
    price: "₹600 / kg",
    desc: "Creamy chena rolls dusted with dry fruits and saffron. Soft, luxurious, and irresistibly fresh.",
    icon: "🥛",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Shobharam's Royal Thali",
    hindiName: "शोभाराम स्पेशल थाली",
    category: "restaurant",
    tag: "Complete Meal 🍱",
    price: "₹280",
    desc: "Shahi Paneer + Dal Makhani + Seasonal Sabzi + Jeera Rice + 2 Naan + Raita + Salad + Gulab Jamun.",
    icon: "🍱",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Tandoori Paneer Tikka",
    hindiName: "तंदूरी पनीर टिक्का",
    category: "restaurant",
    tag: "Tandoor Special 🔥",
    price: "₹220",
    desc: "Fresh malai paneer cubes marinated in hung curd & secret tandoori spices, char-grilled to perfection.",
    icon: "🍢",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Special Butter Masala Dosa",
    hindiName: "बटर मसाला डोसा",
    category: "snacks",
    tag: "Crispy Delight ✨",
    price: "₹160",
    desc: "Golden crispy crepe roasted in pure butter, stuffed with spiced potato masala, with hot sambar & coconut chutney.",
    icon: "🥞",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Veg Hakka Noodles",
    hindiName: "वेज हक्का नूडल्स",
    category: "snacks",
    tag: "Indo-Chinese 🍜",
    price: "₹140",
    desc: "Wok-tossed farm vegetables with handpicked sauces and springy noodles. Perfectly spiced, perfectly crunchy.",
    icon: "🍜",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Steamed Veg Momos",
    hindiName: "वेज मोमोज",
    category: "snacks",
    tag: "Evening Special 🥟",
    price: "₹120",
    desc: "Thin-wrapper dumplings filled with crunchy farm vegetables & herbs. Served with fiery red chutney.",
    icon: "🥟",
    rating: 4.7,
  },
  {
    id: 9,
    name: "Chaap Masala",
    hindiName: "चाप मसाला",
    category: "restaurant",
    tag: "Street Favourite 🌶️",
    price: "₹180",
    desc: "Tender soy chaap slow-cooked in a rich, aromatic masala gravy. Served with tandoor-fresh butter roti.",
    icon: "🫕",
    rating: 4.8,
  },
];

const SERVICES = [
  {
    title: "Dine-In Restaurant",
    desc: "Spacious, air-conditioned & family-friendly ambiance. Pure veg North & South Indian cuisine served fresh and hot.",
    icon: "🍽️",
    badge: "Family Seating",
  },
  {
    title: "Fast Home Delivery",
    desc: "Hot meals & premium sweets delivered across Chhapraula & Greater Noida in tamper-proof hygienic packaging.",
    icon: "🛵",
    badge: "Gr. Noida",
  },
  {
    title: "Catering & Events",
    desc: "Full-course live counters for weddings, birthday parties, puja feasts, kitty parties & corporate gatherings.",
    icon: "🎪",
    badge: "500+ Guests",
  },
  {
    title: "Bulk Sweet Orders",
    desc: "Custom gift hampers, Diwali/Holi/Raksha Bandhan sweet boxes, and corporate sweets at wholesale rates.",
    icon: "🎁",
    badge: "Pre-Book Now",
  },
];

const OCCASIONS = [
  { icon: "🎂", label: "Birthday Party" },
  { icon: "💒", label: "Wedding Ceremony" },
  { icon: "🐱", label: "Kitty Party" },
  { icon: "💑", label: "Anniversary" },
  { icon: "🏢", label: "Corporate Party" },
  { icon: "🪔", label: "Puja & Festivals" },
];

// ===================================================================
//  SHARED SECTION HEADER
// ===================================================================
function SectionHeader({
  badge,
  title,
  subtitle,
  light = false,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border"
        style={{
          background: light ? "rgba(200,149,42,0.18)" : "rgba(200,149,42,0.15)",
          borderColor: `${C.gold}60`,
          color: light ? C.goldMuted : C.green,
        }}
      >
        <span style={{ color: C.gold }}>✦</span> {badge}
      </div>
      <h2
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
        style={{ color: light ? C.creamLight : C.green }}
      >
        {title}
      </h2>
      {/* Decorative gold divider */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-12 block" style={{ background: C.gold }} />
        <span style={{ color: C.gold }}>❧</span>
        <span className="h-px w-12 block" style={{ background: C.gold }} />
      </div>
      {subtitle && (
        <p
          className="text-base md:text-lg font-light leading-relaxed"
          style={{ color: light ? "#D4C4A0" : C.textMuted }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ===================================================================
//  MAIN PAGE
// ===================================================================
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"all" | "sweets" | "restaurant" | "snacks">("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredItems =
    activeCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory);

  const openOrder = (item?: string) => {
    setSelectedItem(item || null);
    setOrderModalOpen(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-leaf-pattern"
      style={{ background: C.creamLight, color: C.textDark }}
    >
      {/* ============================================================
          TOP ANNOUNCEMENT BAR
      ============================================================ */}
      <div
        className="py-2 px-4 text-center text-xs md:text-sm font-medium border-b"
        style={{ background: C.green, borderColor: `${C.gold}50` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
          <span style={{ color: C.goldMuted }}>
            <span
              className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ background: C.gold }}
            />
            ✨ &ldquo;स्वाद जो भरोसा जगाए&rdquo; &mdash; 100% Pure Desi Ghee | No Adulteration
          </span>
          <div className="flex items-center gap-3" style={{ color: "#ccc" }}>
            <span className="hidden sm:inline">⏰ Open Daily 8AM–11PM</span>
            <a
              href="tel:9068935364"
              className="font-bold hover:underline"
              style={{ color: C.goldLight }}
            >
              📞 9068935364
            </a>
            <span>|</span>
            <a
              href="tel:9548089761"
              className="font-bold hover:underline"
              style={{ color: C.goldLight }}
            >
              9548089761
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <nav
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(251,246,236,0.97)" : C.creamLight,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.gold}40`,
          boxShadow: scrolled ? "0 4px 20px rgba(27,77,48,0.10)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 shadow-md transition-transform group-hover:scale-105"
                style={{ borderColor: C.gold }}>
                <Image
                  src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                  alt="Shobharam's Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="font-serif text-xl md:text-2xl font-extrabold tracking-tight"
                  style={{ color: C.green }}
                >
                  Shobharam&apos;s
                </span>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: C.gold }}
                >
                  Sweets &amp; Restaurant
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">
              {[
                { label: "Sweets", href: "#menu" },
                { label: "Restaurant", href: "#menu" },
                { label: "Catering", href: "#services" },
                { label: "About Us", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold transition-colors relative group"
                  style={{ color: C.green }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                    style={{ background: C.gold }}
                  />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all hover:scale-105"
                style={{ color: C.green, borderColor: `${C.gold}80`, background: `${C.gold}18` }}
              >
                💬 WhatsApp
              </a>
              <button
                onClick={() => openOrder()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all hover:scale-105 animate-pulse-glow cursor-pointer"
                style={{ background: C.green, border: `2px solid ${C.gold}` }}
              >
                🛍️ Order Online
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => openOrder()}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white cursor-pointer"
                style={{ background: C.green, border: `1.5px solid ${C.gold}` }}
              >
                Order
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg"
                style={{ color: C.green }}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t animate-fadeIn px-4 pt-3 pb-6 space-y-1"
            style={{ background: C.creamLight, borderColor: `${C.gold}40` }}
          >
            {[
              { icon: "🍬", label: "Pure Ghee Sweets", href: "#menu" },
              { icon: "🍛", label: "Restaurant Menu", href: "#menu" },
              { icon: "🎪", label: "Catering & Events", href: "#services" },
              { icon: "🏛️", label: "Our Heritage", href: "#about" },
              { icon: "📍", label: "Contact & Timings", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ color: C.green }}
              >
                <span>{item.icon}</span> {item.label}
              </a>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: `${C.gold}30` }}>
              <a
                href="tel:9068935364"
                className="w-full block text-center py-3 rounded-full font-bold text-white shadow-md"
                style={{ background: C.green }}
              >
                📞 Call 9068935364 to Order
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================
          HERO SECTION
      ============================================================ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(135deg, ${C.creamLight} 0%, ${C.cream} 60%, ${C.creamDark} 100%)` }}
      >
        {/* Decorative Background Blobs */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: C.gold }}
        />
        <div
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: C.green }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-7 animate-fade-slide-up">
              {/* Gold Tagline Badge */}
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border shadow-sm"
                style={{
                  background: `${C.gold}20`,
                  borderColor: C.gold,
                  color: C.green,
                }}
              >
                <span>👑</span>
                <span>स्वाद जो भरोसा जगाए &bull; Pure Vegetarian Delight</span>
              </div>

              {/* Hero Heading */}
              <h1
                className="font-serif font-bold leading-[1.1] tracking-tight"
                style={{ color: C.green, fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
              >
                Where Taste{" "}
                <span className="relative inline-block">
                  <span className="text-shimmer">Meets Tradition</span>
                  {/* Underline flourish */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    style={{ height: "10px" }}
                  >
                    <path
                      d="M5,8 Q75,1 150,8 Q225,15 295,6"
                      stroke={C.gold}
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subheading */}
              <p
                className="text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto lg:mx-0"
                style={{ color: C.textMuted }}
              >
                Indulge in the royal legacy of authentic Indian sweets crafted
                with <strong style={{ color: C.green }}>100% pure desi ghee</strong>,
                mouthwatering dine-in meals, and grand celebratory catering —
                all under one roof in{" "}
                <strong style={{ color: C.green }}>Chhapraula, Greater Noida</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => openOrder()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white shadow-xl cursor-pointer transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                    border: `2px solid ${C.gold}`,
                  }}
                >
                  🛍️ Order Online Now
                </button>
                <a
                  href="#services"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold border-2 transition-all hover:scale-105"
                  style={{
                    color: C.green,
                    borderColor: C.gold,
                    background: `${C.gold}15`,
                  }}
                >
                  🎪 View Catering Services
                </a>
              </div>

              {/* Trust Stats */}
              <div
                className="grid grid-cols-3 gap-4 pt-6 border-t max-w-lg mx-auto lg:mx-0"
                style={{ borderColor: `${C.gold}40` }}
              >
                {[
                  { value: "100%", label: "Pure Desi Ghee" },
                  { value: "50+", label: "Artisanal Sweets" },
                  { value: "4.9 ★", label: "Avg. Rating" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div
                      className="text-2xl md:text-3xl font-bold font-serif"
                      style={{
                        color: stat.label === "Avg. Rating" ? C.gold : C.green,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Real Logo + Food Showcase Rings */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Outer slow-spinning decorative ring */}
              <div
                className="animate-spin-slow absolute rounded-full border-dashed border-2 pointer-events-none"
                style={{
                  width: "440px",
                  height: "440px",
                  borderColor: `${C.gold}60`,
                }}
              />

              {/* Inner counter-spinning ring */}
              <div
                className="animate-spin-slow-reverse absolute rounded-full border border-dotted pointer-events-none"
                style={{
                  width: "380px",
                  height: "380px",
                  borderColor: `${C.green}30`,
                }}
              />

              {/* Central circular showcase */}
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 shadow-2xl flex items-center justify-center"
                style={{
                  borderColor: C.gold,
                  background: `radial-gradient(circle, ${C.creamDark}, ${C.cream})`,
                }}
              >
                {/* Background food image (marketing poster) */}
                <Image
                  src="/images/784250679_1248625784023726_2355356267685394005_n.jpg"
                  alt="Shobharam's Premium Sweets Display"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
                {/* Gradient overlay so text is readable */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(to top, ${C.greenDark}E0 0%, ${C.green}40 40%, transparent 100%)`,
                  }}
                />
                {/* Bottom text inside circle */}
                <div className="absolute bottom-6 text-center px-4 z-10">
                  <p className="font-serif font-bold text-base" style={{ color: C.goldMuted }}>
                    Shobharam&apos;s Sweets
                  </p>
                  <p className="text-xs" style={{ color: "#D4C4A0" }}>
                    Made Fresh Daily ✦ Pure Desi Ghee
                  </p>
                </div>
              </div>

              {/* Floating badge: Gulab Jamun */}
              <div
                className="absolute top-4 -left-2 sm:left-2 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-xl border animate-bounce-float"
                style={{
                  background: "rgba(251,246,236,0.97)",
                  borderColor: `${C.gold}60`,
                }}
              >
                <span className="text-2xl">🍯</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: C.green }}>
                    Gulab Jamun
                  </p>
                  <p className="text-[10px]" style={{ color: C.textMuted }}>
                    Pure Desi Ghee
                  </p>
                </div>
              </div>

              {/* Floating badge: Rating */}
              <div
                className="absolute -bottom-4 -right-2 sm:right-2 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-xl border animate-bounce-float-d"
                style={{
                  background: "rgba(251,246,236,0.97)",
                  borderColor: `${C.gold}60`,
                }}
              >
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: C.green }}>
                    4.9 Rating
                  </p>
                  <p className="text-[10px]" style={{ color: C.gold, fontWeight: 600 }}>
                    Trusted Quality
                  </p>
                </div>
              </div>

              {/* Floating badge: Delivery */}
              <div
                className="absolute top-1/2 -right-6 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl shadow-lg border"
                style={{
                  background: "rgba(251,246,236,0.97)",
                  borderColor: `${C.green}30`,
                }}
              >
                <span className="text-xl">🛵</span>
                <div>
                  <p className="text-[11px] font-bold" style={{ color: C.green }}>
                    Home Delivery
                  </p>
                  <p className="text-[9px]" style={{ color: C.textMuted }}>
                    Gr. Noida &amp; Nearby
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES STRIP
      ============================================================ */}
      <section
        className="py-8 px-4 sm:px-6 lg:px-8 border-y"
        style={{
          background: `linear-gradient(90deg, ${C.cream}, ${C.creamDark}, ${C.cream})`,
          borderColor: `${C.gold}40`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌿",
                iconBg: C.green,
                iconColor: "#fff",
                title: "100% Pure Ingredients",
                desc: "Desi ghee, fresh-farm dairy, natural spices. Zero adulteration — always.",
              },
              {
                icon: "🛵",
                iconBg: C.gold,
                iconColor: C.green,
                title: "Fast Home Delivery",
                desc: "Hot meals & fresh sweets delivered across Chhapraula, Greater Noida.",
              },
              {
                icon: "👑",
                iconBg: C.green,
                iconColor: "#fff",
                title: "Grand Event Catering",
                desc: "Weddings, pujas, kitty parties & corporate events — live counters available.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-transform hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  borderColor: `${C.gold}30`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 shadow-md"
                  style={{ background: f.iconBg, color: f.iconColor }}
                >
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base" style={{ color: C.green }}>
                    {f.title}
                  </h4>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: C.textMuted }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOD GALLERY / BRAND SHOWCASE (Real Images)
      ============================================================ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Brand Gallery"
            title="Real Taste, Real People, Real Joy"
            subtitle="A glimpse into our flavorful world — from freshly prepared sweets to grand celebration catering."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large image: Raksha Bandhan poster (best visual quality) */}
            <div
              className="md:row-span-2 relative rounded-3xl overflow-hidden border-2 shadow-xl group cursor-pointer card-hover"
              style={{ borderColor: `${C.gold}60`, minHeight: "300px" }}
            >
              <Image
                src="/images/784790785_1397937109118473_940502782160083656_n.jpg"
                alt="Shobharam's Festive Sweets for Raksha Bandhan"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                style={{ background: `linear-gradient(to top, ${C.greenDark}D0 0%, transparent 60%)` }}
              >
                <div>
                  <p className="font-serif font-bold text-lg" style={{ color: C.goldMuted }}>
                    Festive Sweet Collections
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#D4C4A0" }}>
                    Premium gift boxes for every occasion
                  </p>
                </div>
              </div>
            </div>

            {/* Medium image: Independence Day poster */}
            <div
              className="relative rounded-3xl overflow-hidden border-2 shadow-lg group cursor-pointer card-hover"
              style={{ borderColor: `${C.gold}60`, minHeight: "200px" }}
            >
              <Image
                src="/images/774508909_1077406468037574_3873234585787801976_n.jpg"
                alt="Shobharam's Independence Day Sweet Celebration"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: `linear-gradient(to top, ${C.greenDark}D0 0%, transparent 60%)` }}
              >
                <p className="font-serif font-bold text-sm" style={{ color: C.goldMuted }}>
                  Celebrating Every Occasion with Sweetness
                </p>
              </div>
            </div>

            {/* Raksha Bandhan pre-booking poster */}
            <div
              className="relative rounded-3xl overflow-hidden border-2 shadow-lg group cursor-pointer card-hover"
              style={{ borderColor: `${C.gold}60`, minHeight: "200px" }}
            >
              <Image
                src="/images/784250679_1248625784023726_2355356267685394005_n.jpg"
                alt="Shobharam's Raksha Bandhan Sweet Hamper Pre-Booking"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: `linear-gradient(to top, ${C.greenDark}D0 0%, transparent 60%)` }}
              >
                <p className="font-serif font-bold text-sm" style={{ color: C.goldMuted }}>
                  Pre-Book Your Festive Sweet Hampers
                </p>
              </div>
            </div>

            {/* Hoarding/Signboard image — shows full menu */}
            <div
              className="md:col-span-1 relative rounded-3xl overflow-hidden border-2 shadow-lg group cursor-pointer card-hover"
              style={{ borderColor: `${C.gold}60`, minHeight: "200px" }}
            >
              <Image
                src="/images/762883080_18121173448749343_8663795200494526042_n.jpg"
                alt="Shobharam's Restaurant Signboard — Full Menu Display"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: `linear-gradient(to top, ${C.greenDark}D0 0%, transparent 60%)` }}
              >
                <p className="font-serif font-bold text-sm" style={{ color: C.goldMuted }}>
                  Visit Us at Chhapraula, Greater Noida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MENU / SIGNATURE DELIGHTS
      ============================================================ */}
      <section
        id="menu"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: C.cream }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Taste of Royalty"
            title="Our Signature Delights"
            subtitle="From silky pure-ghee mithai to spicy tandoori platters and crispy South Indian specials — discover what keeps our patrons coming back for more."
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { key: "all", label: "All Specialities" },
              { key: "sweets", label: "🍬 Pure Ghee Sweets" },
              { key: "restaurant", label: "🍛 Restaurant Meals" },
              { key: "snacks", label: "🥟 Snacks & Street Food" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as typeof activeCategory)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer"
                style={
                  activeCategory === key
                    ? {
                        background: C.green,
                        color: "#fff",
                        boxShadow: `0 4px 15px ${C.green}50`,
                        border: `2px solid ${C.gold}`,
                      }
                    : {
                        background: "rgba(255,255,255,0.8)",
                        color: C.green,
                        border: `2px solid ${C.gold}50`,
                      }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden flex flex-col justify-between card-hover"
                style={{
                  border: `1.5px solid ${C.gold}40`,
                  boxShadow: "0 4px 20px rgba(27,77,48,0.08)",
                }}
              >
                {/* Card Image Area */}
                <div
                  className="h-48 relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${C.creamLight}, ${C.cream}, ${C.creamDark})`,
                  }}
                >
                  {/* Subtle dot pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(${C.green} 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Tag */}
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10"
                    style={{ background: C.green, color: C.goldMuted }}
                  >
                    {item.tag}
                  </span>

                  {/* Rating */}
                  <span
                    className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm border z-10 flex items-center gap-1"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      color: C.green,
                      borderColor: `${C.gold}60`,
                    }}
                  >
                    ⭐ {item.rating}
                  </span>

                  {/* Food Icon in ring */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-2 border-dashed bg-white shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: C.gold }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3
                        className="font-serif text-xl font-bold"
                        style={{ color: C.green }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold font-serif" style={{ color: C.gold }}>
                        {item.hindiName}
                      </p>
                    </div>
                    <span
                      className="text-sm font-bold px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0"
                      style={{
                        background: `${C.green}12`,
                        color: C.green,
                        border: `1px solid ${C.green}30`,
                      }}
                    >
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed flex-1" style={{ color: C.textMuted }}>
                    {item.desc}
                  </p>

                  {/* Order Button */}
                  <button
                    onClick={() => openOrder(item.name)}
                    className="mt-2 w-full py-2.5 px-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                      border: `1.5px solid ${C.gold}60`,
                    }}
                  >
                    🛒 Order / Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICES & AMENITIES
      ============================================================ */}
      <section
        id="services"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y"
        style={{ background: "rgba(255,255,255,0.7)", borderColor: `${C.gold}30` }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Hospitality & Services"
            title="We Cater to All Your Celebrations"
            subtitle="From intimate family dinners to 500+ guest grand banquets — Shobharam's delivers unmatched taste and warmth."
          />

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border text-center flex flex-col items-center card-hover"
                style={{
                  background: C.creamLight,
                  borderColor: `${C.gold}35`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-md border-2"
                  style={{ background: "#fff", borderColor: C.gold }}
                >
                  {srv.icon}
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3"
                  style={{ background: `${C.gold}20`, color: C.gold }}
                >
                  {srv.badge}
                </span>
                <h3 className="font-serif text-lg font-bold mb-2" style={{ color: C.green }}>
                  {srv.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Occasions We Serve */}
          <div
            className="rounded-3xl p-6 sm:p-8 mb-10 border"
            style={{
              background: `linear-gradient(135deg, ${C.creamLight}, ${C.creamDark})`,
              borderColor: `${C.gold}40`,
            }}
          >
            <h3
              className="font-serif text-xl font-bold text-center mb-6"
              style={{ color: C.green }}
            >
              🎉 We Make Every Occasion Special
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {OCCASIONS.map((occ) => (
                <div key={occ.label} className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border"
                    style={{ background: "#fff", borderColor: `${C.gold}50` }}
                  >
                    {occ.icon}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: C.green }}>
                    {occ.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Catering CTA Banner */}
          <div
            className="rounded-3xl p-8 sm:p-10 text-white border flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenDark} 100%)`,
              borderColor: C.gold,
            }}
          >
            <div className="space-y-2 text-center md:text-left">
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: C.gold, color: C.green }}
              >
                Custom Menus Available
              </span>
              <h3
                className="font-serif text-2xl sm:text-3xl font-bold"
                style={{ color: C.goldMuted }}
              >
                Planning a Wedding, Party or Corporate Event?
              </h3>
              <p className="text-sm max-w-xl font-light" style={{ color: "#D4C4A0" }}>
                Get personalized sweet gift boxes and full-course live counters tailored
                to your budget and occasion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="tel:9068935364"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-md"
                style={{ background: C.gold, color: C.greenDark }}
              >
                📞 Call Catering Manager
              </a>
              <a
                href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20inquire%20about%20catering%20for%20my%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 text-center flex items-center justify-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: `2px solid ${C.gold}`,
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT / HERITAGE SECTION
      ============================================================ */}
      <section
        id="about"
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: C.creamLight }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text */}
            <div className="lg:col-span-6 space-y-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{ background: `${C.gold}18`, borderColor: `${C.gold}60`, color: C.green }}
              >
                <span style={{ color: C.gold }}>✦</span> Our Authentic Story
              </div>
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: C.green }}
              >
                Crafting Trust &amp; Sweet Traditions in Greater Noida
              </h2>

              <div
                className="flex items-center gap-3"
                style={{ color: C.gold }}
              >
                <span className="h-px w-10 block" style={{ background: C.gold }} />
                <span>❧</span>
                <span className="h-px w-10 block" style={{ background: C.gold }} />
              </div>

              <p className="text-base leading-relaxed font-light" style={{ color: C.textMuted }}>
                At <strong style={{ color: C.green }}>Shobharam&apos;s</strong>, we believe
                food is not merely sustenance — it is an emotion, a blessing, and the
                centerpiece of every joyful celebration. True to our motto,{" "}
                <em style={{ color: C.green }}>&ldquo;Swad Jo Bharosa Jagaye&rdquo;</em>, we uphold
                the strictest standards of purity: genuine milk, farm-fresh khoya, and
                100% pure desi ghee — every single day.
              </p>
              <p className="text-base leading-relaxed font-light" style={{ color: C.textMuted }}>
                Whether you stop by for a piping-hot morning breakfast, a lavish family
                dinner, or a custom Diwali gift hamper of Kaju Katli, our family
                welcomes yours with warmth, love, and authentic taste.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: "🧼", title: "Immaculate Hygiene", desc: "Sanitized kitchen & pure water filtration. FSSAI compliant." },
                  { icon: "🥛", title: "Farm Fresh Dairy", desc: "Zero adulteration. 100% natural milk & milk solids." },
                  { icon: "🌿", title: "No Preservatives", desc: "Made fresh daily. No artificial colors or additives." },
                  { icon: "🔥", title: "Traditional Recipes", desc: "Age-old halwai recipes passed through generations." },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="p-4 rounded-xl border"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      borderColor: `${C.gold}35`,
                    }}
                  >
                    <div className="text-xl mb-1">{p.icon}</div>
                    <h4 className="font-serif font-bold text-sm" style={{ color: C.green }}>
                      {p.title}
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: C.textMuted }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quote card + logo + address */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Quote Box */}
              <div
                className="relative rounded-3xl p-8 sm:p-10 text-white overflow-hidden border-2 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenDark} 100%)`,
                  borderColor: C.gold,
                }}
              >
                <div className="absolute top-0 right-0 text-9xl opacity-10 select-none translate-x-6 -translate-y-6">
                  🪔
                </div>
                <div className="relative z-10 space-y-5">
                  {/* Actual Logo inside card */}
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-16 h-16 rounded-full overflow-hidden border-2 shadow-md flex-shrink-0"
                      style={{ borderColor: C.gold }}
                    >
                      <Image
                        src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                        alt="Shobharam's Official Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-lg" style={{ color: C.goldMuted }}>
                        Shobharam&apos;s
                      </p>
                      <p className="text-xs" style={{ color: C.goldLight }}>
                        Sweets &amp; Restaurant • Since Est.
                      </p>
                    </div>
                  </div>

                  <span className="text-5xl" style={{ color: C.gold }}>❝</span>
                  <p
                    className="font-serif text-lg sm:text-xl italic leading-relaxed"
                    style={{ color: C.goldMuted }}
                  >
                    &ldquo;A sweet dish prepared with pure devotion and pure ghee carries
                    the very soul of Indian hospitality.&rdquo;
                  </p>
                  <div
                    className="border-t pt-4"
                    style={{ borderColor: `${C.gold}40` }}
                  >
                    <h4 className="font-bold text-sm text-white">Shobharam Family</h4>
                    <p className="text-xs mt-0.5" style={{ color: "#D4C4A0" }}>
                      Founders &amp; Master Halwais, Shobharam&apos;s Sweets &amp; Restaurant
                    </p>
                  </div>

                  {/* Address inside card */}
                  <div
                    className="rounded-xl p-4 border text-xs space-y-1"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderColor: `${C.gold}40`,
                    }}
                  >
                    <p className="font-semibold" style={{ color: C.goldMuted }}>
                      📍 Visit Us At:
                    </p>
                    <p style={{ color: "#D4C4A0" }}>
                      P. No. 7A, Gate No.01, Sai Heritage,
                      <br />
                      Chhapraula, Greater Noida, G.B. Nagar (UP - 201009)
                    </p>
                  </div>
                </div>
              </div>

              {/* Purity Badges Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🌱", label: "100% Veg" },
                  { icon: "🥛", label: "Pure Ghee" },
                  { icon: "✅", label: "Hygienic" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="py-3 rounded-2xl flex flex-col items-center gap-1 border shadow-sm"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      borderColor: `${C.gold}40`,
                    }}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-xs font-bold" style={{ color: C.green }}>
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT & DIRECT ORDER SECTION
      ============================================================ */}
      <section
        id="contact"
        className="py-12 px-4 sm:px-6 lg:px-8 border-t"
        style={{ background: C.cream, borderColor: `${C.gold}30` }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            style={{ borderColor: `${C.gold}40` }}
          >
            <div className="space-y-3">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: C.gold }}
              >
                Direct Ordering &amp; Reservations
              </span>
              <h3
                className="font-serif text-2xl sm:text-3xl font-bold"
                style={{ color: C.green }}
              >
                Ready to Order Fresh Delights?
              </h3>
              <p className="text-sm" style={{ color: C.textMuted }}>
                Call us for immediate delivery, table reservations, or catering inquiries.
              </p>
              <div
                className="flex items-center gap-2 text-xs font-semibold"
                style={{ color: C.textMuted }}
              >
                ⏰ <span>Open Every Day: 8:00 AM – 11:00 PM</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: "📞",
                  iconBg: C.green,
                  iconColor: "#fff",
                  label: "Primary Phone",
                  number: "+91 9068935364",
                  href: "tel:9068935364",
                },
                {
                  icon: "📱",
                  iconBg: C.gold,
                  iconColor: C.green,
                  label: "WhatsApp & Alternate",
                  number: "+91 9548089761",
                  href: "tel:9548089761",
                },
              ].map((phone) => (
                <a
                  key={phone.number}
                  href={phone.href}
                  className="flex items-center gap-4 p-3.5 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-md"
                  style={{
                    background: C.creamLight,
                    borderColor: `${C.gold}40`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0"
                    style={{ background: phone.iconBg, color: phone.iconColor }}
                  >
                    {phone.icon}
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: C.textMuted }}>
                      {phone.label}
                    </div>
                    <div className="font-bold text-base" style={{ color: C.green }}>
                      {phone.number}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order%20food%2Fsweets."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-md"
                style={{ background: "#25D366" }}
              >
                💬 Order on WhatsApp
              </a>
              <button
                onClick={() => openOrder()}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-md cursor-pointer border"
                style={{ background: C.green, borderColor: C.gold }}
              >
                🛍️ Online Order Inquiry
              </button>
              <a
                href="#menu"
                className="w-full py-3 px-6 rounded-full font-semibold text-sm transition-all text-center border"
                style={{ color: C.green, borderColor: `${C.gold}60`, background: `${C.gold}12` }}
              >
                📜 View Full Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer
        className="pt-16 pb-8 border-t-4"
        style={{ background: C.green, borderColor: C.gold }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b"
            style={{ borderColor: `${C.gold}25` }}
          >
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="relative w-14 h-14 rounded-full overflow-hidden border-2 shadow-md shrink-0"
                  style={{ borderColor: C.gold }}
                >
                  <Image
                    src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                    alt="Shobharam's Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3
                    className="font-serif text-xl font-bold"
                    style={{ color: C.goldMuted }}
                  >
                    Shobharam&apos;s
                  </h3>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: C.goldLight }}
                  >
                    Sweets &amp; Restaurant
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed font-light" style={{ color: "#B0C4B8" }}>
                &ldquo;स्वाद जो भरोसा जगाए&rdquo; — Pure desi ghee sweets, tandoori
                delicacies, South Indian specials &amp; grand catering with love and purity.
              </p>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  color: C.goldLight,
                  borderColor: `${C.gold}30`,
                }}
              >
                🌱 100% Pure Vegetarian
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4
                className="font-serif text-lg font-bold border-b pb-2"
                style={{ color: C.goldMuted, borderColor: `${C.gold}30` }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { emoji: "🍬", label: "Pure Ghee Sweets", href: "#menu" },
                  { emoji: "🍛", label: "Restaurant Menu", href: "#menu" },
                  { emoji: "🎪", label: "Event Catering", href: "#services" },
                  { emoji: "🏛️", label: "Our Heritage", href: "#about" },
                  { emoji: "📍", label: "Contact & Delivery", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs flex items-center gap-2 transition-colors hover:underline"
                      style={{ color: "#B0C4B8" }}
                    >
                      <span>{link.emoji}</span> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h4
                className="font-serif text-lg font-bold border-b pb-2"
                style={{ color: C.goldMuted, borderColor: `${C.gold}30` }}
              >
                Visit Our Shop
              </h4>
              <p className="text-xs leading-relaxed font-light" style={{ color: "#B0C4B8" }}>
                <strong style={{ color: "#D4D8D0" }}>Shobharam&apos;s Sweets &amp; Restaurant</strong>
                <br />
                P. No. 7A, Gate No.01,
                <br />
                Sai Heritage, Chhapraula,
                <br />
                Greater Noida, G.B. Nagar,
                <br />
                <strong style={{ color: C.goldLight }}>UP – 201009</strong>
              </p>
              <p className="text-xs" style={{ color: `${C.gold}CC` }}>
                📍 Ample parking &amp; AC family seating available.
              </p>
            </div>

            {/* Timings */}
            <div className="space-y-3">
              <h4
                className="font-serif text-lg font-bold border-b pb-2"
                style={{ color: C.goldMuted, borderColor: `${C.gold}30` }}
              >
                Timings &amp; Contact
              </h4>
              <div className="text-xs space-y-1" style={{ color: "#B0C4B8" }}>
                <p className="font-semibold" style={{ color: "#D4D8D0" }}>
                  ⏰ Opening Hours:
                </p>
                <p>Open Daily: 8:00 AM – 11:00 PM</p>
                <p style={{ color: "#90A090" }}>All 7 Days a Week</p>
              </div>
              <div className="pt-2 text-xs space-y-1.5">
                <p className="font-semibold" style={{ color: "#D4D8D0" }}>
                  📞 Phone / WhatsApp:
                </p>
                <a
                  href="tel:9068935364"
                  className="block font-bold hover:underline"
                  style={{ color: C.goldLight }}
                >
                  +91 9068935364
                </a>
                <a
                  href="tel:9548089761"
                  className="block font-bold hover:underline"
                  style={{ color: C.goldLight }}
                >
                  +91 9548089761
                </a>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div
            className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
            style={{ color: "#7A9A82" }}
          >
            <p>
              © {new Date().getFullYear()} Shobharam&apos;s Sweets &amp; Restaurant. All Rights Reserved.
            </p>
            <p className="font-semibold" style={{ color: C.goldLight }}>
              स्वाद जो भरोसा जगाए &bull; Made with Pure Devotion &amp; Desi Ghee 🙏
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================
          ORDER / INQUIRY MODAL
      ============================================================ */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: "rgba(15,51,32,0.7)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && setOrderModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border-2"
            style={{
              background: C.creamLight,
              borderColor: C.gold,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
              style={{ color: C.textMuted, background: `${C.gold}20` }}
            >
              ✕
            </button>

            {/* Logo in modal */}
            <div className="text-center mb-6">
              <div
                className="relative w-16 h-16 rounded-full overflow-hidden border-2 mx-auto mb-3 shadow-md"
                style={{ borderColor: C.gold }}
              >
                <Image
                  src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                  alt="Shobharam's Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold" style={{ color: C.green }}>
                Order from Shobharam&apos;s
              </h3>
              {selectedItem ? (
                <p className="text-xs mt-1" style={{ color: C.textMuted }}>
                  Inquiring about:{" "}
                  <strong style={{ color: C.green }}>&ldquo;{selectedItem}&rdquo;</strong>
                </p>
              ) : (
                <p className="text-xs mt-1" style={{ color: C.textMuted }}>
                  Fresh Sweets, Dine-In Meals &amp; Party Orders
                </p>
              )}
            </div>

            <div className="space-y-3">
              <p
                className="text-xs p-3 rounded-xl border"
                style={{
                  background: `${C.green}10`,
                  color: C.textMuted,
                  borderColor: `${C.green}25`,
                }}
              >
                📌 For freshness and quick customization, we accept orders via Call &amp; WhatsApp:
              </p>

              <a
                href={`https://wa.me/919068935364?text=${encodeURIComponent(
                  `Hello Shobharam's, I want to order ${selectedItem ? selectedItem : "food/sweets"}. Please share details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md"
                style={{ background: "#25D366" }}
              >
                💬 Order via WhatsApp (9068935364)
              </a>

              <a
                href="tel:9068935364"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md border"
                style={{ background: C.green, borderColor: C.gold }}
              >
                📞 Call Now: +91 9068935364
              </a>

              <a
                href="tel:9548089761"
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border"
                style={{
                  color: C.green,
                  borderColor: `${C.gold}50`,
                  background: `${C.gold}12`,
                }}
              >
                📱 Alternate: +91 9548089761
              </a>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setOrderModalOpen(false)}
                className="text-xs cursor-pointer hover:underline"
                style={{ color: C.textMuted }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
