export type Subject = "maths" | "english";

export type QuestionChoice = {
  id: string;
  label: string;
  value: string | number;
};

export type LearningQuestion = {
  id: string;
  skillId: string;
  objectiveId: string;
  difficulty: number;
  questionType: string;
  prompt: string;
  visual?: Record<string, unknown>;
  choices: QuestionChoice[];
  correctChoiceId: string;
  explanation?: string;
  seed: number;
  contentVersion: string;
};

export type QuestionAttemptEvent = {
  learnerId: string;
  sessionId?: string;
  skillId: string;
  objectiveId?: string;
  difficulty: number;
  questionType: string;
  questionSeed: number;
  contentVersion: string;
  questionKey?: string;
  correct: boolean;
  answerGiven?: unknown;
  correctAnswer?: unknown;
  durationMs?: number;
  attemptedAt: string;
};
