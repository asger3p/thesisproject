import { Scissors } from "lucide-react";
import { ScissorLineWrapper, DashedLine } from "./CredentialsSectionSC";

export default function ScissorLine({ isCutting }) {
  return (
    <ScissorLineWrapper $isCutting={isCutting} style={{ marginTop: "auto" }}>
      <DashedLine $isCutting={isCutting} />
      <Scissors size={16} />
      <DashedLine $isCutting={isCutting} />
    </ScissorLineWrapper>
  );
}
