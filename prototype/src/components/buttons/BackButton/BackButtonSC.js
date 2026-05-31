import styled from "styled-components";

export const BackButtonSC = styled.button`
  border-radius: 8px;
  border: 1px solid #213547;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  background-color: transparent;
  color: #213547;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(33, 53, 71, 0.08);
  }

  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
