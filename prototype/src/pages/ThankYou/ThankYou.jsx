import { ThankYouLayout, Subtitle } from "./ThankYouSC";
import { useBlockBrowserBack } from "../../lib/useBlockBrowserBack";

export default function ThankYou() {
  useBlockBrowserBack();
  return (
    <ThankYouLayout>
      <Subtitle>IT University of Copenhagen — Thesis Study</Subtitle>
      <h1>Thanks for participating!</h1>
      <p style={{ margin: 0 }}>
        Your responses have been recorded. We appreciate your time and
        contribution to this research.
      </p>
    </ThankYouLayout>
  );
}
