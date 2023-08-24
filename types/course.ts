import sections from "../store/sections.json";

export type SectionCode = keyof typeof sections;

export type Section = typeof sections[SectionCode];

export type Group = Section["groups"][number];

export type Course = Group["courses"][number];
