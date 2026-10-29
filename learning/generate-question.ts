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
  while (values.size < 4 && guard++ < 120) {
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
  const unique = [...new Set([correct, ...distractors].map((v) => v.trim()).filter(Boolean))].slice(0, 4);
  if (unique.length < 2) throw new Error("Text question needs at least two unique choices.");
  return shuffle(rng, unique).map((value, index) => ({
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
    contentVersion: "1.1",
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

const READING = [
  { text: "Mia put on her boots because the grass was wet.", q: "Why did Mia put on her boots?", a: "The grass was wet", d: ["She was going to bed","The sun was hot","She lost her shoes"] },
  { text: "Ben filled a bowl with water for the thirsty dog.", q: "Who was thirsty?", a: "The dog", d: ["Ben","The bowl","Nobody"] },
  { text: "The red kite rose high when the wind became stronger.", q: "What made the kite rise?", a: "The stronger wind", d: ["The rain","The dark sky","A tree"] },
  { text: "Luca packed an apple and a sandwich before the picnic.", q: "What was Luca getting ready for?", a: "A picnic", d: ["A swim","School assembly","Bedtime"] },
  { text: "Ava moved the plant closer to the window so it could get more light.", q: "Why did Ava move the plant?", a: "To give it more light", d: ["To hide it","To water it","To make the room darker"] },
  { text: "Noah heard thunder, so he brought the washing inside.", q: "What did Noah expect?", a: "Rain", d: ["Snow","A hot day","A visitor"] },
  { text: "The library was quiet while Sam chose two books to borrow.", q: "Where was Sam?", a: "At the library", d: ["At the pool","At the shops","At a stadium"] },
  { text: "Ruby shared her orange with Max because he had forgotten his snack.", q: "Why did Ruby share?", a: "Max had no snack", d: ["Ruby disliked oranges","Max was late","They were cooking"] },
  { text: "The puppy waited by the door when it heard the key turn.", q: "What did the puppy hear?", a: "A key turning", d: ["A bird singing","A car horn","Music"] },
  { text: "Kai wore a hat and sunscreen before playing outside.", q: "What was Kai protecting himself from?", a: "The sun", d: ["The wind","The cold","The rain"] },
  { text: "Ella checked the bus timetable before leaving home.", q: "What did Ella want to know?", a: "When the bus would come", d: ["What to eat","Where her shoes were","How tall she was"] },
  { text: "The ice block began to drip in the warm sun.", q: "What was happening to the ice block?", a: "It was melting", d: ["It was freezing","It was growing","It was bouncing"] },
];

const GRAMMAR = [
  { q: "Which sentence ends correctly?", a: "We went to the park.", d: ["We went to the park","we went to the park.","We went to the park,"] },
  { q: "Which word is a noun?", a: "dog", d: ["quickly","blue","jumped"] },
  { q: "Which word is a verb?", a: "runs", d: ["happy","table","green"] },
  { q: "Which sentence starts correctly?", a: "My cat is sleepy.", d: ["my cat is sleepy.","MY cat is sleepy.","my Cat is sleepy."] },
  { q: "Which word is an adjective?", a: "tiny", d: ["jump","slowly","chair"] },
  { q: "Which sentence needs a question mark?", a: "Where is my hat?", d: ["I found my hat.","Put on your hat.","My hat is blue."] },
  { q: "Choose the sentence with the correct capital letter.", a: "Brisbane is in Queensland.", d: ["brisbane is in Queensland.","Brisbane is in queensland.","brisbane is in queensland."] },
  { q: "Which word tells how something is done?", a: "carefully", d: ["careful","care","chair"] },
  { q: "Which is a complete sentence?", a: "The bird flew away.", d: ["The blue bird","Flew away quickly","Under the tree"] },
  { q: "Which sentence uses a comma correctly?", a: "I packed apples, crackers and cheese.", d: ["I packed, apples crackers and cheese.","I packed apples crackers, and cheese.","I, packed apples crackers and cheese."] },
  { q: "Which word is the plural of 'child'?", a: "children", d: ["childs","childes","childrens"] },
  { q: "Which word joins the ideas? 'I was tired ___ I finished the game.'", a: "but", d: ["table","quickly","yellow"] },
];

const VOCAB = [
  { word: "enormous", answer: "very big", d: ["very quiet","very old","very fast"] },
  { word: "tiny", answer: "very small", d: ["very loud","very soft","very bright"] },
  { word: "rapid", answer: "fast", d: ["slow","heavy","late"] },
  { word: "glad", answer: "happy", d: ["angry","tired","lost"] },
  { word: "begin", answer: "start", d: ["finish","hide","carry"] },
  { word: "silent", answer: "quiet", d: ["noisy","crowded","rough"] },
  { word: "ancient", answer: "very old", d: ["brand new","very small","very bright"] },
  { word: "fragile", answer: "easy to break", d: ["very heavy","hard to see","safe to throw"] },
  { word: "observe", answer: "watch carefully", d: ["forget","run away","shout loudly"] },
  { word: "assist", answer: "help", d: ["hide","argue","wait"] },
  { word: "select", answer: "choose", d: ["drop","finish","measure"] },
  { word: "fortunate", answer: "lucky", d: ["sleepy","empty","slow"] },
];

function money(v: number) {
  return v < 100 ? `${v}c` : `$${(v / 100).toFixed(v % 100 === 0 ? 0 : 2)}`;
}

export function generateQuestion(skillId: string, stage: number, seed: number): LearningQuestion {
  const rng = rngFromSeed(seed);
  const difficulty = Math.max(1, Math.min(8, stage));

  if (skillId === "numbers") {
    const max = difficulty < 3 ? 50 : difficulty < 5 ? 100 : difficulty < 7 ? 500 : 1000;
    const mode = int(rng, 0, difficulty > 2 ? 2 : 1);

    if (mode === 0) {
      const a = int(rng, 1, max);
      let b = int(rng, 1, max);
      if (a === b) b = b === max ? b - 1 : b + 1;
      const larger = rng() > 0.5;
      const correct = larger ? Math.max(a, b) : Math.min(a, b);
      return makeQuestion("numbers", larger ? "compare.larger" : "compare.smaller", difficulty, "number_compare", `Which number is ${larger ? "larger" : "smaller"}?`, textChoices(rng, String(correct), [String(a === correct ? b : a), String(correct + 1), String(Math.max(0, correct - 1))]), String(correct), seed);
    }

    if (mode === 1) {
      const start = int(rng, 1, Math.max(10, max - 10));
      const step = difficulty < 4 ? 1 : pick(rng, [2,5,10]);
      const correct = start + step * 2;
      return makeQuestion("numbers", "sequence.missing", difficulty, "missing_number", `What number is missing?  ${start}, ${start + step}, __, ${start + step * 3}`, numericChoices(rng, correct, Math.max(3, step + 2)), correct, seed);
    }

    const value = int(rng, 10, max);
    const tens = Math.floor(value / 10) % 10;
    return makeQuestion("numbers", "place_value.tens", difficulty, "place_value", `In the number ${value}, what digit is in the tens place?`, numericChoices(rng, tens, 5), tens, seed);
  }

  if (skillId === "add") {
    const useSubtraction = difficulty > 1 && rng() > 0.5;
    const max = difficulty < 3 ? 20 : difficulty < 5 ? 50 : 100;
    const a = int(rng, 3, max);
    const b = int(rng, 1, useSubtraction ? a : Math.min(max, 30));
    const correct = useSubtraction ? a - b : a + b;

    if (rng() < 0.35) {
      const prompt = useSubtraction
        ? `You have ${a} stickers and give away ${b}. How many are left?`
        : `You have ${a} stickers and get ${b} more. How many altogether?`;
      return makeQuestion("add", useSubtraction ? "subtract.story" : "add.story", difficulty, "arithmetic_story", prompt, numericChoices(rng, correct, Math.max(3, Math.ceil(max / 10))), correct, seed);
    }

    return makeQuestion("add", useSubtraction ? "subtract.facts" : "add.facts", difficulty, "arithmetic", `What is ${a} ${useSubtraction ? "−" : "+"} ${b}?`, numericChoices(rng, correct, Math.max(3, Math.ceil(max / 10))), correct, seed);
  }

  if (skillId === "times") {
    const tables = difficulty < 3 ? [2,5,10] : difficulty < 5 ? [2,3,4,5,10] : [2,3,4,5,6,7,8,9,10];
    const table = pick(rng, tables);
    const n = int(rng, 1, difficulty < 4 ? 10 : 12);
    const mode = int(rng, 0, 2);

    if (mode === 0) {
      const correct = table * n;
      return makeQuestion("times", "multiply.facts", difficulty, "multiplication", `What is ${table} × ${n}?`, numericChoices(rng, correct, Math.max(4, table)), correct, seed);
    }

    if (mode === 1) {
      const total = table * n;
      return makeQuestion("times", "divide.sharing", difficulty, "division", `${total} objects are shared equally into ${table} groups. How many are in each group?`, numericChoices(rng, n, 4), n, seed);
    }

    const correct = table * n;
    return makeQuestion("times", "multiply.groups", difficulty, "group_story", `There are ${table} bags with ${n} marbles in each bag. How many marbles altogether?`, numericChoices(rng, correct, Math.max(4, table)), correct, seed);
  }

  if (skillId === "fractions") {
    const denominators = difficulty < 3 ? [2,4] : [2,3,4,5,8];
    const denominator = pick(rng, denominators);
    const numerator = int(rng, 1, Math.max(1, denominator - 1));

    if (rng() < 0.5) {
      const label = `${numerator}/${denominator}`;
      return makeQuestion("fractions", "fraction.identify", difficulty, "fraction_words", `Which fraction means ${numerator} out of ${denominator} equal parts?`, textChoices(rng, label, [`${Math.min(denominator, numerator + 1)}/${denominator}`, `${numerator}/${denominator + 1}`, `${denominator}/${numerator}`]), label, seed);
    }

    const groups = denominator * int(rng, 1, 4);
    const correct = (groups / denominator) * numerator;
    return makeQuestion("fractions", "fraction.of_set", difficulty, "fraction_set", `What is ${numerator}/${denominator} of ${groups}?`, numericChoices(rng, correct, Math.max(3, denominator)), correct, seed);
  }

  if (skillId === "money") {
    const coins = difficulty < 3 ? [5,10,20,50,100,200] : [5,10,20,50,100,200,500,1000];
    const a = pick(rng, coins);
    const b = pick(rng, coins);

    if (difficulty > 2 && rng() < 0.4) {
      const price = Math.min(a, b);
      const paid = Math.max(a, b, price + 50);
      const correct = money(paid - price);
      return makeQuestion("money", "money.change", difficulty, "money_change", `Something costs ${money(price)}. You pay ${money(paid)}. How much change?`, textChoices(rng, correct, [money(Math.max(0, paid - price - 10)), money(paid - price + 10), money(price)]), correct, seed);
    }

    const cents = a + b;
    const correct = money(cents);
    return makeQuestion("money", "money.total", difficulty, "money_total", `You have ${money(a)} and ${money(b)}. How much altogether?`, textChoices(rng, correct, [money(cents + 10), money(Math.max(5, cents - 10)), money(cents + 50)]), correct, seed);
  }

  if (skillId === "time") {
    const hour = int(rng, 1, 12);

    if (difficulty > 2 && rng() < 0.4) {
      const minutes = pick(rng, [15,30,45,60]);
      const startMinutes = hour * 60;
      const finishMinutes = startMinutes + minutes;
      const finishHour = Math.floor(finishMinutes / 60) % 12 || 12;
      const finishMinute = finishMinutes % 60;
      const correct = `${finishHour}:${String(finishMinute).padStart(2, "0")}`;
      return makeQuestion("time", "time.duration", difficulty, "time_duration", `A game starts at ${hour}:00 and lasts ${minutes} minutes. When does it finish?`, textChoices(rng, correct, [`${hour}:30`, `${hour}:15`, `${hour === 12 ? 1 : hour + 1}:00`]), correct, seed);
    }

    const half = difficulty > 1 && rng() > 0.45;
    const correct = half ? `${hour}:30` : `${hour}:00`;
    const distractors = half ? [`${hour}:00`, `${hour === 12 ? 1 : hour + 1}:30`, `${hour}:15`] : [`${hour}:30`, `${hour === 12 ? 1 : hour + 1}:00`, `${hour}:15`];
    return makeQuestion("time", half ? "time.half_hour" : "time.hour", difficulty, "time_read", `Which digital time shows ${half ? "half past " : ""}${hour}${half ? "" : " o'clock"}?`, textChoices(rng, correct, distractors), correct, seed);
  }

  if (skillId === "measure") {
    const mode = int(rng, 0, 2);

    if (mode === 0) {
      const yellow = int(rng, 10, 80);
      let blue = int(rng, 10, 80);
      if (blue === yellow) blue += 5;
      const askLonger = rng() > 0.5;
      const correct = askLonger ? (yellow > blue ? "Yellow ribbon" : "Blue ribbon") : (yellow < blue ? "Yellow ribbon" : "Blue ribbon");
      return makeQuestion("measure", "measure.length.compare", difficulty, "measurement_compare", `The yellow ribbon is ${yellow} cm. The blue ribbon is ${blue} cm. Which is ${askLonger ? "longer" : "shorter"}?`, textChoices(rng, correct, [correct === "Yellow ribbon" ? "Blue ribbon" : "Yellow ribbon", "They are equal"]), correct, seed);
    }

    if (mode === 1) {
      const red = int(rng, 1, 9) * 100;
      let green = int(rng, 1, 9) * 100;
      if (green === red) green += 100;
      const correct = red > green ? "Red jug" : "Green jug";
      return makeQuestion("measure", "measure.capacity.compare", difficulty, "capacity_compare", `The red jug holds ${red} mL. The green jug holds ${green} mL. Which holds more?`, textChoices(rng, correct, [correct === "Red jug" ? "Green jug" : "Red jug", "They hold the same"]), correct, seed);
    }

    const apple = int(rng, 80, 250);
    let orange = int(rng, 80, 250);
    if (orange === apple) orange += 10;
    const correct = apple > orange ? "Apple" : "Orange";
    return makeQuestion("measure", "measure.mass.compare", difficulty, "mass_compare", `The apple weighs ${apple} g. The orange weighs ${orange} g. Which is heavier?`, textChoices(rng, correct, [correct === "Apple" ? "Orange" : "Apple", "They weigh the same"]), correct, seed);
  }

  if (skillId === "shapes") {
    const twoD = [
      { name: "triangle", sides: 3, corners: 3 },
      { name: "square", sides: 4, corners: 4 },
      { name: "pentagon", sides: 5, corners: 5 },
      { name: "hexagon", sides: 6, corners: 6 },
    ];

    if (difficulty > 2 && rng() < 0.35) {
      const objects = [
        { shape: "sphere", example: "ball", d: ["book","dice","can"] },
        { shape: "cube", example: "dice", d: ["ball","plate","cone"] },
        { shape: "cylinder", example: "can", d: ["ball","dice","pyramid"] },
      ];
      const target = pick(rng, objects);
      return makeQuestion("shapes", "shapes.3d", difficulty, "shape_object", `Which object is shaped like a ${target.shape}?`, textChoices(rng, target.example, target.d), target.example, seed);
    }

    const target = pick(rng, twoD);
    const askCorners = rng() > 0.5;
    const count = askCorners ? target.corners : target.sides;
    return makeQuestion("shapes", askCorners ? "shapes.corners" : "shapes.sides", difficulty, "shape_properties", `Which shape has ${count} ${askCorners ? "corners" : "sides"}?`, textChoices(rng, target.name, twoD.filter((i) => i.name !== target.name).map((i) => i.name)), target.name, seed);
  }

  if (skillId === "patterns") {
    if (difficulty > 2 && rng() < 0.35) {
      const a = pick(rng, ["🔵","🟢","🟣","🟡"]);
      const b = pick(rng, ["⭐","❤️","🔺","⬜"]);
      const correct = a;
      return makeQuestion("patterns", "patterns.visual", difficulty, "visual_pattern", `What comes next?  ${a} ${b} ${a} ${b} __`, textChoices(rng, correct, [b,"🔶","⚫"]), correct, seed);
    }

    const start = int(rng, 1, 10);
    const step = pick(rng, difficulty < 3 ? [1,2,5] : [2,3,4,5,10]);
    const seq = [start, start + step, start + step * 2, start + step * 3];
    const correct = start + step * 4;
    return makeQuestion("patterns", "patterns.number", difficulty, "number_pattern", `What comes next?  ${seq.join(", ")}, …`, numericChoices(rng, correct, Math.max(3, step + 2)), correct, seed);
  }

  if (skillId === "data") {
    if (difficulty > 2 && rng() < 0.35) {
      const cats = int(rng, 1, 6);
      const dogs = int(rng, 1, 6);
      const correct = cats > dogs ? "Cats" : cats < dogs ? "Dogs" : "Same number";
      return makeQuestion("data", "data.compare", difficulty, "simple_data", `A class survey found ${cats} people chose cats and ${dogs} chose dogs. Which got more votes?`, textChoices(rng, correct, ["Cats","Dogs","Same number"]), correct, seed);
    }

    const red = int(rng, 0, 5);
    const blue = int(rng, 0, 5);
    if (red + blue === 0) return generateQuestion(skillId, stage, seed + 1);

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
    const mutations = new Set<string>();
    if (correct.length > 3) mutations.add(correct.slice(0, -1));
    mutations.add(correct.replace(/[aeiou]/, (m) => ({a:"e",e:"a",i:"e",o:"a",u:"o"}[m] ?? m)));
    if (correct.length > 4) mutations.add(correct.slice(0, 2) + correct[3] + correct[2] + correct.slice(4));
    mutations.add(correct + "e");
    mutations.delete(correct);
    return makeQuestion("spelling", "spelling.correct", difficulty, "spelling_choice", "Which spelling is correct?", textChoices(rng, correct, [...mutations]), correct, seed);
  }

  if (skillId === "reading") {
    const poolSize = Math.min(READING.length, 4 + difficulty);
    const item = pick(rng, READING.slice(0, poolSize));
    return makeQuestion("reading", "reading.comprehension", difficulty, "reading_short", `${item.text}\n\n${item.q}`, textChoices(rng, item.a, item.d), item.a, seed);
  }

  if (skillId === "grammar") {
    const poolSize = Math.min(GRAMMAR.length, 4 + difficulty);
    const item = pick(rng, GRAMMAR.slice(0, poolSize));
    return makeQuestion("grammar", "grammar.basics", difficulty, "grammar_choice", item.q, textChoices(rng, item.a, item.d), item.a, seed);
  }

  if (skillId === "vocab") {
    const poolSize = Math.min(VOCAB.length, 5 + difficulty);
    const item = pick(rng, VOCAB.slice(0, poolSize));
    return makeQuestion("vocab", "vocab.meaning", difficulty, "vocabulary_meaning", `What does “${item.word}” mean?`, textChoices(rng, item.answer, item.d), item.answer, seed);
  }

  throw new Error(`Unknown skill: ${skillId}`);
}
