import {
  BookOpenIcon,
  DicesIcon,
  DnaIcon,
  type LucideIcon,
} from "lucide-react";

export type IconName = "dna" | "dice" | "book";

export const ICONS: Record<IconName, LucideIcon> = {
  dna: DnaIcon,
  dice: DicesIcon,
  book: BookOpenIcon,
};
