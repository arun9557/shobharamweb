"use client";

import React, { useState } from "react";

// --- DATA STRUCTURES ---
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
    tag: "Bestseller",
    price: "₹950 / kg",
    desc: "Made with premium grade Goan cashews, pure cardamom, and edible silver vark. Melt-in-mouth luxury.",
    icon: "💎",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Desi Ghee Gulab Jamun",
    hindiName: "देसी घी गुलाब जामुन",
    category: "sweets",
    tag: "Chef's Special",
    price: "₹480 / kg",
    desc: "Soft, golden khoya dumplings gently fried in 100% pure desi ghee and immersed in saffron rose syrup.",
    icon: "🍯",
    rating: 5.0,
  },
  {
    id: 3,
    name: "Shobharam's Royal Thali",
    hindiName: "शोभाराम स्पेशल थाली",
    category: "restaurant",
    tag: "Complete Meal",
    price: "₹280",
    desc: "Shahi Paneer, Dal Makhani, Seasonal Sabzi, Jeera Rice, 2 Butter Naan/Tandoori Roti, Raita, Salad & Sweet.",
    icon: "🍱",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Tandoori Paneer Tikka",
    hindiName: "तंदूरी पनीर टिक्का",
    category: "restaurant",
    tag: "Tandoor Special",
    price: "₹220",
    desc: "Fresh malai paneer cubes marinated in rich hung curd and secret blend of tandoori spices, char-grilled to perfection.",
    icon: "🍢",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Special Butter Masala Dosa",
    hindiName: "बटर मसाला डोसा",
    category: "snacks",
    tag: "Crispy Delight",
    price: "₹160",
    desc: "Golden crispy fermented crepe roasted in pure butter, stuffed with spiced potato masala, served with piping hot sambar & fresh coconut chutney.",
    icon: "🥞",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Steamed Veg Momos Platter",
    hindiName: "वेज मोमोज प्लेटर",
    category: "snacks",
    tag: "Evening Special",
    price: "₹120",
    desc: "Delicate thin-wrapper dumplings stuffed with crunchy farm vegetables and herbs, served with fiery garlic red chutney.",
    icon: "🥟",
    rating: 4.7,
  },
];

