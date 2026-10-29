import type { AvatarConfig } from "@/content/avatar";

const SKIN = { light:"#f7d7bd", warm:"#efc29d", tan:"#d69a6b", brown:"#9b6547", deep:"#68412f" };
const HAIR = { brown:"#5a3828", black:"#29252a", blonde:"#d6aa55", red:"#9c4d2f" };
const EYES = { brown:"#5c3824", blue:"#3e77a8", green:"#4f7b58", dark:"#29252a" };
const ACCENT = { pink:"#f16d98", blue:"#6397df", gold:"#e2b63f", red:"#d85b61" };

export function Avatar({ config, size = 56 }: { config: AvatarConfig; size?: number }) {
  const faceRx = config.face === "round" ? 42 : 36;
  const accent = ACCENT[config.accessoryColour];

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Learner avatar" className="avatarSvg">
      <circle cx="60" cy="60" r="58" fill="#f3efff" />

      {config.hair === "long" ? (
        <path d="M18 55 Q18 13 60 13 Q102 13 102 56 L98 108 Q84 96 78 80 L42 80 Q36 97 22 108Z" fill={HAIR[config.hairColour]} />
      ) : null}

      <ellipse cx="60" cy="64" rx={faceRx} ry={config.face === "round" ? 40 : 46} fill={SKIN[config.skin]} />

      {config.hair === "short" ? <path d="M22 52 Q28 15 60 17 Q95 18 99 52 Q82 35 61 37 Q40 34 22 52Z" fill={HAIR[config.hairColour]} /> : null}
      {config.hair === "bob" ? <>
        <path d="M18 63 Q19 16 60 16 Q101 17 102 63 L93 86 Q89 45 60 38 Q31 44 27 86Z" fill={HAIR[config.hairColour]} />
        <path d="M28 47 Q37 25 60 25 Q85 25 94 47 Q74 37 60 38 Q45 36 28 47Z" fill={HAIR[config.hairColour]} />
      </> : null}
      {config.hair === "long" ? <path d="M23 49 Q31 18 60 20 Q90 18 98 49 Q80 35 60 37 Q41 35 23 49Z" fill={HAIR[config.hairColour]} /> : null}
      {config.hair === "curls" ? <>
        {[30,45,60,75,90].map((x,i)=><circle key={x} cx={x} cy={i%2?28:34} r="15" fill={HAIR[config.hairColour]} />)}
        <circle cx="26" cy="49" r="14" fill={HAIR[config.hairColour]} /><circle cx="94" cy="49" r="14" fill={HAIR[config.hairColour]} />
      </> : null}
      {config.hair === "topknot" ? <>
        <circle cx="60" cy="14" r="17" fill={HAIR[config.hairColour]} />
        <path d="M22 50 Q29 17 60 23 Q91 17 98 50 Q78 34 60 36 Q42 34 22 50Z" fill={HAIR[config.hairColour]} />
      </> : null}

      <circle cx="45" cy="63" r="4" fill={EYES[config.eyes]} /><circle cx="75" cy="63" r="4" fill={EYES[config.eyes]} />
      <path d="M48 80 Q60 90 72 80" stroke="#a34f54" strokeWidth="4" fill="none" strokeLinecap="round" />

      {config.accessory === "bow" ? <>
        <path d="M83 25 Q102 12 102 33 Q102 51 83 38Z" fill={accent} />
        <path d="M83 25 Q67 13 68 34 Q69 49 83 38Z" fill={accent} />
        <circle cx="84" cy="32" r="7" fill={accent} />
      </> : null}
      {config.accessory === "hairclip" ? <rect x="82" y="31" width="20" height="7" rx="3.5" transform="rotate(18 82 31)" fill={accent} /> : null}
      {config.accessory === "glasses" ? <>
        <circle cx="44" cy="63" r="12" fill="none" stroke="#4a4359" strokeWidth="3" />
        <circle cx="76" cy="63" r="12" fill="none" stroke="#4a4359" strokeWidth="3" />
        <path d="M56 63 H64" stroke="#4a4359" strokeWidth="3" />
      </> : null}
      {config.accessory === "star" ? <text x="84" y="34" fontSize="22">⭐</text> : null}

      {config.pet !== "none" ? <Pet type={config.pet} accessory={config.petAccessory} /> : null}
    </svg>
  );
}

function Pet({ type, accessory }: { type:"cat"|"dog"; accessory:"none"|"bow"|"collar" }) {
  return (
    <g transform="translate(75 78) scale(.55)">
      <circle cx="34" cy="34" r="28" fill={type === "cat" ? "#d9a06d" : "#b9875f"} stroke="#6e513f" strokeWidth="3" />
      {type === "cat" ? <>
        <path d="M12 15 L18 -2 L31 13Z" fill="#d9a06d" stroke="#6e513f" strokeWidth="3" />
        <path d="M56 15 L50 -2 L37 13Z" fill="#d9a06d" stroke="#6e513f" strokeWidth="3" />
      </> : <>
        <ellipse cx="10" cy="18" rx="10" ry="18" fill="#8d644b" /><ellipse cx="58" cy="18" rx="10" ry="18" fill="#8d644b" />
      </>}
      <circle cx="25" cy="31" r="3" fill="#302a2a" /><circle cx="43" cy="31" r="3" fill="#302a2a" />
      <circle cx="34" cy="40" r="4" fill="#302a2a" />
      {accessory === "collar" ? <rect x="12" y="50" width="44" height="7" rx="3" fill="#6397df" /> : null}
      {accessory === "bow" ? <>
        <path d="M15 50 Q3 42 7 60 Q10 68 20 57Z" fill="#f16d98" />
        <path d="M19 50 Q31 42 27 60 Q24 68 16 57Z" fill="#f16d98" />
      </> : null}
    </g>
  );
}
