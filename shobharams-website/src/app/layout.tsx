import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shobharam's Sweets & Restaurant | Swad Jo Bharosa Jagaye | Greater Noida",
  description:
    "Shobharam's Sweets & Restaurant in Chhapraula, Greater Noida — Authentic pure desi ghee mithai, North & South Indian cuisine, and premium catering for weddings, birthday parties, kitty parties & corporate events.",
  keywords: [
    "Shobharam's Sweets",
    "Shobharam Restaurant Greater Noida",
    "Best Sweets Chhapraula Noida",
    "Pure Desi Ghee Mithai",
    "Kaju Katli Gulab Jamun",
    "Catering Greater Noida",
    "Birthday Party Catering Noida",
    "Swad Jo Bharosa Jagaye",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-[#F5EDD7] text-[#1C2B1F] min-h-screen">
        {children}
      </body>
    </html>
  );
}
