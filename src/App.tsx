import { useState, useEffect, useCallback, useRef } from "react";
import {
  Sun, Cloud, Droplets, Wind, Thermometer, MapPin, Phone, Mail,
  Star, ChevronDown, Menu, X, Search, Filter, Trash2, Edit3,
  ArrowRight, Shield, Users, HeadphonesIcon, Leaf, TrendingUp,
  ExternalLink, MessageCircle, CloudRain, Eye, EyeOff, ShoppingCart,
  Facebook, Twitter, Instagram, Youtube, Heart, Clock, Tag,
  User, Settings, LogOut, Camera, Upload, ImageIcon, ChevronRight,
  Lock, UserPlus, AlertCircle, CheckCircle, Loader2, KeyRound,
  Sprout, Calendar, Zap, Info
} from "lucide-react";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInAsGuest,
  logOut,
  deleteAccount,
  resetPassword,
  isFirebaseReady,
  type AuthResult,
} from "./zelogin";

// ==================== CUSTOM LOGO COMPONENT ====================
function IndiagroLogo({ size = "md", showText = true }: { size?: "sm" | "md" | "lg" | "xl"; showText?: boolean }) {
  const sizes = {
    sm: { container: "w-8 h-8", icon: 32 },
    md: { container: "w-10 h-10", icon: 40 },
    lg: { container: "w-14 h-14", icon: 56 },
    xl: { container: "w-20 h-20", icon: 80 },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`${s.container} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="tricolorTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="100%" stopColor="#FFB366" />
            </linearGradient>
          </defs>
          
          {/* Main circle background */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
          
          {/* Tricolor accent at top (saffron) */}
          <path d="M 15 30 Q 50 15 85 30" stroke="url(#tricolorTop)" strokeWidth="4" fill="none" strokeLinecap="round" />
          
          {/* Sun rising */}
          <circle cx="50" cy="42" r="12" fill="url(#sunGradient)" />
          {/* Sun rays */}
          <g stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
            <line x1="50" y1="24" x2="50" y2="20" />
            <line x1="62" y1="30" x2="66" y2="26" />
            <line x1="38" y1="30" x2="34" y2="26" />
            <line x1="68" y1="42" x2="72" y2="42" />
            <line x1="32" y1="42" x2="28" y2="42" />
          </g>
          
          {/* Curved field/land */}
          <ellipse cx="50" cy="85" rx="42" ry="20" fill="url(#fieldGradient)" opacity="0.6" />
          
          {/* Wheat stalks */}
          <g fill="none" strokeLinecap="round">
            {/* Left wheat */}
            <g stroke="#fef3c7" strokeWidth="2.5">
              <path d="M 30 80 Q 28 65 35 50" />
              <ellipse cx="33" cy="52" rx="4" ry="7" fill="#fef3c7" transform="rotate(-15 33 52)" />
              <ellipse cx="31" cy="58" rx="3" ry="5" fill="#fef3c7" transform="rotate(-20 31 58)" />
              <ellipse cx="35" cy="56" rx="3" ry="5" fill="#fef3c7" transform="rotate(10 35 56)" />
            </g>
            
            {/* Center wheat (taller) */}
            <g stroke="#ffffff" strokeWidth="3">
              <path d="M 50 80 Q 50 60 50 42" />
              <ellipse cx="50" cy="44" rx="5" ry="8" fill="#fff" />
              <ellipse cx="45" cy="50" rx="4" ry="6" fill="#fff" transform="rotate(-20 45 50)" />
              <ellipse cx="55" cy="50" rx="4" ry="6" fill="#fff" transform="rotate(20 55 50)" />
              <ellipse cx="46" cy="58" rx="3" ry="5" fill="#fff" transform="rotate(-15 46 58)" />
              <ellipse cx="54" cy="58" rx="3" ry="5" fill="#fff" transform="rotate(15 54 58)" />
            </g>
            
            {/* Right wheat */}
            <g stroke="#fef3c7" strokeWidth="2.5">
              <path d="M 70 80 Q 72 65 65 50" />
              <ellipse cx="67" cy="52" rx="4" ry="7" fill="#fef3c7" transform="rotate(15 67 52)" />
              <ellipse cx="69" cy="58" rx="3" ry="5" fill="#fef3c7" transform="rotate(20 69 58)" />
              <ellipse cx="65" cy="56" rx="3" ry="5" fill="#fef3c7" transform="rotate(-10 65 56)" />
            </g>
          </g>
          
          {/* Small farmer silhouette hint */}
          <g fill="#15803d" opacity="0.5">
            <circle cx="22" cy="72" r="3" />
            <path d="M 19 75 Q 22 82 22 85 L 25 85 Q 25 82 22 75 Z" />
          </g>
          
          {/* Tractor wheel hint on right */}
          <circle cx="78" cy="78" r="5" stroke="#15803d" strokeWidth="2" fill="none" opacity="0.4" />
          <circle cx="78" cy="78" r="2" fill="#15803d" opacity="0.4" />
        </svg>
      </div>
      {showText && (
        <div>
          <h1 className={`font-extrabold text-green-800 leading-tight ${size === "lg" || size === "xl" ? "text-2xl" : "text-lg"}`}>
            Indi<span className="text-orange-500">a</span>gro
          </h1>
          <p className={`text-green-600 leading-none ${size === "lg" || size === "xl" ? "text-xs" : "text-[10px]"}`}>
            Agricultural Marketplace
          </p>
        </div>
      )}
    </div>
  );
}

// Logo for dark backgrounds (white text version)
function IndiagroLogoLight({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { container: "w-8 h-8" },
    md: { container: "w-10 h-10" },
    lg: { container: "w-14 h-14" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`${s.container} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="sunGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          
          <circle cx="50" cy="50" r="48" fill="url(#logoGradientLight)" />
          <path d="M 15 30 Q 50 15 85 30" stroke="#FF9933" strokeWidth="4" fill="none" strokeLinecap="round" />
          
          <circle cx="50" cy="42" r="12" fill="url(#sunGradientLight)" />
          <g stroke="#fcd34d" strokeWidth="2" strokeLinecap="round">
            <line x1="50" y1="24" x2="50" y2="20" />
            <line x1="62" y1="30" x2="66" y2="26" />
            <line x1="38" y1="30" x2="34" y2="26" />
            <line x1="68" y1="42" x2="72" y2="42" />
            <line x1="32" y1="42" x2="28" y2="42" />
          </g>
          
          <ellipse cx="50" cy="85" rx="42" ry="20" fill="#4ade80" opacity="0.6" />
          
          <g fill="none" strokeLinecap="round">
            <g stroke="#fef3c7" strokeWidth="2.5">
              <path d="M 30 80 Q 28 65 35 50" />
              <ellipse cx="33" cy="52" rx="4" ry="7" fill="#fef3c7" transform="rotate(-15 33 52)" />
              <ellipse cx="31" cy="58" rx="3" ry="5" fill="#fef3c7" transform="rotate(-20 31 58)" />
              <ellipse cx="35" cy="56" rx="3" ry="5" fill="#fef3c7" transform="rotate(10 35 56)" />
            </g>
            <g stroke="#ffffff" strokeWidth="3">
              <path d="M 50 80 Q 50 60 50 42" />
              <ellipse cx="50" cy="44" rx="5" ry="8" fill="#fff" />
              <ellipse cx="45" cy="50" rx="4" ry="6" fill="#fff" transform="rotate(-20 45 50)" />
              <ellipse cx="55" cy="50" rx="4" ry="6" fill="#fff" transform="rotate(20 55 50)" />
              <ellipse cx="46" cy="58" rx="3" ry="5" fill="#fff" transform="rotate(-15 46 58)" />
              <ellipse cx="54" cy="58" rx="3" ry="5" fill="#fff" transform="rotate(15 54 58)" />
            </g>
            <g stroke="#fef3c7" strokeWidth="2.5">
              <path d="M 70 80 Q 72 65 65 50" />
              <ellipse cx="67" cy="52" rx="4" ry="7" fill="#fef3c7" transform="rotate(15 67 52)" />
              <ellipse cx="69" cy="58" rx="3" ry="5" fill="#fef3c7" transform="rotate(20 69 58)" />
              <ellipse cx="65" cy="56" rx="3" ry="5" fill="#fef3c7" transform="rotate(-10 65 56)" />
            </g>
          </g>
        </svg>
      </div>
      <div>
        <h1 className={`font-extrabold text-white leading-tight ${size === "lg" ? "text-2xl" : "text-lg"}`}>
          Indi<span className="text-yellow-400">a</span>gro
        </h1>
        <p className={`text-green-200 leading-none ${size === "lg" ? "text-xs" : "text-[10px]"}`}>
          Agricultural Marketplace
        </p>
      </div>
    </div>
  );
}

// ==================== TYPES ====================
interface Product {
  id: string;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  price: number;
  expiryDate: string;
  district: string;
  mandi: string;
  farmerName: string;
  phone: string;
  whatsapp: string;
  createdAt: string;
  image: string;
}

interface WeatherData {
  temp: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
  city: string;
  rainfall: number;
  feelsLike: number;
}

interface UserProfile {
  name: string;
  email: string;
  userId: string;
  role: "farmer" | "buyer" | "";
  joinedDate: string;
  avatar: string;
  isLoggedIn: boolean;
  isGuest?: boolean;
}

type Page = "home" | "shop" | "farmer" | "buyer" | "about" | "testimonials" | "contact" | "profile" | "login";
type FarmerTab = "weather" | "mandi" | "schemes" | "wholesalers" | "sell" | "seasonal";

// ==================== DATA ====================
const CATEGORIES = ["Vegetables", "Fruits", "Crops", "Other Crops"];

const DISTRICTS = [
  "Kolkata", "Howrah", "Hooghly", "North 24 Parganas", "South 24 Parganas",
  "Nadia", "Murshidabad", "Malda", "Bankura", "Birbhum",
  "Burdwan", "Cooch Behar", "Darjeeling", "Jalpaiguri", "Midnapore"
];

const MANDIS: Record<string, string[]> = {
  "Kolkata": ["Koley Market", "Sealdah Market", "Maniktala Bazaar", "Gariahat Market"],
  "Howrah": ["Howrah Wholesale Market", "Shibpur Market", "Uluberia Mandi"],
  "Hooghly": ["Chinsurah Market", "Serampore Mandi", "Dhaniakhali Market"],
  "North 24 Parganas": ["Barasat Market", "Barrackpore Mandi", "Basirhat Market"],
  "South 24 Parganas": ["Diamond Harbour Market", "Kakdwip Mandi", "Canning Market"],
  "Nadia": ["Krishnanagar Market", "Ranaghat Mandi", "Nabadwip Market"],
  "Murshidabad": ["Berhampore Market", "Lalbag Mandi", "Jangipur Market"],
  "Malda": ["English Bazaar", "Old Malda Market", "Gazole Mandi"],
  "Bankura": ["Bankura Town Market", "Bishnupur Mandi"],
  "Birbhum": ["Suri Market", "Bolpur Mandi", "Rampurhat Market"],
  "Burdwan": ["Burdwan Town Market", "Durgapur Mandi", "Asansol Market"],
  "Cooch Behar": ["Cooch Behar Market", "Dinhata Mandi"],
  "Darjeeling": ["Siliguri Market", "Darjeeling Town Mandi"],
  "Jalpaiguri": ["Jalpaiguri Market", "Alipurduar Mandi"],
  "Midnapore": ["Midnapore Town Market", "Kharagpur Mandi", "Tamluk Market"]
};

