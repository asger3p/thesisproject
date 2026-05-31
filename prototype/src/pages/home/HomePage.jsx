import { useNavigate } from "react-router-dom";
import { Volume2 } from "lucide-react";

import PrimaryButton from "../../components/buttons/PrimaryButton/PrimaryButton";
import { usePageTimer } from "../../lib/usePageTimer";
import TestSound from "../../assets/sounds/Test-sound.mp3";
import {
  HomePageLayout,
  Subtitle,
  IntroText,
  Section,
  SectionTitle,
  SectionText,
  List,
  ScenarioLabel,
  ScenarioList,
  Disclaimer,
  CenteredRow,
  ButtonRow,
  SpeakerButton,
  SafariBanner,
} from "./HomePageSC";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function Home() {
  const navigate = useNavigate();
  const { saveElapsedTime } = usePageTimer();

  function handleNext() {
    saveElapsedTime("homeTime");
    navigate("/instructions");
  }

  function handleSpeakerTest() {
    new Audio(TestSound).play();
  }

  return (
    <HomePageLayout>
      <Subtitle>IT University of Copenhagen — Thesis Study</Subtitle>
      <h1>Silent alarm in home security systems</h1>
      <IntroText>
        Before you begin, please read through this page. It explains what you'll
        be doing and what we're asking of you.
      </IntroText>

      <Section>
        <SectionTitle>About this study</SectionTitle>
        <SectionText>
          This study is part of a master's thesis investigating silent alarm
          functionality in home security systems. A silent alarm lets you
          silently signal for help without alerting an intruder. Your feedback
          will help evaluate how usable and trustworthy this kind of system
          feels.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>What you'll be doing</SectionTitle>
        <List>
          <li>
            Read a brief quick guide explaining how the security panel works
          </li>
          <li>
            Interact with the prototype across two scenarios:
            <ScenarioList>
              <div>
                <ScenarioLabel variant="routine">1. Everyday use</ScenarioLabel>
                <SectionText>
                  You arrive home and disarm the system.
                </SectionText>
              </div>
              <div>
                <ScenarioLabel variant="threat">
                  2. When being threatened*
                </ScenarioLabel>
                <SectionText>
                  You are being threatened and have the option to silently
                  signal for help.
                </SectionText>
              </div>
            </ScenarioList>
          </li>
          <li>Answer a questionnaire about your experience</li>
        </List>
      </Section>

      <Disclaimer>
        *The threat scenario is a simulation only. There is no right or wrong
        way to respond. We are interested in how the interface feels to use, not
        whether you complete the task perfectly.
      </Disclaimer>

      <Section>
        <SectionTitle>Your participation</SectionTitle>
        <SectionText>
          This study is fully anonymous. Responses are used only for academic
          research. It takes approximately 10–15 minutes to complete.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Setup</SectionTitle>
        <SectionText>
          Use a laptop or desktop if possible. Maximize your browser window and
          adjust your speaker volume before continuing.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Consent</SectionTitle>
        <SectionText>
          By participating in this study, you agree to interact with a home
          security system while data about time spent and alarm triggers is
          collected. All data collected is anonymous and will be used solely for
          research purposes.
        </SectionText>
      </Section>

      {isSafari && (
        <SafariBanner>
          <strong>Heads up:</strong> You are using Safari. For the best
          experience with sounds and animations, we recommend switching to
          Chrome, Firefox, or Edge before continuing.
        </SafariBanner>
      )}

      <CenteredRow>
        Click speaker to test volume:
        <SpeakerButton onClick={handleSpeakerTest}>
          <Volume2 size={18} />
        </SpeakerButton>
      </CenteredRow>

      <ButtonRow>
        <PrimaryButton onClick={handleNext}>Ready? Start test.</PrimaryButton>
      </ButtonRow>
    </HomePageLayout>
  );
}
