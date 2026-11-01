"use client";

import type { ScienceLesson, ScienceScene } from "@/content/science-lessons";

export function ScienceLessonCard({
  lesson,
  onStart,
  lessonNumber,
  lessonTotal,
  onBrowseLessons,
}: {
  lesson: ScienceLesson;
  onStart: () => void;
  lessonNumber?: number;
  lessonTotal?: number;
  onBrowseLessons?: () => void;
}) {
  return (
    <section className="scienceLessonCard">
      <div className="scienceLessonBadge">🔬 {lessonNumber && lessonTotal ? `Lesson ${lessonNumber} of ${lessonTotal}` : "Learn first"}</div>
      <h1>{lesson.title}</h1>
      <p className="scienceLessonIntro">{lesson.intro}</p>
      {lesson.visualDetails?.length ? <div className="scienceConceptVisuals">{lesson.visualDetails.map(detail=><ScienceSceneVisual key={detail} scene={lesson.scene} detail={detail} large />)}</div> : <ScienceSceneVisual scene={lesson.scene} detail={lesson.visualDetail} large />}
      <div className="scienceFacts">
        {lesson.facts.map((fact, index) => (
          <div className="scienceFact" key={fact.id}>
            <span>{index + 1}</span>
            <p>{fact.text}</p>
          </div>
        ))}
      </div>
      <div className="scienceLessonActions">
        <button className="primaryButton scienceStartButton" onClick={onStart}>Start the 10 questions →</button>
        {onBrowseLessons ? <button className="secondaryButton" onClick={onBrowseLessons}>Lessons</button> : null}
      </div>
    </section>
  );
}

export function ScienceSceneVisual({
  scene,
  detail,
  large = false,
}: {
  scene: ScienceScene;
  detail?: string;
  large?: boolean;
}) {
  return (
    <div className={large ? "scienceScene scienceSceneLarge" : "scienceScene"}>
      {scene === "solar" ? (
        detail === "structure" ? <SolarStructureVisual /> :
        detail === "daynight" ? <DayNightVisual /> :
        detail === "year" ? <YearVisual /> :
        detail === "tilt" ? <TiltVisual /> :
        detail === "seasons" ? <SeasonsVisual /> :
        detail === "phases" ? <MoonPhasesVisual /> :
        <SolarVisual />
      ) : null}
      {scene === "volcano" ? <VolcanoVisual /> : null}
      {scene === "dinosaur" ? <DinosaurVisual /> : null}
      {scene === "habitat" ? <HabitatVisual /> : null}
    </div>
  );
}

function SolarVisual() {
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label="The Sun at the centre with eight planets travelling around it on orbital paths">
      <rect width="520" height="320" rx="24" fill="#17172d"/>
      <g fill="#fff" opacity=".72">
        <circle cx="34" cy="32" r="2"/><circle cx="151" cy="24" r="2"/><circle cx="344" cy="32" r="2"/>
        <circle cx="482" cy="45" r="2"/><circle cx="455" cy="280" r="2"/><circle cx="112" cy="282" r="2"/>
      </g>
      <g fill="none" stroke="#737b9e" strokeWidth="1.5" opacity=".72">
        <ellipse cx="260" cy="160" rx="62" ry="35"/><ellipse cx="260" cy="160" rx="89" ry="51"/>
        <ellipse cx="260" cy="160" rx="118" ry="68"/><ellipse cx="260" cy="160" rx="148" ry="86"/>
        <ellipse cx="260" cy="160" rx="178" ry="104"/><ellipse cx="260" cy="160" rx="205" ry="122"/>
        <ellipse cx="260" cy="160" rx="226" ry="137"/><ellipse cx="260" cy="160" rx="246" ry="148"/>
      </g>
      <circle cx="260" cy="160" r="40" fill="#f8c94e"/>
      <circle cx="260" cy="160" r="48" fill="none" stroke="#f8c94e" strokeWidth="5" opacity=".18"/>
      <circle cx="317" cy="144" r="5" fill="#aaa7a2"/><circle cx="200" cy="192" r="8" fill="#d39b66"/>
      <circle cx="340" cy="206" r="9" fill="#5e9ed5"/><circle cx="158" cy="118" r="7" fill="#c76c4c"/>
      <circle cx="390" cy="100" r="20" fill="#d3a96f"/>
      <g transform="translate(112 220)"><ellipse cx="0" cy="0" rx="29" ry="7" fill="none" stroke="#e1ca95" strokeWidth="4"/><circle cx="0" cy="0" r="16" fill="#d9b876"/></g>
      <circle cx="448" cy="220" r="13" fill="#7fc1c8"/><circle cx="72" cy="80" r="12" fill="#527dca"/>
      <text x="260" y="166" textAnchor="middle" fill="#5b4511" fontSize="13" fontWeight="900">Sun</text>
      <text x="260" y="303" textAnchor="middle" fill="#d8d5e5" fontSize="12">The planets orbit the Sun</text>
    </svg>
  );
}

