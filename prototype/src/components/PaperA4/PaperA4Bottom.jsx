import { PaperBottomSC } from "./PaperA4SC";

export default function PaperA4Bottom({ children, isCutting }) {
  return <PaperBottomSC $isCutting={isCutting}>{children}</PaperBottomSC>;
}
