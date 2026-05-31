import styled from "styled-components";

export const PrimaryButtonSC = styled.button`
  border-radius: 8px;
  border: none;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  background-color: #3a5f7d;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a7a9b;
  }

  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
