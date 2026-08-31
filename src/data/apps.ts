import {
  Activity,
  CalendarHeart,
  CircleDollarSign,
  Flame,
  Heart,
  PieChart,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type ScreenVariant = "memories" | "fitness" | "finance";

export interface AppInfo {
  slug: string;
  /** i18n key base, e.g. "apps.nomi" */
  i18nKey: string;
  /** Icon shown in the app tile. */
  icon: LucideIcon;
  /** Tailwind gradient classes for the icon tile. */
  tile: string;
  /** Screen shown on cards and app hero mockups. */
  screen: ScreenVariant;
  /** Primary accent used on the app landing page. */
  accent: string;
  comingSoon: boolean;
  /** Icons paired with the i18n feature list. */
  featureIcons: LucideIcon[];
  /** Static tech-stack labels shown on the app page. */
  tech: string[];
}

export const apps: AppInfo[] = [
  {
    slug: "nomi",
    i18nKey: "apps.nomi",
    icon: Heart,
    tile: "from-[#9d7bff] to-[#5b3ee0]",
    screen: "memories",
    accent: "#7c5cff",
    comingSoon: false,
    featureIcons: [Sparkles, CalendarHeart, ShieldCheck],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "AWS"],
  },
  {
    slug: "fittrack",
    i18nKey: "apps.fittrack",
    icon: Activity,
    tile: "from-[#34d399] to-[#0ea5e9]",
    screen: "fitness",
    accent: "#0ea5e9",
    comingSoon: true,
    featureIcons: [TrendingUp, Target, Flame],
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Sentry"],
  },
  {
    slug: "finwhiz",
    i18nKey: "apps.finwhiz",
    icon: TrendingUp,
    tile: "from-[#60a5fa] to-[#2563eb]",
    screen: "finance",
    accent: "#2563eb",
    comingSoon: true,
    featureIcons: [PieChart, Target, CircleDollarSign],
    tech: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
];

export const CONTACT_EMAIL = "hello@rootandpixel.com";

export function appStoreHref(appName: string, platform: "apple" | "google") {
  const subject = `${appName} — ${platform === "apple" ? "App Store" : "Google Play"}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export function getApp(slug: string): AppInfo | undefined {
  return apps.find((a) => a.slug === slug);
}