function SolarStructureVisual() {
  const planets=[
    {name:"Mercury",x:92,r:6,c:"#aaa7a2"},
    {name:"Venus",x:137,r:10,c:"#d39b66"},
    {name:"Earth",x:185,r:11,c:"#5e9ed5"},
    {name:"Mars",x:232,r:8,c:"#c76c4c"},
    {name:"Jupiter",x:326,r:24,c:"#d3a96f"},
    {name:"Saturn",x:382,r:19,c:"#d9b876"},
    {name:"Uranus",x:438,r:14,c:"#7fc1c8"},
    {name:"Neptune",x:484,r:13,c:"#527dca"},
  ];
  return (
    <svg viewBox="0 0 520 270" role="img" aria-label="Solar System arranged in order showing the inner rocky planets, asteroid belt, gas giants and ice giants">
      <rect width="520" height="270" rx="24" fill="#17172d"/>
      <rect x="70" y="34" width="188" height="145" rx="18" fill="#292944" opacity=".8"/>
      <rect x="304" y="34" width="104" height="145" rx="18" fill="#3a2f46" opacity=".8"/>
      <rect x="416" y="34" width="88" height="145" rx="18" fill="#23384a" opacity=".9"/>
      <text x="164" y="57" textAnchor="middle" fill="#e9e6f6" fontSize="12" fontWeight="800">INNER ROCKY PLANETS</text>
      <text x="356" y="57" textAnchor="middle" fill="#f0e7f4" fontSize="12" fontWeight="800">GAS GIANTS</text>
      <text x="460" y="57" textAnchor="middle" fill="#e3f2f7" fontSize="12" fontWeight="800">ICE GIANTS</text>
      <circle cx="38" cy="117" r="25" fill="#f8c94e"/>
      <text x="38" y="121" textAnchor="middle" fill="#5b4511" fontSize="11" fontWeight="900">Sun</text>
      <line x1="66" y1="117" x2="500" y2="117" stroke="#6f718f" strokeWidth="2" opacity=".45"/>
      {planets.map(p=><g key={p.name}>
        {p.name==="Saturn"?<ellipse cx={p.x} cy="117" rx="27" ry="7" fill="none" stroke="#e1ca95" strokeWidth="3"/>:null}
        <circle cx={p.x} cy="117" r={p.r} fill={p.c}/>
        <text x={p.x} y="157" textAnchor="middle" fill="#e7e4f0" fontSize="10.5" fontWeight="700">{p.name}</text>
      </g>)}
      <g aria-label="Asteroid belt">
        {[0,1,2,3,4,5,6,7,8].map(i=><circle key={i} cx={268+(i%3)*8} cy={96+Math.floor(i/3)*10} r={i%2?2:1.5} fill="#b8a891"/>)}
        <path d="M258 77 V172" stroke="#b8a891" strokeWidth="1.5" strokeDasharray="4 4" opacity=".8"/>
        <text x="274" y="194" textAnchor="middle" fill="#d8d0c3" fontSize="10.5" fontWeight="700">Asteroid belt</text>
        <text x="274" y="207" textAnchor="middle" fill="#aaa4ba" fontSize="9.5">between Mars and Jupiter</text>
      </g>
      <path d="M77 221 H249" stroke="#8f8bb5" strokeWidth="2"/><path d="M77 217 V225 M249 217 V225" stroke="#8f8bb5" strokeWidth="2"/>
      <text x="163" y="242" textAnchor="middle" fill="#d9d5e8" fontSize="11" fontWeight="800">4 inner rocky planets</text>
      <path d="M307 221 H501" stroke="#8f8bb5" strokeWidth="2"/><path d="M307 217 V225 M501 217 V225" stroke="#8f8bb5" strokeWidth="2"/>
      <text x="404" y="242" textAnchor="middle" fill="#d9d5e8" fontSize="11" fontWeight="800">4 outer giant planets</text>
      <text x="260" y="260" textAnchor="middle" fill="#8f8aa1" fontSize="9">Not to scale</text>
    </svg>
  );
}

