import styled from "styled-components";

export const ContainerSC = styled.div`
  position: relative;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "#D9D9D9"};
  border-radius: 12px;
  padding: ${({ $hasLabel, $centered }) =>
    $hasLabel
      ? "56px 16px 24px"
      : $centered
        ? "16px 48px"
        : "16px 48px 16px 16px"};
  text-align: ${({ $centered }) => ($centered ? "center" : "left")};
  width: 100%;
  box-sizing: border-box;
`;

export const LabelSC = styled.h3`
  position: absolute;
  top: 16px;
  left: 16px;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

export const IconWrapperSC = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const DescriptionSC = styled.div`
  margin: 0;
  font-size: 0.875rem;
`;
