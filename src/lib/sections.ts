export const SECTIONS = ["works", "notes", "music"] as const;

export type SectionKey = (typeof SECTIONS)[number];

export const getSectionLabel = (section: SectionKey) =>
    section.charAt(0).toUpperCase() + section.slice(1);

export const isSection = (value: string | undefined): value is SectionKey =>
    typeof value === "string" && SECTIONS.includes(value as SectionKey);
