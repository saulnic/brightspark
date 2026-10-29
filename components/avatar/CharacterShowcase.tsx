import type { AvatarConfig } from "@/content/avatar";

const SKIN = { light:"#f7d7bd", warm:"#efc29d", tan:"#d69a6b", brown:"#9b6547", deep:"#68412f" };
const HAIR = { brown:"#5a3828", black:"#29252a", blonde:"#d6aa55", red:"#9c4d2f" };
const EYES = { brown:"#5c3824", blue:"#3e77a8", green:"#4f7b58", dark:"#29252a" };
const ACCENT = { pink:"#f16d98", blue:"#6397df", gold:"#e2b63f", red:"#d85b61" };

export function CharacterShowcase({ config }: { config: AvatarConfig }) {
  const skin = SKIN[config.skin];
  const hair = HAIR[config.hairColour];
  const accent = ACCENT[config.hairAccessoryColour];

  return (
    <svg className="characterShowcase" viewBox="0 0 340 350" role="img" aria-label="Full body learner with pet">
      <ellipse cx="145" cy="326" rx="98" ry="12" fill="#ebe7f5" />

      <g transform="translate(38 8)">
        {config.hair === "long" ? (
          <path d="M54 68 Q54 18 102 18 Q151 18 151 68 L145 156 Q128 139 124 105 H80 Q74 139 58 156Z" fill={hair} />
        ) : null}

        <ellipse cx="102" cy="70" rx="45" ry="47" fill={skin} />

        {config.hair === "short" ? (
          <path d="M59 59 Q66 20 102 21 Q141 22 146 59 Q126 41 102 43 Q78 40 59 59Z" fill={hair} />
        ) : null}
        {config.hair === "bob" ? (
          <>
            <path d="M54 76 Q54 18 102 18 Q151 18 151 78 L142 111 Q134 59 102 47 Q70 58 62 112Z" fill={hair} />
            <path d="M63 54 Q74 27 102 28 Q132 27 143 54 Q123 42 102 45 Q82 42 63 54Z" fill={hair} />
          </>
        ) : null}
        {config.hair === "long" ? (
          <path d="M62 55 Q72 24 102 26 Q134 24 144 55 Q123 41 102 44 Q81 41 62 55Z" fill={hair} />
        ) : null}
        {config.hair === "curls" ? (
          <>
            {[68,84,102,120,136].map((x,i)=><circle key={x} cx={x} cy={i%2 ? 30 : 37} r="16" fill={hair}/>)}
            <circle cx="61" cy="54" r="15" fill={hair}/><circle cx="143" cy="54" r="15" fill={hair}/>
          </>
        ) : null}
        {config.hair === "topknot" ? (
          <>
            <circle cx="102" cy="13" r="19" fill={hair}/>
            <path d="M61 57 Q70 24 102 27 Q136 24 145 57 Q124 41 102 44 Q80 41 61 57Z" fill={hair}/>
          </>
        ) : null}

        <circle cx="85" cy="70" r="4.5" fill={EYES[config.eyes]} />
        <circle cx="119" cy="70" r="4.5" fill={EYES[config.eyes]} />
        <path d="M89 87 Q102 98 115 87" stroke="#a34f54" strokeWidth="4" fill="none" strokeLinecap="round"/>

        {config.hairAccessory === "bow" ? (
          <>
            <path d="M128 28 Q151 14 151 38 Q150 55 130 46Z" fill={accent}/>
            <path d="M129 29 Q111 16 112 40 Q113 54 130 46Z" fill={accent}/>
            <circle cx="131" cy="37" r="7" fill={accent}/>
          </>
        ) : null}
        {config.hairAccessory === "hairclip" ? (
          <rect x="130" y="38" width="20" height="7" rx="3.5" transform="rotate(18 130 38)" fill={accent}/>
        ) : null}

        {config.eyewear === "glasses" ? (
          <>
            <circle cx="85" cy="70" r="13" fill="none" stroke="#4a4359" strokeWidth="3"/>
            <circle cx="119" cy="70" r="13" fill="none" stroke="#4a4359" strokeWidth="3"/>
            <path d="M98 70 H106" stroke="#4a4359" strokeWidth="3"/>
          </>
        ) : null}
        {config.eyewear === "sunglasses" ? (
          <>
            <rect x="70" y="61" width="29" height="19" rx="7" fill="#312f3a"/>
            <rect x="105" y="61" width="29" height="19" rx="7" fill="#312f3a"/>
            <path d="M99 67 H105" stroke="#312f3a" strokeWidth="4"/>
          </>
        ) : null}

        <rect x="92" y="111" width="20" height="17" rx="8" fill={skin}/>

        <path d="M73 128 Q102 113 131 128 L126 194 Q102 203 78 194Z"
          fill={config.top === "jumper" ? "#8a76dd" : "#77b8db"} />

        <path d="M75 137 Q56 150 50 177" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
        <path d="M50 177 Q47 194 55 203" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
        <circle cx="56" cy="205" r="9" fill={skin}/>

        <path d="M129 137 Q148 150 154 177" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
        <path d="M154 177 Q157 194 149 203" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
        <circle cx="148" cy="205" r="9" fill={skin}/>

        {config.bottom === "skirt" ? (
          <path d="M77 190 H127 L139 232 Q102 243 65 232Z" fill="#ef8ca9"/>
        ) : null}
        {config.bottom === "shorts" ? (
          <path d="M74 190 H130 L126 232 H107 L102 211 L97 232 H78Z" fill="#4e77b4"/>
        ) : null}
        {config.bottom === "trousers" ? (
          <path d="M76 190 H128 L122 279 H105 L102 218 L99 279 H82Z" fill="#4c526c"/>
        ) : null}

        {config.bottom !== "trousers" ? (
          <>
            <path d="M83 231 Q82 257 80 282" stroke={skin} strokeWidth="17" fill="none" strokeLinecap="round"/>
            <path d="M121 231 Q122 257 124 282" stroke={skin} strokeWidth="17" fill="none" strokeLinecap="round"/>
          </>
        ) : null}

        <path d="M57 282 Q75 273 92 282 Q95 289 88 295 Q69 299 55 292 Q52 287 57 282Z"
          fill={config.shoes === "boots" ? "#6b4d3d" : "#ffffff"} stroke="#5a5669" strokeWidth="3"/>
        <path d="M112 282 Q130 273 147 282 Q150 289 143 295 Q124 299 110 292 Q107 287 112 282Z"
          fill={config.shoes === "boots" ? "#6b4d3d" : "#ffffff"} stroke="#5a5669" strokeWidth="3"/>

        {config.bag === "handbag" ? (
          <>
            <path d="M145 154 Q166 135 177 157" fill="none" stroke="#8b5f42" strokeWidth="5"/>
            <rect x="148" y="155" width="35" height="32" rx="8" fill="#c78b69"/>
          </>
        ) : null}
        {config.bag === "backpack" ? (
          <rect x="56" y="129" width="27" height="58" rx="12" fill="#dcaa4e"/>
        ) : null}
      </g>

      {config.pet !== "none" ? (
        <Pet type={config.pet} head={config.petHeadAccessory} neck={config.petNeckAccessory}/>
      ) : null}
    </svg>
  );
}

