"use client";

import type { ScienceLesson, ScienceScene } from "@/content/science-lessons";

export function ScienceLessonCard({
  lesson,
  onStart,
}: {
  lesson: ScienceLesson;
  onStart: () => void;
}) {
  return (
    <section className="scienceLessonCard">
      <div className="scienceLessonBadge">🔬 Learn first</div>
      <h1>{lesson.title}</h1>
      <p className="scienceLessonIntro">{lesson.intro}</p>
      <ScienceSceneVisual scene={lesson.scene} large />
      <div className="scienceFacts">
        {lesson.facts.map((fact, index) => (
          <div className="scienceFact" key={fact.id}>
            <span>{index + 1}</span>
            <p>{fact.text}</p>
          </div>
        ))}
      </div>
      <button className="primaryButton scienceStartButton" onClick={onStart}>
        Start the 5 questions →
      </button>
    </section>
  );
}

export function ScienceSceneVisual({
  scene,
  large = false,
}: {
  scene: ScienceScene;
  large?: boolean;
}) {
  return (
    <div className={large ? "scienceScene scienceSceneLarge" : "scienceScene"}>
      {scene === "solar" ? <SolarVisual /> : null}
      {scene === "volcano" ? <VolcanoVisual /> : null}
      {scene === "dinosaur" ? <DinosaurVisual /> : null}
      {scene === "habitat" ? <HabitatVisual /> : null}
    </div>
  );
}

function SolarVisual() {
  return (
    <svg viewBox="0 0 520 230" role="img" aria-label="The Sun and eight planets in the Solar System">
      <rect width="520" height="230" rx="24" fill="#17172d"/>
      <g fill="#fff" opacity=".7">
        <circle cx="38" cy="34" r="2"/><circle cx="172" cy="24" r="2"/><circle cx="335" cy="42" r="2"/>
        <circle cx="465" cy="28" r="2"/><circle cx="424" cy="191" r="2"/><circle cx="235" cy="203" r="2"/>
      </g>
      <circle cx="58" cy="115" r="42" fill="#f8c94e"/>
      <text x="58" y="175" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Sun</text>
      <g>
        <circle cx="125" cy="115" r="5" fill="#aaa7a2"/><circle cx="157" cy="115" r="8" fill="#d39b66"/>
        <circle cx="199" cy="115" r="9" fill="#5e9ed5"/><circle cx="240" cy="115" r="7" fill="#c76c4c"/>
        <circle cx="300" cy="115" r="21" fill="#d3a96f"/>
        <circle cx="365" cy="115" r="17" fill="#d9b876"/>
        <ellipse cx="365" cy="115" rx="29" ry="7" fill="none" stroke="#e1ca95" strokeWidth="4"/>
        <circle cx="424" cy="115" r="13" fill="#7fc1c8"/><circle cx="474" cy="115" r="12" fill="#527dca"/>
      </g>
      <text x="300" y="154" textAnchor="middle" fill="#d8d5e5" fontSize="11">8 planets orbit the Sun</text>
    </svg>
  );
}

function VolcanoVisual() {
  return (
    <svg viewBox="0 0 520 230" role="img" aria-label="Cross-section of a volcano showing magma, vent, crater and lava">
      <rect width="520" height="230" rx="24" fill="#eaf5fb"/>
      <path d="M0 190 H520 V230 H0Z" fill="#8bc17a"/>
      <path d="M95 190 L255 47 L421 190Z" fill="#806b59"/>
      <path d="M230 74 L255 47 L281 75 L269 92 H241Z" fill="#553f35"/>
      <ellipse cx="255" cy="203" rx="62" ry="20" fill="#e85837"/>
      <path d="M255 196 C252 163 256 129 255 89" stroke="#ef663d" strokeWidth="18" fill="none"/>
      <path d="M271 78 Q311 96 337 122" stroke="#f36a3e" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <g fill="#7c7475" opacity=".85">
        <circle cx="247" cy="28" r="17"/><circle cx="276" cy="25" r="21"/><circle cx="304" cy="39" r="14"/>
      </g>
      <text x="170" y="207" fontSize="13" fontWeight="700" fill="#6c3227">magma</text>
      <text x="278" y="137" fontSize="13" fontWeight="700" fill="#fff">vent</text>
      <text x="286" y="73" fontSize="13" fontWeight="700" fill="#513a31">crater</text>
      <text x="342" y="116" fontSize="13" fontWeight="700" fill="#9d3526">lava</text>
    </svg>
  );
}