const MANDI_PRICES = [
  { crop: "Rice (Paddy)", min: 2040, max: 2200, modal: 2120, district: "Burdwan", mandi: "Burdwan Town Market" },
  { crop: "Potato", min: 800, max: 1200, modal: 1000, district: "Hooghly", mandi: "Chinsurah Market" },
  { crop: "Onion", min: 1500, max: 2200, modal: 1850, district: "Kolkata", mandi: "Koley Market" },
  { crop: "Tomato", min: 1200, max: 2000, modal: 1600, district: "Kolkata", mandi: "Sealdah Market" },
  { crop: "Wheat", min: 2275, max: 2500, modal: 2388, district: "Malda", mandi: "English Bazaar" },
  { crop: "Mustard", min: 5200, max: 5800, modal: 5500, district: "Nadia", mandi: "Krishnanagar Market" },
  { crop: "Jute", min: 4500, max: 5200, modal: 4850, district: "Murshidabad", mandi: "Berhampore Market" },
  { crop: "Cauliflower", min: 600, max: 1000, modal: 800, district: "North 24 Parganas", mandi: "Barasat Market" },
  { crop: "Cabbage", min: 500, max: 900, modal: 700, district: "Hooghly", mandi: "Serampore Mandi" },
  { crop: "Brinjal", min: 800, max: 1400, modal: 1100, district: "South 24 Parganas", mandi: "Diamond Harbour Market" },
  { crop: "Green Chili", min: 2000, max: 3500, modal: 2750, district: "Kolkata", mandi: "Maniktala Bazaar" },
  { crop: "Banana", min: 1000, max: 1800, modal: 1400, district: "Nadia", mandi: "Ranaghat Mandi" },
  { crop: "Mango", min: 3000, max: 6000, modal: 4500, district: "Malda", mandi: "Old Malda Market" },
  { crop: "Lentil (Masoor)", min: 4800, max: 5500, modal: 5150, district: "Birbhum", mandi: "Suri Market" },
  { crop: "Chickpea (Chana)", min: 5000, max: 5600, modal: 5300, district: "Bankura", mandi: "Bankura Town Market" },
  { crop: "Turmeric", min: 8000, max: 12000, modal: 10000, district: "Midnapore", mandi: "Midnapore Town Market" },
  { crop: "Ginger", min: 4000, max: 6000, modal: 5000, district: "Darjeeling", mandi: "Siliguri Market" },
  { crop: "Pumpkin", min: 400, max: 800, modal: 600, district: "Howrah", mandi: "Howrah Wholesale Market" },
  { crop: "Pointed Gourd", min: 1500, max: 2500, modal: 2000, district: "Nadia", mandi: "Nabadwip Market" },
  { crop: "Bitter Gourd", min: 1200, max: 2000, modal: 1600, district: "Burdwan", mandi: "Durgapur Mandi" },
];

const GOVT_SCHEMES = [
  { name: "PM-KISAN", description: "Direct income support of ₹6,000 per year to farmer families in three equal installments.", eligibility: "All landholding farmer families with cultivable land.", link: "https://pmkisan.gov.in/" },
  { name: "Krishak Bandhu", description: "West Bengal government scheme providing ₹10,000 per year (₹5,000 per crop season) and death benefit of ₹2 lakh.", eligibility: "All farmers in West Bengal aged 18-60 years.", link: "https://krishakbandhu.net/" },
  { name: "PM Fasal Bima Yojana", description: "Crop insurance scheme to protect farmers against crop loss/damage due to natural calamities.", eligibility: "All farmers including sharecroppers and tenant farmers.", link: "https://pmfby.gov.in/" },
  { name: "Kisan Credit Card (KCC)", description: "Provides farmers with affordable credit for agricultural needs at subsidized interest rates.", eligibility: "All farmers, fishermen, and animal husbandry farmers.", link: "https://www.pmkisan.gov.in/KCC" },
  { name: "Soil Health Card Scheme", description: "Provides soil health cards to farmers with crop-wise nutrient recommendations.", eligibility: "All farmers across India.", link: "https://soilhealth.dac.gov.in/" },
  { name: "National Mission on Sustainable Agriculture", description: "Promotes sustainable farming practices, soil health management, and climate change adaptation.", eligibility: "Farmers adopting sustainable agricultural practices.", link: "https://nmsa.dac.gov.in/" }
];

const WHOLESALERS = [
  { name: "Bengal Agro Traders", district: "Kolkata", commodity: "Vegetables", phone: "+91 98765 43210", verified: true },
  { name: "Hooghly Grain Merchants", district: "Hooghly", commodity: "Crops", phone: "+91 98765 43211", verified: true },
  { name: "Malda Fruit Hub", district: "Malda", commodity: "Fruits", phone: "+91 98765 43212", verified: true },
  { name: "Nadia Pulse Center", district: "Nadia", commodity: "Pulses", phone: "+91 98765 43213", verified: true },
  { name: "Burdwan Rice Mills", district: "Burdwan", commodity: "Crops", phone: "+91 98765 43214", verified: true },
  { name: "Siliguri Fresh Produce", district: "Darjeeling", commodity: "Vegetables", phone: "+91 98765 43215", verified: true },
  { name: "Howrah Wholesale Agri", district: "Howrah", commodity: "Vegetables", phone: "+91 98765 43216", verified: true },
  { name: "Murshidabad Jute Corp", district: "Murshidabad", commodity: "Crops", phone: "+91 98765 43217", verified: true },
  { name: "Midnapore Spice Traders", district: "Midnapore", commodity: "Vegetables", phone: "+91 98765 43218", verified: true },
  { name: "Bankura Grain House", district: "Bankura", commodity: "Other Crops", phone: "+91 98765 43219", verified: true },
];

// Seasonal Crops Data for West Bengal (Based on dataful.in dataset structure)
// Source: https://dataful.in/datasets/5607/
interface SeasonalCrop {
  crop: string;
  season: "Kharif" | "Rabi" | "Zaid" | "Whole Year";
  district: string;
  sowingTime: string;
  harvestTime: string;
  avgYield: string;
  profitMargin: "High" | "Medium" | "Low";
  waterRequirement: "High" | "Medium" | "Low";
  soilType: string;
  tips: string;
}

const SEASONAL_CROPS: SeasonalCrop[] = [
  // Kharif Season (June-October) - Monsoon crops
  { crop: "Paddy (Aman Rice)", season: "Kharif", district: "Burdwan", sowingTime: "June-July", harvestTime: "November-December", avgYield: "25-30 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Clay loam, alluvial", tips: "Transplant seedlings 20-25 days old. Maintain 5cm water level during tillering." },
  { crop: "Paddy (Aman Rice)", season: "Kharif", district: "Hooghly", sowingTime: "June-July", harvestTime: "November-December", avgYield: "28-32 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Alluvial soil", tips: "Use certified seeds. Apply nitrogen in 3 split doses." },
  { crop: "Paddy (Aman Rice)", season: "Kharif", district: "Murshidabad", sowingTime: "June-July", harvestTime: "November-December", avgYield: "22-28 q/hectare", profitMargin: "Medium", waterRequirement: "High", soilType: "Sandy loam", tips: "Green manuring before transplanting increases yield." },
  { crop: "Jute", season: "Kharif", district: "Murshidabad", sowingTime: "March-May", harvestTime: "July-August", avgYield: "25-30 q/hectare", profitMargin: "Medium", waterRequirement: "High", soilType: "Alluvial, loamy", tips: "Retting should be done in clean, slow-moving water for 15-20 days." },
  { crop: "Jute", season: "Kharif", district: "Nadia", sowingTime: "March-May", harvestTime: "July-August", avgYield: "28-35 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Alluvial soil", tips: "Harvest at flowering stage for best fiber quality." },
  { crop: "Jute", season: "Kharif", district: "North 24 Parganas", sowingTime: "April-May", harvestTime: "August", avgYield: "22-28 q/hectare", profitMargin: "Medium", waterRequirement: "High", soilType: "Clay loam", tips: "Line sowing at 25-30 cm spacing gives better yield." },
  { crop: "Maize", season: "Kharif", district: "Malda", sowingTime: "June-July", harvestTime: "September-October", avgYield: "40-50 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Well-drained loamy", tips: "Apply zinc sulfate if leaves show white stripes." },
  { crop: "Maize", season: "Kharif", district: "Darjeeling", sowingTime: "June-July", harvestTime: "October", avgYield: "35-45 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Red laterite", tips: "Earthing up at knee-high stage prevents lodging." },
  { crop: "Sesame (Til)", season: "Kharif", district: "Birbhum", sowingTime: "June-July", harvestTime: "September-October", avgYield: "5-7 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Light sandy loam", tips: "Avoid waterlogging. Harvest when lower capsules turn brown." },
  { crop: "Green Gram (Moong)", season: "Kharif", district: "Bankura", sowingTime: "July", harvestTime: "September-October", avgYield: "6-8 q/hectare", profitMargin: "Medium", waterRequirement: "Low", soilType: "Sandy loam", tips: "Rhizobium inoculation increases nitrogen fixation." },
  { crop: "Black Gram (Urad)", season: "Kharif", district: "Midnapore", sowingTime: "July-August", harvestTime: "October-November", avgYield: "7-10 q/hectare", profitMargin: "Medium", waterRequirement: "Low", soilType: "Clay loam", tips: "Intercropping with maize is profitable." },
  { crop: "Pigeon Pea (Arhar)", season: "Kharif", district: "Bankura", sowingTime: "June-July", harvestTime: "December-January", avgYield: "10-12 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Well-drained loamy", tips: "Long duration variety for higher yields." },

  // Rabi Season (October-March) - Winter crops
  { crop: "Wheat", season: "Rabi", district: "Malda", sowingTime: "November", harvestTime: "March-April", avgYield: "30-35 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Loamy, clay loam", tips: "Timely sowing before mid-November is crucial. Irrigate at CRI stage." },
  { crop: "Wheat", season: "Rabi", district: "Nadia", sowingTime: "November", harvestTime: "March-April", avgYield: "28-32 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Alluvial soil", tips: "Apply 50% nitrogen at sowing, rest at tillering." },
  { crop: "Mustard", season: "Rabi", district: "Nadia", sowingTime: "October-November", harvestTime: "February-March", avgYield: "10-12 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Sandy loam", tips: "Spray boron at flowering for better seed setting." },
  { crop: "Mustard", season: "Rabi", district: "Murshidabad", sowingTime: "October-November", harvestTime: "February-March", avgYield: "8-10 q/hectare", profitMargin: "Medium", waterRequirement: "Low", soilType: "Alluvial", tips: "Mixed cropping with lentil is economical." },
  { crop: "Mustard", season: "Rabi", district: "Hooghly", sowingTime: "October", harvestTime: "February", avgYield: "10-14 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Clay loam", tips: "Yellow variety fetches better market price." },
  { crop: "Potato", season: "Rabi", district: "Hooghly", sowingTime: "October-November", harvestTime: "February-March", avgYield: "200-250 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Sandy loam, alluvial", tips: "Use certified disease-free seed tubers. Earthing up twice is essential." },
  { crop: "Potato", season: "Rabi", district: "Burdwan", sowingTime: "November", harvestTime: "February-March", avgYield: "180-220 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Well-drained loamy", tips: "Cold storage for off-season selling increases profit." },
  { crop: "Potato", season: "Rabi", district: "Cooch Behar", sowingTime: "October-November", harvestTime: "February", avgYield: "150-200 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Sandy loam", tips: "Kufri Jyoti variety is popular in this region." },
  { crop: "Lentil (Masoor)", season: "Rabi", district: "Birbhum", sowingTime: "October-November", harvestTime: "February-March", avgYield: "8-10 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Clay loam", tips: "No irrigation needed if soil moisture is good. Avoid waterlogging." },
  { crop: "Lentil (Masoor)", season: "Rabi", district: "Bankura", sowingTime: "November", harvestTime: "March", avgYield: "7-9 q/hectare", profitMargin: "Medium", waterRequirement: "Low", soilType: "Red laterite", tips: "Seed treatment with Rhizobium culture increases yield." },
  { crop: "Gram (Chana)", season: "Rabi", district: "Birbhum", sowingTime: "October-November", harvestTime: "February-March", avgYield: "12-15 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Well-drained loamy", tips: "Kabuli variety fetches premium price in market." },
  { crop: "Cauliflower", season: "Rabi", district: "North 24 Parganas", sowingTime: "September-October", harvestTime: "December-January", avgYield: "150-200 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Rich loamy", tips: "Blanching curds by tying leaves increases whiteness and price." },
  { crop: "Cabbage", season: "Rabi", district: "Hooghly", sowingTime: "September-October", harvestTime: "December-February", avgYield: "250-300 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Fertile loamy", tips: "Harvest before heads crack for best quality." },
  { crop: "Tomato", season: "Rabi", district: "Kolkata", sowingTime: "September-October", harvestTime: "January-March", avgYield: "200-300 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Well-drained loamy", tips: "Staking plants increases fruit quality and reduces disease." },
  { crop: "Onion", season: "Rabi", district: "Howrah", sowingTime: "October-November", harvestTime: "March-April", avgYield: "150-180 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Sandy loam", tips: "Curing bulbs in shade for 10-15 days before storage." },
  { crop: "Coriander", season: "Rabi", district: "Nadia", sowingTime: "October-November", harvestTime: "February", avgYield: "5-8 q/hectare (seed)", profitMargin: "High", waterRequirement: "Low", soilType: "Well-drained sandy", tips: "Split seeds before sowing for better germination." },

  // Zaid Season (March-June) - Summer crops
  { crop: "Boro Rice", season: "Zaid", district: "Burdwan", sowingTime: "December-January", harvestTime: "April-May", avgYield: "35-40 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Clay, clay loam", tips: "Assured irrigation is essential. High yielding variety recommended." },
  { crop: "Boro Rice", season: "Zaid", district: "Hooghly", sowingTime: "December-January", harvestTime: "May", avgYield: "38-45 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Alluvial soil", tips: "Use short duration varieties to escape summer heat." },
  { crop: "Summer Moong", season: "Zaid", district: "Nadia", sowingTime: "March", harvestTime: "May-June", avgYield: "8-10 q/hectare", profitMargin: "High", waterRequirement: "Low", soilType: "Sandy loam", tips: "Quick maturing. Good catch crop after potato or mustard." },
  { crop: "Summer Moong", season: "Zaid", district: "Murshidabad", sowingTime: "March", harvestTime: "May-June", avgYield: "6-8 q/hectare", profitMargin: "Medium", waterRequirement: "Low", soilType: "Loamy", tips: "IPM practices for pod borer management." },
  { crop: "Sunflower", season: "Zaid", district: "Birbhum", sowingTime: "January-February", harvestTime: "April-May", avgYield: "12-15 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Well-drained loamy", tips: "Face flowering heads towards east for better seed filling." },
  { crop: "Watermelon", season: "Zaid", district: "Malda", sowingTime: "February-March", harvestTime: "May-June", avgYield: "250-350 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Sandy riverbed", tips: "Riverbed cultivation is highly profitable. Use drip irrigation." },
  { crop: "Watermelon", season: "Zaid", district: "Murshidabad", sowingTime: "February-March", harvestTime: "May-June", avgYield: "200-300 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Sandy loam", tips: "Early variety fetches premium price in summer markets." },
  { crop: "Muskmelon", season: "Zaid", district: "Malda", sowingTime: "February-March", harvestTime: "May", avgYield: "150-200 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Sandy riverbed", tips: "Harvest at half-slip stage for better taste and shelf life." },
  { crop: "Cucumber", season: "Zaid", district: "North 24 Parganas", sowingTime: "February-March", harvestTime: "April-June", avgYield: "100-150 q/hectare", profitMargin: "Medium", waterRequirement: "Medium", soilType: "Loamy", tips: "Harvest cucumbers young for better market acceptance." },
  { crop: "Bitter Gourd", season: "Zaid", district: "Howrah", sowingTime: "February", harvestTime: "April-June", avgYield: "80-120 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Rich loamy", tips: "Pandal system increases yield and fruit quality." },
  { crop: "Pointed Gourd (Parwal)", season: "Zaid", district: "Nadia", sowingTime: "February-March", harvestTime: "May onwards", avgYield: "100-150 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Alluvial", tips: "Perennial crop. Apply FYM annually for sustained yield." },

  // Whole Year crops
  { crop: "Banana", season: "Whole Year", district: "Nadia", sowingTime: "Any month (best: June-July)", harvestTime: "12-14 months after planting", avgYield: "400-600 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Rich alluvial", tips: "Desuckering is essential. Leave only one sucker per plant." },
  { crop: "Banana", season: "Whole Year", district: "Hooghly", sowingTime: "Any month (best: June-July)", harvestTime: "12-14 months", avgYield: "500-700 q/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Loamy", tips: "Tissue culture plants give uniform and disease-free crop." },
  { crop: "Papaya", season: "Whole Year", district: "Malda", sowingTime: "June-September", harvestTime: "10-12 months onwards", avgYield: "300-400 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Well-drained sandy loam", tips: "Avoid waterlogging. Raised bed planting recommended." },
  { crop: "Betel Leaf (Paan)", season: "Whole Year", district: "South 24 Parganas", sowingTime: "June-July", harvestTime: "Throughout year", avgYield: "60-80 lakh leaves/hectare", profitMargin: "High", waterRequirement: "High", soilType: "Rich loamy", tips: "Boroj (shade structure) maintenance is key to success." },
  { crop: "Turmeric", season: "Whole Year", district: "Midnapore", sowingTime: "May-June", harvestTime: "January-February (9 months)", avgYield: "200-250 q/hectare (fresh)", profitMargin: "High", waterRequirement: "Medium", soilType: "Rich loamy", tips: "Mulching conserves moisture and suppresses weeds." },
  { crop: "Ginger", season: "Whole Year", district: "Darjeeling", sowingTime: "March-April", harvestTime: "December-January (8-9 months)", avgYield: "150-200 q/hectare", profitMargin: "High", waterRequirement: "Medium", soilType: "Rich loamy", tips: "Seed rhizome treatment with fungicide prevents rot." },
];

