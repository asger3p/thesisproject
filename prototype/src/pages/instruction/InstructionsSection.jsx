import InfoBox from "../../components/InfoBox/InfoBox";
import { ShieldCheck, ShieldAlert, Timer } from "lucide-react";
import {
  InstructionsSectionWrapper,
  BranchContainer,
  BoxRow,
  ConnectorCell,
  BranchLabel,
  CrossroadsQuestion,
  Connector,
} from "./InstructionsSectionSC";

const variantTexts = {
  1: {
    everyday: "Enter your PIN and your symbol.",
    threatened: "Enter your PIN with a different symbol.",
    pinInfo:
      "You will be given a 4-digit PIN and a symbol to disarm the alarm system",
  },
  2: {
    everyday: "Enter your PIN.",
    threatened: "Enter your panic PIN.",
    pinInfo:
      "You will be given a 4-digit PIN and panic PIN to disarm the alarm system",
  },
  3: {
    everyday: "Enter your PIN.",
    threatened:
      "Enter the first 3 digits of your PIN and change the last digit.",
    pinInfo: "You will be given a 4-digit PIN to disarm the alarm system",
  },
};

export default function InstructionsSection() {
  const variant = Number(sessionStorage.getItem("variant")) || 1;
  const {
    everyday: everydayText,
    threatened: threatenedText,
    pinInfo,
  } = variantTexts[variant] ?? variantTexts[1];
  return (
    <InstructionsSectionWrapper>
      <InfoBox
        icon={<Timer />}
        backgroundColor="#f3f3f3ff"
        description={
          <ul style={{ paddingLeft: "1rem", margin: 0 }}>
            <li>{pinInfo}</li>
            <li>The alarm starts after 1 minute or 3 invalid PIN entries</li>
          </ul>
        }
      />

      <BranchContainer>
        <CrossroadsQuestion>Being threatened?</CrossroadsQuestion>

        <BoxRow>
          <ConnectorCell>
            <BranchLabel>No</BranchLabel>
            <Connector />
          </ConnectorCell>
          <ConnectorCell>
            <BranchLabel>Yes</BranchLabel>
            <Connector />
          </ConnectorCell>
        </BoxRow>

        <BoxRow>
          <InfoBox
            centered
            backgroundColor="#d4f5e2"
            description={<p style={{ margin: 0 }}>{everydayText}</p>}
          />
          <InfoBox
            centered
            backgroundColor="#ffd9d9"
            description={<p style={{ margin: 0 }}>{threatenedText}</p>}
          />
        </BoxRow>

        <BoxRow>
          <ConnectorCell>
            <Connector />
          </ConnectorCell>
          <ConnectorCell>
            <Connector />
          </ConnectorCell>
        </BoxRow>

        <BoxRow>
          <InfoBox
            centered
            icon={<ShieldCheck />}
            backgroundColor="#d4f5e2"
            description={<p style={{ margin: 0 }}>System disarmed.</p>}
          />
          <InfoBox
            centered
            icon={<ShieldAlert />}
            backgroundColor="#ffd9d9"
            description={
              <p style={{ margin: 0 }}>
                System appears to be disarmed. Monitoring activated. Emergency
                services alerted if needed.
              </p>
            }
          />
        </BoxRow>
      </BranchContainer>
    </InstructionsSectionWrapper>
  );
}
