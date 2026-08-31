import {
  CalendarHeart,
  Heart,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ScreenVariant = "memories";

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
  /** Store listing URLs. Open to the right store when a badge is clicked. */
  stores: {
    apple: string;
    google: string;
  };
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
    stores: {
      apple: "",
      google: "",
    },
  },
];

export const CONTACT_EMAIL = "hello@rootandpixel.com";

export function appStoreHref(app: AppInfo, platform: "apple" | "google") {
  return app.stores[platform];
}

export function getApp(slug: string): AppInfo | undefined {
  return apps.find((a) => a.slug === slug);
}