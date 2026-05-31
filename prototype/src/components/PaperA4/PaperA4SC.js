import styled, { keyframes, css } from "styled-components";

const driftAway = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(80px); opacity: 0; }
`;

export const PaperTopSC = styled.div`
  width: 210mm;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.15),
    0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px 48px 16px 48px;
  clip-path: inset(-100px -100px 0px -100px);
  transition: clip-path 0.3s ease-out;

  ${({ $isCutting }) =>
    $isCutting &&
    css`
      clip-path: inset(-100px -100px -100px -100px);
    `}
`;

export const PaperBottomSC = styled.div`
  width: 210mm;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.15),
    0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 48px 20px 48px;
  clip-path: inset(0px -100px -100px -100px);
  transition: clip-path 0.3s ease-out;

  ${({ $isCutting }) =>
    $isCutting &&
    css`
      clip-path: inset(-100px -100px -100px -100px);
      animation: ${driftAway} 0.75s ease-in 0.15s forwards;
    `}
`;
