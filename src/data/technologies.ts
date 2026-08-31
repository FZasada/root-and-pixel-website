import { Atom, Bug, Cloud, Database, Flame, FileCode2, PenTool, type LucideIcon } from "lucide-react";

export interface Technology {
  name: string;
  icon: LucideIcon;
}

export const technologies: Technology[] = [
  { name: "React Native", icon: Atom },
  { name: "TypeScript", icon: FileCode2 },
  { name: "Firebase", icon: Flame },
  { name: "Supabase", icon: Database },
  { name: "AWS", icon: Cloud },
  { name: "Sentry", icon: Bug },
  { name: "Figma", icon: PenTool },
];