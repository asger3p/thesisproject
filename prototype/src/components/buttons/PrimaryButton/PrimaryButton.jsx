import { PrimaryButtonSC } from "./PrimaryButtonSC";

export default function PrimaryButton({ children, onClick, disabled }) {
  return (
    <PrimaryButtonSC onClick={onClick} disabled={disabled}>
      {children}
    </PrimaryButtonSC>
  );
}
