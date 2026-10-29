import type { AvatarConfig } from "@/content/avatar";

export type Reward = {
  id: string;
  name: string;
  description: string;
  icon: string;
  stars: number;
  category: "avatar" | "pet" | "pet_accessory";
  equip: Partial<AvatarConfig>;
};

export const REWARDS: Reward[] = [
  { id:"pink-bow", name:"Pink bow", description:"A bright pink bow for your avatar.", icon:"🎀", stars:10, category:"avatar", equip:{ accessory:"bow", accessoryColour:"pink" } },
  { id:"blue-clip", name:"Blue hair clip", description:"A blue clip for your hair.", icon:"🔹", stars:20, category:"avatar", equip:{ accessory:"hairclip", accessoryColour:"blue" } },
  { id:"cat", name:"Cat", description:"A little cat companion.", icon:"🐱", stars:30, category:"pet", equip:{ pet:"cat", petAccessory:"none" } },
  { id:"red-bow", name:"Red bow", description:"A red bow for your avatar.", icon:"🎀", stars:45, category:"avatar", equip:{ accessory:"bow", accessoryColour:"red" } },
  { id:"dog", name:"Dog", description:"A friendly dog companion.", icon:"🐶", stars:60, category:"pet", equip:{ pet:"dog", petAccessory:"none" } },
  { id:"gold-clip", name:"Gold hair clip", description:"A shiny gold hair clip.", icon:"✨", stars:75, category:"avatar", equip:{ accessory:"hairclip", accessoryColour:"gold" } },
  { id:"pet-bow", name:"Pet bow", description:"A pink bow for your cat or dog.", icon:"🎀", stars:90, category:"pet_accessory", equip:{ petAccessory:"bow" } },
  { id:"blue-collar", name:"Blue collar", description:"A blue collar for your pet.", icon:"🔵", stars:120, category:"pet_accessory", equip:{ petAccessory:"collar" } },
];

export function earnedStars(progress: { stage:number; xp:number }[]) {
  return progress.reduce((sum, p) => sum + (Math.max(1,p.stage)-1)*30 + p.xp, 0);
}

export function isEquipped(config: AvatarConfig, reward: Reward) {
  return Object.entries(reward.equip).every(([key,value]) => config[key as keyof AvatarConfig] === value);
}
