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


  if (visual.kind === "science_scene") {
    const scene = String(visual.scene ?? "");
    return (
      <div className="visualStage scienceStage" aria-label={`Science illustration: ${scene}`}>
        {scene === "solar" ? (
          <svg className="scienceIllustration" viewBox="0 0 360 180" role="img" aria-label="Solar system illustration">
            <circle cx="55" cy="90" r="34" fill="#f5c84c" />
            <circle cx="132" cy="90" r="12" fill="#6fa9df" />
            <circle cx="172" cy="90" r="7" fill="#d9875f" />
            <circle cx="227" cy="90" r="20" fill="#d7b07b" />
            <ellipse cx="292" cy="90" rx="27" ry="10" fill="none" stroke="#c8a15f" strokeWidth="5" />
            <circle cx="292" cy="90" r="15" fill="#d7b36f" />
            <path d="M110 90H338" stroke="#ddd8ea" strokeWidth="2" strokeDasharray="5 7" />
            <circle cx="145" cy="70" r="3" fill="#c7c1d4" />
          </svg>
        ) : null}
        {scene === "volcano" ? (
          <svg className="scienceIllustration" viewBox="0 0 360 180" role="img" aria-label="Volcano cross-section illustration">
            <path d="M70 150 L176 38 L290 150 Z" fill="#8d765f" />
            <path d="M160 65 L176 38 L194 66 L183 87 L168 87 Z" fill="#ef6a42" />
            <path d="M173 86 C168 110 167 128 166 150" stroke="#e95832" strokeWidth="12" fill="none" />
            <ellipse cx="167" cy="153" rx="42" ry="18" fill="#e95832" opacity=".9" />
            <circle cx="166" cy="24" r="15" fill="#b9b1bd" opacity=".9" />
            <circle cx="190" cy="18" r="18" fill="#c8c0ca" opacity=".8" />
            <circle cx="215" cy="31" r="12" fill="#b9b1bd" opacity=".8" />
          </svg>
        ) : null}
        {scene === "dinosaur" ? (
          <svg className="scienceIllustration" viewBox="0 0 360 180" role="img" aria-label="Dinosaur and fossil illustration">
            <path d="M78 120 Q110 88 150 104 Q178 116 204 95 Q225 80 245 88 Q263 96 250 111 Q235 126 204 121 Q174 116 154 128 Q126 145 93 139Z" fill="#79a96c" />
            <circle cx="239" cy="98" r="4" fill="#25243a" />
            <path d="M150 126 L136 156 M179 121 L187 156" stroke="#5f8158" strokeWidth="10" strokeLinecap="round" />
            <path d="M86 121 Q55 105 47 82" stroke="#79a96c" strokeWidth="12" fill="none" strokeLinecap="round" />
            <ellipse cx="282" cy="138" rx="42" ry="22" fill="#d8c7a2" />
            <path d="M260 139 Q274 118 290 139 Q302 156 316 136" stroke="#8a7658" strokeWidth="5" fill="none" />
          </svg>
        ) : null}
        {scene === "habitat" ? (
          <svg className="scienceIllustration" viewBox="0 0 360 180" role="img" aria-label="Animal habitat illustration">
            <circle cx="295" cy="38" r="22" fill="#f4cc59" />
            <path d="M0 118 Q70 90 140 118 T280 118 T360 118 V180 H0Z" fill="#8fc37b" />
            <path d="M0 142 Q90 125 180 143 T360 143 V180 H0Z" fill="#73a8d5" />
            <rect x="72" y="69" width="14" height="62" fill="#805b3d" />
            <circle cx="79" cy="60" r="33" fill="#6aa05b" />
            <circle cx="239" cy="118" r="18" fill="#9b7659" />
            <circle cx="252" cy="107" r="12" fill="#9b7659" />
            <circle cx="256" cy="104" r="2.5" fill="#25243a" />
          </svg>
        ) : null}
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

function Ribbon({ label, value, className }: { label: string; value: number; max: number; scaffold: number; className: string }) {
  return (
    <div className="ribbonRow">
      <div><strong>{label}</strong><span>{value} cm</span></div>
      <div className={`ribbonBar ${className}`} style={{ width: "64%" }} />
    </div>
  );
}

function MoneyPiece({ value }: { value: number }) {
  const dollars = value >= 100;
  const label = dollars ? `$${value / 100}` : `${value}c`;

  if (value >= 500) {
    return (
      <div className="coinItem">
        <div className={value === 500 ? "note fiveNote" : "note tenNote"} aria-hidden="true">
          <span>{label}</span>
        </div>
        <strong>{label}</strong>
      </div>
    );
  }

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
