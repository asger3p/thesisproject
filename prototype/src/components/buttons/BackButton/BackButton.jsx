import { BackButtonSC } from "./BackButtonSC";

export default function BackButton({ children, onClick }) {
  return <BackButtonSC onClick={onClick}>{children}</BackButtonSC>;
}
