"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ============================================================
//  BRAND CONSTANTS (from actual Shobharam's menu card)
// ============================================================
const C = {
  green:      "#0F4C3A",
  greenDark:  "#07301F",
  greenMid:   "#1B6B4A",
  gold:       "#D4AF37",
  goldLight:  "#F0DC9A",
  goldMuted:  "#E8C878",
  cream:      "#FDFDF7",
  creamWarm:  "#F5EDD7",
  creamDeep:  "#EAD9B8",
  text:       "#1C2B1F",
  textMuted:  "#4A5E52",
} as const;

// ============================================================
//  COMPLETE MENU DATA (from actual menu card)
// ============================================================
interface MenuItem {
  name: string;
  half?: string;
  full?: string;
  price?: string;
  note?: string;
  badge?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  subcategories?: { title: string; items: MenuItem[] }[];
  items?: MenuItem[];
}

const MENU: MenuCategory[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    icon: "🌅",
    color: "#E07B39",
    items: [
      { name: "Kachori Sabji", price: "₹60" },
      { name: "Bedmi Puri", price: "₹80" },
      { name: "Chole Bhature", price: "₹100" },
    ],
  },
  {
    id: "snacks",
    label: "Snacks",
    icon: "🧆",
    color: "#C8952A",
    items: [
      { name: "Bread Pakora (1 Pc)", price: "₹20" },
      { name: "Paneer Bread Pakora (1 Ps)", price: "₹30" },
      { name: "Paneer Pakora (2 Pcs)", price: "₹50" },
      { name: "Samosa (1 Pc)", price: "₹20" },
      { name: "Pyaz Kachori (1 Pc)", price: "₹30" },
      { name: "Dal Kachori (1 Pc)", price: "₹25" },
      { name: "Chhole Samosa (1 Pc)", price: "₹40" },
    ],
  },
  {
    id: "chaat",
    label: "Nukkad Ki Chaat",
    icon: "🍡",
    color: "#D2691E",
    items: [
      { name: "Golgappe (6 Pcs)", price: "₹60" },
      { name: "Aloo Golgappe with Dahi & Chutney (6 Pcs)", price: "₹85" },
      { name: "Papri Chaat", price: "₹100" },
      { name: "Dahi Bhalla", price: "₹110" },
      { name: "Bhalla Papri Chaat", price: "₹110" },
      { name: "Aloo Tikki", price: "₹90" },
      { name: "Raj Kachori", price: "₹130", badge: "Popular" },
      { name: "Extra Pav (2 Pav)", price: "₹60" },
      { name: "Extra Bhaji", price: "₹60" },
      { name: "Pav Bhaji", price: "₹140", badge: "Must Try" },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    icon: "🍲",
    color: "#8B7355",
    items: [
      { name: "Veg Manchow Soup", price: "₹120" },
      { name: "Veg Sweet Corn Soup", price: "₹120" },
      { name: "Veg Hot 'N' Sour Soup", price: "₹120" },
      { name: "Cream of Tomato Soup", price: "₹120" },
    ],
  },
  {
    id: "south-indian",
    label: "South Indian",
    icon: "🥞",
    color: "#2E8B57",
    subcategories: [
      {
        title: "🥞 Dosa",
        items: [
          { name: "Plain Dosa", price: "₹99" },
          { name: "Masala Dosa", price: "₹140", badge: "Bestseller" },
          { name: "Butter Dosa", price: "₹180" },
          { name: "Onion Plain Dosa", price: "₹130" },
          { name: "Onion Masala Dosa", price: "₹140" },
          { name: "Mysore Plain Dosa", price: "₹180" },
          { name: "Mysore Masala Dosa", price: "₹190" },
          { name: "Paper Plain Dosa", price: "₹120" },
          { name: "Paper Masala Dosa", price: "₹140" },
          { name: "Rava Plain Dosa", price: "₹140" },
          { name: "Rava Masala Dosa", price: "₹160" },
          { name: "Rava Onion Plain Dosa", price: "₹140" },
          { name: "Rava Onion Masala Dosa", price: "₹160" },
          { name: "Paneer Masala Dosa", price: "₹180" },
          { name: "Makhani Paneer Dosa", price: "₹200" },
          { name: "Spring Roll Dosa", price: "₹200" },
        ],
      },
      {
        title: "🟤 Idli & Upma",
        items: [
          { name: "Idli Sambar 2 Pcs", price: "₹99" },
          { name: "Vada Sambar 2 Pcs", price: "₹99" },
          { name: "Idli Vada Sambar 3 Pcs", price: "₹135" },
          { name: "Upma", price: "₹79" },
        ],
      },
      {
        title: "🫓 Uttapam",
        items: [
          { name: "Plain Uttapam", price: "₹120" },
          { name: "Onion Uttapam", price: "₹130" },
          { name: "Tomato Uttapam", price: "₹130" },
          { name: "Mix Uttapam", price: "₹170" },
          { name: "Paneer Uttapam", price: "₹130" },
          { name: "Coconut Uttapam", price: "₹160" },
        ],
      },
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    icon: "🥢",
    color: "#CC4444",
    subcategories: [
      {
        title: "🍜 Noodles & Rice",
        items: [
          { name: "Veg Chowmein", half: "₹70", full: "₹120" },
          { name: "Chilli Garlic Noodles", half: "₹90", full: "₹170" },
          { name: "Veg Hakka Noodles", half: "₹80", full: "₹160" },
          { name: "Singapore Noodles", half: "₹80", full: "₹170" },
          { name: "Veg Chop Suey", half: "₹90", full: "₹180" },
          { name: "Veg Fried Rice", half: "₹70", full: "₹125" },
          { name: "Chilli Garlic Fried Rice", half: "₹80", full: "₹150" },
          { name: "Singapore Fried Rice", half: "₹80", full: "₹160" },
          { name: "Veg Manchurian (Dry)", half: "₹80", full: "₹150" },
          { name: "Veg Manchurian (Gravy)", half: "₹70", full: "₹140" },
          { name: "Paneer Chilli (Gravy)", half: "₹100", full: "₹180" },
          { name: "Paneer Chilli (Dry)", half: "₹100", full: "₹180" },
          { name: "Honey Chilli Potato", half: "₹80", full: "₹150" },
          { name: "Chilli Potato", half: "₹70", full: "₹140" },
          { name: "Spring Roll", half: "₹60", full: "₹120" },
        ],
      },
      {
        title: "🥟 Momos (6 Pcs)",
        items: [
          { name: "Veg Steam Momos", price: "₹80" },
          { name: "Veg Fried Momos", price: "₹90" },
          { name: "Paneer Steam Momos", price: "₹100" },
          { name: "Paneer Fried Momos", price: "₹110" },
          { name: "Paneer Kurkure Momos", price: "₹140", badge: "Crispy" },
          { name: "Veg Kurkure Momos", price: "₹120" },
        ],
      },
    ],
  },
  {
    id: "north-indian",
    label: "North Indian",
    icon: "🍛",
    color: "#1B5E8A",
    items: [
      { name: "Yellow Dal", half: "₹90", full: "₹170" },
      { name: "Jeera Aloo", half: "₹90", full: "₹170" },
      { name: "Aloo Gobhi", half: "₹80", full: "₹150" },
      { name: "Chana Masala", half: "₹80", full: "₹150" },
      { name: "Kashmiri Dum Aloo", half: "₹140", full: "₹250" },
      { name: "Mix Vegetable", half: "₹130", full: "₹240" },
      { name: "Dal Makhni", half: "₹130", full: "₹240", badge: "Bestseller" },
      { name: "Malai Kofta (2 Pcs)", half: "₹140", full: "₹260" },
      { name: "Matar Malai Methi", half: "₹149", full: "₹290" },
      { name: "Matar Paneer", half: "₹130", full: "₹270" },
      { name: "Palak Paneer", half: "₹140", full: "₹270" },
      { name: "Mushroom Masala", half: "₹149", full: "₹289" },
      { name: "Pindi Chana", half: "₹99", full: "₹180" },
      { name: "Shahi Paneer", half: "₹140", full: "₹260" },
      { name: "Kadhai Paneer", half: "₹160", full: "₹290", badge: "Popular" },
      { name: "Paneer Pasanda", half: "₹149", full: "₹299" },
      { name: "Paneer Do Pyaza", half: "₹149", full: "₹289" },
      { name: "Paneer Butter Masala", half: "₹140", full: "₹260" },
      { name: "Paneer Bhurji", half: "₹140", full: "₹270" },
      { name: "Paneer Lababdar", half: "₹140", full: "₹270" },
    ],
  },
  {
    id: "chefs-special",
    label: "Chef's Special",
    icon: "👨‍🍳",
    color: "#7B3F9E",
    items: [
      { name: "Paneer Tikka Masala Special", price: "₹280", badge: "Chef's Pick" },
      { name: "Matar Mushroom", price: "₹250" },
      { name: "Masala Chaap", price: "₹240", badge: "Must Try" },
      { name: "Rajma Masala", price: "₹230" },
    ],
  },
  {
    id: "tandoor",
    label: "Tandoor Snacks",
    icon: "🔥",
    color: "#B22222",
    items: [
      { name: "Veg Seekh Kabab", price: "₹180" },
      { name: "Veg Tandoori Aloo", price: "₹199" },
      { name: "Paneer Tikka (6 Pcs)", price: "₹250", badge: "Bestseller" },
      { name: "Achari Paneer Tikka (6 Pcs)", price: "₹260" },
      { name: "Tandoori Malai Chaap", price: "₹230" },
      { name: "Tandoori Haryali Chaap", price: "₹260" },
      { name: "Tandoori Achari Chaap", price: "₹270" },
      { name: "Hara Bhara Kebab", price: "₹210" },
      { name: "Malai Paneer Tikka", price: "₹280" },
      { name: "Mushroom Tikka", price: "₹250" },
    ],
  },
  {
    id: "breads",
    label: "Breads",
    icon: "🫓",
    color: "#8B5E3C",
    subcategories: [
      {
        title: "🫓 Naan",
        items: [
          { name: "Plain Naan", price: "₹40" },
          { name: "Butter Naan", price: "₹50" },
          { name: "Garlic Naan", price: "₹60" },
          { name: "Aloo Stuffed Naan", price: "₹70" },
          { name: "Mix Naan", price: "₹80" },
          { name: "Paneer Naan", price: "₹99" },
        ],
      },
      {
        title: "🥙 Kulcha",
        items: [
          { name: "Aloo Kulcha", price: "₹60" },
          { name: "Onion Kulcha", price: "₹70" },
          { name: "Mix Kulcha", price: "₹40" },
          { name: "Paneer Kulcha", price: "₹80" },
        ],
      },
      {
        title: "🫓 Roti & Paratha",
        items: [
          { name: "Tandoori Roti", price: "₹20" },
          { name: "Tandoori Butter Roti", price: "₹25" },
          { name: "Malhi Ki Roti", price: "₹40" },
          { name: "Missi Roti", price: "₹50" },
          { name: "Laccha Paratha", price: "₹80" },
        ],
      },
    ],
  },
  {
    id: "rice",
    label: "Rice & Raita",
    icon: "🍚",
    color: "#6B8E23",
    subcategories: [
      {
        title: "🍚 Rice",
        items: [
          { name: "Plain Rice", half: "₹60", full: "₹99" },
          { name: "Jeera Rice", half: "₹60", full: "₹99" },
          { name: "Veg Pulao", half: "₹60", full: "₹99" },
          { name: "Matar Pulao", half: "₹60", full: "₹99" },
          { name: "Veg Biryani with Raita", half: "₹100", full: "₹180", badge: "Special" },
        ],
      },
      {
        title: "🥗 Raita • Salad • Papad",
        items: [
          { name: "Plain Papad", price: "₹20" },
          { name: "Masala Papad", price: "₹30" },
          { name: "Plain Curd", price: "₹40" },
          { name: "Mix Raita", price: "₹90" },
          { name: "Boondi Raita", price: "₹90" },
          { name: "Pineapple Raita", price: "₹90" },
          { name: "Green Salad", price: "₹70" },
        ],
      },
    ],
  },
  {
    id: "thali",
    label: "Thali & Meals",
    icon: "🍽️",
    color: "#0F4C3A",
    subcategories: [
      {
        title: "👑 Thali",
        items: [
          { name: "Deluxe Thali", price: "₹360", badge: "Royal", note: "Dal + Paneer Sabzi + Rice + 2 Roti + Salad + Raita + Sweet" },
          { name: "Economy Thali", price: "₹280", badge: "Value", note: "Dal + Sabzi + Rice + 2 Roti + Salad" },
        ],
      },
      {
        title: "🥘 Combo Meals",
        items: [
          { name: "Fried Rice + Chowmein + Chilli Paneer", price: "₹250", badge: "Combo" },
          { name: "Fried Rice + Chilli Potato + Manchurian", price: "₹200", badge: "Combo" },
        ],
      },
      {
        title: "🌾 Eco Meals",
        items: [
          { name: "Chole Chawal", price: "₹120" },
          { name: "Rajma Chawal", price: "₹120" },
          { name: "Aloo Paratha + Dahi", price: "₹99" },
          { name: "Paneer Paratha + Dahi", price: "₹120" },
        ],
      },
    ],
  },
];

// ============================================================
//  SERVICES DATA
// ============================================================
const SERVICES = [
  { icon: "🍽️", title: "Dine-In", desc: "Spacious AC family seating available" },
  { icon: "🛵", title: "Home Delivery", desc: "FREE delivery on orders above ₹300" },
  { icon: "📦", title: "Takeaway", desc: "Quick pickup, hygienic packaging" },
  { icon: "🎪", title: "Catering", desc: "Weddings, parties & corporate events" },
  { icon: "🎁", title: "Bulk Sweet Orders", desc: "Custom gift boxes & hampers" },
  { icon: "🎂", title: "Party Bookings", desc: "Birthday, Kitty & anniversary parties" },
];

// ============================================================
//  HELPERS
// ============================================================
function MenuItemRow({ item }: { item: MenuItem }) {
  const isHalfFull = Boolean(item.half && item.full);
  return (
    <div className="flex items-start gap-2 py-2.5 border-b border-dashed last:border-0"
      style={{ borderColor: `${C.gold}30` }}>
      {/* Veg Symbol */}
      <span className="mt-0.5 text-xs shrink-0" title="Pure Veg">🟢</span>

      {/* Name + Note + Badge */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium leading-snug" style={{ color: C.text }}>
            {item.name}
          </span>
          {item.badge && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
              style={{ background: `${C.gold}25`, color: C.greenDark, border: `1px solid ${C.gold}50` }}>
              {item.badge}
            </span>
          )}
        </div>
        {item.note && (
          <p className="text-[10px] mt-0.5 italic" style={{ color: C.textMuted }}>
            {item.note}
          </p>
        )}
      </div>

      {/* Price */}
      {isHalfFull ? (
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-center">
            <div className="text-[9px] font-semibold" style={{ color: C.textMuted }}>Half</div>
            <div className="text-sm font-bold" style={{ color: C.green }}>{item.half}</div>
          </div>
          <div className="text-center">
            <div className="text-[9px] font-semibold" style={{ color: C.textMuted }}>Full</div>
            <div className="text-sm font-bold" style={{ color: C.green }}>{item.full}</div>
          </div>
        </div>
      ) : (
        <span className="text-sm font-bold shrink-0" style={{ color: C.green }}>{item.price}</span>
      )}
    </div>
  );
}

function CategoryContent({ cat }: { cat: MenuCategory }) {
  if (cat.subcategories) {
    return (
      <div className="space-y-8">
        {cat.subcategories.map((sub) => (
          <div key={sub.title}>
            <h4 className="font-serif text-base font-bold mb-3 pb-2 border-b-2"
              style={{ color: C.green, borderColor: `${C.gold}50` }}>
              {sub.title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {sub.items.map((item) => (
                <MenuItemRow key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
      {cat.items?.map((item) => (
        <MenuItemRow key={item.name} item={item} />
      ))}
    </div>
  );
}

// ============================================================
//  MAIN PAGE
// ============================================================
export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoModal, setVideoModal] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close video modal on ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeCategory = MENU.find((c) => c.id === activeTab)!;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.cream, color: C.text }}>

      {/* ══════════════════════════════════════════
          TOP BAR
      ══════════════════════════════════════════ */}
      <div className="py-2 px-4 text-center" style={{ background: C.green }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0 text-xs">
          <span className="font-semibold flex items-center gap-1.5" style={{ color: C.goldLight }}>
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: C.gold }} />
            🚚 Free Home Delivery on Orders Above ₹300 &nbsp;|&nbsp; 🌿 100% Pure Veg Restaurant
          </span>
          <div className="flex items-center gap-3" style={{ color: "#B0C4B0" }}>
            <span className="hidden sm:inline">⏰ Mon–Sun | 10:00 AM – 11:00 PM</span>
            <a href="tel:9548089761" className="font-bold" style={{ color: C.goldLight }}>📞 95480 89761</a>
            <span>|</span>
            <a href="tel:9068935364" className="font-bold" style={{ color: C.goldLight }}>90689 35364</a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(253,253,247,0.96)" : C.cream,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.gold}40`,
          boxShadow: scrolled ? "0 4px 20px rgba(15,76,58,0.12)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 shadow-md transition-transform group-hover:scale-105 shrink-0"
                style={{ borderColor: C.gold }}>
                <Image
                  src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                  alt="Shobharam's Logo" fill className="object-cover" priority sizes="56px" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl md:text-2xl font-extrabold" style={{ color: C.green }}>
                  Shobharam&apos;s
                </span>
                <div className="flex items-center gap-2 -mt-0.5">
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>
                    Sweets &amp; Restaurant
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${C.green}15`, color: C.green, border: `1px solid ${C.green}30` }}>
                    🌿 100% Pure Veg
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">
              {[
                { label: "Full Menu", href: "#menu" },
                { label: "Catering", href: "#services" },
                { label: "About Us", href: "#about" },
                { label: "Location", href: "#contact" },
              ].map((link) => (
                <a key={link.label} href={link.href}
                  className="text-sm font-semibold relative group transition-colors"
                  style={{ color: C.green }}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: C.gold }} />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:9068935364"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all hover:scale-105"
                style={{ color: C.green, borderColor: `${C.gold}80`, background: `${C.gold}15` }}>
                📞 Call for Delivery
              </a>
              <button onClick={() => setOrderModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all hover:scale-105 cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, border: `2px solid ${C.gold}` }}>
                🛍️ Order Online
              </button>
            </div>

            {/* Mobile burger */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={() => setOrderModal(true)}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white cursor-pointer"
                style={{ background: C.green, border: `1.5px solid ${C.gold}` }}>
                Order
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg" style={{ color: C.green }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 pt-3 pb-5 space-y-1 animate-fadeIn"
            style={{ background: C.cream, borderColor: `${C.gold}40` }}>
            {[
              { emoji: "📜", label: "Full Menu", href: "#menu" },
              { emoji: "🎪", label: "Catering & Events", href: "#services" },
              { emoji: "🏛️", label: "Our Heritage", href: "#about" },
              { emoji: "📍", label: "Location & Timings", href: "#contact" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ color: C.green }}>
                <span>{item.emoji}</span>{item.label}
              </a>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: `${C.gold}30` }}>
              <a href="tel:9068935364"
                className="w-full block text-center py-3 rounded-full font-bold text-sm text-white"
                style={{ background: C.green }}>
                📞 Call 90689 35364 to Order
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(135deg, ${C.creamWarm} 0%, ${C.cream} 60%, ${C.creamDeep} 100%)` }}>

        {/* Background blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: C.gold }} />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: C.green }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Slogan Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border shadow-sm"
                style={{ background: `${C.gold}20`, borderColor: C.gold, color: C.green }}>
                🌿 PURE VEG &bull; FRESH INGREDIENTS &bull; AUTHENTIC TASTE
              </div>

              {/* Headline */}
              <h1 className="font-serif font-bold leading-[1.1] tracking-tight"
                style={{ color: C.green, fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}>
                Authentic Taste,{" "}
                <span className="relative inline-block" style={{ color: C.gold }}>
                  Fresh Ingredients
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10"
                    preserveAspectRatio="none" style={{ height: "8px" }}>
                    <path d="M5,7 Q75,1 150,7 Q225,13 295,5"
                      stroke={C.gold} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto lg:mx-0"
                style={{ color: C.textMuted }}>
                Shobharam&apos;s brings you the finest <strong style={{ color: C.green }}>pure vegetarian</strong> cuisine —
                from traditional desi ghee sweets to sizzling tandoor snacks, South Indian dosas, North Indian curries,
                and grand thalis. Every dish crafted fresh, every day.
              </p>

              {/* FREE DELIVERY Banner */}
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-md border-2"
                style={{
                  background: `linear-gradient(135deg, ${C.green}F0, ${C.greenDark})`,
                  borderColor: C.gold,
                }}>
                <span className="text-2xl">🚚</span>
                <div className="text-left">
                  <p className="text-xs font-semibold" style={{ color: C.goldLight }}>Special Offer</p>
                  <p className="font-bold text-sm md:text-base text-white">
                    Free Home Delivery on Orders Above ₹300
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="#menu"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white shadow-xl transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, border: `2px solid ${C.gold}` }}>
                  📜 View Full Menu
                </a>
                <button onClick={() => setOrderModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold border-2 transition-all hover:scale-105 cursor-pointer"
                  style={{ color: C.green, borderColor: C.gold, background: `${C.gold}18` }}>
                  📞 Book a Table
                </button>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t max-w-lg mx-auto lg:mx-0"
                style={{ borderColor: `${C.gold}40` }}>
                {[
                  { val: "100%", sub: "Pure Veg" },
                  { val: "10AM–11PM", sub: "Open Daily" },
                  { val: "₹300+", sub: "Free Delivery" },
                ].map((s) => (
                  <div key={s.sub} className="text-center lg:text-left">
                    <div className="text-lg md:text-xl font-bold font-serif" style={{ color: C.green }}>{s.val}</div>
                    <div className="text-[11px]" style={{ color: C.textMuted }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image Showcase */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Outer spinning ring */}
              <div className="absolute rounded-full border-dashed border-2 pointer-events-none animate-spin-slow"
                style={{ width: "420px", height: "420px", borderColor: `${C.gold}50` }} />

              {/* Central circle */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 shadow-2xl"
                style={{ borderColor: C.gold }}>
                <Image
                  src="/images/784790785_1397937109118473_940502782160083656_n.jpg"
                  alt="Shobharam's Delicious Sweets and Food" fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px" priority />
                <div className="absolute inset-0 rounded-full"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}D0 0%, transparent 50%)` }} />
                <div className="absolute bottom-6 text-center px-4 z-10 w-full">
                  <p className="font-serif font-bold text-base" style={{ color: C.goldLight }}>
                    Shobharam&apos;s
                  </p>
                  <p className="text-xs" style={{ color: "#D4C4A0" }}>Swad Jo Bharosa Jagaye ✦</p>
                </div>
              </div>

              {/* Floating badge 1 */}
              <div className="absolute top-4 -left-2 sm:left-2 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-xl border animate-bounce-float"
                style={{ background: "rgba(253,253,247,0.97)", borderColor: `${C.gold}60` }}>
                <span className="text-2xl">🍛</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: C.green }}>Dal Makhni</p>
                  <p className="text-[10px]" style={{ color: C.textMuted }}>Half ₹130 | Full ₹240</p>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-4 -right-2 sm:right-2 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-xl border animate-bounce-float-d"
                style={{ background: "rgba(253,253,247,0.97)", borderColor: `${C.gold}60` }}>
                <span className="text-2xl">🥞</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: C.green }}>Masala Dosa</p>
                  <p className="text-[10px]" style={{ color: C.gold, fontWeight: 600 }}>Just ₹140</p>
                </div>
              </div>

              {/* Floating badge 3 */}
              <div className="absolute top-1/2 -right-6 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl shadow-lg border"
                style={{ background: "rgba(253,253,247,0.97)", borderColor: `${C.green}25` }}>
                <span className="text-xl">🚚</span>
                <div>
                  <p className="text-[11px] font-bold" style={{ color: C.green }}>Free Delivery</p>
                  <p className="text-[9px]" style={{ color: C.textMuted }}>On ₹300+ Orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE STRIP
      ══════════════════════════════════════════ */}
      <div className="py-4 px-4 border-y"
        style={{ background: `linear-gradient(90deg, ${C.creamDeep}, ${C.creamWarm}, ${C.creamDeep})`, borderColor: `${C.gold}40` }}>
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex items-center justify-center gap-6 sm:gap-10 min-w-max mx-auto py-1 text-sm font-semibold"
            style={{ color: C.green }}>
            {[
              "🌿 100% Pure Vegetarian",
              "🧈 Pure Desi Ghee",
              "🚚 Free Delivery ₹300+",
              "🏆 Authentic Recipes",
              "🧼 Hygienic Kitchen",
              "⏰ 10AM–11PM Daily",
            ].map((f, i) => (
              <React.Fragment key={i}>
                <span>{f}</span>
                {i < 5 && <span style={{ color: C.gold }}>✦</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          INTERACTIVE MENU SECTION
      ══════════════════════════════════════════ */}
      <section id="menu" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border"
              style={{ background: `${C.gold}18`, borderColor: `${C.gold}60`, color: C.green }}>
              <span style={{ color: C.gold }}>✦</span> Digital Menu
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: C.green }}>
              Our Complete Menu
            </h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <span className="h-px w-12 block" style={{ background: C.gold }} />
              <span style={{ color: C.gold }}>❧</span>
              <span className="h-px w-12 block" style={{ background: C.gold }} />
            </div>
            <p className="text-base font-light" style={{ color: C.textMuted }}>
              From crispy South Indian dosas to royal Paneer Tikka Masala — explore our full pure vegetarian menu.
              All prices include taxes.
            </p>

            {/* Free Delivery badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold shadow-sm"
              style={{ background: `${C.green}12`, color: C.green, border: `1.5px solid ${C.green}30` }}>
              🚚 Free Home Delivery on Orders Above ₹300
            </div>
          </div>

          {/* ── Category Tab Scrollbar ── */}
          <div className="overflow-x-auto pb-2 mb-0">
            <div className="flex items-center gap-2 min-w-max mx-auto">
              {MENU.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all hover:scale-105 cursor-pointer"
                  style={
                    activeTab === cat.id
                      ? {
                          background: cat.color || C.green,
                          color: "#fff",
                          boxShadow: `0 4px 15px ${cat.color || C.green}50`,
                          border: `2px solid ${C.gold}`,
                        }
                      : {
                          background: "rgba(255,255,255,0.9)",
                          color: C.text,
                          border: `2px solid ${C.gold}40`,
                        }
                  }
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Menu Content Panel ── */}
          <div className="mt-4 rounded-3xl border-2 shadow-xl overflow-hidden"
            style={{ borderColor: `${C.gold}50`, background: "#fff" }}>

            {/* Panel Header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b"
              style={{
                background: `linear-gradient(135deg, ${activeCategory.color || C.green}15, ${C.creamWarm})`,
                borderColor: `${C.gold}40`,
              }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md border-2"
                style={{ background: "#fff", borderColor: `${C.gold}60` }}>
                {activeCategory.icon}
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold" style={{ color: activeCategory.color || C.green }}>
                  {activeCategory.label}
                </h3>
                <p className="text-xs" style={{ color: C.textMuted }}>
                  {activeCategory.subcategories
                    ? `${activeCategory.subcategories.reduce((a, s) => a + s.items.length, 0)} items`
                    : `${activeCategory.items?.length ?? 0} items`}{" "}
                  &bull; 🌿 Pure Veg &bull; Made Fresh Daily
                </p>
              </div>

              {/* Half / Full legend for categories that have it */}
              {(activeCategory.items?.some((i) => i.half) ||
                activeCategory.subcategories?.some((s) => s.items.some((i) => i.half))) && (
                <div className="ml-auto hidden sm:flex items-center gap-4 text-xs font-semibold"
                  style={{ color: C.textMuted }}>
                  <span className="px-2 py-1 rounded border" style={{ borderColor: `${C.gold}40`, background: `${C.gold}10` }}>
                    Half
                  </span>
                  <span className="px-2 py-1 rounded border" style={{ borderColor: `${C.gold}40`, background: `${C.gold}10` }}>
                    Full
                  </span>
                </div>
              )}
            </div>

            {/* Panel Body */}
            <div className="p-6 md:p-8">
              <CategoryContent cat={activeCategory} />
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
              style={{ borderColor: `${C.gold}30`, background: C.cream }}>
              <p className="text-xs" style={{ color: C.textMuted }}>
                🌿 All items are 100% Pure Vegetarian &bull; Prices include applicable taxes.
              </p>
              <div className="flex gap-2">
                <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order."
                  target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
                  style={{ background: "#25D366" }}>
                  💬 Order on WhatsApp
                </a>
                <a href="tel:9068935364"
                  className="px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
                  style={{ background: C.green, border: `1.5px solid ${C.gold}` }}>
                  📞 Call to Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PHOTO & VIDEO GALLERY
      ══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8" style={{ background: C.creamWarm }}>
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border"
              style={{ background: `${C.gold}18`, borderColor: `${C.gold}60`, color: C.green }}>
              <span style={{ color: C.gold }}>✦</span> Photos &amp; Reels
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: C.green }}>
              A Glimpse Into Our World
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3 mb-3">
              <span className="h-px w-10 block" style={{ background: C.gold }} />
              <span style={{ color: C.gold }}>❧</span>
              <span className="h-px w-10 block" style={{ background: C.gold }} />
            </div>
            <p className="text-sm font-light" style={{ color: C.textMuted }}>
              Real food, real moments, real taste — straight from our kitchen to your screen.
            </p>
          </div>

          {/* ── ROW 1: Two Reels (Videos) ── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🎬</span>
              <h3 className="font-serif text-lg font-bold" style={{ color: C.green }}>Our Reels</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                style={{ background: `${C.gold}20`, color: C.greenDark, border: `1px solid ${C.gold}50` }}>
                Live from Kitchen
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Video 1 — Clickable */}
              <div
                className="relative rounded-3xl overflow-hidden border-2 shadow-xl group cursor-pointer"
                style={{ borderColor: `${C.gold}60`, background: C.greenDark, aspectRatio: "9/16", maxHeight: "520px" }}
                onClick={() => setVideoModal({ src: "/videos/shobharams-reel-1.mp4", title: "Shobharam's Reel", subtitle: "🌿 Pure Veg • Fresh Preparations" })}
                title="Click to watch full video">
                <video
                  src="/videos/shobharams-reel-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
                {/* Big play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "rgba(7,48,31,0.45)" }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: C.gold, borderColor: "#fff", color: C.greenDark }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}F0 0%, transparent 100%)` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ background: C.gold, color: C.greenDark }}>▶</div>
                    <div>
                      <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>Shobharam&apos;s Reel</p>
                      <p className="text-[10px]" style={{ color: "#D4C4A0" }}>🌿 Pure Veg &bull; Fresh Preparations</p>
                    </div>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(212,175,55,0.25)", color: C.goldLight, border: `1px solid ${C.gold}50` }}>
                      Tap to watch 🎬
                    </span>
                  </div>
                </div>
                {/* Corner badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"
                  style={{ background: "rgba(0,0,0,0.55)", color: C.goldLight, backdropFilter: "blur(4px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                  LIVE REEL
                </div>
              </div>

              {/* Video 2 — Clickable */}
              <div
                className="relative rounded-3xl overflow-hidden border-2 shadow-xl group cursor-pointer"
                style={{ borderColor: `${C.gold}60`, background: C.greenDark, aspectRatio: "9/16", maxHeight: "520px" }}
                onClick={() => setVideoModal({ src: "/videos/shobharams-reel-2.mp4", title: "Shobharam's Kitchen", subtitle: "🔥 Tandoor • Sweets • Authentic Taste" })}
                title="Click to watch full video">
                <video
                  src="/videos/shobharams-reel-2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
                {/* Big play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "rgba(7,48,31,0.45)" }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: C.gold, borderColor: "#fff", color: C.greenDark }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}F0 0%, transparent 100%)` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ background: C.gold, color: C.greenDark }}>▶</div>
                    <div>
                      <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>Shobharam&apos;s Kitchen</p>
                      <p className="text-[10px]" style={{ color: "#D4C4A0" }}>🔥 Tandoor &bull; Sweets &bull; Authentic Taste</p>
                    </div>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(212,175,55,0.25)", color: C.goldLight, border: `1px solid ${C.gold}50` }}>
                      Tap to watch 🎬
                    </span>
                  </div>
                </div>
                {/* Corner badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"
                  style={{ background: "rgba(0,0,0,0.55)", color: C.goldLight, backdropFilter: "blur(4px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                  LIVE REEL
                </div>
              </div>

              {/* Video 3 — Birthday Reel */}
              <div
                className="relative rounded-3xl overflow-hidden border-2 shadow-xl group cursor-pointer"
                style={{ borderColor: `${C.gold}60`, background: C.greenDark, aspectRatio: "9/16", maxHeight: "520px" }}
                onClick={() => setVideoModal({ src: "/videos/shobharams-birthday.mp4", title: "Birthday Celebration 🎂", subtitle: "🎉 Special Party Catering • Book Your Event" })}
                title="Click to watch full video">
                <video
                  src="/videos/shobharams-birthday.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
                {/* Big play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "rgba(7,48,31,0.45)" }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-4 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: C.gold, borderColor: "#fff", color: C.greenDark }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}F0 0%, transparent 100%)` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ background: C.gold, color: C.greenDark }}>▶</div>
                    <div>
                      <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>Birthday Celebration 🎂</p>
                      <p className="text-[10px]" style={{ color: "#D4C4A0" }}>🎉 Special Party Catering</p>
                    </div>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(212,175,55,0.25)", color: C.goldLight, border: `1px solid ${C.gold}50` }}>
                      Tap to watch 🎬
                    </span>
                  </div>
                </div>
                {/* Corner badge — Birthday special */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"
                  style={{ background: "rgba(180,60,60,0.75)", color: "#FFD700", backdropFilter: "blur(4px)" }}>
                  🎂 BIRTHDAY
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: Photo Grid ── */}
          <div>
            <div className="flex items-center gap-2 mb-3 mt-6">
              <span className="text-base">📸</span>
              <h3 className="font-serif text-lg font-bold" style={{ color: C.green }}>Our Gallery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Large photo — spans 2 rows */}
              <div className="md:row-span-2 relative rounded-3xl overflow-hidden border-2 shadow-xl group"
                style={{ borderColor: `${C.gold}50`, minHeight: "300px" }}>
                <Image src="/images/784790785_1397937109118473_940502782160083656_n.jpg"
                  alt="Festive Sweet Collections — Shobharam's" fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}D0, transparent 60%)` }}>
                  <div>
                    <p className="font-serif font-bold text-base" style={{ color: C.goldLight }}>
                      🎁 Festive Sweet Collections
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#D4C4A0" }}>
                      Custom hampers for every celebration
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo 2 */}
              <div className="relative rounded-3xl overflow-hidden border-2 shadow-lg group"
                style={{ borderColor: `${C.gold}50`, minHeight: "200px" }}>
                <Image src="/images/774508909_1077406468037574_3873234585787801976_n.jpg"
                  alt="Shobharam's Independence Day Sweets Celebration" fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}D0, transparent 60%)` }}>
                  <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>
                    🇮🇳 Celebrating Every Occasion
                  </p>
                </div>
              </div>

              {/* Photo 3 */}
              <div className="relative rounded-3xl overflow-hidden border-2 shadow-lg group"
                style={{ borderColor: `${C.gold}50`, minHeight: "200px" }}>
                <Image src="/images/784250679_1248625784023726_2355356267685394005_n.jpg"
                  alt="Shobharam's Sweet Hamper Pre-Booking" fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}D0, transparent 60%)` }}>
                  <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>
                    🎀 Pre-Book Your Gift Hampers
                  </p>
                </div>
              </div>

              {/* Photo 4 */}
              <div className="md:col-span-1 relative rounded-3xl overflow-hidden border-2 shadow-lg group"
                style={{ borderColor: `${C.gold}50`, minHeight: "200px" }}>
                <Image src="/images/762883080_18121173448749343_8663795200494526042_n.jpg"
                  alt="Shobharam's Restaurant Chhapraula Greater Noida" fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${C.greenDark}D0, transparent 60%)` }}>
                  <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>
                    📍 Visit Us — Chhapraula, Greater Noida
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Strip below gallery */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-sm font-medium" style={{ color: C.textMuted }}>
              🎥 Follow us for daily food reels, offers &amp; festive updates!
            </p>
            <a
              href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order%20food%20after%20watching%20your%20reel!"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-all hover:scale-105"
              style={{ background: "#25D366" }}>
              💬 Order After Watching
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES & EVENTS
      ══════════════════════════════════════════ */}
      {/* ── 1. Book Your Perfect Moment ── */}
      <section id="services" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(180deg, ${C.creamWarm} 0%, #fff 100%)` }}>
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border"
              style={{ background: `${C.gold}18`, borderColor: `${C.gold}60`, color: C.green }}>
              <span style={{ color: C.gold }}>✦</span> Event Bookings
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: C.green }}>
              Book Your{" "}
              <span style={{ color: C.gold }}>Perfect Moment</span>
            </h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <span className="h-px w-12 block" style={{ background: C.gold }} />
              <span style={{ color: C.gold }}>❧</span>
              <span className="h-px w-12 block" style={{ background: C.gold }} />
            </div>
            <p className="text-base font-light" style={{ color: C.textMuted }}>
              Every occasion deserves a special touch. From an intimate date to a grand celebration —
              Shobharam&apos;s makes it unforgettable with pure vegetarian flavours and warm hospitality.
            </p>
          </div>

          {/* 4 Video Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

            {/* Card 1 — Romantic Date */}
            <div className="group flex flex-col rounded-3xl overflow-hidden border-2 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{ background: "#fff", borderColor: `${C.gold}45` }}>
              {/* Video — Romantic Date / Couple Video */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#000" }}>
                <video
                  src="/videos/patner.mp4"
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover opacity-90"
                  style={{ display: "block" }}
                  onClick={() => setVideoModal({ src: "/videos/patner.mp4", title: "Romantic Date 💖", subtitle: "✨ Table for Two • Special Couple Experience" })}
                />
                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                  onClick={() => setVideoModal({ src: "/videos/patner.mp4", title: "Romantic Date 💖", subtitle: "✨ Table for Two • Special Couple Experience" })}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{ background: C.gold, borderColor: "#fff", color: C.greenDark }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(255,107,157,0.35)", color: "#ffb3d1", backdropFilter: "blur(6px)", border: "1px solid rgba(255,107,157,0.5)" }}>
                  💖 Romantic
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[9px] font-bold flex items-center gap-1"
                  style={{ background: "rgba(0,0,0,0.5)", color: C.goldLight, backdropFilter: "blur(4px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> LIVE
                </div>
              </div>
              {/* Card Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: C.green }}>
                    Romantic Date
                  </h3>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: C.gold }}>
                    ✨ Table for Two — A Special Evening
                  </p>
                </div>
                <p className="text-xs leading-relaxed flex-1" style={{ color: C.textMuted }}>
                  Candlelit ambiance, curated veg thali & desserts — make your special evening absolutely memorable.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${C.gold}15`, color: C.green }}>
                    Private Table Available
                  </span>
                  <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20book%20a%20romantic%20table%20for%20two."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, border: `1.5px solid ${C.gold}` }}>
                    📅 Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 — Birthday */}
            <div className="group flex flex-col rounded-3xl overflow-hidden border-2 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{ background: "#fff", borderColor: `${C.gold}45` }}>
              {/* Video — Birthday reel already available! */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#000" }}>
                <video
                  src="/videos/shobharams-birthday.mp4"
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover opacity-90"
                  style={{ display: "block" }}
                  onClick={() => setVideoModal({ src: "/videos/shobharams-birthday.mp4", title: "Birthday Celebrations 🎂", subtitle: "🎉 We make your birthday truly special!" })}
                />
                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                  onClick={() => setVideoModal({ src: "/videos/shobharams-birthday.mp4", title: "Birthday Celebrations 🎂", subtitle: "🎉 We make your birthday truly special!" })}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{ background: C.gold, borderColor: "#fff", color: C.greenDark }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(180,60,60,0.35)", color: "#FFD700", backdropFilter: "blur(6px)", border: "1px solid rgba(255,215,0,0.4)" }}>
                  🎂 Birthday
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[9px] font-bold flex items-center gap-1"
                  style={{ background: "rgba(0,0,0,0.5)", color: C.goldLight, backdropFilter: "blur(4px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" /> LIVE
                </div>
              </div>
              {/* Card Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: C.green }}>
                    Birthday Celebrations
                  </h3>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: C.gold }}>
                    🎂 Make Every Birthday Unforgettable
                  </p>
                </div>
                <p className="text-xs leading-relaxed flex-1" style={{ color: C.textMuted }}>
                  Birthday cakes, special thalis, sweet gift hampers, and a personalised party setup — all pure veg!
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${C.gold}15`, color: C.green }}>
                    Custom Cake Available
                  </span>
                  <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20book%20a%20birthday%20party."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, border: `1.5px solid ${C.gold}` }}>
                    📅 Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 — Business Meetings */}
            <div className="group flex flex-col rounded-3xl overflow-hidden border-2 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{ background: "#fff", borderColor: `${C.gold}45` }}>
              {/* Video Placeholder */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
                {/* ← Replace with: <video src="/videos/your-meeting-video.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-blue-400 bg-blue-900/30">
                    💼
                  </div>
                  <p className="text-[11px] font-semibold text-blue-300 tracking-wider uppercase">Video Coming Soon</p>
                </div>
                <div className="absolute inset-0 opacity-20"
                  style={{ background: "radial-gradient(circle at 70% 60%, #4facfe40, transparent 60%)" }} />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(79,172,254,0.2)", color: "#a8d8ff", backdropFilter: "blur(6px)", border: "1px solid rgba(79,172,254,0.35)" }}>
                  💼 Corporate
                </div>
              </div>
              {/* Card Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: C.green }}>
                    Business Meetings
                  </h3>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: C.gold }}>
                    💼 Corporate Lunches & Team Gatherings
                  </p>
                </div>
                <p className="text-xs leading-relaxed flex-1" style={{ color: C.textMuted }}>
                  Professional setup, hygienic corporate lunch boxes, team thalis, and private dining area on booking.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${C.gold}15`, color: C.green }}>
                    Bulk Orders Available
                  </span>
                  <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20book%20a%20corporate%20meeting%20lunch."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, border: `1.5px solid ${C.gold}` }}>
                    📅 Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4 — Grand Parties */}
            <div className="group flex flex-col rounded-3xl overflow-hidden border-2 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              style={{ background: "#fff", borderColor: `${C.gold}45` }}>
              {/* Video Placeholder */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #1a0533, #3d1466, #6b21a8)" }}>
                {/* ← Replace with: <video src="/videos/your-party-video.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-purple-400 bg-purple-900/30">
                    🎊
                  </div>
                  <p className="text-[11px] font-semibold text-purple-300 tracking-wider uppercase">Video Coming Soon</p>
                </div>
                <div className="absolute inset-0 opacity-20"
                  style={{ background: "radial-gradient(circle at 50% 50%, #f953c640, transparent 60%)" }} />
                {/* Floating sparkles */}
                <div className="absolute top-4 right-6 text-xl animate-bounce" style={{ animationDelay: "0.3s" }}>✨</div>
                <div className="absolute bottom-6 left-6 text-lg animate-bounce" style={{ animationDelay: "0.7s" }}>🎉</div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(168,85,247,0.25)", color: "#d8b4fe", backdropFilter: "blur(6px)", border: "1px solid rgba(168,85,247,0.4)" }}>
                  🎊 Grand Party
                </div>
              </div>
              {/* Card Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: C.green }}>
                    Grand Parties
                  </h3>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: C.gold }}>
                    🎊 Kitty • Anniversary • Get-Togethers
                  </p>
                </div>
                <p className="text-xs leading-relaxed flex-1" style={{ color: C.textMuted }}>
                  Live counters, grand thali spreads, sweets, chaat stalls, and South Indian corners for large gatherings.
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${C.gold}15`, color: C.green }}>
                    Live Counter Setup
                  </span>
                  <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20book%20a%20grand%20party%20event."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, border: `1.5px solid ${C.gold}` }}>
                    📅 Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. What We Offer (Service Tiles) ── */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{ background: `${C.gold}18`, borderColor: `${C.gold}60`, color: C.green }}>
              <span style={{ color: C.gold }}>✦</span> Hospitality
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2" style={{ color: C.green }}>
              We Cater to All Your Occasions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {SERVICES.map((srv) => (
              <div key={srv.title}
                className="p-4 rounded-2xl border text-center flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "#fff", borderColor: `${C.gold}35` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 shadow-sm border-2"
                  style={{ background: C.cream, borderColor: C.gold }}>
                  {srv.icon}
                </div>
                <h3 className="font-serif text-sm font-bold mb-0.5 leading-tight" style={{ color: C.green }}>{srv.title}</h3>
                <p className="text-[10px] leading-snug" style={{ color: C.textMuted }}>{srv.desc}</p>
              </div>
            ))}
          </div>

          {/* ── 3. Catering CTA Banner ── */}
          <div className="rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, borderColor: C.gold }}>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: C.gold, color: C.greenDark }}>
                Custom Menus Available
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2" style={{ color: C.goldLight }}>
                Planning a Wedding or Big Party?
              </h3>
              <p className="text-sm max-w-xl font-light" style={{ color: "#D4C4A0" }}>
                Get personalized thali menus, sweet gift boxes, and live counter catering for any occasion.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a href="tel:9068935364"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 text-center shadow-md"
                style={{ background: C.gold, color: C.greenDark }}>
                📞 Call Catering Manager
              </a>
              <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20need%20catering%20for%20my%20event."
                target="_blank" rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105 text-center"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: `2px solid ${C.gold}` }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT / HERITAGE
      ══════════════════════════════════════════ */}
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{ background: `${C.gold}18`, borderColor: `${C.gold}60`, color: C.green }}>
                <span style={{ color: C.gold }}>✦</span> Our Heritage
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight" style={{ color: C.green }}>
                Crafting Pure Taste &amp; Trust in Greater Noida
              </h2>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 block" style={{ background: C.gold }} />
                <span style={{ color: C.gold }}>❧</span>
                <span className="h-px w-10 block" style={{ background: C.gold }} />
              </div>
              <p className="text-base leading-relaxed font-light" style={{ color: C.textMuted }}>
                At <strong style={{ color: C.green }}>Shobharam&apos;s</strong>, every recipe is a promise —
                a promise of purity, of freshness, and of that unmistakable home-like taste.
                Our motto <em style={{ color: C.green }}>&ldquo;Swad Jo Bharosa Jagaye&rdquo;</em> is
                not just a tagline; it&apos;s the standard by which every dish is prepared.
              </p>
              <p className="text-base leading-relaxed font-light" style={{ color: C.textMuted }}>
                From your morning <strong>Kachori Sabji</strong> to a grand evening feast of
                <strong> Paneer Tikka</strong> and <strong>Dal Makhni Thali</strong> —
                we serve 100% pure vegetarian food crafted with desi ghee, farm-fresh dairy, and no preservatives.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: "🧼", title: "Hygienic Kitchen", desc: "Sanitized daily, FSSAI compliant." },
                  { icon: "🧈", title: "Pure Desi Ghee", desc: "Zero adulteration. Natural dairy only." },
                  { icon: "🌿", title: "No Preservatives", desc: "Fresh preparations every single day." },
                  { icon: "🔥", title: "Live Tandoor", desc: "Breads & snacks straight from the tandoor." },
                ].map((p) => (
                  <div key={p.title} className="p-4 rounded-xl border"
                    style={{ background: "rgba(255,255,255,0.7)", borderColor: `${C.gold}35` }}>
                    <div className="text-xl mb-1">{p.icon}</div>
                    <h4 className="font-serif font-bold text-sm" style={{ color: C.green }}>{p.title}</h4>
                    <p className="text-xs mt-1" style={{ color: C.textMuted }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-5">
              {/* Quote + Logo */}
              <div className="relative rounded-3xl p-8 text-white overflow-hidden border-2 shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, borderColor: C.gold }}>
                <div className="absolute top-0 right-0 text-9xl opacity-10 select-none translate-x-6 -translate-y-6">🪔</div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 shadow-md shrink-0"
                      style={{ borderColor: C.gold }}>
                      <Image src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                        alt="Shobharam's Logo" fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-lg" style={{ color: C.goldLight }}>Shobharam&apos;s</p>
                      <p className="text-xs" style={{ color: C.goldMuted }}>Sweets &amp; Restaurant</p>
                    </div>
                  </div>
                  <span className="text-4xl" style={{ color: C.gold }}>❝</span>
                  <p className="font-serif text-lg italic leading-relaxed" style={{ color: C.goldLight }}>
                    &ldquo;Food made with pure devotion and pure ghee carries the very
                    soul of Indian hospitality.&rdquo;
                  </p>
                  <div className="border-t pt-3" style={{ borderColor: `${C.gold}40` }}>
                    <h4 className="font-bold text-sm text-white">Shobharam Family</h4>
                    <p className="text-xs" style={{ color: "#D4C4A0" }}>
                      Founders &amp; Master Halwais, Chhapraula, Greater Noida
                    </p>
                  </div>
                  <div className="rounded-xl p-3 border text-xs space-y-1"
                    style={{ background: "rgba(255,255,255,0.08)", borderColor: `${C.gold}40` }}>
                    <p className="font-semibold" style={{ color: C.goldMuted }}>📍 Find Us At:</p>
                    <p style={{ color: "#D4C4A0" }}>
                      P. No. 7A, Gate No.01, Sai Heritage, Chhapraula,<br />
                      Greater Noida, G.B. Nagar — UP 201009
                    </p>
                  </div>
                </div>
              </div>

              {/* Purity grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🌱", label: "100% Veg" },
                  { icon: "🧈", label: "Pure Ghee" },
                  { icon: "✅", label: "FSSAI Safe" },
                ].map((b) => (
                  <div key={b.label} className="py-3 rounded-2xl flex flex-col items-center gap-1 border shadow-sm"
                    style={{ background: "rgba(255,255,255,0.8)", borderColor: `${C.gold}40` }}>
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-xs font-bold" style={{ color: C.green }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 border-t"
        style={{ background: C.creamWarm, borderColor: `${C.gold}30` }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            style={{ borderColor: `${C.gold}40` }}>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.gold }}>
                Direct Ordering
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: C.green }}>
                Ready to Order Fresh Delights?
              </h3>
              <p className="text-sm" style={{ color: C.textMuted }}>
                Call us for immediate delivery, table reservations, or catering inquiries.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-xl border inline-flex"
                style={{ color: C.green, borderColor: `${C.green}30`, background: `${C.green}08` }}>
                ⏰ Mon–Sun | 10:00 AM – 11:00 PM
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: "📞", bg: C.green, color: "#fff", label: "Primary / Order", num: "+91 95480 89761", href: "tel:9548089761" },
                { icon: "📱", bg: C.gold, color: C.greenDark, label: "Alternate / WhatsApp", num: "+91 90689 35364", href: "tel:9068935364" },
              ].map((ph) => (
                <a key={ph.num} href={ph.href}
                  className="flex items-center gap-4 p-3.5 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-md"
                  style={{ background: C.cream, borderColor: `${C.gold}40` }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0"
                    style={{ background: ph.bg, color: ph.color }}>
                    {ph.icon}
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: C.textMuted }}>{ph.label}</div>
                    <div className="font-bold text-base" style={{ color: C.green }}>{ph.num}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order."
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-md"
                style={{ background: "#25D366" }}>
                💬 Order on WhatsApp
              </a>
              <button onClick={() => setOrderModal(true)}
                className="w-full py-3.5 px-6 rounded-full font-bold text-sm text-white transition-all hover:scale-105 text-center flex items-center justify-center gap-2 shadow-md cursor-pointer border"
                style={{ background: C.green, borderColor: C.gold }}>
                🛍️ Online Order Inquiry
              </button>
              <a href="#menu"
                className="w-full py-3 px-6 rounded-full font-semibold text-sm transition-all text-center border"
                style={{ color: C.green, borderColor: `${C.gold}60`, background: `${C.gold}12` }}>
                📜 View Our Full Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="pt-14 pb-8 border-t-4" style={{ background: C.green, borderColor: C.gold }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b"
            style={{ borderColor: `${C.gold}25` }}>

            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 shadow-md shrink-0"
                  style={{ borderColor: C.gold }}>
                  <Image src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                    alt="Shobharam's Logo" fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: C.goldLight }}>
                    Shobharam&apos;s
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.goldMuted }}>
                    Sweets &amp; Restaurant
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed font-light" style={{ color: "#A0BAA8" }}>
                &ldquo;Swad Jo Bharosa Jagaye&rdquo; — Serving authentic pure vegetarian cuisine
                with uncompromised quality and warmth since day one.
              </p>
              <div className="flex flex-wrap gap-2">
                {["🌱 100% Pure Veg", "🧈 Pure Desi Ghee", "🚚 Free Delivery ₹300+"].map((b) => (
                  <span key={b} className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                    style={{ background: "rgba(0,0,0,0.2)", color: C.goldLight, borderColor: `${C.gold}30` }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Menu Links */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold border-b pb-2" style={{ color: C.goldLight, borderColor: `${C.gold}30` }}>
                Menu Categories
              </h4>
              <ul className="space-y-1.5">
                {[
                  { emoji: "🌅", label: "Breakfast & Snacks" },
                  { emoji: "🍡", label: "Nukkad Ki Chaat" },
                  { emoji: "🥞", label: "South Indian" },
                  { emoji: "🥢", label: "Chinese Noodles & Momos" },
                  { emoji: "🍛", label: "North Indian Curries" },
                  { emoji: "🔥", label: "Tandoor Snacks" },
                  { emoji: "🍽️", label: "Thali & Combo Meals" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href="#menu" className="text-xs flex items-center gap-2 transition-colors hover:underline"
                      style={{ color: "#A0BAA8" }}>
                      <span>{l.emoji}</span>{l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold border-b pb-2" style={{ color: C.goldLight, borderColor: `${C.gold}30` }}>
                Visit Our Shop
              </h4>
              <p className="text-xs leading-relaxed font-light" style={{ color: "#A0BAA8" }}>
                <strong style={{ color: "#D0DAD4" }}>Shobharam&apos;s Sweets &amp; Restaurant</strong>
                <br />P. No. 7A, Gate No. 01,
                <br />Sai Heritage, Chhapraula,
                <br />Greater Noida, G.B. Nagar,
                <br /><strong style={{ color: C.goldLight }}>Uttar Pradesh – 201009</strong>
              </p>
              <div className="text-[11px] px-3 py-2 rounded-lg border" style={{ color: C.goldMuted, borderColor: `${C.gold}30`, background: "rgba(0,0,0,0.15)" }}>
                📍 Near Sai Heritage Gate No. 1, Chhapraula
              </div>
            </div>

            {/* Timings & Contact */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold border-b pb-2" style={{ color: C.goldLight, borderColor: `${C.gold}30` }}>
                Timings &amp; Contact
              </h4>
              <div className="text-xs space-y-2" style={{ color: "#A0BAA8" }}>
                <div className="p-2.5 rounded-lg border" style={{ borderColor: `${C.gold}30`, background: "rgba(0,0,0,0.15)" }}>
                  <p className="font-semibold text-white">⏰ Opening Hours</p>
                  <p className="mt-0.5">Monday – Sunday</p>
                  <p className="font-bold" style={{ color: C.goldLight }}>10:00 AM – 11:00 PM</p>
                </div>
                <div className="p-2.5 rounded-lg border space-y-1" style={{ borderColor: `${C.gold}30`, background: "rgba(0,0,0,0.15)" }}>
                  <p className="font-semibold text-white">📞 Phone / WhatsApp</p>
                  <a href="tel:9548089761" className="block font-bold hover:underline" style={{ color: C.goldLight }}>
                    +91 95480 89761
                  </a>
                  <a href="tel:9068935364" className="block font-bold hover:underline" style={{ color: C.goldLight }}>
                    +91 90689 35364
                  </a>
                </div>
                <div className="p-2.5 rounded-lg border" style={{ borderColor: `${C.gold}30`, background: "rgba(212,175,55,0.15)" }}>
                  <p className="font-bold" style={{ color: C.goldLight }}>
                    🚚 Free Delivery on Orders ₹300+
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
            style={{ color: "#6A8A72" }}>
            <p>© {new Date().getFullYear()} Shobharam&apos;s Sweets &amp; Restaurant. All Rights Reserved.</p>
            <p className="font-semibold" style={{ color: C.goldLight }}>
              स्वाद जो भरोसा जगाए &bull; PURE VEG &bull; FRESH INGREDIENTS &bull; AUTHENTIC TASTE 🙏
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          VIDEO LIGHTBOX MODAL
      ══════════════════════════════════════════ */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && setVideoModal(null)}>

          <div className="relative w-full max-w-md flex flex-col rounded-3xl overflow-hidden shadow-2xl border-2"
            style={{ borderColor: C.gold, background: C.greenDark, maxHeight: "90vh" }}>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ background: `linear-gradient(90deg, ${C.greenDark}, ${C.green})`, borderBottom: `1px solid ${C.gold}40` }}>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border shrink-0"
                  style={{ borderColor: C.gold }}>
                  <Image src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                    alt="Logo" fill className="object-cover" sizes="32px" />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm" style={{ color: C.goldLight }}>
                    {videoModal.title}
                  </p>
                  <p className="text-[10px]" style={{ color: "#A0BAA8" }}>{videoModal.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setVideoModal(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:scale-110 transition-transform"
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
                title="Close (ESC)">
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative flex-1 bg-black" style={{ minHeight: "60vh" }}>
              <video
                key={videoModal.src}
                src={videoModal.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                style={{ display: "block", maxHeight: "75vh" }}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ background: `${C.greenDark}F0`, borderTop: `1px solid ${C.gold}30` }}>
              <p className="text-[11px]" style={{ color: "#A0BAA8" }}>
                🌿 100% Pure Veg &bull; Shobharam&apos;s
              </p>
              <a
                href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order%20after%20watching%20your%20video!"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
                style={{ background: "#25D366", color: "#fff" }}>
                💬 Order Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          ORDER MODAL
      ══════════════════════════════════════════ */}
      {orderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: "rgba(7,48,31,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && setOrderModal(false)}>
          <div className="relative max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border-2"
            style={{ background: C.cream, borderColor: C.gold }}>
            <button onClick={() => setOrderModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
              style={{ color: C.textMuted, background: `${C.gold}20` }}>
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 mx-auto mb-3 shadow-md"
                style={{ borderColor: C.gold }}>
                <Image src="/images/723931223_18109287712749343_5268730937196992469_n.jpg"
                  alt="Shobharam's Logo" fill className="object-cover" sizes="64px" />
              </div>
              <h3 className="font-serif text-2xl font-bold" style={{ color: C.green }}>
                Order from Shobharam&apos;s
              </h3>
              <p className="text-xs mt-1" style={{ color: C.textMuted }}>
                🌿 Pure Veg &bull; Fresh &bull; 🚚 Free Delivery on ₹300+
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs p-3 rounded-xl border" style={{ background: `${C.green}10`, color: C.textMuted, borderColor: `${C.green}25` }}>
                📌 We take immediate orders via Call &amp; WhatsApp for maximum freshness:
              </div>
              <a href="https://wa.me/919068935364?text=Hello%20Shobharam%27s%2C%20I%20want%20to%20order.%20Please%20share%20details."
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md"
                style={{ background: "#25D366" }}>
                💬 Order via WhatsApp — 90689 35364
              </a>
              <a href="tel:9068935364"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md border"
                style={{ background: C.green, borderColor: C.gold }}>
                📞 Call: +91 90689 35364
              </a>
              <a href="tel:9548089761"
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border"
                style={{ color: C.green, borderColor: `${C.gold}50`, background: `${C.gold}12` }}>
                📱 Alternate: +91 95480 89761
              </a>
            </div>
            <div className="mt-5 text-center">
              <button onClick={() => setOrderModal(false)}
                className="text-xs cursor-pointer hover:underline" style={{ color: C.textMuted }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
