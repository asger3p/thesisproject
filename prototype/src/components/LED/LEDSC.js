import styled, { css, keyframes } from "styled-components";

const greyOff = css`
  background: radial-gradient(
    circle at 35% 30%,
    rgba(255, 255, 255, 0.2) 0%,
    #6b6b6b 45%,
    #3a3a3a 100%
  );
  border-color: #555;
  box-shadow:
    inset 0 -0.1em 0.15em rgba(0, 0, 0, 0.4),
    inset 0 0.1em 0.15em rgba(255, 255, 255, 0.1);
`;

const beepFlash = keyframes`
  0%   { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.1); }
  15%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, #f0f0f0 45%, #aaa 100%); border-color: #ccc; box-shadow: 0 0 0.5em 0.2em #d8d8d8, inset 0 -0.1em 0.15em rgba(0,0,0,0.1), inset 0 0.1em 0.15em rgba(255,255,255,0.7); }
  60%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, #f0f0f0 45%, #aaa 100%); border-color: #ccc; box-shadow: 0 0 0.5em 0.2em #d8d8d8, inset 0 -0.1em 0.15em rgba(0,0,0,0.1), inset 0 0.1em 0.15em rgba(255,255,255,0.7); }
  100% { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.1); }
`;

const successFlash = keyframes`
  0%   { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  10%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #22c55e 45%, #14532d 100%); border-color: #15803d; box-shadow: 0 0 0.5em 0.2em #16a34a, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  22%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  33%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #22c55e 45%, #14532d 100%); border-color: #15803d; box-shadow: 0 0 0.5em 0.2em #16a34a, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  45%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  56%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #22c55e 45%, #14532d 100%); border-color: #15803d; box-shadow: 0 0 0.5em 0.2em #16a34a, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  68%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  100% { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
`;

const errorFlash = keyframes`
  0%   { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  10%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #ef4444 45%, #7f1d1d 100%); border-color: #b91c1c; box-shadow: 0 0 0.5em 0.2em #dc2626, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  22%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  33%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #ef4444 45%, #7f1d1d 100%); border-color: #b91c1c; box-shadow: 0 0 0.5em 0.2em #dc2626, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  45%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  56%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #ef4444 45%, #7f1d1d 100%); border-color: #b91c1c; box-shadow: 0 0 0.5em 0.2em #dc2626, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  68%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  100% { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
`;

const alarmFlash = keyframes`
  0%   { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #ef4444 45%, #7f1d1d 100%); border-color: #b91c1c; box-shadow: 0 0 0.5em 0.2em #dc2626, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
  50%  { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 0%, #6b6b6b 45%, #3a3a3a 100%); border-color: #555; box-shadow: inset 0 -0.1em 0.15em rgba(0,0,0,0.4); }
  100% { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, #ef4444 45%, #7f1d1d 100%); border-color: #b91c1c; box-shadow: 0 0 0.5em 0.2em #dc2626, inset 0 -0.1em 0.15em rgba(0,0,0,0.4), inset 0 0.1em 0.15em rgba(255,255,255,0.25); }
`;

const animationMap = {
  beep: css`
    animation: ${beepFlash} 0.2s ease-in-out forwards;
  `,
  success: css`
    animation: ${successFlash} 2s ease-in-out forwards;
  `,
  error: css`
    animation: ${errorFlash} 2s ease-in-out forwards;
  `,
  alarm: css`
    animation: ${alarmFlash} 0.5s ease-in-out infinite;
  `,
};

export const LEDWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
`;

export const LEDBulb = styled.div`
  width: ${({ $size }) => $size ?? "0.7em"};
  height: ${({ $size }) => $size ?? "0.7em"};
  border-radius: 50%;
  border: 1px solid;
  flex-shrink: 0;
  ${greyOff}
  ${({ $state }) => animationMap[$state] ?? ""}
`;

export const LEDLabel = styled.span`
  font-size: 0.75em;
  font-weight: 600;
  color: #555;
  user-select: none;
`;
