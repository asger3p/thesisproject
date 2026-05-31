import { PaperTopSC } from "./PaperA4SC";

export default function PaperA4Top({
  children,
  isCutting,
  credentialsDestroyed,
}) {
  return (
    <PaperTopSC
      $isCutting={isCutting}
      $credentialsDestroyed={credentialsDestroyed}
    >
      {children}
    </PaperTopSC>
  );
}
