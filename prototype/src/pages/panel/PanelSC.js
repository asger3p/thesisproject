import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`;

export const LivingroomImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
`;

export const Wall = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background: #f0ebe2;
  box-shadow:
    -8px 0 16px rgba(0, 0, 0, 0.25),
    inset 0 14px 28px rgba(0, 0, 0, 0.1),
    inset 0 -12px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

export const PadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 240px;
  margin: 24px 0;
`;
