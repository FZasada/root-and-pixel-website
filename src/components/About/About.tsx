import { animate, useInView, useReducedMotion } from "framer-motion";
import { Activity, Box, PenTool, ShieldCheck, Smartphone, Workflow } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Reveal } from "../ui/Reveal";

const competencies = [
  { icon: Box, label: "engineering" },
  { icon: Workflow, label: "product" },
  { icon: PenTool, label: "ux" },
  { icon: Smartphone, label: "mobile" },
  { icon: Activity, label: "backend" },
  { icon: ShieldCheck, label: "security" },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(() => (reduce ? to : 0));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

interface StatProps {
  value: React.ReactNode;
  label: string;
  caption: string;
  numeric?: { to: number; prefix?: string; suffix?: string };
}

function StatRow({ value, label, caption, numeric }: StatProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-6 first:pt-0 last:pb-0">
      <div>
        <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {numeric ? <CountUp {...numeric} /> : value}
        </p>
        <p className="mt-1.5 text-sm font-medium text-white/85">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-white/50">{caption}</p>
      </div>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();
  const s = t("about.stats", { returnObjects: true }) as {
    userFocus: { value: string; label: string; caption: string };
    oneProduct: { value: string; label: string; caption: string };
    reliable: { value: string; label: string; caption: string };
  };

  const stats: StatProps[] = [
    {
      label: s.userFocus.label,
      caption: s.userFocus.caption,
      numeric: { to: 100, suffix: "%" },
      value: s.userFocus.value,
    },
    { value: s.oneProduct.value, label: s.oneProduct.label, caption: s.oneProduct.caption },
    {
      label: s.reliable.label,
      caption: s.reliable.caption,
      numeric: { to: 24, suffix: "/7" },
      value: s.reliable.value,
    },
  ];

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="container-shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex items-center rounded-full bg-ink/[0.05] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark ring-1 ring-ink/10">
                {t("about.eyebrow")}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {t("about.title")}
              </h2>
              <p className="mt-1 text-lg font-medium text-ink/80">{t("about.intro")}</p>
              <p className="max-w-lg text-[15px] leading-relaxed text-faint">{t("about.body1")}</p>
              <p className="max-w-lg text-[15px] leading-relaxed text-faint">{t("about.body2")}</p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {competencies.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-[13px] font-medium text-ink/80 transition-colors hover:border-accent/40 hover:text-accent-dark"
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    {t(`about.areas.${label}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 shadow-card-hover sm:p-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(closest-side, rgba(124,92,255,0.55), transparent)" }}
              />
              <div className="relative flex flex-col divide-y divide-white/[0.08]">
                {stats.map((stat) => (
                  <StatRow key={stat.label} {...stat} />
                ))}
              </div>
              <span className="relative mt-8 block h-px bg-gradient-to-r from-accent/50 via-white/10 to-transparent" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}