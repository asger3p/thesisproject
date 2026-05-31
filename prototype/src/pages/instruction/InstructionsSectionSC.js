import styled from "styled-components";

const lineColor = "#cbd5e1";

export const InstructionsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 800px;
`;

export const BoxRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: stretch;

  > * {
    flex: 1;
  }
`;

export const ConnectorCell = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const Connector = styled.div`
  width: 2px;
  height: ${({ $height }) => $height || "40px"};
  background: ${lineColor};
  margin: 0 auto;
  margin-bottom: 12px;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    border-right: 2px solid ${lineColor};
    border-bottom: 2px solid ${lineColor};
  }
`;

export const BranchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-top: 40px;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 40px;
    background: ${lineColor};
  }

  &::after {
    content: "";
    position: absolute;
    top: 40px;
    left: calc(25% - 5px);
    right: calc(25% - 5px);
    height: 2px;
    background: ${lineColor};
  }
`;

export const BranchLabel = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: 500;
  color: #4b5563;
  white-space: nowrap;
  background: white;
  padding: 0 10px;
  z-index: 1;
`;

export const CrossroadsQuestion = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: 500;
  color: #4b5563;
  white-space: nowrap;
  background: white;
  padding: 0 10px;
  z-index: 1;
`;

export const OutputBox = styled.div`
  background-color: ${({ $backgroundColor }) => $backgroundColor || "#f1f5f9"};
  border-radius: 12px;
  padding: 12px 16px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  box-sizing: border-box;
`;
