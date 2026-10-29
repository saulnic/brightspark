export type SkillMeta = {
  id: string;
  subject: "maths" | "english";
  name: string;
  icon: string;
  description: string;
};

export const SKILLS: SkillMeta[] = [
  { id: "numbers", subject: "maths", name: "Number sense", icon: "🔢", description: "Compare, order and understand numbers" },
  { id: "add", subject: "maths", name: "Add & subtract", icon: "➕", description: "Build quick, confident number facts" },
  { id: "times", subject: "maths", name: "Multiply & divide", icon: "✖️", description: "Groups, sharing and times tables" },
  { id: "fractions", subject: "maths", name: "Fractions", icon: "🍕", description: "Halves, quarters and equal parts" },
  { id: "money", subject: "maths", name: "Money", icon: "🪙", description: "Australian coins, notes and totals" },
  { id: "time", subject: "maths", name: "Time", icon: "🕒", description: "Clocks, durations and daily time" },
  { id: "measure", subject: "maths", name: "Measurement", icon: "📏", description: "Length, capacity and mass" },
  { id: "shapes", subject: "maths", name: "Shapes & space", icon: "🔷", description: "2D shapes, 3D objects and position" },
  { id: "patterns", subject: "maths", name: "Patterns", icon: "🟣", description: "Spot and continue patterns" },
  { id: "data", subject: "maths", name: "Data & chance", icon: "🎲", description: "Graphs and simple probability" },
  { id: "spelling", subject: "english", name: "Spelling", icon: "✏️", description: "Build spelling confidence" },
  { id: "reading", subject: "english", name: "Reading", icon: "📚", description: "Short comprehension questions" },
  { id: "grammar", subject: "english", name: "Grammar", icon: "🧩", description: "Sentences, punctuation and word types" },
  { id: "vocab", subject: "english", name: "Vocabulary", icon: "💬", description: "Word meanings and synonyms" },
];

export const STAGE_NAMES = [
  "Starting",
  "Building",
  "Growing",
  "Confident",
  "Strong",
  "Advanced",
  "Expert",
  "Mastering",
] as const;

export function getSkill(id: string) {
  return SKILLS.find((skill) => skill.id === id);
}
