import { ClipboardList, Compass, Code2, Rocket, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  number: string;
  icon: LucideIcon;
  /** i18n key base, e.g. "process.steps.0.title" */
  i18nKey: string;
}

export const processSteps: ProcessStep[] = [
  { number: "01", icon: ClipboardList, i18nKey: "process.steps.0" },
  { number: "02", icon: Compass, i18nKey: "process.steps.1" },
  { number: "03", icon: Code2, i18nKey: "process.steps.2" },
  { number: "04", icon: Rocket, i18nKey: "process.steps.3" },
];