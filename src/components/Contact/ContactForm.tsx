import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CONTACT_EMAIL } from "../../data/apps";
import { cn } from "../../lib/cn";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/40 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-white/70">{label}</span>
      {children}
    </label>
  );
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const { t } = useTranslation();
  const [state, setState] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState) => (value: string) =>
    setState((s) => ({ ...s, [key]: value }));

  const mailtoHref = useMemo(() => {
    const subject = "Contact — Root & Pixel";
    const body = [
      state.name || "Name",
      "",
      `Email: ${state.email}`,
      "",
      state.message,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [state]);

  const canSend = state.message.trim().length > 0;

  const handleSubmit = () => {
    if (!canSend) return;
    setSent(true);
    setState({ name: "", email: "", message: "" });
  };

  return (
    <form className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-left sm:grid-cols-2 sm:p-10">
      <Field label={t("contactForm.name")}>
        <input
          type="text"
          value={state.name}
          onChange={(e) => update("name")(e.target.value)}
          placeholder={t("contactForm.namePlaceholder")}
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      <Field label={t("contactForm.email")}>
        <input
          type="email"
          value={state.email}
          onChange={(e) => update("email")(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
          autoComplete="email"
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label={t("contactForm.message")}>
          <textarea
            value={state.message}
            onChange={(e) => update("message")(e.target.value)}
            placeholder={t("contactForm.messagePlaceholder")}
            rows={5}
            className={cn(inputClass, "resize-y")}
            required
          />
        </Field>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <a
          href={mailtoHref}
          onClick={handleSubmit}
          aria-disabled={!canSend}
          className={cn(
            "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300",
            canSend
              ? "bg-premium-gradient hover:brightness-110 active:scale-[0.98]"
              : "pointer-events-none bg-white/15 shadow-none"
          )}
        >
          <Mail className="h-4.5 w-4.5" aria-hidden="true" />
          {t("contactForm.submit")}
        </a>
        {sent ? (
          <p className="text-sm font-medium text-accent-light">{t("contactForm.sent")}</p>
        ) : (
          <p className="text-sm text-white/50">{t("contactForm.note")}</p>
        )}
      </div>
    </form>
  );
}
