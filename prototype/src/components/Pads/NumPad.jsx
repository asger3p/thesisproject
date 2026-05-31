import { useMemo } from "react";
import {
  PadOuter,
  PadContainer,
  Key,
  Display,
  PinValue,
  EnterButton,
  LEDSlot,
} from "./PadSC";
import LED from "../LED/LED";

import click1 from "../../assets/sounds/Click-001.mp3";
import click2 from "../../assets/sounds/Click-002.mp3";
import release1 from "../../assets/sounds/Release-001.mp3";
import release2 from "../../assets/sounds/Release-002.mp3";

export default function NumPad({
  onDigit,
  onDelete,
  onEnter,
  pinDisplay,
  $error,
  $success,
  $armed,
  enterKey,
  beepTick,
  $alarm,
}) {
  const ledState = $alarm
    ? "alarm"
    : $error
      ? "error"
      : $success
        ? "success"
        : "beep";
  const ledAnimKey = $error
    ? `err-${$error}`
    : $success
      ? `ok-${$success}`
      : beepTick;

  const createAudio = (src) => {
    const audio = new Audio(src);
    audio.preload = "auto";
    return audio;
  };

  const pressSounds = useMemo(() => [click1, click2].map(createAudio), []);

  const releaseSounds = useMemo(
    () => [release1, release2].map(createAudio),
    [],
  );

  const playRandom = (pool) => {
    const sound = pool[Math.floor(Math.random() * pool.length)];
    sound.pause();
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  const press = () => playRandom(pressSounds);
  const release = () => playRandom(releaseSounds);

  const keyProps = (action) => ({
    onPointerDown: press,
    onPointerUp: () => {
      release();
      action();
    },
  });

  return (
    <PadOuter>
      <PadContainer>
        <LEDSlot>
          <LED state={ledState} animKey={ledAnimKey} />
        </LEDSlot>
        <Display
          key={`${$error}-${$success}`}
          $error={$error}
          $success={$success}
        >
          <PinValue>{pinDisplay}</PinValue>
        </Display>
        <Key {...keyProps(() => onDigit("1"))}>1</Key>
        <Key {...keyProps(() => onDigit("2"))}>2</Key>
        <Key {...keyProps(() => onDigit("3"))}>3</Key>
        <Key {...keyProps(() => onDigit("4"))}>4</Key>
        <Key {...keyProps(() => onDigit("5"))}>5</Key>
        <Key {...keyProps(() => onDigit("6"))}>6</Key>
        <Key {...keyProps(() => onDigit("7"))}>7</Key>
        <Key {...keyProps(() => onDigit("8"))}>8</Key>
        <Key {...keyProps(() => onDigit("9"))}>9</Key>
        <Key disabled aria-hidden="true" />
        <Key {...keyProps(() => onDigit("0"))}>0</Key>
        <Key {...keyProps(onDelete)}>⌫</Key>
        {onEnter && (
          <EnterButton key={enterKey} $armed={$armed} onClick={onEnter}>
            Enter
          </EnterButton>
        )}
      </PadContainer>
    </PadOuter>
  );
}
