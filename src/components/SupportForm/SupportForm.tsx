import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CONTACT_EMAIL } from "../../data/apps";
import { cn } from "../../lib/cn";

interface SupportFormProps {
  /** App display name used as the email subject prefix. */
  appName: string;
}

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const topicKeys = ["general", "bug", "account", "suggestion", "other"] as const;

export function SupportForm({ appName }: SupportFormProps) {
  const { t } = useTranslation();
  const [state, setState] = useState<FormState>({ name: "", email: "", topic: "general", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState) => (value: string) =>
    setState((s) => ({ ...s, [key]: value }));

  const mailtoHref = useMemo(() => {
    const topicLabel = t(`supportForm.topics.${state.topic}`);
    const subject = `${appName} — ${topicLabel}`;
    const body = [
      state.name || t("supportForm.email.placeholderName"),
      "",
      `${t("supportForm.email.topic")}: ${topicLabel}`,
      `${t("supportForm.email.message")}:`,
      state.message,
      "",
      state.email,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [appName, state, t]);

  const canSend = state.message.trim().length > 0;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-8 shadow-card sm:p-10">
      <h3 className="text-2xl font-semibold tracking-tight text-ink">
        {t("supportForm.title")}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-faint">
        {t("supportForm.subtitle", { app: appName })}
      </p>

      <form className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label={t("supportForm.email.name")}>
          <input
            type="text"
            value={state.name}
            onChange={(e) => update("name")(e.target.value)}
            placeholder={t("supportForm.email.placeholderName")}
            className={inputClass}
            autoComplete="name"
          />
        </Field>

        <Field label={t("supportForm.email.email")}>
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
          <Field label={t("supportForm.email.topic")}>
            <select
              value={state.topic}
              onChange={(e) => update("topic")(e.target.value)}
              className={cn(inputClass, "appearance-none bg-white")}
            >
              {topicKeys.map((key) => (
                <option key={key} value={key}>
                  {t(`supportForm.topics.${key}`)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label={t("supportForm.email.message")}>
            <textarea
              value={state.message}
              onChange={(e) => update("message")(e.target.value)}
              placeholder={t("supportForm.email.placeholderMessage")}
              rows={5}
              className={cn(inputClass, "resize-y")}
              required
            />
          </Field>
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
          <a
            href={mailtoHref}
            onClick={() => canSend && setSent(true)}
            aria-disabled={!canSend}
            className={cn(
              "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300",
              canSend
                ? "bg-premium-gradient hover:brightness-110 active:scale-[0.98]"
                : "pointer-events-none bg-ink/15 shadow-none"
            )}
          >
            {t("supportForm.submit")}
          </a>
          {sent ? (
            <p className="text-sm font-medium text-accent-dark">{t("supportForm.sent")}</p>
          ) : (
            <p className="text-sm text-faint">{t("supportForm.note")}</p>
          )}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-line bg-mist px-4 py-3 text-[15px] text-ink placeholder:text-faint/70 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink/80">{label}</span>
      {children}
    </label>
  );
}
