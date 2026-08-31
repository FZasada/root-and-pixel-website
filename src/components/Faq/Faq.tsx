import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "../ui/Reveal";

interface FaqProps {
  /** i18n key base that resolves to a `{ items: [{question, answer}] }` object. */
  i18nKey: string;
}

export function Faq({ i18nKey }: FaqProps) {
  const { t } = useTranslation();
  const items = t(`${i18nKey}.items`, { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <Reveal key={item.question} delay={0.05 * i}>
          <details className="group rounded-3xl border border-line bg-white shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-base font-semibold tracking-tight text-ink">
                {item.question}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/[0.05] text-ink transition-transform duration-300 group-open:rotate-180">
                <ChevronDown className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </span>
            </summary>
            <p className="px-7 pb-6 text-[15px] leading-relaxed text-faint">{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
