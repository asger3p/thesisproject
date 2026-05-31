import styled, { keyframes, css } from "styled-components";

const flashCut = keyframes`
  0%   { color: #888; }
  40%  { color: #cc3333; }
  100% { color: #888; }
`;

const dashFlash = keyframes`
  0%   { border-top-color: #aaa; }
  40%  { border-top-color: #cc3333; }
  100% { border-top-color: #aaa; }
`;

export const CredentialsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const ScissorLineWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
  color: #888;

  ${({ $isCutting }) =>
    $isCutting &&
    css`
      animation: ${flashCut} 0.3s ease-in-out forwards;
    `}
`;

export const DashedLine = styled.div`
  flex: 1;
  border-top: 2px dashed #aaa;

  ${({ $isCutting }) =>
    $isCutting &&
    css`
      animation: ${dashFlash} 0.3s ease-in-out forwards;
    `}
`;

export const CredentialsCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 20px 32px;
  border: 1px solid #d0d0d0;
  background: #fafafa;
`;

export const CredentialField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const CredentialLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
`;

export const CredentialsSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #222;
  margin: 0;
`;

export const PinDigits = styled.div`
  display: flex;
  gap: 6px;
`;

export const PinDigit = styled.div`
  width: 32px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #333;
  font-size: 20px;
  font-weight: 700;
  font-family: "Courier New", monospace;
  background: #fff;
`;

export const CredentialIcon = styled.img`
  height: 40px;
`;

export const DestroyText = styled.p`
  margin-top: auto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #b33;
`;