// Weather-based farming tips
const getWeatherTips = (weather: WeatherData | null): { tip: string; icon: string; priority: "high" | "medium" | "low" }[] => {
  if (!weather) return [];
  
  const tips: { tip: string; icon: string; priority: "high" | "medium" | "low" }[] = [];
  
  // Temperature-based tips
  if (weather.temp > 35) {
    tips.push({ tip: "Extreme heat alert! Irrigate crops early morning or late evening to reduce water loss. Provide shade for nurseries.", icon: "🌡️", priority: "high" });
    tips.push({ tip: "Apply mulching to conserve soil moisture and keep root zone cool.", icon: "🌿", priority: "high" });
  } else if (weather.temp > 30) {
    tips.push({ tip: "Hot weather - increase irrigation frequency. Watch for wilting in vegetable crops.", icon: "☀️", priority: "medium" });
  } else if (weather.temp < 15) {
    tips.push({ tip: "Cold weather alert! Protect nurseries with polythene covers. Light irrigation in evening helps prevent frost damage.", icon: "❄️", priority: "high" });
  } else if (weather.temp < 20) {
    tips.push({ tip: "Cool temperatures ideal for Rabi crops. Good time for wheat, mustard, and vegetable sowing.", icon: "🌤️", priority: "low" });
  }
  
  // Humidity-based tips
  if (weather.humidity > 85) {
    tips.push({ tip: "High humidity increases disease risk. Scout for fungal infections in rice, vegetables. Avoid overhead irrigation.", icon: "💧", priority: "high" });
    tips.push({ tip: "Spray preventive fungicides if humidity persists. Ensure proper spacing for air circulation.", icon: "🔬", priority: "medium" });
  } else if (weather.humidity > 70) {
    tips.push({ tip: "Moderate humidity - monitor for pest and disease buildup, especially in leafy vegetables.", icon: "🌫️", priority: "medium" });
  } else if (weather.humidity < 40) {
    tips.push({ tip: "Low humidity - increase irrigation. Good for grain drying and harvesting.", icon: "🏜️", priority: "medium" });
  }
  
  // Rainfall-based tips
  if (weather.rainfall > 20) {
    tips.push({ tip: "Heavy rainfall! Ensure proper drainage in fields. Delay fertilizer application.", icon: "🌧️", priority: "high" });
    tips.push({ tip: "Avoid pesticide spraying during rain. Check for waterlogging in low-lying areas.", icon: "⚠️", priority: "high" });
  } else if (weather.rainfall > 5) {
    tips.push({ tip: "Light rain received - good for crops. Monitor soil moisture before next irrigation.", icon: "🌦️", priority: "low" });
  } else if (weather.rainfall === 0 && weather.humidity < 50) {
    tips.push({ tip: "No rainfall expected - plan irrigation schedule. Check soil moisture regularly.", icon: "💦", priority: "medium" });
  }
  
  // Wind-based tips
  if (weather.wind > 30) {
    tips.push({ tip: "Strong winds expected! Stake tall crops like banana, maize. Avoid spraying pesticides.", icon: "💨", priority: "high" });
  } else if (weather.wind > 15) {
    tips.push({ tip: "Moderate winds - good for natural pollination. Avoid dust-based pesticide application.", icon: "🍃", priority: "low" });
  }
  
  // General seasonal tips based on temperature
  if (weather.temp >= 25 && weather.temp <= 32 && weather.humidity >= 60 && weather.humidity <= 80) {
    tips.push({ tip: "Ideal growing conditions! Good time for transplanting and sowing most crops.", icon: "✅", priority: "low" });
  }
  
  return tips.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const TESTIMONIALS = [
  { name: "Ramesh Das", role: "Farmer, Hooghly", quote: "This platform changed my life! I can now sell directly to buyers and get fair prices for my produce.", rating: 5, avatar: "RD" },
  { name: "Anita Mondal", role: "Buyer, Kolkata", quote: "Fresh vegetables straight from farmers. The quality is amazing and prices are very reasonable.", rating: 5, avatar: "AM" },
  { name: "Suresh Ghosh", role: "Wholesaler, Burdwan", quote: "The mandi price tracking and direct farmer connections have streamlined my business operations.", rating: 4, avatar: "SG" },
  { name: "Priya Banerjee", role: "Farmer, Nadia", quote: "Weather tracking and government scheme information all in one place. Very helpful for planning.", rating: 5, avatar: "PB" },
  { name: "Kamal Sen", role: "Buyer, Malda", quote: "I love the WhatsApp integration. Makes contacting farmers so easy and convenient.", rating: 4, avatar: "KS" },
  { name: "Deepa Roy", role: "Farmer, Midnapore", quote: "Selling turmeric and ginger has become so much easier. I get orders from across West Bengal now!", rating: 5, avatar: "DR" },
];

const CATEGORY_IMAGES: Record<string, string> = {
  "Vegetables": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
  "Fruits": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
  "Crops": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
  "Other Crops": "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
};

const PRODUCT_IMAGES: Record<string, string> = {
  "Vegetables": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=300&h=200&fit=crop",
  "Fruits": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop",
  "Crops": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop",
  "Other Crops": "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=200&fit=crop",
};

const SAMPLE_PRODUCTS: Product[] = [
  { id: "1", name: "Fresh Tomatoes", category: "Vegetables", quantity: "500", unit: "kg", price: 25, expiryDate: "2025-02-15", district: "Hooghly", mandi: "Chinsurah Market", farmerName: "Raju Mondal", phone: "+91 98765 00001", whatsapp: "+91 98765 00001", createdAt: "2025-01-20", image: PRODUCT_IMAGES["Vegetables"] },
  { id: "2", name: "Alphonso Mangoes", category: "Fruits", quantity: "200", unit: "kg", price: 120, expiryDate: "2025-03-30", district: "Malda", mandi: "Old Malda Market", farmerName: "Bikash Roy", phone: "+91 98765 00002", whatsapp: "+91 98765 00002", createdAt: "2025-01-18", image: PRODUCT_IMAGES["Fruits"] },
  { id: "3", name: "Basmati Rice", category: "Crops", quantity: "50", unit: "quintal", price: 3200, expiryDate: "2025-06-30", district: "Burdwan", mandi: "Burdwan Town Market", farmerName: "Amit Ghosh", phone: "+91 98765 00003", whatsapp: "+91 98765 00003", createdAt: "2025-01-15", image: PRODUCT_IMAGES["Crops"] },
  { id: "4", name: "Masoor Dal", category: "Other Crops", quantity: "30", unit: "quintal", price: 5200, expiryDate: "2025-08-30", district: "Birbhum", mandi: "Suri Market", farmerName: "Sita Devi", phone: "+91 98765 00004", whatsapp: "+91 98765 00004", createdAt: "2025-01-12", image: PRODUCT_IMAGES["Other Crops"] },
  { id: "5", name: "Green Chili", category: "Vegetables", quantity: "100", unit: "kg", price: 45, expiryDate: "2025-02-10", district: "Kolkata", mandi: "Maniktala Bazaar", farmerName: "Gopal Das", phone: "+91 98765 00005", whatsapp: "+91 98765 00005", createdAt: "2025-01-22", image: PRODUCT_IMAGES["Vegetables"] },
  { id: "6", name: "Bananas", category: "Fruits", quantity: "300", unit: "kg", price: 30, expiryDate: "2025-02-05", district: "Nadia", mandi: "Ranaghat Mandi", farmerName: "Lakshmi Halder", phone: "+91 98765 00006", whatsapp: "+91 98765 00006", createdAt: "2025-01-21", image: PRODUCT_IMAGES["Fruits"] },
  { id: "7", name: "Mustard Seeds", category: "Crops", quantity: "20", unit: "quintal", price: 5500, expiryDate: "2025-07-30", district: "Nadia", mandi: "Krishnanagar Market", farmerName: "Haren Sarkar", phone: "+91 98765 00007", whatsapp: "+91 98765 00007", createdAt: "2025-01-19", image: PRODUCT_IMAGES["Crops"] },
  { id: "8", name: "Chana Dal", category: "Other Crops", quantity: "25", unit: "quintal", price: 5400, expiryDate: "2025-09-30", district: "Bankura", mandi: "Bankura Town Market", farmerName: "Mala Khatun", phone: "+91 98765 00008", whatsapp: "+91 98765 00008", createdAt: "2025-01-17", image: PRODUCT_IMAGES["Other Crops"] },
];

const DEFAULT_PROFILE: UserProfile = {
  name: "Indiagro User",
  email: "user@indiagro.in",
  userId: "IGA-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
  role: "",
  joinedDate: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
  avatar: "",
  isLoggedIn: true,
};

// ==================== MAIN APP ====================
export function App() {
  // Check localStorage for saved auth state on initial load
  const getSavedProfile = (): UserProfile => {
    try {
      const saved = localStorage.getItem("indiagro_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn) return parsed;
      }
    } catch {}
    return { ...DEFAULT_PROFILE, isLoggedIn: false };
  };

  const getSavedRole = (): "" | "farmer" | "buyer" => {
    try {
      const saved = localStorage.getItem("indiagro_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.role || "";
      }
    } catch {}
    return "";
  };

  const savedProfile = getSavedProfile();
  const isInitiallyLoggedIn = savedProfile.isLoggedIn;

  const [currentPage, setCurrentPage] = useState<Page>(isInitiallyLoggedIn ? "home" : "login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [farmerTab, setFarmerTab] = useState<FarmerTab>("weather");
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [userRole, setUserRole] = useState<"" | "farmer" | "buyer">(getSavedRole());
  const [userProfile, setUserProfile] = useState<UserProfile>(savedProfile);
  const [authChecked, setAuthChecked] = useState(false);

  // Check auth state on mount and redirect to login if not authenticated
  useEffect(() => {
    const checkAuth = () => {
      try {
        const saved = localStorage.getItem("indiagro_user");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.isLoggedIn) {
            setUserProfile(parsed);
            setUserRole(parsed.role || "");
            // Stay on current page or go to home if on login
            if (currentPage === "login") {
              setCurrentPage("home");
            }
          } else {
            // Not logged in, go to login page
            setCurrentPage("login");
          }
        } else {
          // No saved data, go to login page
          setCurrentPage("login");
        }
      } catch {
        // Error reading localStorage, go to login page
        setCurrentPage("login");
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (authChecked && userProfile) {
      localStorage.setItem("indiagro_user", JSON.stringify(userProfile));
    }
  }, [userProfile, authChecked]);

  // Mandi filters
  const [mandiDistrict, setMandiDistrict] = useState("");
  const [mandiName, setMandiName] = useState("");

  // Buyer filters
  const [buyerCategory, setBuyerCategory] = useState("");
  const [buyerDistrict, setBuyerDistrict] = useState("");
  const [buyerPriceRange, setBuyerPriceRange] = useState<[number, number]>([0, 100000]);
  const [buyerSearch, setBuyerSearch] = useState("");

  // Wholesaler filters
  const [wsDistrict, setWsDistrict] = useState("");
  const [wsCommodity, setWsCommodity] = useState("");

  // Contact form
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Sell product form
  const [sellForm, setSellForm] = useState({
    name: "", category: "", quantity: "", unit: "kg", price: "",
    expiryDate: "", district: "", mandi: "", farmerName: "", phone: "", whatsapp: ""
  });
  const [sellImage, setSellImage] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // Fetch weather
  const fetchWeather = useCallback(() => {
    setWeatherLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,rain,weather_code&timezone=auto`
            );
            const data = await response.json();
            const current = data.current;
            const weatherCode = current.weather_code;
            let desc = "Clear";
            let icon = "sun";
            if (weatherCode >= 61) { desc = "Rainy"; icon = "rain"; }
            else if (weatherCode >= 45) { desc = "Foggy"; icon = "cloud"; }
            else if (weatherCode >= 2) { desc = "Cloudy"; icon = "cloud"; }
            setWeather({
              temp: Math.round(current.temperature_2m),
              humidity: current.relative_humidity_2m,
              wind: Math.round(current.wind_speed_10m),
              description: desc,
              icon,
              city: "Your Location",
              rainfall: current.rain || 0,
              feelsLike: Math.round(current.apparent_temperature)
            });
          } catch {
            setWeather({
              temp: 28, humidity: 75, wind: 12, description: "Partly Cloudy",
              icon: "cloud", city: "Kolkata (Default)", rainfall: 0, feelsLike: 31
            });
          }
          setWeatherLoading(false);
        },
        () => {
          setWeather({
            temp: 28, humidity: 75, wind: 12, description: "Partly Cloudy",
            icon: "cloud", city: "Kolkata (Default)", rainfall: 0, feelsLike: 31
          });
          setWeatherLoading(false);
        }
      );
    } else {
      setWeather({
        temp: 28, humidity: 75, wind: 12, description: "Partly Cloudy",
        icon: "cloud", city: "Kolkata (Default)", rainfall: 0, feelsLike: 31
      });
      setWeatherLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentPage === "farmer" && farmerTab === "weather" && !weather) {
      fetchWeather();
    }
  }, [currentPage, farmerTab, weather, fetchWeather]);

  const navigate = (page: Page) => {
    // Redirect to login if not logged in and trying to access protected pages
    const protectedPages: Page[] = ["farmer", "buyer", "profile"];
    if (protectedPages.includes(page) && !userProfile.isLoggedIn) {
      setCurrentPage("login");
      setMobileMenuOpen(false);
      window.scrollTo(0, 0);
      return;
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleRoleSelect = (role: "farmer" | "buyer") => {
    setUserRole(role);
    setUserProfile(prev => ({ ...prev, role }));
    navigate(role);
  };

  const handleSellProduct = () => {
    if (!sellForm.name || !sellForm.category || !sellForm.quantity || !sellForm.price || !sellForm.farmerName || !sellForm.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    const productImage = sellImage || PRODUCT_IMAGES[sellForm.category] || PRODUCT_IMAGES["Vegetables"];
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct ? {
        ...p, ...sellForm, price: Number(sellForm.price),
        image: productImage
      } : p));
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...sellForm,
        price: Number(sellForm.price),
        createdAt: new Date().toISOString().split("T")[0],
        image: productImage
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setSellForm({ name: "", category: "", quantity: "", unit: "kg", price: "", expiryDate: "", district: "", mandi: "", farmerName: "", phone: "", whatsapp: "" });
    setSellImage("");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    setSellForm({
      name: product.name, category: product.category, quantity: product.quantity,
      unit: product.unit, price: product.price.toString(), expiryDate: product.expiryDate,
      district: product.district, mandi: product.mandi, farmerName: product.farmerName,
      phone: product.phone, whatsapp: product.whatsapp
    });
    setSellImage(product.image);
    setFarmerTab("sell");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleLogout = async () => {
    await logOut();
    const newProfile = { ...DEFAULT_PROFILE, userId: "IGA-" + Math.random().toString(36).substring(2, 8).toUpperCase(), isLoggedIn: false };
    setUserProfile(newProfile);
    setUserRole("");
    localStorage.removeItem("indiagro_user");
    navigate("login");
  };

  const handleDeleteAccount = async () => {
    if (confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.")) {
      if (confirm("This will permanently remove all your data. Proceed?")) {
        await deleteAccount();
        const newProfile = { ...DEFAULT_PROFILE, userId: "IGA-" + Math.random().toString(36).substring(2, 8).toUpperCase(), isLoggedIn: false, name: "Indiagro User", email: "user@indiagro.in" };
        setUserProfile(newProfile);
        setUserRole("");
        setProducts(SAMPLE_PRODUCTS);
        localStorage.removeItem("indiagro_user");
        navigate("login");
      }
    }
  };

  const handleLoginSuccess = (result: AuthResult) => {
    const user = result.user;
    if (user) {
      const isGuest = result.isAnonymous === true;
      const updatedProfile = {
        ...userProfile,
        name: isGuest ? "Guest User" : (user.displayName || userProfile.name),
        email: isGuest ? "guest@indiagro.in" : (user.email || userProfile.email),
        userId: "IGA-" + (user.uid || Math.random().toString(36).substring(2, 8)).substring(0, 6).toUpperCase(),
        avatar: user.photoURL || userProfile.avatar,
        isLoggedIn: true,
        isGuest: isGuest,
        role: userRole || userProfile.role,
      };
      setUserProfile(updatedProfile);
      // Save to localStorage
      localStorage.setItem("indiagro_user", JSON.stringify(updatedProfile));
      // Redirect based on role if set, otherwise go to home
      if (userRole === "farmer") {
        navigate("farmer");
      } else if (userRole === "buyer") {
        navigate("buyer");
      } else {
        navigate("home");
      }
    }
  };

  const filteredMandiPrices = MANDI_PRICES.filter(p => {
    if (mandiDistrict && p.district !== mandiDistrict) return false;
    if (mandiName && p.mandi !== mandiName) return false;
    return true;
  });

  const filteredWholesalers = WHOLESALERS.filter(w => {
    if (wsDistrict && w.district !== wsDistrict) return false;
    if (wsCommodity && w.commodity !== wsCommodity) return false;
    return true;
  });

  const filteredBuyerProducts = products.filter(p => {
    if (buyerCategory && p.category !== buyerCategory) return false;
    if (buyerDistrict && p.district !== buyerDistrict) return false;
    if (p.price < buyerPriceRange[0] || p.price > buyerPriceRange[1]) return false;
    if (buyerSearch && !p.name.toLowerCase().includes(buyerSearch.toLowerCase())) return false;
    return true;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const NAV_PAGES: Page[] = ["home", "farmer", "buyer", "about", "testimonials", "contact"];

  // ==================== RENDER ====================
  // Show loading screen while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 flex justify-center" style={{ animation: "pulseGlow 2s ease-in-out infinite" }}>
            <IndiagroLogo size="xl" showText={false} />
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-1">
            Indi<span className="text-orange-500">a</span>gro
          </h1>
          <p className="text-green-600 text-sm mb-6">Loading your agricultural marketplace...</p>
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* NAVIGATION */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="cursor-pointer" onClick={() => navigate("home")}>
              <IndiagroLogo size="md" showText={true} />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_PAGES.map(page => (
                <button key={page} onClick={() => navigate(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${currentPage === page ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-green-50 hover:text-green-700"}`}>
                  {page === "home" ? "Home" : page}
                </button>
              ))}
              {/* Profile Icon */}
              <button onClick={() => navigate("profile")}
                className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${currentPage === "profile" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-400 hover:bg-green-50"}`}
                title="Profile">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className={`w-5 h-5 ${currentPage === "profile" ? "text-green-700" : "text-gray-500"}`} />
                )}
              </button>
            </div>

            {/* Mobile: Profile + Menu */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => navigate("profile")}
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${currentPage === "profile" ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-gray-500" />
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-green-50">
                {mobileMenuOpen ? <X className="w-6 h-6 text-green-800" /> : <Menu className="w-6 h-6 text-green-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-green-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {NAV_PAGES.map(page => (
                <button key={page} onClick={() => navigate(page)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium capitalize transition-all ${currentPage === page ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-green-50"}`}>
                  {page}
                </button>
              ))}
              <button onClick={() => navigate("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${currentPage === "profile" ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-green-50"}`}>
                <User className="w-4 h-4" /> My Profile
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main>
        {currentPage === "home" && <HomePage onNavigate={navigate} onRoleSelect={handleRoleSelect} userRole={userRole} />}
        {currentPage === "shop" && <ShopPage products={products} onNavigate={navigate} />}
        {currentPage === "farmer" && (
          <FarmerPage
            farmerTab={farmerTab} setFarmerTab={setFarmerTab}
            weather={weather} weatherLoading={weatherLoading} fetchWeather={fetchWeather}
            mandiDistrict={mandiDistrict} setMandiDistrict={setMandiDistrict}
            mandiName={mandiName} setMandiName={setMandiName}
            filteredMandiPrices={filteredMandiPrices}
            wsDistrict={wsDistrict} setWsDistrict={setWsDistrict}
            wsCommodity={wsCommodity} setWsCommodity={setWsCommodity}
            filteredWholesalers={filteredWholesalers}
            sellForm={sellForm} setSellForm={setSellForm}
            sellImage={sellImage} setSellImage={setSellImage}
            handleSellProduct={handleSellProduct}
            editingProduct={editingProduct}
            products={products}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        )}
        {currentPage === "buyer" && (
          <BuyerPage
            products={filteredBuyerProducts}
            buyerCategory={buyerCategory} setBuyerCategory={setBuyerCategory}
            buyerDistrict={buyerDistrict} setBuyerDistrict={setBuyerDistrict}
            buyerPriceRange={buyerPriceRange} setBuyerPriceRange={setBuyerPriceRange}
            buyerSearch={buyerSearch} setBuyerSearch={setBuyerSearch}
          />
        )}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "testimonials" && <TestimonialsPage />}
        {currentPage === "contact" && (
          <ContactPage
            contactForm={contactForm} setContactForm={setContactForm}
            handleContactSubmit={handleContactSubmit} contactSubmitted={contactSubmitted}
          />
        )}
        {currentPage === "login" && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={navigate}
            onRoleSelect={handleRoleSelect}
          />
        )}
        {currentPage === "profile" && (
          <ProfilePage
            profile={userProfile}
            setProfile={setUserProfile}
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-green-900 text-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <IndiagroLogoLight size="md" />
              <p className="text-sm text-green-300">Empowering farmers in West Bengal with digital tools for direct marketplace access.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {(["home", "farmer", "buyer", "about", "contact"] as Page[]).map(page => (
                  <button key={page} onClick={() => navigate(page)} className="block text-sm text-green-300 hover:text-white capitalize transition-colors">{page}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <div className="space-y-3 text-sm text-green-300">
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> ICARE Complex, HIT HALDIA, Purba Mednipur, HATIBERIA, 721657</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /> +91 8170010818</div>
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /> infoindiagroo@gmail.com</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-6 text-center text-sm text-green-400 space-y-2">
            <p>© 2026 Indiagro. All rights reserved. | Empowering West Bengal Agriculture</p>
            <p className="text-green-500 text-xs">Made by: Ritam Dawn, Sampat Barik, Birbal Kumar, Shashwat Vinayak</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==================== PROFILE PAGE ====================
interface ProfilePageProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onNavigate: (p: Page) => void;
}

// Note: UserPlus icon is already imported at the top of the file

function ProfilePage({ profile, setProfile, onLogout, onDeleteAccount, onNavigate }: ProfilePageProps) {
  const [activeSection, setActiveSection] = useState<"info" | "settings">("info");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setProfile(prev => ({ ...prev, name: tempName.trim() }));
      setEditingName(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!profile.isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Logged Out</h2>
          <p className="text-gray-500 mb-8">Sign in to access your profile, manage listings, and connect with the marketplace.</p>
          <button onClick={() => onNavigate("login")}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5 rotate-180" /> Sign In / Sign Up
          </button>
          <button onClick={() => onNavigate("home")} className="w-full py-3 mt-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Guest User Banner */}
      {profile.isGuest && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-start gap-4" style={{ animation: "fadeSlideDown 0.4s ease-out" }}>
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-amber-800 mb-1">You're browsing as a Guest</h3>
            <p className="text-amber-700 text-sm mb-3">Create an account to unlock all features: save listings, track orders, and connect with farmers directly.</p>
            <button onClick={() => { onLogout(); onNavigate("login"); }}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors inline-flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Create Full Account
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-white">{profile.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}</span>
              )}
            </div>
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Camera className="w-4 h-4 text-green-700" />
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold">{profile.name}</h1>
            <p className="text-green-100 text-sm mt-1">{profile.email}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              {profile.isGuest && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-medium text-amber-100 border border-amber-300/30">
                  👤 Guest User
                </span>
              )}
              {profile.role && !profile.isGuest && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
                  {profile.role === "farmer" ? "🧑‍🌾" : "🛒"} {profile.role}
                </span>
              )}
              <span className="text-xs text-green-200">Member since {profile.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveSection("info")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === "info" ? "bg-green-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-green-50"}`}>
          <User className="w-4 h-4" /> Personal Info
        </button>
        <button onClick={() => setActiveSection("settings")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === "settings" ? "bg-green-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-green-50"}`}>
          <Settings className="w-4 h-4" /> Settings
        </button>
      </div>

      {/* Personal Info Section */}
      {activeSection === "info" && (
        <div className="space-y-4">
          {/* Info Cards */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><User className="w-5 h-5 text-green-600" /> Account Information</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {/* Name */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Full Name</div>
                  {editingName ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input type="text" value={tempName} onChange={e => setTempName(e.target.value)}
                        className="px-3 py-1.5 border border-green-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-48"
                        autoFocus onKeyDown={e => e.key === "Enter" && handleSaveName()} />
                      <button onClick={handleSaveName} className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">Save</button>
                      <button onClick={() => { setEditingName(false); setTempName(profile.name); }} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Cancel</button>
                    </div>
                  ) : (
                    <div className="text-gray-900 font-medium mt-0.5">{profile.name}</div>
                  )}
                </div>
                {!editingName && (
                  <button onClick={() => { setEditingName(true); setTempName(profile.name); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {/* Email */}
              <div className="px-6 py-4">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Gmail / Email</div>
                <div className="text-gray-900 font-medium mt-0.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> {profile.email}
                </div>
                <div className="text-xs text-gray-400 mt-1">Linked via Gmail login</div>
              </div>
              {/* User ID */}
              <div className="px-6 py-4">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">User ID</div>
                <div className="text-gray-900 font-mono font-bold mt-0.5 text-lg tracking-wider">{profile.userId}</div>
                <div className="text-xs text-gray-400 mt-1">Your unique marketplace identifier</div>
              </div>
              {/* Role */}
              <div className="px-6 py-4">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Account Type</div>
                <div className="mt-1.5 flex items-center gap-2">
                  {profile.role ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-semibold capitalize">
                      {profile.role === "farmer" ? "🧑‍🌾" : "🛒"} {profile.role}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">Not selected yet</span>
                  )}
                </div>
              </div>
              {/* Joined Date */}
              <div className="px-6 py-4">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Member Since</div>
                <div className="text-gray-900 font-medium mt-0.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" /> {profile.joinedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === "settings" && (
        <div className="space-y-4">
          {/* Change Name */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2"><Settings className="w-5 h-5 text-green-600" /> Account Settings</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {/* Change Name Setting */}
              <button onClick={() => { setActiveSection("info"); setEditingName(true); setTempName(profile.name); }}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Change Name</div>
                    <div className="text-sm text-gray-500">Update your display name</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Change Avatar */}
              <button onClick={() => avatarInputRef.current?.click()}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Change Profile Photo</div>
                    <div className="text-sm text-gray-500">Upload a new avatar image</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
            <div className="divide-y divide-red-100">
              <button onClick={onDeleteAccount}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-red-700">Delete Account</div>
                    <div className="text-sm text-red-500">Permanently delete your account and all data</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="relative">
            <button onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2 text-lg">
              <LogOut className="w-5 h-5" /> Log Out
            </button>

            {showLogoutConfirm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLogoutConfirm(false)}>
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LogOut className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Log Out?</h3>
                    <p className="text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                        Cancel
                      </button>
                      <button onClick={() => { setShowLogoutConfirm(false); onLogout(); }}
                        className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== LOGIN PAGE ====================
interface LoginPageProps {
  onLoginSuccess: (result: AuthResult) => void;
  onNavigate: (p: Page) => void;
  onRoleSelect: (role: "farmer" | "buyer") => void;
}

function LoginPage({ onLoginSuccess, onNavigate, onRoleSelect }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"farmer" | "buyer" | "">("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [bgSlide, setBgSlide] = useState(0);

  const firebaseReady = isFirebaseReady();

  // Background slideshow
  const bgImages = [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80",
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80",
    "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1920&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgSlide(prev => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Password strength calculator
  const getPasswordStrength = (pwd: string): { score: number; label: string; color: string; segments: boolean[] } => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const levels: { label: string; color: string }[] = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-green-500" },
    ];
    const level = levels[Math.min(score, 4)];
    const segments = [score >= 1, score >= 2, score >= 3, score >= 4, score >= 5];
    return { score, label: pwd.length === 0 ? "" : level.label, color: level.color, segments };
  };

  const passwordStrength = getPasswordStrength(password);

  const clearMessages = () => { setError(""); setSuccess(""); };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup") {
      if (!displayName.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!selectedRole) {
        setError("Please select your role (Farmer or Buyer).");
        return;
      }
    }

    setLoading(true);
    try {
      let result: AuthResult;
      if (mode === "signup") {
        result = await signUpWithEmail(email, password, displayName);
      } else {
        result = await signInWithEmail(email, password);
      }

      if (result.success) {
        setSuccess(mode === "signup" ? "Account created successfully! Redirecting... 🎉" : "Welcome back! Redirecting... 🎉");
        setTimeout(() => {
          // Set role if selected during signup — triggers role-based redirect
          if (mode === "signup" && selectedRole) {
            onRoleSelect(selectedRole);
          }
          onLoginSuccess(result);
        }, 1000);
      } else {
        setError(result.error || "Authentication failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    clearMessages();
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        setSuccess("Signed in with Google! Redirecting... 🎉");
        setTimeout(() => {
          onLoginSuccess(result);
        }, 1000);
      } else {
        setError(result.error || "Google sign-in failed.");
      }
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
    setGoogleLoading(false);
  };

  const handleGuestLogin = async () => {
    clearMessages();
    setGuestLoading(true);
    try {
      const result = await signInAsGuest();
      if (result.success) {
        setSuccess("Signed in as Guest! Redirecting... 🎉");
        setTimeout(() => {
          onLoginSuccess(result);
        }, 1000);
      } else {
        setError(result.error || "Guest sign-in failed.");
      }
    } catch {
      setError("Guest sign-in failed. Please try again.");
    }
    setGuestLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await resetPassword(email);
      if (result.success) {
        setSuccess("Password reset email sent! Check your inbox. 📧");
      } else {
        setError(result.error || "Failed to send reset email.");
      }
    } catch {
      setError("Failed to send reset email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Slideshow */}
      {bgImages.map((img, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[2000ms]" style={{ opacity: bgSlide === i ? 1 : 0 }}>
          <img src={img} alt="" className="w-full h-full object-cover" style={{ animation: bgSlide === i ? "kenburns 15s ease-in-out infinite alternate" : "none" }} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/92 via-emerald-900/88 to-green-950/92" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px`,
            background: `rgba(${Math.random() > 0.5 ? "250,204,21" : "134,239,172"}, ${Math.random() * 0.3 + 0.1})`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animation: `floatParticle ${Math.random() * 10 + 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }} />
        ))}
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[460px] relative z-10" style={{ animation: "fadeSlideUp 0.7s ease-out both" }}>
        {/* Logo Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => onNavigate("home")}>
            <IndiagroLogoLight size="lg" />
          </div>
          <p className="text-green-200/80 text-sm mt-2">
            {mode === "login" ? "Welcome back! Sign in to your account." :
             mode === "signup" ? "Create your account & join the marketplace." :
             "Reset your password to regain access."}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/[0.97] backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 border border-white/30 overflow-hidden">
          {/* Top Gradient Accent */}
          <div className="h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />

          <div className="p-7 md:p-8">
            {/* Demo Mode Banner */}
            {!firebaseReady && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 rounded-xl p-3.5 mb-6 flex items-start gap-3" style={{ animation: "fadeSlideDown 0.4s ease-out" }}>
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-amber-800 text-xs font-bold">Demo Mode Active</p>
                  <p className="text-amber-600 text-xs mt-0.5 leading-relaxed">Firebase not configured. Sign up to create a demo account, then log in with those credentials.</p>
                </div>
              </div>
            )}

            {/* Mode Tabs (only show for login/signup) */}
            {mode !== "forgot" && (
              <div className="flex bg-gray-100/80 rounded-2xl p-1.5 mb-6 gap-1">
                <button
                  onClick={() => { setMode("login"); clearMessages(); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${mode === "login" ? "bg-white text-green-700 shadow-lg shadow-green-100" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Lock className="w-4 h-4" /> Sign In
                </button>
                <button
                  onClick={() => { setMode("signup"); clearMessages(); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${mode === "signup" ? "bg-white text-green-700 shadow-lg shadow-green-100" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <UserPlus className="w-4 h-4" /> Sign Up
                </button>
              </div>
            )}

            {/* Forgot Password Header */}
            {mode === "forgot" && (
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Forgot Password?</h3>
                <p className="text-gray-500 text-sm mt-1">Enter your email and we'll send you a reset link.</p>
              </div>
            )}

            {/* Error / Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5 flex items-start gap-3 text-red-700" style={{ animation: "fadeSlideDown 0.3s ease-out" }}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3.5 mb-5 flex items-start gap-3 text-green-700" style={{ animation: "fadeSlideDown 0.3s ease-out" }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{success}</p>
              </div>
            )}

            {/* FORGOT PASSWORD FORM */}
            {mode === "forgot" ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className={`relative rounded-xl transition-all duration-200 ${focusedField === "forgot-email" ? "ring-2 ring-green-500 ring-offset-1" : ""}`}>
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("forgot-email")} onBlur={() => setFocusedField("")}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-white focus:bg-white focus:border-green-500 focus:outline-none transition-all"
                      required />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Mail className="w-5 h-5" /> Send Reset Link</>}
                </button>
                <button type="button" onClick={() => { setMode("login"); clearMessages(); }}
                  className="w-full py-2.5 text-gray-500 font-medium text-sm hover:text-green-700 transition-colors flex items-center justify-center gap-1">
                  ← Back to Sign In
                </button>
              </form>
            ) : (
              <>
                {/* MAIN LOGIN/SIGNUP FORM */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {/* Full Name (signup only) */}
                  {mode === "signup" && (
                    <div style={{ animation: "fadeSlideDown 0.3s ease-out" }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <div className={`relative rounded-xl transition-all duration-200 ${focusedField === "name" ? "ring-2 ring-green-500 ring-offset-1" : ""}`}>
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
                          onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField("")}
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-white focus:bg-white focus:border-green-500 focus:outline-none transition-all"
                          required />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className={`relative rounded-xl transition-all duration-200 ${focusedField === "email" ? "ring-2 ring-green-500 ring-offset-1" : ""}`}>
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField("")}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-white focus:bg-white focus:border-green-500 focus:outline-none transition-all"
                        required />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Password</label>
                      {mode === "login" && (
                        <button type="button" onClick={() => { setMode("forgot"); clearMessages(); }}
                          className="text-xs text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors">
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className={`relative rounded-xl transition-all duration-200 ${focusedField === "password" ? "ring-2 ring-green-500 ring-offset-1" : ""}`}>
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type={showPassword ? "text" : "password"} value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField("")}
                        placeholder={mode === "signup" ? "Min 6 characters" : "Enter your password"}
                        className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-white focus:bg-white focus:border-green-500 focus:outline-none transition-all"
                        required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator (signup only) */}
                    {mode === "signup" && password.length > 0 && (
                      <div className="mt-2.5" style={{ animation: "fadeSlideDown 0.2s ease-out" }}>
                        <div className="flex gap-1 mb-1.5">
                          {passwordStrength.segments.map((active, i) => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${active ? passwordStrength.color : "bg-gray-200"}`} />
                          ))}
                        </div>
                        <p className={`text-xs font-medium ${
                          passwordStrength.score <= 1 ? "text-red-500" :
                          passwordStrength.score <= 2 ? "text-orange-500" :
                          passwordStrength.score <= 3 ? "text-yellow-600" :
                          "text-green-600"
                        }`}>
                          Password strength: {passwordStrength.label}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password (signup only) */}
                  {mode === "signup" && (
                    <div style={{ animation: "fadeSlideDown 0.3s ease-out 0.1s both" }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                      <div className={`relative rounded-xl transition-all duration-200 ${focusedField === "confirm" ? "ring-2 ring-green-500 ring-offset-1" : ""}`}>
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          onFocus={() => setFocusedField("confirm")} onBlur={() => setFocusedField("")}
                          placeholder="Re-enter your password"
                          className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 hover:bg-white focus:bg-white focus:border-green-500 focus:outline-none transition-all"
                          required />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-0.5">
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {confirmPassword.length > 0 && password !== confirmPassword && (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Passwords do not match
                        </p>
                      )}
                      {confirmPassword.length > 0 && password === confirmPassword && (
                        <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Passwords match
                        </p>
                      )}
                    </div>
                  )}

                  {/* Role Selection (signup only) */}
                  {mode === "signup" && (
                    <div style={{ animation: "fadeSlideDown 0.3s ease-out 0.2s both" }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">I am a...</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setSelectedRole("farmer")}
                          className={`p-3.5 rounded-xl border-2 text-center transition-all duration-200 ${
                            selectedRole === "farmer"
                              ? "border-green-500 bg-green-50 shadow-md shadow-green-100"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                          }`}>
                          <div className="text-2xl mb-1">🧑‍🌾</div>
                          <div className={`text-sm font-bold ${selectedRole === "farmer" ? "text-green-700" : "text-gray-700"}`}>Farmer</div>
                          <div className="text-xs text-gray-500 mt-0.5">Sell & Track</div>
                        </button>
                        <button type="button" onClick={() => setSelectedRole("buyer")}
                          className={`p-3.5 rounded-xl border-2 text-center transition-all duration-200 ${
                            selectedRole === "buyer"
                              ? "border-green-500 bg-green-50 shadow-md shadow-green-100"
                              : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                          }`}>
                          <div className="text-2xl mb-1">🛒</div>
                          <div className={`text-sm font-bold ${selectedRole === "buyer" ? "text-green-700" : "text-gray-700"}`}>Buyer</div>
                          <div className="text-xs text-gray-500 mt-0.5">Browse & Buy</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl shadow-green-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-[15px] mt-2 hover:shadow-green-600/30 active:scale-[0.98] transform duration-150">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {mode === "signup" ? "Creating Account..." : "Signing In..."}
                      </>
                    ) : (
                      <>
                        {mode === "signup" ? <UserPlus className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                        {mode === "signup" ? "Create Account" : "Sign In"}
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-xs font-semibold text-gray-400 bg-white uppercase tracking-wider">or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button onClick={handleGoogleLogin} disabled={googleLoading}
                  className="w-full py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed group active:scale-[0.98] transform duration-150">
                  {googleLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : (
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  {googleLoading ? "Connecting to Google..." : "Continue with Google"}
                </button>

                {/* Guest Sign In */}
                <button onClick={handleGuestLogin} disabled={guestLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed group active:scale-[0.98] transform duration-150">
                  {guestLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : (
                    <User className="w-5 h-5 text-gray-500 group-hover:scale-110 transition-transform" />
                  )}
                  {guestLoading ? "Signing in..." : "Continue as Guest"}
                </button>
                <p className="text-center text-xs text-gray-400 -mt-2">
                  Browse without an account • Limited features
                </p>

                {/* Switch mode links */}
                <p className="text-center text-sm text-gray-500 mt-6">
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button onClick={() => { setMode("signup"); clearMessages(); }} className="text-green-600 font-bold hover:text-green-700 transition-colors hover:underline">
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button onClick={() => { setMode("login"); clearMessages(); }} className="text-green-600 font-bold hover:text-green-700 transition-colors hover:underline">
                        Sign In
                      </button>
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-5 flex items-center justify-center gap-4">
          <button onClick={() => onNavigate("home")}
            className="text-green-200/70 text-sm hover:text-white transition-colors flex items-center justify-center gap-1.5 font-medium">
            ← Back to Home
          </button>
          <span className="text-green-800/40">|</span>
          <div className="text-green-200/40 text-xs">
            🔒 Secured by Firebase
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== HOME PAGE ====================
function HomePage({ onNavigate, onRoleSelect, userRole }: { onNavigate: (p: Page) => void; onRoleSelect: (r: "farmer" | "buyer") => void; userRole: string }) {
  const [roleDropdown, setRoleDropdown] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80',
    'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=1920&q=80',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1920&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Animated Hero with Farming Scene Slideshow */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: '92vh' }}>
        {/* Background Image Slideshow with Ken Burns */}
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: heroSlide === i ? 1 : 0, zIndex: 0 }}
          >
            <img
              src={img}
              alt={`Farming scene ${i + 1}`}
              className="w-full h-full object-cover"
              style={{
                animation: heroSlide === i ? 'kenburns 12s ease-in-out infinite alternate' : 'none',
              }}
            />
          </div>
        ))}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-green-900/80" style={{ zIndex: 1 }} />

        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: `rgba(${Math.random() > 0.5 ? '250,204,21' : '134,239,172'}, ${Math.random() * 0.3 + 0.1})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticle ${Math.random() * 10 + 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5" style={{ zIndex: 5 }}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ${heroSlide === i ? 'bg-yellow-400 w-10' : 'bg-white/40 w-2.5 hover:bg-white/70'}`}
            />
          ))}
        </div>

        {/* Hero Content with staggered animations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center" style={{ zIndex: 3, minHeight: '92vh' }}>
          <div className="text-center max-w-4xl mx-auto py-20">
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/20"
              style={{ animation: 'fadeSlideDown 1s ease-out forwards' }}
            >
              <svg viewBox="0 0 100 100" className="w-5 h-5">
                <circle cx="50" cy="50" r="45" fill="#22c55e" />
                <circle cx="50" cy="40" r="10" fill="#fbbf24" />
                <ellipse cx="50" cy="75" rx="30" ry="12" fill="#4ade80" opacity="0.6" />
                <path d="M 50 70 Q 50 55 50 40" stroke="#fff" strokeWidth="3" fill="none" />
                <ellipse cx="50" cy="42" rx="4" ry="6" fill="#fff" />
              </svg>
              <span className="text-sm font-semibold tracking-wide">
                Indi<span className="text-yellow-300">a</span>gro — West Bengal's #1 Agri Marketplace
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-2xl"
              style={{ animation: 'fadeSlideUp 1s ease-out 0.3s both' }}
            >
              MODERNIZING INDIAN<br />
              <span className="text-yellow-400 drop-shadow-lg" style={{ textShadow: '0 0 40px rgba(250,204,21,0.3)' }}>AGRICULTURAL</span> BACKDROPS
            </h1>
            <p
              className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed"
              style={{ animation: 'fadeSlideUp 1s ease-out 0.6s both' }}
            >
              Connecting farmers, buyers, and wholesalers across West Bengal. Fair prices, direct trade, real empowerment.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: 'fadeSlideUp 1s ease-out 0.9s both' }}
            >
              <button onClick={() => onNavigate("buyer")} className="px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/25 flex items-center justify-center gap-2 text-lg hover:scale-105 transform duration-300">
                <Search className="w-5 h-5" /> Explore Marketplace
              </button>
              <button onClick={() => onNavigate("farmer")} className="px-8 py-4 bg-white/15 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/25 transition-all border border-white/25 flex items-center justify-center gap-2 text-lg shadow-xl hover:scale-105 transform duration-300">
                <Leaf className="w-5 h-5" /> Farmer Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 4 }}>
          <svg viewBox="0 0 1440 100" fill="none" className="w-full"><path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#f9fafb" /></svg>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ARE YOU A FARMER OR BUYER?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose your role to access personalized features and marketplace tools.</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <button onClick={() => setRoleDropdown(!roleDropdown)}
                className="w-full px-6 py-4 bg-white border-2 border-green-300 rounded-xl text-left flex justify-between items-center hover:border-green-500 transition-colors shadow-sm">
                <span className={`text-lg ${userRole ? "text-green-800 font-semibold capitalize" : "text-gray-400"}`}>
                  {userRole || "Select your role..."}
                </span>
                <ChevronDown className={`w-5 h-5 text-green-600 transition-transform ${roleDropdown ? "rotate-180" : ""}`} />
              </button>
              {roleDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-green-100 overflow-hidden z-20">
                  <button onClick={() => { onRoleSelect("farmer"); setRoleDropdown(false); }}
                    className="w-full px-6 py-4 text-left hover:bg-green-50 flex items-center gap-3 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-800">🧑‍🌾 Farmer</div>
                      <div className="text-sm text-gray-500">Sell products, track weather & mandi prices</div>
                    </div>
                  </button>
                  <button onClick={() => { onRoleSelect("buyer"); setRoleDropdown(false); }}
                    className="w-full px-6 py-4 text-left hover:bg-green-50 flex items-center gap-3 transition-colors border-t border-green-50">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-800">🛒 Buyer</div>
                      <div className="text-sm text-gray-500">Browse products & connect with farmers</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Product Categories</h2>
            <p className="text-gray-600">Explore fresh, quality agricultural products from West Bengal farmers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map(cat => (
              <div key={cat} onClick={() => onNavigate("buyer")} className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img src={CATEGORY_IMAGES[cat]} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">{cat}</h3>
                  <p className="text-sm text-gray-500 mt-1">Fresh {cat.toLowerCase()} directly from farms</p>
                  <div className="mt-3 flex items-center text-green-600 font-medium text-sm">
                    Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights with subtle farming background */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle farming background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1595351298020-038700609878?w=1920&q=80"
            alt="Green fields"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-green-50/95 to-white/95" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Built for the agricultural community, by those who understand farming</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Quality Assurance", desc: "Every product undergoes strict quality checks to ensure freshness and purity from farm to table.", color: "green" },
              { icon: Users, title: "Direct Farm-to-Buyer", desc: "No middlemen. Connect directly with farmers for fair prices and transparent transactions.", color: "emerald" },
              { icon: HeadphonesIcon, title: "Reliable Support", desc: "24/7 customer support in Bengali and Hindi. We're always here to help farmers and buyers.", color: "teal" }
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center group hover:-translate-y-2 duration-300 border border-white/50"
                style={{ animation: `fadeSlideUp 0.7s ease-out ${0.2 * i}s both` }}
              >
                <div className={`w-16 h-16 bg-${color}-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                  <Icon className={`w-8 h-8 text-${color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Farming Background */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background farming image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80"
            alt="Farm landscape"
            className="w-full h-full object-cover"
            style={{ animation: 'kenburns 20s ease-in-out infinite alternate' }}
          />
          <div className="absolute inset-0 bg-green-900/80 backdrop-blur-[2px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ animation: 'fadeSlideUp 0.8s ease-out both' }}>Our Growing Impact</h2>
            <p className="text-green-200 text-sm">Empowering agriculture across West Bengal</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5,000+", label: "Registered Farmers", emoji: "🧑‍🌾" },
              { value: "15,000+", label: "Products Listed", emoji: "📦" },
              { value: "3,200+", label: "Active Buyers", emoji: "🛒" },
              { value: "15", label: "Districts Covered", emoji: "📍" }
            ].map((stat, i) => (
              <div key={stat.label} className="group" style={{ animation: `fadeSlideUp 0.6s ease-out ${0.2 * i}s both` }}>
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-3xl md:text-5xl font-extrabold text-yellow-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{stat.value}</div>
                <div className="text-green-200 mt-2 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== SHOP PAGE ====================
function ShopPage({ products, onNavigate }: { products: Product[]; onNavigate: (p: Page) => void }) {
  const [selectedCat, setSelectedCat] = useState("");
  const filtered = selectedCat ? products.filter(p => p.category === selectedCat) : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🛒 Marketplace</h1>
        <p className="text-gray-600">Browse fresh agricultural products from verified farmers across West Bengal</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setSelectedCat("")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCat ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
          All Products
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCat === cat ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group border border-gray-100">
            <div className="h-44 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">{product.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1"><MapPin className="w-3 h-3" /> {product.district}</div>
              <div className="flex justify-between items-end mt-3">
                <div>
                  <div className="text-2xl font-extrabold text-green-700">₹{product.price}<span className="text-sm font-normal text-gray-500">/{product.unit}</span></div>
                  <div className="text-xs text-gray-400">{product.quantity} {product.unit} available</div>
                </div>
                <button onClick={() => onNavigate("buyer")} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1">
                  <Eye className="w-3 h-3" /> View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">No products found in this category</p>
        </div>
      )}
    </div>
  );
}

// ==================== FARMER PAGE ====================
interface FarmerPageProps {
  farmerTab: FarmerTab; setFarmerTab: (t: FarmerTab) => void;
  weather: WeatherData | null; weatherLoading: boolean; fetchWeather: () => void;
  mandiDistrict: string; setMandiDistrict: (d: string) => void;
  mandiName: string; setMandiName: (m: string) => void;
  filteredMandiPrices: typeof MANDI_PRICES;
  wsDistrict: string; setWsDistrict: (d: string) => void;
  wsCommodity: string; setWsCommodity: (c: string) => void;
  filteredWholesalers: typeof WHOLESALERS;
  sellForm: {
    name: string; category: string; quantity: string; unit: string; price: string;
    expiryDate: string; district: string; mandi: string; farmerName: string; phone: string; whatsapp: string;
  };
  setSellForm: React.Dispatch<React.SetStateAction<{
    name: string; category: string; quantity: string; unit: string; price: string;
    expiryDate: string; district: string; mandi: string; farmerName: string; phone: string; whatsapp: string;
  }>>;
  sellImage: string;
  setSellImage: React.Dispatch<React.SetStateAction<string>>;
  handleSellProduct: () => void;
  editingProduct: string | null;
  products: Product[];
  handleEditProduct: (p: Product) => void;
  handleDeleteProduct: (id: string) => void;
}

function FarmerPage(props: FarmerPageProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageUploadMode, setImageUploadMode] = useState<"upload" | "url">("upload");
  
  // Seasonal crops filters
  const [seasonalDistrict, setSeasonalDistrict] = useState("");
  const [seasonalSeason, setSeasonalSeason] = useState<"" | "Kharif" | "Rabi" | "Zaid" | "Whole Year">("");
  
  // Filter seasonal crops based on selected district and season
  const filteredSeasonalCrops = SEASONAL_CROPS.filter(crop => {
    if (seasonalDistrict && crop.district !== seasonalDistrict) return false;
    if (seasonalSeason && crop.season !== seasonalSeason) return false;
    return true;
  });
  
  // Get weather tips
  const weatherTips = getWeatherTips(props.weather);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        props.setSellImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = () => {
    if (imageUrlInput.trim()) {
      props.setSellImage(imageUrlInput.trim());
      setImageUrlInput("");
    }
  };

  const tabs: { id: FarmerTab; label: string; icon: React.ReactNode }[] = [
    { id: "weather", label: "Weather", icon: <Sun className="w-4 h-4" /> },
    { id: "seasonal", label: "Seasonal Crops", icon: <Sprout className="w-4 h-4" /> },
    { id: "mandi", label: "Mandi Prices", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "schemes", label: "Govt Schemes", icon: <Shield className="w-4 h-4" /> },
    { id: "wholesalers", label: "Wholesalers", icon: <Users className="w-4 h-4" /> },
    { id: "sell", label: "Sell Product", icon: <Tag className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🧑‍🌾 Farmer Dashboard</h1>
        <p className="text-gray-600">Your one-stop hub for weather, mandi prices, schemes, and selling products</p>
      </div>

      {/* Tabs - Single Line Horizontal Scroll */}
      <div className="relative mb-8">
        {/* Scroll fade indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        
        <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100 min-w-max">
            {tabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => props.setFarmerTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  props.farmerTab === tab.id 
                    ? "bg-green-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Tab */}
      {props.farmerTab === "weather" && (
        <div>
          {props.weatherLoading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Fetching live weather data...</p>
            </div>
          ) : props.weather ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-1 text-blue-100">
                  <MapPin className="w-4 h-4" /> {props.weather.city}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-7xl font-extrabold">{props.weather.temp}°C</div>
                    <div className="text-xl text-blue-100 mt-1">{props.weather.description}</div>
                    <div className="text-sm text-blue-200 mt-1">Feels like {props.weather.feelsLike}°C</div>
                  </div>
                  <div className="text-right">
                    {props.weather.icon === "rain" ? <CloudRain className="w-24 h-24 text-blue-200" /> :
                     props.weather.icon === "cloud" ? <Cloud className="w-24 h-24 text-blue-200" /> :
                     <Sun className="w-24 h-24 text-yellow-300" />}
                  </div>
                </div>
                <button onClick={props.fetchWeather} className="mt-6 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors">
                  🔄 Refresh Weather
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Droplets, label: "Humidity", value: `${props.weather.humidity}%`, color: "blue" },
                  { icon: Wind, label: "Wind Speed", value: `${props.weather.wind} km/h`, color: "teal" },
                  { icon: CloudRain, label: "Rainfall", value: `${props.weather.rainfall} mm`, color: "indigo" },
                  { icon: Thermometer, label: "Feels Like", value: `${props.weather.feelsLike}°C`, color: "orange" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{label}</div>
                      <div className="text-xl font-bold text-gray-900">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Weather Alert</h3>
            <p className="text-yellow-700 text-sm">Monitor weather conditions closely for optimal farming decisions. Heavy rainfall expected in coastal districts this week.</p>
          </div>
          
          {/* Weather-Based Farming Tips */}
          {weatherTips.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> Farming Tips for Today's Weather
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weatherTips.map((tip, i) => (
                  <div 
                    key={i} 
                    className={`rounded-xl p-4 border flex items-start gap-3 transition-all hover:shadow-md ${
                      tip.priority === "high" 
                        ? "bg-red-50 border-red-200" 
                        : tip.priority === "medium" 
                        ? "bg-amber-50 border-amber-200" 
                        : "bg-green-50 border-green-200"
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wide ${
                        tip.priority === "high" 
                          ? "text-red-600" 
                          : tip.priority === "medium" 
                          ? "text-amber-600" 
                          : "text-green-600"
                      }`}>
                        {tip.priority === "high" ? "⚡ Urgent" : tip.priority === "medium" ? "📌 Important" : "💡 Tip"}
                      </span>
                      <p className={`text-sm mt-1 ${
                        tip.priority === "high" 
                          ? "text-red-800" 
                          : tip.priority === "medium" 
                          ? "text-amber-800" 
                          : "text-green-800"
                      }`}>
                        {tip.tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Seasonal Crops Tab */}
      {props.farmerTab === "seasonal" && (
        <div>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Sprout className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Seasonal Crop Planner</h2>
            </div>
            <p className="text-green-100 text-sm">
              Find the best crops to plant in your district for maximum profit. Data sourced from West Bengal agricultural records.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-green-200">
              <Info className="w-4 h-4" />
              <span>Source: <a href="https://dataful.in/datasets/5607/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">dataful.in/datasets/5607</a></span>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" /> Filter by Location & Season
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <select 
                  value={seasonalDistrict} 
                  onChange={e => setSeasonalDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Districts</option>
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                <select 
                  value={seasonalSeason} 
                  onChange={e => setSeasonalSeason(e.target.value as "" | "Kharif" | "Rabi" | "Zaid" | "Whole Year")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Seasons</option>
                  <option value="Kharif">🌧️ Kharif (June-October) - Monsoon</option>
                  <option value="Rabi">❄️ Rabi (October-March) - Winter</option>
                  <option value="Zaid">☀️ Zaid (March-June) - Summer</option>
                  <option value="Whole Year">🌱 Whole Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Season Legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              <Calendar className="w-3 h-3" /> 🌧️ Kharif: Jun-Oct
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
              <Calendar className="w-3 h-3" /> ❄️ Rabi: Oct-Mar
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              <Calendar className="w-3 h-3" /> ☀️ Zaid: Mar-Jun
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              <Calendar className="w-3 h-3" /> 🌱 Whole Year
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing <span className="font-bold text-green-700">{filteredSeasonalCrops.length}</span> crop recommendations
            {seasonalDistrict && <span> in <strong>{seasonalDistrict}</strong></span>}
            {seasonalSeason && <span> for <strong>{seasonalSeason}</strong> season</span>}
          </div>

          {/* Crops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSeasonalCrops.map((crop, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors">
                      {crop.crop}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        crop.season === "Kharif" ? "bg-blue-100 text-blue-700" :
                        crop.season === "Rabi" ? "bg-orange-100 text-orange-700" :
                        crop.season === "Zaid" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {crop.season === "Kharif" ? "🌧️" : crop.season === "Rabi" ? "❄️" : crop.season === "Zaid" ? "☀️" : "🌱"} {crop.season}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {crop.district}
                      </span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    crop.profitMargin === "High" ? "bg-green-100 text-green-700" :
                    crop.profitMargin === "Medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {crop.profitMargin === "High" ? "💰 High" : crop.profitMargin === "Medium" ? "💵 Medium" : "📉 Low"} Profit
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">🌱 Sowing:</span>
                    <span className="font-medium text-gray-800">{crop.sowingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">🌾 Harvest:</span>
                    <span className="font-medium text-gray-800">{crop.harvestTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">📊 Avg Yield:</span>
                    <span className="font-medium text-gray-800">{crop.avgYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">💧 Water Need:</span>
                    <span className={`font-medium ${
                      crop.waterRequirement === "High" ? "text-blue-600" :
                      crop.waterRequirement === "Medium" ? "text-cyan-600" :
                      "text-green-600"
                    }`}>
                      {crop.waterRequirement}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">🏜️ Soil Type:</span>
                    <span className="font-medium text-gray-800 text-xs">{crop.soilType}</span>
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <p className="text-xs text-green-800 leading-relaxed">{crop.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSeasonalCrops.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Sprout className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No crops found for this filter</p>
              <p className="text-sm mt-1">Try selecting a different district or season</p>
            </div>
          )}

          {/* Data Source Note */}
          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-1">About this data</p>
                <p>
                  Crop recommendations are based on historical agricultural data from West Bengal. 
                  Actual yields and profitability may vary based on weather conditions, market prices, and farming practices.
                  Always consult local agricultural extension officers for personalized advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mandi Prices Tab */}
      {props.farmerTab === "mandi" && (
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Filter className="w-5 h-5 text-green-600" /> Filter Mandi Prices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <select value={props.mandiDistrict} onChange={e => { props.setMandiDistrict(e.target.value); props.setMandiName(""); }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">All Districts</option>
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mandi</label>
                <select value={props.mandiName} onChange={e => props.setMandiName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">All Mandis</option>
                  {(props.mandiDistrict ? MANDIS[props.mandiDistrict] || [] : Object.values(MANDIS).flat()).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-green-700 text-white px-4 py-2 rounded-t-xl text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Live Mandi Prices — West Bengal | Source: CommodityOnline
          </div>
          <div className="overflow-x-auto bg-white rounded-b-xl shadow-sm border border-gray-100">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-green-800">Crop</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-green-800">District</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-green-800">Mandi</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-green-800">Min (₹/q)</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-green-800">Max (₹/q)</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-green-800">Modal (₹/q)</th>
                </tr>
              </thead>
              <tbody>
                {props.filteredMandiPrices.map((p, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-green-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.crop}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{p.district}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{p.mandi}</td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium">₹{p.min.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">₹{p.max.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">₹{p.modal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-right text-xs text-gray-400 flex items-center justify-end gap-1">
            <Clock className="w-3 h-3" /> Last updated: {new Date().toLocaleDateString("en-IN")} | Prices in ₹ per quintal
          </div>
        </div>
      )}

      {/* Govt Schemes Tab */}
      {props.farmerTab === "schemes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GOVT_SCHEMES.map((scheme, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{scheme.name}</h3>
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
              </div>
              <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="text-xs font-semibold text-green-700 mb-1">Eligibility:</div>
                <div className="text-sm text-green-800">{scheme.eligibility}</div>
              </div>
              <a href={scheme.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                Learn More <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Wholesalers Tab */}
      {props.farmerTab === "wholesalers" && (
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Filter Wholesalers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select value={props.wsDistrict} onChange={e => props.setWsDistrict(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">All Districts</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={props.wsCommodity} onChange={e => props.setWsCommodity(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">All Commodities</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.filteredWholesalers.map((w, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{w.name}</h3>
                  {w.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">✓ Verified</span>}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> {w.district}</div>
                  <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-gray-400" /> {w.commodity}</div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {w.phone}</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <a href={`tel:${w.phone.replace(/\s/g, "")}`} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" /> Call
                  </a>
                  <a href={`https://wa.me/${w.phone.replace(/[\s+]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-1">
                    <MessageCircle className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sell Product Tab */}
      {props.farmerTab === "sell" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sell Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-green-600" />
              {props.editingProduct ? "Edit Listing" : "List Your Product"}
            </h3>
            <div className="space-y-4">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => setImageUploadMode("upload")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${imageUploadMode === "upload" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    <Upload className="w-3 h-3" /> Upload Photo
                  </button>
                  <button onClick={() => setImageUploadMode("url")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${imageUploadMode === "url" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    <ImageIcon className="w-3 h-3" /> Image URL
                  </button>
                </div>

                {imageUploadMode === "upload" ? (
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all"
                  >
                    {props.sellImage ? (
                      <div className="relative">
                        <img src={props.sellImage} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                        <button
                          onClick={(e) => { e.stopPropagation(); props.setSellImage(""); }}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-400 mt-2">Click to change image</p>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium">Click to upload product photo</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                      </div>
                    )}
                    <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input type="url" value={imageUrlInput} onChange={e => setImageUrlInput(e.target.value)}
                        placeholder="https://example.com/product-image.jpg"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        onKeyDown={e => e.key === "Enter" && handleImageUrl()}
                      />
                      <button onClick={handleImageUrl} className="px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Add
                      </button>
                    </div>
                    {props.sellImage && (
                      <div className="relative">
                        <img src={props.sellImage} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                        <button
                          onClick={() => props.setSellImage("")}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {!props.sellImage && (
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> If no image uploaded, a default category image will be used
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input type="text" value={props.sellForm.name} onChange={e => props.setSellForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Fresh Tomatoes" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={props.sellForm.category} onChange={e => props.setSellForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input type="number" value={props.sellForm.quantity} onChange={e => props.setSellForm(f => ({ ...f, quantity: e.target.value }))}
                    placeholder="e.g. 500" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select value={props.sellForm.unit} onChange={e => props.setSellForm(f => ({ ...f, unit: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="kg">Kilogram (kg)</option>
                    <option value="quintal">Quintal</option>
                    <option value="ton">Ton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input type="number" value={props.sellForm.price} onChange={e => props.setSellForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="e.g. 25" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability Period</label>
                  <input type="date" value={props.sellForm.expiryDate} onChange={e => props.setSellForm(f => ({ ...f, expiryDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                  <select value={props.sellForm.district} onChange={e => props.setSellForm(f => ({ ...f, district: e.target.value, mandi: "" }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select District</option>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mandi</label>
                <select value={props.sellForm.mandi} onChange={e => props.setSellForm(f => ({ ...f, mandi: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Mandi</option>
                  {(MANDIS[props.sellForm.district] || []).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Farmer Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input type="text" value={props.sellForm.farmerName} onChange={e => props.setSellForm(f => ({ ...f, farmerName: e.target.value }))}
                      placeholder="Full Name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" value={props.sellForm.phone} onChange={e => props.setSellForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                    <input type="tel" value={props.sellForm.whatsapp} onChange={e => props.setSellForm(f => ({ ...f, whatsapp: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>
                </div>
              </div>
              <button onClick={props.handleSellProduct}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-200 text-lg mt-2">
                {props.editingProduct ? "✏️ Update Listing" : "📦 List Product for Sale"}
              </button>
            </div>
          </div>

          {/* My Listings */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">📋 My Listings</h3>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
              {props.products.map(product => (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex gap-4">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">{product.name}</h4>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{product.category}</span>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => props.handleEditProduct(product)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => props.handleDeleteProduct(product.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                        <span>₹{product.price}/{product.unit}</span>
                        <span>{product.quantity} {product.unit}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{product.district}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== BUYER PAGE ====================
interface BuyerPageProps {
  products: Product[];
  buyerCategory: string; setBuyerCategory: (c: string) => void;
  buyerDistrict: string; setBuyerDistrict: (d: string) => void;
  buyerPriceRange: [number, number]; setBuyerPriceRange: (r: [number, number]) => void;
  buyerSearch: string; setBuyerSearch: (s: string) => void;
}

function BuyerPage(props: BuyerPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🛒 Buyer Marketplace</h1>
        <p className="text-gray-600">Find and connect with farmers selling fresh agricultural products</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Filter className="w-5 h-5 text-green-600" /> Filter Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" value={props.buyerSearch} onChange={e => props.setBuyerSearch(e.target.value)}
                placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={props.buyerCategory} onChange={e => props.setBuyerCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select value={props.buyerDistrict} onChange={e => props.setBuyerDistrict(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">All Districts</option>
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹)</label>
            <input type="number" value={props.buyerPriceRange[1] === 100000 ? "" : props.buyerPriceRange[1]}
              onChange={e => props.setBuyerPriceRange([0, e.target.value ? Number(e.target.value) : 100000])}
              placeholder="No limit" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {props.products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
            <div className="h-44 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">{product.category}</span>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <div className="text-2xl font-extrabold text-green-700 mt-1">
                ₹{product.price}<span className="text-sm font-normal text-gray-500">/{product.unit}</span>
              </div>
              <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-green-500" /> {product.farmerName}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-500" /> {product.district}{product.mandi ? `, ${product.mandi}` : ""}</div>
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-green-500" /> {product.quantity} {product.unit} available</div>
                {product.expiryDate && <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-500" /> Available till {product.expiryDate}</div>}
              </div>
              <div className="flex gap-2 mt-4">
                <a href={`tel:${product.phone.replace(/\s/g, "")}`}
                  className="flex-1 px-3 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a href={`https://wa.me/${(product.whatsapp || product.phone).replace(/[\s+]/g, "")}?text=${encodeURIComponent(`Hi ${product.farmerName}, I'm interested in your ${product.name} listed on Indiagro.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 px-3 py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-medium text-center hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {props.products.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">No products match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}

// ==================== ABOUT PAGE ====================
function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🌾 About Indiagro</h1>
        <p className="text-gray-600 mb-8">Empowering West Bengal's agricultural ecosystem through technology</p>

        <div className="prose max-w-none">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Indiagro is West Bengal's leading digital agricultural marketplace, designed to bridge the gap between farmers, buyers, and wholesalers. We believe every farmer deserves fair prices and every buyer deserves fresh, quality produce — without unnecessary middlemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "Direct Trade", desc: "We eliminate middlemen, ensuring farmers get better prices and buyers get fresher produce at competitive rates.", icon: "🤝" },
              { title: "Live Market Data", desc: "Real-time mandi prices and weather tracking help farmers make informed decisions about when and where to sell.", icon: "📊" },
              { title: "Digital Empowerment", desc: "Simple, mobile-friendly tools that even first-time smartphone users can navigate with ease.", icon: "📱" },
              { title: "Community Focus", desc: "Supporting the agricultural communities of West Bengal with verified contacts and government scheme information.", icon: "🏘️" },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative text-white rounded-2xl p-8 overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="Sunset farm" className="w-full h-full object-cover" style={{ animation: 'kenburns 15s ease-in-out infinite alternate' }} />
              <div className="absolute inset-0 bg-green-900/85" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-green-100 text-lg leading-relaxed">
                To create a transparent, efficient, and fair agricultural marketplace across all of India, starting from West Bengal. We envision a future where technology empowers every farmer to thrive and every consumer to access quality food directly from the source.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TESTIMONIALS PAGE ====================
function TestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">⭐ What Our Users Say</h1>
        <p className="text-gray-600">Real stories from farmers, buyers, and wholesalers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className={`w-5 h-5 ${si < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-gray-900">{t.name}</div>
                <div className="text-sm text-green-600">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== CONTACT PAGE ====================
interface ContactPageProps {
  contactForm: { name: string; email: string; phone: string; message: string };
  setContactForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string; message: string }>>;
  handleContactSubmit: (e: React.FormEvent) => void;
  contactSubmitted: boolean;
}

function ContactPage(props: ContactPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">📞 Contact Us</h1>
        <p className="text-gray-600">We'd love to hear from you. Reach out for any queries or support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
          {props.contactSubmitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 font-medium">
              ✅ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={props.handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" required value={props.contactForm.name}
                onChange={e => props.setContactForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your full name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required value={props.contactForm.email}
                onChange={e => props.setContactForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={props.contactForm.phone}
                onChange={e => props.setContactForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea required rows={4} value={props.contactForm.message}
                onChange={e => props.setContactForm(f => ({ ...f, message: e.target.value }))}
                placeholder="How can we help you?" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md">
              📤 Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Address", value: "ICARE Complex, HIT HALDIA, Purba Mednipur, HATIBERIA, 721657" },
                { icon: Phone, label: "Phone", value: "+91 8170010818" },
                { icon: Mail, label: "Email", value: "infoindiagroo@gmail.com" },
                { icon: Clock, label: "Working Hours", value: "Mon-Sat: 9:00 AM - 6:00 PM" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">{label}</div>
                    <div className="text-gray-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.5!2d88.0638!3d22.0286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02b4e5e5a2f8e3%3A0x1c0e5e7d1e1b5e1a!2sHaldia%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Indiagro Location - ICARE Complex, HIT Haldia"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