function Pet({ type, head, neck }: { type:"cat"|"dog"; head:"none"|"bow"; neck:"none"|"collar" }) {
  const fur = type === "cat" ? "#d9a06d" : "#b9875f";
  return (
    <g transform="translate(228 214)">
      <ellipse cx="45" cy="90" rx="40" ry="45" fill={fur} stroke="#6e513f" strokeWidth="4"/>
      <circle cx="45" cy="40" r="35" fill={fur} stroke="#6e513f" strokeWidth="4"/>

      {type === "cat" ? (
        <>
          <path d="M17 18 L24 -8 L39 12Z" fill={fur} stroke="#6e513f" strokeWidth="4"/>
          <path d="M73 18 L66 -8 L51 12Z" fill={fur} stroke="#6e513f" strokeWidth="4"/>
        </>
      ) : (
        <>
          <ellipse cx="12" cy="30" rx="11" ry="23" fill="#8d644b"/>
          <ellipse cx="78" cy="30" rx="11" ry="23" fill="#8d644b"/>
        </>
      )}

      <circle cx="33" cy="39" r="4" fill="#302a2a"/>
      <circle cx="57" cy="39" r="4" fill="#302a2a"/>
      <circle cx="45" cy="51" r="5" fill="#302a2a"/>

      {neck === "collar" ? <rect x="18" y="65" width="54" height="9" rx="4" fill="#6397df"/> : null}
      {head === "bow" ? (
        <>
          <path d="M45 7 Q24 -5 25 16 Q27 29 45 19Z" fill="#f16d98"/>
          <path d="M45 7 Q66 -5 65 16 Q63 29 45 19Z" fill="#f16d98"/>
          <circle cx="45" cy="13" r="7" fill="#d84f7c"/>
        </>
      ) : null}
    </g>
  );
}
