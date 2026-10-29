export type AvatarConfig = {
  skin: "light" | "warm" | "tan" | "brown" | "deep";
  face: "round" | "oval";
  eyes: "brown" | "blue" | "green" | "dark";
  hair: "short" | "bob" | "long" | "curls" | "topknot";
  hairColour: "brown" | "black" | "blonde" | "red";
  accessory: "none" | "bow" | "hairclip" | "glasses" | "star";
  accessoryColour: "pink" | "blue" | "gold" | "red";
  pet: "none" | "cat" | "dog";
  petAccessory: "none" | "bow" | "collar";
};

export const DEFAULT_AVATAR: AvatarConfig = {
  skin: "warm",
  face: "round",
  eyes: "brown",
  hair: "bob",
  hairColour: "brown",
  accessory: "none",
  accessoryColour: "pink",
  pet: "none",
  petAccessory: "none",
};

export const AVATAR_OPTIONS = {
  skin: ["light", "warm", "tan", "brown", "deep"],
  face: ["round", "oval"],
  eyes: ["brown", "blue", "green", "dark"],
  hair: ["short", "bob", "long", "curls", "topknot"],
  hairColour: ["brown", "black", "blonde", "red"],
  accessory: ["none", "bow", "glasses", "star"],
} as const;

const REWARD_ACCESSORIES = ["none","bow","hairclip","glasses","star"] as const;
const ACCESSORY_COLOURS = ["pink","blue","gold","red"] as const;
const PETS = ["none","cat","dog"] as const;
const PET_ACCESSORIES = ["none","bow","collar"] as const;

export function normalizeAvatarConfig(value: unknown): AvatarConfig {
  if (!value || typeof value !== "object") return DEFAULT_AVATAR;
  const raw = value as Record<string, unknown>;

  return {
    skin: AVATAR_OPTIONS.skin.includes(raw.skin as AvatarConfig["skin"]) ? raw.skin as AvatarConfig["skin"] : DEFAULT_AVATAR.skin,
    face: AVATAR_OPTIONS.face.includes(raw.face as AvatarConfig["face"]) ? raw.face as AvatarConfig["face"] : DEFAULT_AVATAR.face,
    eyes: AVATAR_OPTIONS.eyes.includes(raw.eyes as AvatarConfig["eyes"]) ? raw.eyes as AvatarConfig["eyes"] : DEFAULT_AVATAR.eyes,
    hair: AVATAR_OPTIONS.hair.includes(raw.hair as AvatarConfig["hair"]) ? raw.hair as AvatarConfig["hair"] : DEFAULT_AVATAR.hair,
    hairColour: AVATAR_OPTIONS.hairColour.includes(raw.hairColour as AvatarConfig["hairColour"]) ? raw.hairColour as AvatarConfig["hairColour"] : DEFAULT_AVATAR.hairColour,
    accessory: REWARD_ACCESSORIES.includes(raw.accessory as AvatarConfig["accessory"]) ? raw.accessory as AvatarConfig["accessory"] : DEFAULT_AVATAR.accessory,
    accessoryColour: ACCESSORY_COLOURS.includes(raw.accessoryColour as AvatarConfig["accessoryColour"]) ? raw.accessoryColour as AvatarConfig["accessoryColour"] : DEFAULT_AVATAR.accessoryColour,
    pet: PETS.includes(raw.pet as AvatarConfig["pet"]) ? raw.pet as AvatarConfig["pet"] : DEFAULT_AVATAR.pet,
    petAccessory: PET_ACCESSORIES.includes(raw.petAccessory as AvatarConfig["petAccessory"]) ? raw.petAccessory as AvatarConfig["petAccessory"] : DEFAULT_AVATAR.petAccessory,
  };
}
