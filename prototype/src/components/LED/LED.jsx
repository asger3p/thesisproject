import { LEDWrapper, LEDBulb, LEDLabel } from "./LEDSC";

export default function LED({ state = "off", animKey, label, size }) {
  return (
    <LEDWrapper>
      <LEDBulb key={animKey} $state={state} $size={size} />
      {label && <LEDLabel>{label}</LEDLabel>}
    </LEDWrapper>
  );
}
