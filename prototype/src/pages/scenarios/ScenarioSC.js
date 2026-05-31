import styled, { keyframes } from "styled-components";
import frontDoorImg from "../../assets/FrontDoorReworked.webp";

const typing = keyframes`
  from {
    clip-path: inset(0 100% 0 0);
  }

  to {
    clip-path: inset(0 0% 0 0);
  }
`;

export const ScenarioContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${frontDoorImg});
  background-size: cover;
  background-position: center;
  padding: 48px 24px;
  gap: 32px;
`;

export const ButtonWrapper = styled.div``;

export const TextTyping = styled.div`
  width: fit-content;
  max-width: 90vw;
  background: #000;
  padding: 16px 24px;
  border-radius: 4px;
`;

export const TypedText = styled.p`
  margin: 0;
  white-space: normal;
  font-size: 20px;
  font-family: monospace;
  color: #fff;
  letter-spacing: 0.3px;
`;

export const ContinueButton = styled.button`
  font-size: 16px;
  padding: 12px 36px;
  border: 1.5px solid #111;
  border-radius: 6px;
  background: transparent;
  color: #111;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: #111;
    color: #fff;
  }
`;
