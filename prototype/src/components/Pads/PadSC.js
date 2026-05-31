import styled, { css, keyframes } from "styled-components";

export const PadOuter = styled.div`
  container-type: inline-size;
  width: 100%;
`;

export const LEDSlot = styled.div`
  position: absolute;
  top: 0.6em;
  right: 0.6em;
  font-size: 1em;
`;

export const PadContainer = styled.div`
  font-size: calc(100cqw / 17.5);
  position: relative;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5em;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, #d6d7da 0%, #c9cacf 100%);
  border-radius: 1em;
  padding: 0.875em;
  border: 1px solid #b7b8be;
  box-shadow:
    0 1.125em 1.875em rgba(0, 0, 0, 0.18),
    inset 0 2px 0 rgba(255, 255, 255, 0.65),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
`;

export const Key = styled.button`
  position: relative;
  border-radius: 0.7em;
  border: 1px solid #8f8f95;
  background: linear-gradient(180deg, #f7f7f7 0%, #dedee1 100%);
  color: #000;
  aspect-ratio: 1 / 1;
  font-size: 1.125em;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  padding: 0.375em;

  box-shadow:
    0 0.5em 0 #a8a8ae,
    0 0.875em 1.125em rgba(0, 0, 0, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.85),
    inset 0 -3px 0 rgba(0, 0, 0, 0.1);

  background-image:
    linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0)),
    radial-gradient(
      circle at 30% 25%,
      rgba(255, 255, 255, 0.55),
      rgba(255, 255, 255, 0) 45%
    ),
    linear-gradient(180deg, #f7f7f7 0%, #dedee1 100%);

  display: grid;
  place-items: center;
  transition:
    transform 0.06s ease,
    box-shadow 0.06s ease,
    filter 0.12s ease;

  &:hover {
    filter: brightness(1.02);
  }

  &:active {
    transform: translateY(0.375em);
    box-shadow:
      0 0.125em 0 #a8a8ae,
      0 0.375em 0.625em rgba(0, 0, 0, 0.18),
      inset 0 2px 0 rgba(255, 255, 255, 0.75),
      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.55);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0;
    cursor: default;
    border-color: transparent;
    box-shadow: none;
    background: transparent;
  }
`;

export const ThemeIcon = styled.img`
  width: 55%;
  height: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`;

export const Display = styled.div`
  grid-column: 1 / -1;
  margin: 0 0.5cm;
  background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%);
  border-radius: 0.75em;
  padding: 0.625em 0.75em;
  border: 1px solid #bdbdbd;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  ${({ $error }) =>
    $error &&
    css`
      animation: ${blinkRed} 0.6s ease-in-out;
    `}

  ${({ $success, $error }) =>
    !$error &&
    $success &&
    css`
      animation: ${blinkGreen} 0.8s ease-in-out;
    `}
`;

export const PinValue = styled.p`
  margin: 0;
  font-size: 1.125em;
  letter-spacing: 0.375em;
  font-variant-numeric: tabular-nums;
  color: #111;
  text-align: center;
`;

const enterFlash = keyframes`
  0% {
    border-color: rgba(200,200,215,0.6);
    color: rgba(60,60,75,0.9);
    box-shadow:
      0 0 0.7em 0.2em rgba(200,200,220,0.35),
      0 0 1.4em 0.4em rgba(180,180,210,0.12),
      0 0.5em 0 rgba(130,130,150,0.35),
      inset 0 2px 0 rgba(255,255,255,0.85),
      inset 0 -3px 0 rgba(80,80,100,0.07);
  }
  40% {
    border-color: rgba(160,160,175,0.45);
    color: rgba(80,80,95,0.65);
    box-shadow:
      0 0.5em 0 rgba(130,130,145,0.35),
      0 0.875em 1.125em rgba(0,0,0,0.12),
      inset 0 2px 0 rgba(255,255,255,0.65),
      inset 0 -3px 0 rgba(0,0,0,0.07);
  }
  100% {
    border-color: rgba(200,200,215,0.6);
    color: rgba(60,60,75,0.9);
    box-shadow:
      0 0 0.7em 0.2em rgba(200,200,220,0.35),
      0 0 1.4em 0.4em rgba(180,180,210,0.12),
      0 0.5em 0 rgba(130,130,150,0.35),
      inset 0 2px 0 rgba(255,255,255,0.85),
      inset 0 -3px 0 rgba(80,80,100,0.07);
  }
`;

export const EnterButton = styled.button`
  grid-column: 1 / -1;
  position: relative;
  z-index: 1;
  padding: 0.8em 1.125em;
  border-radius: 0.7em;
  border: 1px solid
    ${({ $armed }) =>
      $armed ? "rgba(200,200,215,0.6)" : "rgba(160,160,175,0.45)"};
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;

  color: ${({ $armed }) =>
    $armed ? "rgba(60,60,75,0.9)" : "rgba(80,80,95,0.65)"};

  background: ${({ $armed }) =>
    $armed
      ? `
        linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(240,240,250,0.2) 55%),
        radial-gradient(circle at 40% 30%, rgba(255,255,255,0.55) 0%, rgba(220,220,235,0) 55%),
        linear-gradient(180deg, rgba(230,230,240,0.75) 0%, rgba(210,210,225,0.82) 100%)
      `
      : `
        linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%),
        radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%),
        linear-gradient(180deg, rgba(210,210,220,0.55) 0%, rgba(185,185,200,0.65) 100%)
      `};

  box-shadow: ${({ $armed }) =>
    $armed
      ? `
        0 0 0.7em 0.2em rgba(200,200,220,0.35),
        0 0 1.4em 0.4em rgba(180,180,210,0.12),
        0 0.5em 0 rgba(130,130,150,0.35),
        inset 0 2px 0 rgba(255,255,255,0.85),
        inset 0 -3px 0 rgba(80,80,100,0.07)
      `
      : `
        0 0.5em 0 rgba(130,130,145,0.35),
        0 0.875em 1.125em rgba(0,0,0,0.12),
        inset 0 2px 0 rgba(255,255,255,0.65),
        inset 0 -3px 0 rgba(0,0,0,0.07)
      `};

  transition:
    transform 0.06s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    background 0.18s ease;

  &:active {
    transform: translateY(0.375em);
    box-shadow:
      0 0.125em 0
        ${({ $armed }) =>
          $armed ? "rgba(130,130,150,0.35)" : "rgba(130,130,145,0.35)"},
      0 0.375em 0.625em rgba(0, 0, 0, 0.14),
      inset 0 2px 0 rgba(255, 255, 255, 0.6),
      inset 0 -2px 0 rgba(0, 0, 0, 0.08);
  }

  ${({ $armed }) =>
    $armed &&
    css`
      animation: ${enterFlash} 0.35s ease-out;
    `}
`;

const blinkRed = keyframes`
  0%   { background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%); }
  20%  { background: #ffd6d6; }
  40%  { background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%); }
  60%  { background: #ffd6d6; }
  100% { background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%); }
`;

const blinkGreen = keyframes`
  0%   { background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%); }
  20%  { background: #d4ffd4; }
  40%  { background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%); }
  60%  { background: #d4ffd4; }
  100% { background: linear-gradient(180deg, #f1f1f1 0%, #e6e6e6 100%); }
`;
