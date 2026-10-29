"use client";

import type { LearningQuestion, QuestionChoice } from "@/learning/types";

export function QuestionVisual({ question }: { question: LearningQuestion }) {
  const visual = question.visual as Record<string, unknown> | undefined;
  if (!visual) return null;

  if (question.questionType === "analog_clock") {
    const hour = Number(visual.hour ?? 12);
    const minute = Number(visual.minute ?? 0);
    const minuteAngle = minute * 6;
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    return (
      <div className="visualStage clockStage" aria-label={`Analog clock showing ${hour}:${String(minute).padStart(2, "0")}`}>
        <svg className="clockFace" viewBox="0 0 220 220" role="img">
          <circle cx="110" cy="110" r="96" className="clockCircle" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = ((i + 1) * 30 - 90) * Math.PI / 180;
            const x = 110 + Math.cos(angle) * 76;
            const y = 110 + Math.sin(angle) * 76 + 6;
            return <text key={i} x={x} y={y} textAnchor="middle" className="clockNumber">{i + 1}</text>;
          })}
          <line x1="110" y1="110" x2="110" y2="61" className="hourHand" transform={`rotate(${hourAngle} 110 110)`} />
          <line x1="110" y1="110" x2="110" y2="38" className="minuteHand" transform={`rotate(${minuteAngle} 110 110)`} />
          <circle cx="110" cy="110" r="6" className="clockPin" />
        </svg>
      </div>
    );
  }

  if (visual.kind === "jugs") {
    const red = Number(visual.red);
    const green = Number(visual.green);
    return (
      <div className="visualStage objectPair">
        <Jug colour="red" value={red} unit="mL" />
        <Jug colour="green" value={green} unit="mL" />
      </div>
    );
  }

  if (visual.kind === "ribbons") {
    const yellow = Number(visual.yellow);
    const blue = Number(visual.blue);
    const max = Math.max(yellow, blue);
    const scaffold = Number(visual.scaffold ?? 1);
    return (
      <div className="visualStage ribbonStage">
        <Ribbon label="Yellow ribbon" value={yellow} max={max} scaffold={scaffold} className="yellowRibbon" />
        <Ribbon label="Blue ribbon" value={blue} max={max} scaffold={scaffold} className="blueRibbon" />
      </div>
    );
  }

  if (visual.kind === "mass") {
    return (
      <div className="visualStage objectPair">
        <div className="measureObject"><div className="fruitIcon">🍎</div><strong>Apple</strong><span>{Number(visual.apple)} g</span></div>
        <div className="measureObject"><div className="fruitIcon">🍊</div><strong>Orange</strong><span>{Number(visual.orange)} g</span></div>
      </div>
    );
  }

  if (visual.kind === "fraction_bar") {
    const numerator = Number(visual.numerator);
    const denominator = Number(visual.denominator);
    return (
      <div className="visualStage fractionStage" aria-label={`${numerator} of ${denominator} equal parts shaded`}>
        <div className="fractionBar">
          {Array.from({ length: denominator }, (_, i) => (
            <span key={i} className={i < numerator ? "fractionPart shaded" : "fractionPart"} />
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === "money_coins") {
    const coins = Array.isArray(visual.coins) ? visual.coins.map(Number) : [];
    return (
      <div className="visualStage coinStage" aria-label="Australian money">
        {coins.map((coin, index) => <MoneyPiece value={coin} key={`${coin}-${index}`} />)}
      </div>
    );
  }

  if (visual.kind === "pattern_strip") {
    const items = Array.isArray(visual.items) ? visual.items.map(String) : [];
    return (
      <div className="visualStage patternStage" aria-label="Repeating pattern">
        {items.map((item, index) => <span className="patternItem" key={index}>{item}</span>)}
        <span className="patternBlank">?</span>
      </div>
    );
  }

  if (visual.kind === "counters") {
    const red = Number(visual.red);
    const blue = Number(visual.blue);
    return (
      <div className="visualStage counterBag">
        <div className="bagOutline">
          <div className="counterWrap">
            {Array.from({ length: red }, (_, i) => <span className="counter redCounter" key={`r${i}`} />)}
            {Array.from({ length: blue }, (_, i) => <span className="counter blueCounter" key={`b${i}`} />)}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function ChoiceVisual({
  question,
  choice,
}: {
  question: LearningQuestion;
  choice: QuestionChoice;
}) {
  if (question.questionType !== "shape_properties") return <>{choice.label}</>;

  return (
    <span className="shapeChoice">
      <ShapeIcon shape={String(choice.value)} />
      <span>{choice.label}</span>
    </span>
  );
}

function ShapeIcon({ shape }: { shape: string }) {
  if (shape === "triangle") return <svg viewBox="0 0 100 90"><polygon points="50,8 94,82 6,82" /></svg>;
  if (shape === "square") return <svg viewBox="0 0 100 90"><rect x="12" y="7" width="76" height="76" rx="3" /></svg>;
  if (shape === "pentagon") return <svg viewBox="0 0 100 90"><polygon points="50,5 94,37 77,84 23,84 6,37" /></svg>;
  if (shape === "hexagon") return <svg viewBox="0 0 100 90"><polygon points="25,7 75,7 96,45 75,83 25,83 4,45" /></svg>;
  return <span className="shapeFallback">◆</span>;
}

function Jug({ colour, value, unit }: { colour: "red" | "green"; value: number; unit: string }) {
  return (
    <div className="measureObject">
      <svg className={`jugIcon ${colour}Jug`} viewBox="0 0 100 110" aria-hidden="true">
        <path d="M25 22 H67 Q82 22 82 38 V45 Q82 57 72 61 L67 90 Q65 101 54 101 H27 Q16 101 14 90 L8 40 Q6 25 25 22Z" />
        <path d="M67 33 Q93 32 91 52 Q90 69 70 69" fill="none" />
      </svg>
      <strong>{colour === "red" ? "Red jug" : "Green jug"}</strong>
      <span>{value} {unit}</span>
    </div>
  );
}

function Ribbon({ label, value, max, scaffold, className }: { label: string; value: number; max: number; scaffold: number; className: string }) {
  const proportional = Math.max(35, (value / max) * 68);
  const width = scaffold <= 1 ? proportional : scaffold === 2 ? 56 + (value / max) * 12 : 64;
  return (
    <div className="ribbonRow">
      <div><strong>{label}</strong><span>{value} cm</span></div>
      <div className={`ribbonBar ${className}`} style={{ width: `${width}%` }} />
    </div>
  );
}

function Coin({ value }: { value: number }) {
  const dollars = value >= 100;
  const label = dollars ? `${value / 100}` : `${value}c`;
  const gold = value === 100 || value === 200;
  return (
    <div className="coinItem">
      <div className={gold ? "coin goldCoin" : "coin silverCoin"} aria-hidden="true">
        <span>{label}</span>
      </div>
      <strong>{label}</strong>
    </div>
  );
}
