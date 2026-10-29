import type { AvatarConfig } from "@/content/avatar";

const SKIN = {
  light: "#f7d7bd",
  warm: "#efc29d",
  tan: "#d69a6b",
  brown: "#9b6547",
  deep: "#68412f",
};

const HAIR = {
  brown: "#5a3828",
  black: "#29252a",
  blonde: "#d6aa55",
  red: "#9c4d2f",
};

const EYES = {
  brown: "#5c3824",
  blue: "#3e77a8",
  green: "#4f7b58",
  dark: "#29252a",
};

export function Avatar({
  config,
  size = 56,
}: {
  config: AvatarConfig;
  size?: number;
}) {
  const faceRx = config.face === "round" ? 42 : 36;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Learner avatar"
      className="avatarSvg"
    >
      <circle cx="60" cy="60" r="58" fill="#f3efff" />
      <ellipse cx="60" cy="64" rx={faceRx} ry={config.face === "round" ? 40 : 46} fill={SKIN[config.skin]} />

      {config.hair === "short" ? (
        <path d="M22 52 Q28 15 60 17 Q95 18 99 52 Q82 35 61 37 Q40 34 22 52Z" fill={HAIR[config.hairColour]} />
      ) : null}
      {config.hair === "bob" ? (
        <>
          <path d="M18 63 Q19 16 60 16 Q101 17 102 63 L93 86 Q89 45 60 38 Q31 44 27 86Z" fill={HAIR[config.hairColour]} />
          <path d="M28 47 Q37 25 60 25 Q85 25 94 47 Q74 37 60 38 Q45 36 28 47Z" fill={HAIR[config.hairColour]} />
        </>
      ) : null}
      {config.hair === "curls" ? (
        <>
          {[30,45,60,75,90].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 28 : 34} r="15" fill={HAIR[config.hairColour]} />)}
          <circle cx="26" cy="49" r="14" fill={HAIR[config.hairColour]} />
          <circle cx="94" cy="49" r="14" fill={HAIR[config.hairColour]} />
        </>
      ) : null}
      {config.hair === "topknot" ? (
        <>
          <circle cx="60" cy="14" r="17" fill={HAIR[config.hairColour]} />
          <path d="M22 50 Q29 17 60 23 Q91 17 98 50 Q78 34 60 36 Q42 34 22 50Z" fill={HAIR[config.hairColour]} />
        </>
      ) : null}

      <circle cx="45" cy="63" r="4" fill={EYES[config.eyes]} />
      <circle cx="75" cy="63" r="4" fill={EYES[config.eyes]} />
      <path d="M48 80 Q60 90 72 80" stroke="#a34f54" strokeWidth="4" fill="none" strokeLinecap="round" />

      {config.accessory === "bow" ? (
        <>
          <path d="M83 25 Q102 12 102 33 Q102 51 83 38Z" fill="#f16d98" />
          <path d="M83 25 Q67 13 68 34 Q69 49 83 38Z" fill="#f16d98" />
          <circle cx="84" cy="32" r="7" fill="#d84f7c" />
        </>
      ) : null}
      {config.accessory === "glasses" ? (
        <>
          <circle cx="44" cy="63" r="12" fill="none" stroke="#4a4359" strokeWidth="3" />
          <circle cx="76" cy="63" r="12" fill="none" stroke="#4a4359" strokeWidth="3" />
          <path d="M56 63 H64" stroke="#4a4359" strokeWidth="3" />
        </>
      ) : null}
      {config.accessory === "star" ? (
        <text x="84" y="34" fontSize="22">⭐</text>
      ) : null}
    </svg>
  );
}
