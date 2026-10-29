export type RewardType =
  | "pet"
  | "avatar_item"
  | "pet_accessory"
  | "background"
  | "bonus";

export type RewardChallengeType =
  | "milestone"
  | "neglected_skill"
  | "return_to_skill"
  | "practice_bonus";

export type RewardDefinition = {
  id: string;
  type: RewardType;
  name: string;
  metadata?: Record<string, unknown>;
};
