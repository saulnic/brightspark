import type { LearningQuestion, QuestionChoice } from "./types";

type Rng = () => number;

function rngFromSeed(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function int(rng: Rng, min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function shuffle<T>(rng: Rng, items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function numericChoices(rng: Rng, correct: number, spread = 5): QuestionChoice[] {
  const values = new Set<number>([correct]);
  let guard = 0;
  while (values.size < 4 && guard++ < 100) {
    const delta = int(rng, 1, spread) * (rng() > 0.5 ? 1 : -1);
    const value = correct + delta;
    if (value >= 0) values.add(value);
  }
  return shuffle(rng, [...values]).map((value, index) => ({
    id: "c" + index,
    label: String(value),
    value,
  }));
}

function textChoices(rng: Rng, correct: string, distractors: string[]): QuestionChoice[] {
  const values = [correct, ...distractors.filter((v) => v !== correct)].slice(0, 4);
  return shuffle(rng, values).map((value, index) => ({
    id: "c" + index,
    label: value,
    value,
  }));
}

function makeQuestion(
  skillId: string,
  objectiveId: string,
  difficulty: number,
  questionType: string,
  prompt: string,
  choices: QuestionChoice[],
  correctValue: string | number,
  seed: number,
  explanation?: string,
  visual?: Record<string, unknown>
): LearningQuestion {
  const correct = choices.find((choice) => choice.value === correctValue);
  if (!correct) throw new Error("Generator produced no matching correct choice.");

  return {
    id: `${skillId}:${objectiveId}:${seed}`,
    skillId,
    objectiveId,
    difficulty,
    questionType,
    prompt,
    visual,
    choices,
    correctChoiceId: correct.id,
    explanation,
    seed,
    contentVersion: "1.0",
  };
}

const SPELLING_STAGES = [
  ["cat","ship","jump","black","green","three","right","light","house","water","happy","rabbit","school","night","yellow","window"],
  ["because","friend","little","people","again","where","there","could","would","should","every","which","about","before","around","children"],
  ["mother","father","morning","garden","summer","winter","today","under","answer","really","always","caught"],
  ["thought","enough","through","special","question","straight","complete","decide","excited","quietly","finally","library"],
  ["beautiful","different","important","remember","favourite","probably","interesting","surprise","perhaps","minute"],
  ["necessary","separate","business","calendar","experience","knowledge","environment","temperature"],
  ["definitely","immediately","especially","community","government","physical"],
  ["occasionally","responsibility","communication","independent"],
];

export function generateQuestion(skillId: string, stage: number, seed: number): LearningQuestion {
  const rng = rngFromSeed(seed);
  const difficulty = Math.max(1, Math.min(8, stage));

  if (skillId === "numbers") {
    const max = difficulty < 3 ? 50 : difficulty < 5 ? 100 : 500;
    const a = int(rng, 1, max);
    let b = int(rng, 1, max);
    if (a === b) b = b === max ? b - 1 : b + 1;
    const larger = rng() > 0.5;
    const correct = larger ? Math.max(a, b) : Math.min(a, b);
    const choices = textChoices(rng, String(correct), [String(correct + 1), String(Math.max(0, correct - 1)), String(a === correct ? b : a)]);
    return makeQuestion("numbers", larger ? "compare.larger" : "compare.smaller", difficulty, "number_compare", `Which number is ${larger ? "larger" : "smaller"}?`, choices, String(correct), seed);
  }

  if (skillId === "add") {
    const useSubtraction = difficulty > 1 && rng() > 0.5;
    const max = difficulty < 3 ? 20 : difficulty < 5 ? 50 : 100;
    const a = int(rng, 3, max);
    const b = int(rng, 1, useSubtraction ? a : Math.min(max, 30));
    const correct = useSubtraction ? a - b : a + b;
    return makeQuestion("add", useSubtraction ? "subtract.facts" : "add.facts", difficulty, "arithmetic", `What is ${a} ${useSubtraction ? "−" : "+"} ${b}?`, numericChoices(rng, correct, Math.max(3, Math.ceil(max / 10))), correct, seed);
  }

  if (skillId === "times") {
    const tables = difficulty < 3 ? [2,5,10] : difficulty < 5 ? [2,3,4,5,10] : [2,3,4,5,6,7,8,9,10];
    const table = pick(rng, tables);
    const n = int(rng, 1, difficulty < 4 ? 10 : 12);
    if (rng() > 0.45) {
      const correct = table * n;
      return makeQuestion("times", "multiply.facts", difficulty, "multiplication", `What is ${table} × ${n}?`, numericChoices(rng, correct, Math.max(4, table)), correct, seed);
    }
    const total = table * n;
    return makeQuestion("times", "divide.sharing", difficulty, "division", `${total} objects are shared equally into ${table} groups. How many are in each group?`, numericChoices(rng, n, 4), n, seed);
  }

  if (skillId === "fractions") {
    const denominators = difficulty < 3 ? [2,4] : [2,3,4,5,8];
    const denominator = pick(rng, denominators);
    const numerator = int(rng, 1, denominator - 1 || 1);
    const label = `${numerator}/${denominator}`;
    const distractors = [
      `${Math.min(denominator, numerator + 1)}/${denominator}`,
      `${numerator}/${denominator + 1}`,
      `${denominator}/${numerator}`,
    ];
    return makeQuestion("fractions", "fraction.identify", difficulty, "fraction_words", `Which fraction means ${numerator} out of ${denominator} equal parts?`, textChoices(rng, label, distractors), label, seed);
  }

  if (skillId === "money") {
    const coins = difficulty < 3 ? [5,10,20,50,100,200] : [5,10,20,50,100,200,500,1000];
    const a = pick(rng, coins);
    const b = pick(rng, coins);
    const cents = a + b;
    const format = (v: number) => v < 100 ? `${v}c` : `$${(v / 100).toFixed(v % 100 === 0 ? 0 : 2)}`;
    const correct = format(cents);
    const alternatives = [format(cents + 10), format(Math.max(5, cents - 10)), format(cents + 50)];
    return makeQuestion("money", "money.total", difficulty, "money_total", `You have ${format(a)} and ${format(b)}. How much altogether?`, textChoices(rng, correct, alternatives), correct, seed);
  }

  if (skillId === "time") {
    const hour = int(rng, 1, 12);
    const half = difficulty > 1 && rng() > 0.45;
    const correct = half ? `${hour}:30` : `${hour}:00`;
    const distractors = half ? [`${hour}:00`, `${hour === 12 ? 1 : hour + 1}:30`, `${hour}:15`] : [`${hour}:30`, `${hour === 12 ? 1 : hour + 1}:00`, `${hour}:15`];
    return makeQuestion("time", half ? "time.half_hour" : "time.hour", difficulty, "time_read", `Which digital time shows ${half ? "half past " : ""}${hour}${half ? "" : " o'clock"}?`, textChoices(rng, correct, distractors), correct, seed);
  }

  if (skillId === "measure") {
    const lengthMode = rng() > 0.5;
    if (lengthMode) {
      const yellow = int(rng, 10, 80);
      let blue = int(rng, 10, 80);
      if (blue === yellow) blue += 5;
      const askLonger = rng() > 0.5;
      const correct = askLonger ? (yellow > blue ? "Yellow ribbon" : "Blue ribbon") : (yellow < blue ? "Yellow ribbon" : "Blue ribbon");
      return makeQuestion("measure", "measure.length.compare", difficulty, "measurement_compare", `The yellow ribbon is ${yellow} cm. The blue ribbon is ${blue} cm. Which is ${askLonger ? "longer" : "shorter"}?`, textChoices(rng, correct, [correct === "Yellow ribbon" ? "Blue ribbon" : "Yellow ribbon", "They are equal"]), correct, seed, undefined, { yellow, blue, unit: "cm" });
    }
    const red = int(rng, 1, 9) * 100;
    let green = int(rng, 1, 9) * 100;
    if (green === red) green += 100;
    const correct = red > green ? "Red jug" : "Green jug";
    return makeQuestion("measure", "measure.capacity.compare", difficulty, "capacity_compare", `The red jug holds ${red} mL. The green jug holds ${green} mL. Which holds more?`, textChoices(rng, correct, [correct === "Red jug" ? "Green jug" : "Red jug", "They hold the same"]), correct, seed);
  }

  if (skillId === "shapes") {
    const items = [
      { name: "triangle", sides: 3 },
      { name: "square", sides: 4 },
      { name: "pentagon", sides: 5 },
      { name: "hexagon", sides: 6 },
    ];
    const target = pick(rng, items);
    const names = items.filter((i) => i.name !== target.name).map((i) => i.name);
    return makeQuestion("shapes", "shapes.sides", difficulty, "shape_sides", `Which shape has ${target.sides} sides?`, textChoices(rng, target.name, names), target.name, seed);
  }

  if (skillId === "patterns") {
    const start = int(rng, 1, 10);
    const step = pick(rng, difficulty < 3 ? [1,2,5] : [2,3,4,5,10]);
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const correct = start + step * 4;
    return makeQuestion("patterns", "patterns.number", difficulty, "number_pattern", `What comes next?  ${seq.join(", ")}, …`, numericChoices(rng, correct, Math.max(3, step + 2)), correct, seed);
  }

  if (skillId === "data") {
    const red = int(rng, 0, 5);
    const blue = int(rng, 0, 5);
    if (red + blue === 0) {
      return generateQuestion(skillId, stage, seed + 1);
    }
    let prompt: string;
    let correct: string;
    if (red === 0) {
      prompt = `A bag has ${blue} blue counters and no red counters. What is the chance of picking red?`;
      correct = "Impossible";
    } else if (blue === 0) {
      prompt = `A bag has ${red} red counters and no blue counters. What is the chance of picking red?`;
      correct = "Certain";
    } else if (red === blue) {
      prompt = `A bag has ${red} red and ${blue} blue counters. Which colour is more likely to be picked?`;
      correct = "Equally likely";
    } else {
      prompt = `A bag has ${red} red and ${blue} blue counters. Which colour is more likely to be picked?`;
      correct = red > blue ? "Red" : "Blue";
    }
    return makeQuestion("data", "chance.counters", difficulty, "counter_probability", prompt, textChoices(rng, correct, ["Red","Blue","Equally likely","Impossible","Certain"]), correct, seed, undefined, { red, blue });
  }

  if (skillId === "spelling") {
    const words = SPELLING_STAGES[Math.min(SPELLING_STAGES.length - 1, difficulty - 1)];
    const correct = pick(rng, words);
    const mutations = [
      correct.length > 3 ? correct.slice(0, -1) : correct + "e",
      correct.replace(/[aeiou]/, (m) => ({a:"e",e:"a",i:"e",o:"a",u:"o"}[m] ?? m)),
      correct.length > 4 ? correct.slice(0, 2) + correct[3] + correct[2] + correct.slice(4) : correct + "s",
    ];
    return makeQuestion("spelling", "spelling.correct", difficulty, "spelling_choice", "Which spelling is correct?", textChoices(rng, correct, mutations), correct, seed);
  }

  if (skillId === "reading") {
    const passages = [
      { text: "Mia put on her boots because the grass was wet.", q: "Why did Mia put on her boots?", a: "The grass was wet", d: ["She was going to bed","The sun was hot","She lost her shoes"] },
      { text: "Ben filled a bowl with water for the thirsty dog.", q: "Who was thirsty?", a: "The dog", d: ["Ben","The bowl","Nobody"] },
      { text: "The red kite rose high when the wind became stronger.", q: "What made the kite rise?", a: "The stronger wind", d: ["The rain","The dark sky","A tree"] },
      { text: "Luca packed an apple and a sandwich before the picnic.", q: "What was Luca getting ready for?", a: "A picnic", d: ["A swim","School assembly","Bedtime"] },
    ];
    const item = pick(rng, passages);
    return makeQuestion("reading", "reading.comprehension", difficulty, "reading_short", `${item.text}\n\n${item.q}`, textChoices(rng, item.a, item.d), item.a, seed);
  }

  if (skillId === "grammar") {
    const items = [
      { q: "Which sentence ends correctly?", a: "We went to the park.", d: ["We went to the park","we went to the park.","We went to the park,"] },
      { q: "Which word is a noun?", a: "dog", d: ["quickly","blue","jumped"] },
      { q: "Which word is a verb?", a: "runs", d: ["happy","table","green"] },
      { q: "Which sentence starts correctly?", a: "My cat is sleepy.", d: ["my cat is sleepy.","MY cat is sleepy.","my Cat is sleepy."] },
    ];
    const item = pick(rng, items);
    return makeQuestion("grammar", "grammar.basics", difficulty, "grammar_choice", item.q, textChoices(rng, item.a, item.d), item.a, seed);
  }

  if (skillId === "vocab") {
    const items = [
      { word: "enormous", answer: "very big", d: ["very quiet","very old","very fast"] },
      { word: "tiny", answer: "very small", d: ["very loud","very soft","very bright"] },
      { word: "rapid", answer: "fast", d: ["slow","heavy","late"] },
      { word: "glad", answer: "happy", d: ["angry","tired","lost"] },
      { word: "begin", answer: "start", d: ["finish","hide","carry"] },
    ];
    const item = pick(rng, items);
    return makeQuestion("vocab", "vocab.meaning", difficulty, "vocabulary_meaning", `What does “${item.word}” mean?`, textChoices(rng, item.answer, item.d), item.answer, seed);
  }

  throw new Error(`Unknown skill: ${skillId}`);
}
