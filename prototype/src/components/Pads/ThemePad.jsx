import { useMemo } from "react";
import { PadOuter, PadContainer, Key, ThemeIcon, EnterButton } from "./PadSC";

import click3 from "../../assets/sounds/Click-003.mp3";
import release3 from "../../assets/sounds/Release-003.mp3";

import beeIcon from "../../assets/Icons/bee.png";
import catIcon from "../../assets/Icons/cat.png";
import cowIcon from "../../assets/Icons/cow-alt.png";
import deerIcon from "../../assets/Icons/deer.png";
import elephantIcon from "../../assets/Icons/elephant.png";
import fishIcon from "../../assets/Icons/fish.png";
import pigIcon from "../../assets/Icons/pig.png";
import sheepIcon from "../../assets/Icons/sheep.png";
import snakeIcon from "../../assets/Icons/snake.png";

export const themeIcons = [
  { name: "bee", src: beeIcon },
  { name: "cat", src: catIcon },
  { name: "cow", src: cowIcon },
  { name: "deer", src: deerIcon },
  { name: "elephant", src: elephantIcon },
  { name: "fish", src: fishIcon },
  { name: "pig", src: pigIcon },
  { name: "sheep", src: sheepIcon },
  { name: "snake", src: snakeIcon },
];

export default function ThemePad({ onIconClick, onEnter, $armed, enterKey }) {
  const pressSound = useMemo(() => {
    const a = new Audio(click3);
    a.preload = "auto";
    return a;
  }, []);

  const releaseSound = useMemo(() => {
    const a = new Audio(release3);
    a.preload = "auto";
    return a;
  }, []);

  const press = () => {
    pressSound.pause();
    pressSound.currentTime = 0;
    pressSound.play().catch(() => {});
  };

  const release = () => {
    releaseSound.pause();
    releaseSound.currentTime = 0;
    releaseSound.play().catch(() => {});
  };

  return (
    <PadOuter>
      <PadContainer>
        {themeIcons.map((icon, index) => (
          <Key
            key={icon.name}
            type="button"
            onPointerDown={press}
            onPointerUp={() => {
              release();
              onIconClick(index);
            }}
          >
            <ThemeIcon src={icon.src} alt={icon.name} />
          </Key>
        ))}
        <EnterButton key={enterKey} $armed={$armed} onClick={onEnter}>
          Enter
        </EnterButton>
      </PadContainer>
    </PadOuter>
  );
}
