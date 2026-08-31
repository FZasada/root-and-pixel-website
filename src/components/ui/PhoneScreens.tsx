import {
  Activity,
  BatteryFull,
  ChartColumn,
  Heart,
  Home,
  Mountain,
  Plus,
  Search,
  Signal,
  Sun,
  User,
  Wifi,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type { ScreenVariant } from "../../data/apps";
import { cn } from "../../lib/cn";

function StatusBar({ dark }: { dark?: boolean }) {
  const color = dark ? "text-white/70" : "text-ink-800";
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 pb-1 pt-3 text-[10px] font-semibold",
        color
      )}
    >
      <span className="tracking-wide">9:41</span>
      <div aria-hidden="true" className="flex items-center gap-1">
        <Signal className="h-2.5 w-2.5" strokeWidth={2.5} />
        <Wifi className="h-2.5 w-2.5" strokeWidth={2.5} />
        <BatteryFull className="h-3 w-3" strokeWidth={2} />
      </div>
    </div>
  );
}

function TabBar({ dark, active = 0 }: { dark?: boolean; active?: number }) {
  const items = [
    { icon: Home, label: "home" },
    { icon: Search, label: "search" },
    { icon: Plus, label: "add" },
    { icon: Heart, label: "heart" },
    { icon: User, label: "profile" },
  ];
  return (
    <div className="relative mt-auto">
      <div
        className={cn(
          "absolute -top-4 left-0 right-0 h-10 bg-gradient-to-b to-transparent",
          dark ? "from-ink-900" : "from-white"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "flex items-center justify-around px-5 pb-5 pt-2",
          dark ? "bg-ink-900" : "bg-white"
        )}
        aria-hidden="true"
      >
        {items.map(({ icon: Icon }, i) => (
          <span
            key={i}
            className={cn(
              "rounded-full p-1.5",
              i === active && (dark ? "bg-white/10" : "bg-ink/5")
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                i === active
                  ? dark
                    ? "text-white"
                    : "text-ink"
                  : dark
                    ? "text-white/30"
                    : "text-ink/25"
              )}
              strokeWidth={2.2}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function MemoryCard({
  title,
  date,
  thumb,
}: {
  title: string;
  date: string;
  thumb: "nordic" | "sunset";
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-mist p-2.5">
      <div
        className={cn(
          "relative h-12 w-12 shrink-0 overflow-hidden rounded-xl",
          thumb === "nordic" ? "bg-gradient-to-br from-[#7dd3fc] to-[#1d4ed8]" : "bg-gradient-to-br from-[#fbbf24] via-[#fb7185] to-[#7c3aed]"
        )}
        aria-hidden="true"
      >
        {thumb === "nordic" ? (
          <Mountain className="absolute -bottom-1 -right-1 h-6 w-6 rotate-[18deg] text-white" strokeWidth={2.4} />
        ) : (
          <>
            <Sun className="absolute right-1 top-1 h-3.5 w-3.5 text-white" strokeWidth={2.4} />
            <Mountain className="absolute -bottom-1 left-0 h-6 w-6 -rotate-[14deg] text-white" strokeWidth={2.4} />
          </>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[10.5px] text-faint">{date}</p>
      </div>
    </div>
  );
}

export function MemoriesScreen({ compact }: { compact?: boolean }) {
  const { t } = useTranslation();
  const ph = t("hero.phone", { returnObjects: true }) as Record<string, string>;

  return (
    <div className="flex h-full flex-col bg-white text-ink">
      <StatusBar />
      <div className="flex flex-col gap-3 px-5 pt-3">
        <div>
          <p className="text-[12px] text-faint">{ph.greeting}</p>
          <p className="text-[20px] font-bold tracking-tight">{ph.name}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-ink/[0.04] px-3 py-1.5">
          <Heart className="h-3.5 w-3.5 text-accent" fill="currentColor" aria-hidden="true" />
          <span className="text-[11px] font-medium text-ink/70">
            <span className="font-bold text-accent-dark">{ph.memoriesCount}</span> {ph.memoriesLabel}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] font-semibold text-ink">{ph.recentTitle}</p>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white" aria-hidden="true">
            <Plus className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>
        {!compact && (
          <div className="flex flex-col gap-2">
            <MemoryCard title={ph.memory1Title} date={ph.memory1Date} thumb="nordic" />
            <MemoryCard title={ph.memory2Title} date={ph.memory2Date} thumb="sunset" />
          </div>
        )}
      </div>
      <TabBar dark={false} />
    </div>
  );
}

function TagChip({ label, del }: { label: string; del?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10.5px] font-medium",
        del ? "bg-white/10 text-white/80" : "bg-white/5 text-white/50"
      )}
    >
      {label}
    </span>
  );
}

export function StatsScreen() {
  const { t } = useTranslation();
  const ph = t("hero.phone", { returnObjects: true }) as Record<string, string>;
  const bars = [38, 62, 45, 78, 58, 92, 70];

  return (
    <div className="flex h-full flex-col bg-ink-900 text-white">
      <StatusBar dark />
      <div className="flex flex-col gap-4 px-5 pt-3">
        <div>
          <p className="text-[15px] font-bold tracking-tight">{ph.statsTitle}</p>
          <p className="mt-0.5 text-[11px] text-white/50">{ph.statsPeriod}</p>
        </div>

        <div className="flex items-end gap-2">
          <p className="text-[32px] font-bold leading-none tracking-tight text-gradient">{ph.statsValue}</p>
          <p className="pb-1 text-[11px] text-white/50">{ph.statsLabel}</p>
        </div>

        <div className="flex h-16 items-end gap-1.5 pt-1" aria-hidden="true">
          {bars.map((h, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t-[4px]",
                i === 5 ? "bg-premium-gradient" : "bg-white/10"
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <div className="pt-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-white/90">{ph.statsTags}</p>
            <ChartColumn className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <TagChip label={ph.statsTag1} del />
            <TagChip label={ph.statsTag2} del />
            <TagChip label={ph.statsTag3} />
            <TagChip label={ph.statsTag4} />
          </div>
        </div>
      </div>
      <TabBar dark />
    </div>
  );
}

function FitnessScreen() {
  const week = [46, 70, 52, 88, 64, 96, 78];
  return (
    <div className="flex h-full flex-col bg-ink-900 text-white">
      <StatusBar dark />
      <div className="flex flex-col gap-4 px-5 pt-3">
        <div>
          <p className="text-[11px] text-white/50">Weekly Active</p>
          <p className="text-[20px] font-bold tracking-tight">
            5.2 h <span className="text-[12px] font-medium text-white/50">trainingszeit</span>
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.06] p-4">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/60">
            <Activity className="h-3.5 w-3.5 text-[#34d399]" />
            <span className="font-semibold text-[#34d399]">2.418</span>
            <span>kcal burned</span>
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5" aria-hidden="true">
            {week.map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-[4px]",
                  i === 5 ? "bg-gradient-to-t from-[#0ea5e9] to-[#34d399]" : "bg-white/10"
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white/[0.06] p-3.5">
          <div>
            <p className="text-[12px] font-semibold">Weekly Goal</p>
            <p className="text-[10.5px] text-white/50">Sessions 4 / 5</p>
          </div>
          <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
            <circle
              cx="20" cy="20" r="16" fill="none" stroke="url(#fg)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${0.8 * 100.5} 100.5`}
            />
            <linearGradient id="fg" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#34d399" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </svg>
        </div>
      </div>
      <TabBar dark />
    </div>
  );
}

function FinanceScreen() {
  const cats = [
    { label: "Groceries", pct: 78, color: "bg-[#60a5fa]" },
    { label: "Rent", pct: 52, color: "bg-[#2563eb]" },
    { label: "Transport", pct: 34, color: "bg-[#93c5fd]" },
  ];
  return (
    <div className="flex h-full flex-col bg-ink-900 text-white">
      <StatusBar dark />
      <div className="flex flex-col gap-4 px-5 pt-3">
        <div className="rounded-2xl bg-gradient-to-br from-[#60a5fa] to-[#2563eb] p-4 text-white">
          <p className="text-[10.5px] font-medium text-white/70">Total Balance</p>
          <p className="mt-1 text-[26px] font-bold tracking-tight">$12,480</p>
          <p className="mt-1 inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
            +12.4% this month
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white/90">Monthly Spending</p>
          <div className="mt-2 flex flex-col gap-2.5">
            {cats.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-[10.5px]">
                  <span className="text-white/70">{c.label}</span>
                  <span className="text-white/40">{c.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/10">
                  <div className={cn("h-full rounded-full", c.color)} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar dark />
    </div>
  );
}

interface PhoneScreenProps {
  variant: ScreenVariant;
  className?: string;
}

export function PhoneScreen({ variant, className }: PhoneScreenProps) {
  return (
    <div className={cn("h-full", className)}>
      {variant === "memories" && <MemoriesScreen />}
      {variant === "fitness" && <FitnessScreen />}
      {variant === "finance" && <FinanceScreen />}
    </div>
  );
}