function DinosaurVisual() {
  return (
    <svg viewBox="0 0 520 230" role="img" aria-label="A recognisable long-neck dinosaur beside a fossil footprint">
      <rect width="520" height="230" rx="24" fill="#eef6e8"/>
      <circle cx="444" cy="42" r="24" fill="#f5cc66"/>
      <path d="M0 172 Q115 140 220 174 T520 168 V230 H0Z" fill="#8dc27b"/>
      <g fill="#6fa15d" stroke="#557e4b" strokeWidth="4">
        <ellipse cx="233" cy="132" rx="76" ry="38"/>
        <path d="M287 123 Q331 101 348 65 Q358 42 376 47 Q394 52 382 69 Q361 96 345 139Z"/>
        <circle cx="381" cy="54" r="15"/>
        <path d="M165 129 Q121 119 87 91 Q72 78 61 88 Q52 98 70 107 Q112 139 167 150Z"/>
      </g>
      <circle cx="387" cy="50" r="3.5" fill="#242333"/>
      <path d="M207 160 L198 205 M254 160 L265 205 M286 157 L301 202" stroke="#557e4b" strokeWidth="15" strokeLinecap="round"/>
      <ellipse cx="426" cy="184" rx="45" ry="25" fill="#d7c29c"/>
      <g fill="#8a7454">
        <ellipse cx="426" cy="183" rx="12" ry="16"/>
        <circle cx="407" cy="165" r="6"/><circle cx="419" cy="159" r="6"/><circle cx="433" cy="159" r="6"/><circle cx="445" cy="166" r="6"/>
      </g>
      <text x="426" y="221" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6c604e">fossil footprint</text>
    </svg>
  );
}

function HabitatVisual() {
  return (
    <svg viewBox="0 0 520 230" role="img" aria-label="Four habitats: desert, ocean, forest and polar">
      <rect width="520" height="230" rx="24" fill="#f6f4ed"/>
      <g>
        <rect x="12" y="14" width="116" height="202" rx="18" fill="#f2d394"/>
        <circle cx="100" cy="48" r="17" fill="#f0b94c"/>
        <path d="M24 163 Q64 137 116 164 V216 H24Z" fill="#d6aa62"/>
        <path d="M54 150 Q65 116 80 148 Q92 122 101 157" fill="none" stroke="#7f6b3d" strokeWidth="8" strokeLinecap="round"/>
        <text x="70" y="201" textAnchor="middle" fontSize="12" fontWeight="700">desert</text>
      </g>
      <g>
        <rect x="139" y="14" width="116" height="202" rx="18" fill="#8bc9e4"/>
        <path d="M151 110 Q180 91 213 111 T244 109 V216 H151Z" fill="#4a9fca"/>
        <path d="M177 125 Q197 107 216 123 Q200 145 177 125Z" fill="#eef6fb"/>
        <circle cx="211" cy="122" r="2.5"/>
        <text x="197" y="201" textAnchor="middle" fontSize="12" fontWeight="700">ocean</text>
      </g>
      <g>
        <rect x="266" y="14" width="116" height="202" rx="18" fill="#cfe8c4"/>
        <rect x="315" y="84" width="13" height="80" fill="#76533d"/>
        <circle cx="321" cy="70" r="38" fill="#6da85e"/>
        <circle cx="347" cy="148" r="14" fill="#9a775c"/><circle cx="358" cy="138" r="9" fill="#9a775c"/>
        <text x="324" y="201" textAnchor="middle" fontSize="12" fontWeight="700">forest</text>
      </g>
      <g>
        <rect x="393" y="14" width="115" height="202" rx="18" fill="#ddecf4"/>
        <path d="M405 151 L445 100 L482 151Z" fill="#fff"/>
        <ellipse cx="450" cy="160" rx="24" ry="18" fill="#fff" stroke="#bccbd5" strokeWidth="2"/>
        <circle cx="468" cy="151" r="11" fill="#fff" stroke="#bccbd5" strokeWidth="2"/>
        <circle cx="472" cy="149" r="2.5"/>
        <text x="450" y="201" textAnchor="middle" fontSize="12" fontWeight="700">polar</text>
      </g>
    </svg>
  );
}