function DayNightVisual(){
  return <svg viewBox="0 0 520 230" role="img" aria-label="Earth rotating to create day and night">
    <rect width="520" height="230" rx="24" fill="#17172d"/>
    <circle cx="82" cy="115" r="45" fill="#f8c94e"/><text x="82" y="120" textAnchor="middle" fontSize="15" fontWeight="900" fill="#5b4511">Sun</text>
    <g transform="translate(320 115)"><circle r="68" fill="#4287c7"/><path d="M0 -68 A68 68 0 0 1 0 68 A68 68 0 0 1 0 -68Z" fill="#11162c" opacity=".78"/><path d="M-18 -46 Q10 -56 28 -34 Q11 -13 -6 -18 Q-22 -27 -18 -46Z" fill="#65ad68"/><path d="M-24 16 Q-1 5 21 23 Q8 48 -20 43Z" fill="#65ad68"/></g>
    <path d="M246 58 Q320 22 394 58" fill="none" stroke="#8fd1ff" strokeWidth="6" strokeLinecap="round"/><path d="M390 48 L405 61 L386 66" fill="#8fd1ff"/>
    <path d="M132 92 H241 M132 115 H241 M132 138 H241" stroke="#ffe58a" strokeWidth="6" strokeLinecap="round"/>
    <text x="285" y="205" fill="#f2f0f8" fontSize="14" fontWeight="800">Earth spins once in about 24 hours</text>
    <text x="270" y="92" fill="#ffe17a" fontSize="13" fontWeight="800">day</text><text x="365" y="92" fill="#c8d1e8" fontSize="13" fontWeight="800">night</text>
  </svg>;
}
function YearVisual(){
  return <svg viewBox="0 0 520 230" role="img" aria-label="Earth completing one orbit around the Sun in about 365 days">
    <rect width="520" height="230" rx="24" fill="#17172d"/><ellipse cx="260" cy="115" rx="185" ry="78" fill="none" stroke="#74aee8" strokeWidth="4"/>
    <circle cx="260" cy="115" r="38" fill="#f8c94e"/><text x="260" y="120" textAnchor="middle" fontSize="14" fontWeight="900" fill="#5b4511">Sun</text>
    {[[82,115],[260,37],[438,115],[260,193]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="18" fill="#4c91d2"/><path d={`M${x-8} ${y-6} q12 -9 20 2 q-5 11 -18 9Z`} fill="#6bb56e"/></g>)}
    <path d="M356 46 l18 4 -12 14" fill="none" stroke="#b8daf5" strokeWidth="4" strokeLinecap="round"/>
    <text x="260" y="222" textAnchor="middle" fill="#f2f0f8" fontSize="15" fontWeight="900">1 orbit = about 365 days = 1 year</text>
  </svg>;
}
function TiltVisual(){
  return <svg viewBox="0 0 520 230" role="img" aria-label="Earth's axis tilted about 23.5 degrees">
    <rect width="520" height="230" rx="24" fill="#eaf4fb"/>
    <circle cx="260" cy="112" r="70" fill="#4c91d2"/><path d="M220 78 Q258 57 293 78 Q278 99 244 96Z" fill="#69b66d"/><path d="M225 130 Q255 111 294 136 Q276 162 238 156Z" fill="#69b66d"/>
    <line x1="260" y1="25" x2="260" y2="199" stroke="#8993a8" strokeWidth="3" strokeDasharray="7 7"/>
    <line x1="224" y1="31" x2="296" y2="194" stroke="#d45878" strokeWidth="6" strokeLinecap="round"/>
    <path d="M260 48 A42 42 0 0 0 242 52" fill="none" stroke="#6f5bd3" strokeWidth="3"/><text x="183" y="50" fill="#5948bb" fontSize="18" fontWeight="900">23.5°</text>
    <text x="306" y="42" fill="#34313b" fontSize="14" fontWeight="800">North Pole</text><text x="305" y="196" fill="#34313b" fontSize="14" fontWeight="800">South Pole</text>
    <text x="260" y="222" textAnchor="middle" fill="#34313b" fontSize="14" fontWeight="900">Earth spins around this tilted axis</text>
  </svg>;
}
function SeasonsVisual(){
  return <svg viewBox="0 0 520 300" role="img" aria-label="Earth's tilted axis stays pointed the same way as Earth orbits the Sun, creating seasons">
    <rect width="520" height="300" rx="24" fill="#17172d"/><ellipse cx="260" cy="145" rx="190" ry="100" fill="none" stroke="#7186ad" strokeWidth="3"/>
    <circle cx="260" cy="145" r="38" fill="#f8c94e"/><text x="260" y="150" textAnchor="middle" fontSize="14" fontWeight="900" fill="#5b4511">Sun</text>
    {[[88,145,"June","S winter / N summer"],[260,48,"September","equinox"],[432,145,"December","S summer / N winter"],[260,242,"March","equinox"]].map(([x,y,a,b],i)=><g key={i}>
      <circle cx={Number(x)} cy={Number(y)} r="24" fill="#4c91d2"/><line x1={Number(x)-10} y1={Number(y)+31} x2={Number(x)+10} y2={Number(y)-31} stroke="#f28aa1" strokeWidth="4"/>
      <text x={Number(x)} y={Number(y)+(i===1?-38: i===3?48:45)} textAnchor="middle" fill="#f3f0fb" fontSize="11" fontWeight="800">{String(a)}</text>
      {(i===0||i===2)?<text x={Number(x)} y={Number(y)+(i===0?60:60)} textAnchor="middle" fill="#d7d0ed" fontSize="9.5">{String(b)}</text>:null}
    </g>)}
    <text x="260" y="287" textAnchor="middle" fill="#f3f0fb" fontSize="12" fontWeight="800">The axis keeps pointing the same way as Earth moves around the Sun</text>
  </svg>;
}
function MoonPhasesVisual(){
  const phases=[["New",70,"#303343"],["Crescent",135,"#d9dbe4"],["Quarter",200,"#ececf2"],["Gibbous",265,"#f2f1e8"],["Full",330,"#f8f7ed"],["Quarter",395,"#ececf2"],["Crescent",460,"#d9dbe4"]];
  return <svg viewBox="0 0 520 230" role="img" aria-label="Moon phases from new moon to full moon and back">
    <rect width="520" height="230" rx="24" fill="#17172d"/><circle cx="36" cy="72" r="25" fill="#f8c94e"/><text x="36" y="108" textAnchor="middle" fill="#ffe989" fontSize="11" fontWeight="800">Sunlight →</text>
    {phases.map(([name,x,c],i)=><g key={i}><circle cx={Number(x)} cy="112" r="22" fill={String(c)} stroke="#737b9e" strokeWidth="2"/>
      {i===1?<path d={`M${Number(x)} 90 A22 22 0 0 0 ${Number(x)} 134 A14 22 0 0 1 ${Number(x)} 90Z`} fill="#303343"/>:null}
      {i===2?<path d={`M${Number(x)-22} 90 H${Number(x)} V134 H${Number(x)-22}Z`} fill="#303343"/>:null}
      {i===3?<path d={`M${Number(x)-22} 90 Q${Number(x)-4} 112 ${Number(x)-22} 134 A22 22 0 0 1 ${Number(x)-22} 90Z`} fill="#303343"/>:null}
      {i===5?<path d={`M${Number(x)} 90 H${Number(x)+22} V134 H${Number(x)}Z`} fill="#303343"/>:null}
      {i===6?<path d={`M${Number(x)} 90 A22 22 0 0 1 ${Number(x)} 134 A14 22 0 0 0 ${Number(x)} 90Z`} fill="#303343"/>:null}
      <text x={Number(x)} y="154" textAnchor="middle" fill="#f0edf8" fontSize="9.5" fontWeight="700">{String(name)}</text>
    </g>)}
    <text x="260" y="195" textAnchor="middle" fill="#d9d5e8" fontSize="12" fontWeight="800">We see different amounts of the Moon's sunlit half</text>
    <text x="260" y="215" textAnchor="middle" fill="#a9a5bb" fontSize="10">Earth's shadow does not cause the normal phases</text>
  </svg>;
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
