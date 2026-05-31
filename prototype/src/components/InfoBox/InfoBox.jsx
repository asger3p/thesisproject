import {
  ContainerSC,
  LabelSC,
  IconWrapperSC,
  DescriptionSC,
} from "./InfoBoxSC";

export default function InfoBox({
  label,
  icon,
  backgroundColor,
  description,
  centered,
  children,
}) {
  return (
    <ContainerSC
      $backgroundColor={backgroundColor}
      $hasLabel={!!label}
      $centered={centered}
    >
      {label && <LabelSC>{label}</LabelSC>}
      {icon && <IconWrapperSC>{icon}</IconWrapperSC>}
      <DescriptionSC>{children ?? description}</DescriptionSC>
    </ContainerSC>
  );
}
