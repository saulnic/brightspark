import type { LearningQuestion } from "./types";

export type QuestionValidationResult =
  | { valid: true }
  | { valid: false; errors: string[] };

export function validateQuestion(
  question: LearningQuestion
): QuestionValidationResult {
  const errors: string[] = [];

  if (!question.id.trim()) errors.push("Question id is required.");
  if (!question.skillId.trim()) errors.push("Skill id is required.");
  if (!question.objectiveId.trim()) errors.push("Objective id is required.");
  if (!question.prompt.trim()) errors.push("Prompt is required.");
  if (!Number.isInteger(question.difficulty) || question.difficulty < 1) {
    errors.push("Difficulty must be a positive integer.");
  }

  if (question.choices.length < 2 || question.choices.length > 4) {
    errors.push("Questions must contain between 2 and 4 choices.");
  }

  const ids = question.choices.map((choice) => choice.id);
  if (new Set(ids).size !== ids.length) {
    errors.push("Choice ids must be unique.");
  }

  const labels = question.choices.map((choice) => choice.label.trim());
  if (labels.some((label) => !label)) {
    errors.push("Choice labels cannot be empty.");
  }

  if (new Set(labels).size !== labels.length) {
    errors.push("Choice labels must be unique.");
  }

  const correctCount = question.choices.filter(
    (choice) => choice.id === question.correctChoiceId
  ).length;

  if (correctCount !== 1) {
    errors.push("Exactly one choice must match correctChoiceId.");
  }

  for (const choice of question.choices) {
    if (
      typeof choice.value === "number" &&
      !Number.isFinite(choice.value)
    ) {
      errors.push(`Choice ${choice.id} has a non-finite numeric value.`);
    }
  }

  if (!Number.isSafeInteger(question.seed)) {
    errors.push("Question seed must be a safe integer.");
  }

  if (!question.contentVersion.trim()) {
    errors.push("Content version is required.");
  }

  return errors.length ? { valid: false, errors } : { valid: true };
}
