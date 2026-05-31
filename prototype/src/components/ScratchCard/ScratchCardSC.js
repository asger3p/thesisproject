import styled from "styled-components";

export const WrapperSC = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 4px;
`;

export const CanvasSC = styled.canvas`
  position: absolute;
  inset: 0;
  cursor: crosshair;
  touch-action: none;
  border-radius: 4px;
`;