const SERVICES = [
  {
    title: "Dine-In Restaurant",
    desc: "Spacious, air-conditioned & family-friendly ambiance serving hot fresh North & South Indian delicacies.",
    icon: "🍽️",
  },
  {
    title: "Fast Home Delivery",
    desc: "Piping hot food & fresh sweets delivered right to your doorstep across Greater Noida in tamper-proof packaging.",
    icon: "🛵",
  },
  {
    title: "Grand Catering & Events",
    desc: "Flawless catering for weddings, birthdays, corporate lunches, and family gatherings with live counters.",
    icon: "🎪",
  },
  {
    title: "Party & Bulk Bookings",
    desc: "Customized gift boxes, corporate Diwali/Holi sweet hampers, and party platters at wholesale rates.",
    icon: "🎁",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"all" | "sweets" | "restaurant" | "snacks">("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleOrderClick = (itemName?: string) => {
    setSelectedProduct(itemName || null);
    setOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D3748] flex flex-col selection:bg-[#D4AF37] selection:text-[#1A472A]">
      {/* ----------------- TOP ANNOUNCEMENT STRIP ----------------- */}
      <div className="bg-[#1A472A] text-white text-xs md:text-sm py-2 px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[#F4E8B0] font-medium tracking-wide">
              ✨ &ldquo;Swad Jo Bharosa Jagaye&rdquo; | 100% Pure Desi Ghee &amp; Hygienic Preparations
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-gray-300">⏰ Open Daily: 8:00 AM - 11:00 PM</span>
            <a
              href="tel:9068935364"
              className="hover:text-[#D4AF37] transition-colors font-semibold flex items-center gap-1"
            >
              📞 9068935364
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="tel:9548089761"
              className="hover:text-[#D4AF37] transition-colors font-semibold flex items-center gap-1"
            >
              9548089761
            </a>
          </div>
        </div>
      </div>

      {/* ----------------- MAIN NAVBAR ----------------- */}
      <nav className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Tagline */}
            <a href="#" className="group flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A472A] tracking-tight group-hover:text-[#12331E] transition-colors">
                Shobharam&apos;s
              </span>
              <span className="text-[11px] md:text-xs font-semibold tracking-widest text-[#D4AF37] uppercase -mt-1">
                Sweets &amp; Restaurant
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#menu"
                className="text-base font-medium text-[#1A472A] hover:text-[#D4AF37] transition-colors"
              >
                Sweets
              </a>
              <a
                href="#menu"
                className="text-base font-medium text-[#1A472A] hover:text-[#D4AF37] transition-colors"
              >
                Restaurant
              </a>
              <a
                href="#services"
                className="text-base font-medium text-[#1A472A] hover:text-[#D4AF37] transition-colors"
              >
                Catering
              </a>
              <a
                href="#about"
                className="text-base font-medium text-[#1A472A] hover:text-[#D4AF37] transition-colors"
              >
                About Us
              </a>
              <a
                href="#contact"
                className="text-base font-medium text-[#1A472A] hover:text-[#D4AF37] transition-colors"
              >
                Contact &amp; Location
              </a>
            </div>

            {/* Right Action Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleOrderClick()}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold text-sm bg-[#1A472A] text-white hover:bg-[#12331E] shadow-md hover:shadow-lg border border-[#D4AF37]/50 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <span className="mr-2">🛍️</span> Order Online
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => handleOrderClick()}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1A472A] text-white border border-[#D4AF37]/40"
              >
                Order
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#1A472A] hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF9F6] border-b border-[#D4AF37]/30 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-fadeIn">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-[#1A472A] hover:bg-green-50"
            >
              🍬 Traditional Sweets
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-[#1A472A] hover:bg-green-50"
            >
              🍛 Restaurant Menu
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-[#1A472A] hover:bg-green-50"
            >
              🎪 Catering &amp; Events
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-[#1A472A] hover:bg-green-50"
            >
              🏛️ Our Heritage
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-[#1A472A] hover:bg-green-50"
            >
              📍 Contact &amp; Timings
            </a>
            <div className="pt-2 border-t border-gray-200">
              <a
                href="tel:9068935364"
                className="w-full text-center block py-2.5 rounded-full font-semibold bg-[#1A472A] text-white shadow-md"
              >
                📞 Call 9068935364 to Order
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#1A472A]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Royal Gold Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] text-[#1A472A] text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
                <span className="text-[#D4AF37]">👑</span>
                <span>स्वाद जो भरोसा जगाए • Pure Vegetarian Delights</span>
              </div>

              {/* Massive Serif Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A472A] leading-[1.1] tracking-tight">
                Where Taste Meets{" "}
                <span className="relative inline-block text-[#D4AF37]">
                  Tradition
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#D4AF37]/40"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,10 Q50,0 100,10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                    />
                  </svg>
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Indulge in the royal legacy of authentic Indian sweets crafted
                with <strong>100% pure desi ghee</strong>, mouthwatering North
                &amp; South Indian cuisine, and celebratory catering crafted with
                uncompromised hygiene and passion.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleOrderClick()}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base bg-[#1A472A] text-white shadow-lg hover:shadow-xl hover:bg-[#12331E] border border-[#D4AF37] hover:scale-105 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🛍️</span> Order Online Now
                </button>
                <a
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base bg-transparent text-[#1A472A] border-2 border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:scale-105 transition-all duration-200 text-center"
                >
                  🎪 Event &amp; Catering Services
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#D4AF37]/30 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold font-serif text-[#1A472A]">
                    100%
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Pure Desi Ghee
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold font-serif text-[#1A472A]">
                    50+
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Artisanal Sweets
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37]">
                    4.9 ★
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Customer Trust
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual (Dashed Green/Gold Circular Showcase) */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              {/* Outer Decorative Ring */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full p-4 border-4 border-dashed border-[#1A472A]/40 flex items-center justify-center animate-spin-slow">
                {/* Inner Ring */}
                <div className="w-full h-full rounded-full border-2 border-[#D4AF37] p-4 flex items-center justify-center bg-gradient-to-br from-[#FAF9F6] via-[#F4E8B0]/20 to-[#FAF9F6]">
                  {/* Central Food Showcase Circle */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1A472A] to-[#12331E] shadow-2xl flex flex-col items-center justify-center text-center p-6 text-white relative overflow-hidden group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    {/* Big Food Icon */}
                    <span className="text-6xl sm:text-7xl md:text-8xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      🍱
                    </span>

                    {/* Title in Circle */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F4E8B0] mt-3">
                      Shobharam&apos;s Thali
                    </h3>
                    <p className="text-xs text-gray-200 mt-1 font-light max-w-[200px]">
                      Authentic Pure Vegetarian Royal Feast
                    </p>

                    {/* Mini Badge */}
                    <span className="mt-3 px-3 py-1 bg-[#D4AF37] text-[#1A472A] rounded-full text-xs font-bold shadow-xs">
                      Fresh Daily
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Sweets */}
              <div className="absolute -top-2 -left-4 sm:left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#D4AF37]/50 flex items-center gap-3 animate-bounce-subtle">
                <span className="text-2xl">🍯</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#1A472A]">Gulab Jamun</p>
                  <p className="text-[10px] text-gray-500">Pure Desi Ghee</p>
                </div>
              </div>

              {/* Floating Badge 2: Rating & Hygiene */}
              <div className="absolute -bottom-4 -right-2 sm:right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#D4AF37]/50 flex items-center gap-3 animate-bounce-subtle-delayed">
                <span className="text-2xl">✨</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#1A472A]">100% Hygienic</p>
                  <p className="text-[10px] text-[#D4AF37] font-semibold">
                    Govt. Food Standards
                  </p>
                </div>
              </div>

              {/* Floating Badge 3: Fast Delivery */}
              <div className="absolute top-1/2 -right-6 hidden sm:flex bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#1A472A]/20 items-center gap-2">
                <span className="text-xl">🛵</span>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#1A472A]">Quick Delivery</p>
                  <p className="text-[9px] text-gray-500">Gr. Noida &amp; Nearby</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SERVICES STRIP / FEATURE BANNER ----------------- */}
      <section className="bg-gradient-to-r from-green-50/80 via-[#FAF9F6] to-green-50/80 border-y border-[#D4AF37]/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Feature 1 */}
            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-white/50 border border-[#D4AF37]/20 shadow-2xs hover:scale-102 transition-transform">
              <div className="w-12 h-12 rounded-full bg-[#1A472A] text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                🌿
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1A472A]">
                  100% Pure Ingredients
                </h4>
                <p className="text-xs text-gray-600">
                  Desi Ghee, fresh dairy paneer, and authentic handpicked spices.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-white/50 border border-[#D4AF37]/20 shadow-2xs hover:scale-102 transition-transform">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#1A472A] flex items-center justify-center text-2xl shrink-0 shadow-md">
                🛵
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1A472A]">
                  Fast Home Delivery
                </h4>
                <p className="text-xs text-gray-600">
                  Freshly prepared meals &amp; sweets delivered hot &amp; crisp.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-white/50 border border-[#D4AF37]/20 shadow-2xs hover:scale-102 transition-transform">
              <div className="w-12 h-12 rounded-full bg-[#1A472A] text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
                👑
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1A472A]">
                  Grand Event Catering
                </h4>
                <p className="text-xs text-gray-600">
                  Weddings, birthday parties, puja feasts, and corporate events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- BESTSELLERS / SIGNATURE DELIGHTS SECTION ----------------- */}
      <section id="menu" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-[#D4AF37]/15 rounded-full text-[#1A472A] text-xs font-bold uppercase tracking-widest mb-3 border border-[#D4AF37]/40">
              Taste of Royalty
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A472A] tracking-tight">
              Our Signature Delights
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto my-4 rounded-full" />
            <p className="text-base text-gray-600 font-light">
              From traditional festive mithai to spicy tandoori platters and crispy dosas, discover the favorites that keep our patrons coming back.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-[#1A472A] text-white shadow-md"
                    : "bg-white text-[#1A472A] border border-gray-300 hover:border-[#D4AF37]"
                }`}
              >
                All Specialities
              </button>
              <button
                onClick={() => setActiveCategory("sweets")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === "sweets"
                    ? "bg-[#1A472A] text-white shadow-md"
                    : "bg-white text-[#1A472A] border border-gray-300 hover:border-[#D4AF37]"
                }`}
              >
                🍬 Pure Ghee Sweets
              </button>
              <button
                onClick={() => setActiveCategory("restaurant")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === "restaurant"
                    ? "bg-[#1A472A] text-white shadow-md"
                    : "bg-white text-[#1A472A] border border-gray-300 hover:border-[#D4AF37]"
                }`}
              >
                🍛 Restaurant Meals
              </button>
              <button
                onClick={() => setActiveCategory("snacks")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === "snacks"
                    ? "bg-[#1A472A] text-white shadow-md"
                    : "bg-white text-[#1A472A] border border-gray-300 hover:border-[#D4AF37]"
                }`}
              >
                🥟 Snacks &amp; South Indian
              </button>
            </div>
          </div>

          {/* Responsive Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Visual / Placeholder Box */}
                  <div className="h-48 bg-gradient-to-br from-green-50 via-[#FAF9F6] to-[#F4E8B0]/30 relative flex items-center justify-center p-4 border-b border-gray-100 overflow-hidden">
                    {/* Subtle Pattern */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A472A_1px,transparent_1px)] [background-size:12px_12px]"></div>

                    {/* Tag Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#1A472A] text-[#F4E8B0] text-xs font-semibold rounded-full shadow-xs">
                      {item.tag}
                    </span>

                    {/* Rating Badge */}
                    <span className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[#1A472A] text-xs font-bold rounded-full shadow-xs border border-gray-200 flex items-center gap-1">
                      ⭐ {item.rating}
                    </span>

                    {/* Big Visual Emoji in Circular Frame */}
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg border-2 border-dashed border-[#D4AF37] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#1A472A]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#D4AF37] font-medium font-serif">
                          {item.hindiName}
                        </p>
                      </div>
                      <span className="text-base font-bold text-[#1A472A] bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed pt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOrderClick(item.name)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-[#1A472A] text-white hover:bg-[#12331E] shadow-sm hover:shadow-md border border-[#D4AF37]/50 hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🛒</span> Order / Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SERVICES & AMENITIES SECTION ----------------- */}
      <section id="services" className="py-16 bg-white border-y border-[#D4AF37]/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-[#D4AF37]/15 rounded-full text-[#1A472A] text-xs font-bold uppercase tracking-widest mb-3 border border-[#D4AF37]/40">
              Hospitality &amp; Services
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A472A]">
              We Cater to All Your Celebrations
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto my-4 rounded-full" />
            <p className="text-base text-gray-600 font-light">
              Whether you are dining in with family, ordering a quick evening snack, or organizing a 500+ guest wedding banquet, Shobharam&apos;s delivers unmatched hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#D4AF37]/25 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-md border border-[#D4AF37] flex items-center justify-center text-3xl mb-4">
                  {srv.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A472A] mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Catering Callout Box */}
          <div className="mt-12 bg-gradient-to-r from-[#1A472A] to-[#12331E] rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-[#D4AF37]/60 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 bg-[#D4AF37] text-[#1A472A] text-xs font-bold rounded-full">
                Custom Menus Available
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4E8B0]">
                Planning a Wedding, Birthday or Corporate Event?
              </h3>
              <p className="text-sm text-gray-200 max-w-xl font-light">
                Get custom sweet gift boxes and full-course live catering counters tailored to your taste and budget.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="tel:9068935364"
                className="px-6 py-3 rounded-full font-bold text-sm bg-[#D4AF37] text-[#1A472A] hover:bg-[#F4E8B0] shadow-md hover:scale-105 transition-all text-center"
              >
                📞 Call Catering Manager
              </a>
              <a
                href="https://wa.me/919068935364?text=Hello%20Shobharams,%20I%20would%20like%20to%20inquire%20about%20catering%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-[#D4AF37] hover:scale-105 transition-all text-center"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- ABOUT & HERITAGE SECTION ----------------- */}
      <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Box */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#D4AF37]/15 rounded-full text-[#1A472A] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/40">
                Our Authentic Story
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A472A] leading-tight">
                Crafting Trust &amp; Sweet Traditions in Greater Noida
              </h2>
              <p className="text-base text-gray-700 leading-relaxed font-light">
                At <strong>Shobharam&apos;s</strong>, we believe that food is not just sustenance—it is an emotion, a blessing, and a centerpiece of every joyful celebration. True to our motto, <em>&ldquo;Swad Jo Bharosa Jagaye&rdquo;</em>, we uphold the strictest standards of purity, using only genuine milk, khoya, and pure desi ghee.
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-light">
                Whether you stop by for a piping hot morning breakfast of Samosas and Jalebi, a lavish family dinner with our signature Dal Makhani &amp; Paneer Tikka, or take home a box of fresh Kaju Katli for festivities, our family welcomes yours with warmth and authentic taste.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-2xs">
                  <div className="text-2xl mb-1">🧼</div>
                  <h4 className="font-serif font-bold text-sm text-[#1A472A]">
                    Immaculate Hygiene
                  </h4>
                  <p className="text-xs text-gray-500">
                    Sanitized kitchen &amp; pure water filtration systems.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-2xs">
                  <div className="text-2xl mb-1">🥛</div>
                  <h4 className="font-serif font-bold text-sm text-[#1A472A]">
                    Farm Fresh Dairy
                  </h4>
                  <p className="text-xs text-gray-500">
                    Zero adulteration, 100% natural milk solids.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box / Visual Banner */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#1A472A] to-[#12331E] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 text-9xl opacity-10">
                🪔
              </div>
              <div className="relative z-10 space-y-6">
                <span className="text-[#D4AF37] text-4xl">❝</span>
                <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#F4E8B0]">
                  &ldquo;A sweet dish prepared with pure devotion and pure ghee carries the soul of Indian hospitality.&rdquo;
                </p>
                <div className="border-t border-[#D4AF37]/40 pt-4">
                  <h4 className="font-bold text-base text-white">Shobharam Family</h4>
                  <p className="text-xs text-gray-300">
                    Founders &amp; Master Halwais, Shobharam&apos;s Sweets &amp; Restaurant
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-[#D4AF37]/30 text-xs space-y-1">
                  <p className="text-[#F4E8B0] font-semibold">📍 Location Landmark:</p>
                  <p className="text-gray-200">
                    P. No. 7A, Gate No.01, Sai Heritage, Chhapraula, Greater Noida, G.B. Nagar (UP - 201009)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CONTACT & DIRECT ORDER STRIP ----------------- */}
      <section id="contact" className="py-12 bg-green-50/70 border-t border-[#D4AF37]/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/40 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Direct Ordering &amp; Bookings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A472A]">
                Ready to Order Fresh Delights?
              </h3>
              <p className="text-xs text-gray-600">
                Call our direct phone lines for immediate home delivery or table reservations.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:9068935364"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-gray-200 hover:border-[#1A472A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#1A472A] text-white flex items-center justify-center font-bold">
                  📞
                </div>
                <div>
                  <div className="text-xs text-gray-500">Primary Phone</div>
                  <div className="font-bold text-[#1A472A] text-base">
                    +91 9068935364
                  </div>
                </div>
              </a>

              <a
                href="tel:9548089761"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-gray-200 hover:border-[#1A472A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1A472A] flex items-center justify-center font-bold">
                  📱
                </div>
                <div>
                  <div className="text-xs text-gray-500">Secondary / WhatsApp Line</div>
                  <div className="font-bold text-[#1A472A] text-base">
                    +91 9548089761
                  </div>
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919068935364?text=Hello%20Shobharams,%20I%20want%20to%20order%20food/sweets."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-md hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>💬</span> Order on WhatsApp
              </a>
              <button
                onClick={() => handleOrderClick()}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-[#1A472A] text-white hover:bg-[#12331E] shadow-md hover:scale-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]"
              >
                <span>🛍️</span> Online Inquiry Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-[#1A472A] text-white pt-16 pb-8 border-t-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D4AF37]/25">
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#F4E8B0]">
                  Shobharam&apos;s
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Sweets &amp; Restaurant
                </p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                &ldquo;Swad Jo Bharosa Jagaye&rdquo; — Serving pure desi ghee sweets, tandoori delicacies, Chinese delights, and South Indian specials with love and purity.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 text-xs text-[#D4AF37] border border-[#D4AF37]/30">
                <span>🌱</span> 100% Pure Vegetarian
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#F4E8B0] border-b border-[#D4AF37]/30 pb-2">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <a href="#menu" className="hover:text-[#D4AF37] transition-colors">
                    🍬 Traditional Pure Ghee Sweets
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#D4AF37] transition-colors">
                    🍛 North &amp; South Indian Restaurant
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                    🎪 Wedding &amp; Party Catering
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                    🏛️ Our Tradition &amp; Kitchen Story
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                    📍 Direct Delivery &amp; Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Address & Location */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#F4E8B0] border-b border-[#D4AF37]/30 pb-2">
                Visit Our Shop
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                <strong>Shobharam&apos;s Sweets &amp; Restaurant</strong>
                <br />
                P. No. 7A, Gate No.01, Sai Heritage,
                <br />
                Chhapraula, Greater Noida,
                <br />
                G.B. Nagar, UP - 201009
              </p>
              <div className="text-xs text-[#D4AF37] pt-1">
                📍 Convenient parking &amp; family seating available.
              </div>
            </div>

            {/* Col 4: Timings & Direct Contact */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#F4E8B0] border-b border-[#D4AF37]/30 pb-2">
                Timings &amp; Contact
              </h4>
              <div className="text-xs text-gray-300 space-y-1">
                <p className="text-[#F4E8B0] font-semibold">Opening Hours:</p>
                <p>Open Daily: 8:00 AM - 11:00 PM</p>
                <p className="text-[11px] text-gray-400">All 7 Days a week</p>
              </div>

              <div className="pt-2 text-xs space-y-1">
                <p className="text-[#F4E8B0] font-semibold">Phone Inquiries:</p>
                <p>
                  <a
                    href="tel:9068935364"
                    className="text-white hover:text-[#D4AF37] transition-colors font-bold"
                  >
                    +91 9068935364
                  </a>
                </p>
                <p>
                  <a
                    href="tel:9548089761"
                    className="text-white hover:text-[#D4AF37] transition-colors font-bold"
                  >
                    +91 9548089761
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 text-center text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>
              © {new Date().getFullYear()} Shobharam&apos;s Sweets &amp; Restaurant. All Rights Reserved.
            </p>
            <p className="text-[#D4AF37] font-medium">
              Swad Jo Bharosa Jagaye • Made with Pure Devotion &amp; Taste
            </p>
          </div>
        </div>
      </footer>

      {/* ----------------- INTERACTIVE ORDER / INQUIRY MODAL ----------------- */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF9F6] rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl relative text-left">
            <button
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-3xl">🛍️</span>
              <h3 className="font-serif text-2xl font-bold text-[#1A472A] mt-2">
                Order from Shobharam&apos;s
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {selectedProduct
                  ? `Inquiring about: "${selectedProduct}"`
                  : "Fresh Sweets, Dining & Party Orders"}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-gray-700 bg-green-50 p-3 rounded-xl border border-green-200">
                To guarantee maximum freshness and quick customization, we take immediate orders directly via Call and WhatsApp:
              </p>

              <a
                href={`https://wa.me/919068935364?text=${encodeURIComponent(
                  `Hello Shobharam's, I want to order ${
                    selectedProduct ? selectedProduct : "food/sweets"
                  }. Please share the details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-md flex items-center justify-center gap-2 hover:scale-102 transition-all"
              >
                <span>💬</span> Order via WhatsApp (9068935364)
              </a>

              <a
                href="tel:9068935364"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#1A472A] text-white hover:bg-[#12331E] shadow-md flex items-center justify-center gap-2 hover:scale-102 transition-all border border-[#D4AF37]"
              >
                <span>📞</span> Call Now (+91 9068935364)
              </a>

              <a
                href="tel:9548089761"
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-white text-[#1A472A] border border-gray-300 hover:border-[#1A472A] flex items-center justify-center gap-2"
              >
                <span>📱</span> Alternate Number: +91 9548089761
              </a>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setOrderModalOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-800 underline"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
