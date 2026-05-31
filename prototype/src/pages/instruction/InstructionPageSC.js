import styled from "styled-components";

export const A4Container = styled.div`
  min-height: 297mm;
  display: flex;
  flex-direction: column;
`;

export const PaperWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InstructionPageLayout = styled.div`
  min-height: 100vh;
  min-width: 100%;
  width: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
`;
