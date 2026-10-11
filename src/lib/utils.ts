// --- Data Interfaces ---

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

// --- Helper Functions ---

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Convert standard Arabic numerals into Bengali numerals
export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}

// Format numeric values with localized separators and Bengali numerals
export function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-IN");
  return toBengaliNumber(formatted);
}

// Map product metric units to readable Bengali strings
export function getUnitBn(unit: string): string {
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    hali: "প্রতি হালি",
  };
  return unitMap[unit.toLowerCase()] || `প্রতি ${unit}`;
}

// Format current timestamp into a localized Bengali date string
export function getBanglaDate(): string {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const now = new Date();
  const dayName = days[now.getDay()];
  const dateBn = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearBn = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${dateBn} ${monthName}, ${yearBn}`;
}
