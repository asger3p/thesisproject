import {
  ContainerSC,
  TitleSC,
  SubtitleSC,
  GhostImageSC,
} from "./IntroSectionSC";
import ghost from "../../assets/ghost.png";

const subtitle =
  "This security system allows you to silently signal for help if you are being forced to disarm it. Signalling for help will silently activate monitoring of your property and alert emergency services if needed.";

export default function IntroSection() {
  return (
    <ContainerSC>
      <TitleSC>Home Security System</TitleSC>
      <SubtitleSC>{subtitle}</SubtitleSC>
      <GhostImageSC src={ghost} alt="ghost" />
    </ContainerSC>
  );
}
