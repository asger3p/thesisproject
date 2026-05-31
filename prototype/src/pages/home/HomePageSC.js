import styled from "styled-components";

export const HomePageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 2rem;
  max-width: 680px;
  margin: auto;

  h1 {
    text-align: center;
    margin: 0 0 16px;
  }
`;

export const Subtitle = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  text-align: center;
  margin: 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #111;
`;

export const List = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  li + li {
    margin-top: 8px;
  }
`;

export const ScenarioLabel = styled.p`
  font-weight: 600;
  margin: 0 0 4px;
  color: ${({ variant }) => (variant === "threat" ? "#b91c1c" : "#166534")};
`;

export const IntroText = styled.p`
  text-align: center;
  margin: -8px 0 0;
`;

export const SectionText = styled.p`
  margin: 0;
`;

export const ScenarioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

export const Disclaimer = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #555;
`;

export const CenteredRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ButtonRow = styled(CenteredRow)`
  margin-top: 8px;
`;

export const SpeakerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const SafariBanner = styled.div`
  background: #fff8e1;
  border: 1px solid #f0c040;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #5a4000;
  line-height: 1.5;
`;
