"use client";

import { useState } from "react";
import { Avatar } from "./Avatar";
import { AVATAR_OPTIONS, type AvatarConfig } from "@/content/avatar";
import { saveAvatar } from "@/app/learn/[learnerId]/avatar/actions";

const LABELS: Record<string, string> = {
  light: "Light",
  warm: "Warm",
  tan: "Tan",
  brown: "Brown",
  deep: "Deep",
  round: "Round",
  oval: "Oval",
  blue: "Blue",
  green: "Green",
  dark: "Dark",
  short: "Short",
  bob: "Bob",
  curls: "Curls",
  topknot: "Top knot",
  black: "Black",
  blonde: "Blonde",
  red: "Red",
  none: "None",
  bow: "Bow",
  glasses: "Glasses",
  star: "Star",
};

export function AvatarEditor({
  learnerId,
  learnerName,
  initial,
}: {
  learnerId: string;
  learnerName: string;
  initial: AvatarConfig;
}) {
  const [config, setConfig] = useState(initial);

  function set<K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="avatarEditor">
      <div className="avatarPreview">
        <Avatar config={config} size={150} />
        <div>
          <p className="eyebrow">Create your look</p>
          <h1>{learnerName}</h1>
          <p className="muted">Pick the features you like. You can change them later.</p>
        </div>
      </div>

      <form action={saveAvatar} className="avatarForm">
        <input type="hidden" name="learnerId" value={learnerId} />
        <input type="hidden" name="config" value={JSON.stringify(config)} />

        <AvatarOption title="Skin" values={AVATAR_OPTIONS.skin} selected={config.skin} onPick={(value) => set("skin", value)} />
        <AvatarOption title="Face" values={AVATAR_OPTIONS.face} selected={config.face} onPick={(value) => set("face", value)} />
        <AvatarOption title="Eyes" values={AVATAR_OPTIONS.eyes} selected={config.eyes} onPick={(value) => set("eyes", value)} />
        <AvatarOption title="Hair" values={AVATAR_OPTIONS.hair} selected={config.hair} onPick={(value) => set("hair", value)} />
        <AvatarOption title="Hair colour" values={AVATAR_OPTIONS.hairColour} selected={config.hairColour} onPick={(value) => set("hairColour", value)} />
        <AvatarOption title="Accessory" values={AVATAR_OPTIONS.accessory} selected={config.accessory} onPick={(value) => set("accessory", value)} />

        <button className="primaryButton avatarSave">Save avatar</button>
      </form>
    </section>
  );
}

function AvatarOption<T extends string>({
  title,
  values,
  selected,
  onPick,
}: {
  title: string;
  values: readonly T[];
  selected: T;
  onPick: (value: T) => void;
}) {
  return (
    <fieldset className="avatarOption">
      <legend>{title}</legend>
      <div className="optionChips">
        {values.map((value) => (
          <button
            type="button"
            key={value}
            className={selected === value ? "optionChip selected" : "optionChip"}
            onClick={() => onPick(value)}
          >
            {LABELS[value] ?? value}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
