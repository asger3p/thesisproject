import { useState, useEffect } from "react";
import elephantIcon from "../../assets/Icons/elephant.png";
import {
  REGULAR_PIN_V1,
  REGULAR_PIN_V2,
  PANIC_PIN_V2,
  REGULAR_PIN_V3,
  PANIC_PIN_PREFIX_V3,
} from "../../lib/pinConstants";
import {
  CredentialsSectionWrapper,
  CredentialsCard,
  CredentialField,
  CredentialLabel,
  CredentialsSectionTitle,
  PinDigits,
  PinDigit,
  CredentialIcon,
  DestroyText,
} from "./CredentialsSectionSC";
import ScratchCard from "../../components/ScratchCard/ScratchCard";

export default function CredentialsSection({ onUnlocked }) {
  const [pinPct, setPinPct] = useState(0);
  const [symbolPct, setSymbolPct] = useState(0);

  useEffect(() => {
    if ((pinPct + symbolPct) / 2 >= 0.55) onUnlocked?.();
  }, [pinPct, symbolPct]);

  const variant = sessionStorage.getItem("variant") || "1";

  if (variant === "2" || variant === "3") {
    const regularPin = variant === "2" ? REGULAR_PIN_V2 : REGULAR_PIN_V3;
    const panicPin = variant === "2" ? PANIC_PIN_V2 : `${PANIC_PIN_PREFIX_V3}?`;

    return (
      <CredentialsSectionWrapper>
        <CredentialsSectionTitle>
          Scratch to reveal your PINs
        </CredentialsSectionTitle>
        <CredentialsCard>
          <CredentialField>
            <CredentialLabel>This is your PIN code</CredentialLabel>
            <ScratchCard onProgress={setPinPct}>
              <PinDigits>
                {regularPin.split("").map((digit, i) => (
                  <PinDigit key={i}>{digit}</PinDigit>
                ))}
              </PinDigits>
            </ScratchCard>
          </CredentialField>
          <CredentialField>
            <CredentialLabel>
              {variant === "3"
                ? "Panic PIN: Change last digit"
                : "This is your panic PIN"}
            </CredentialLabel>
            <ScratchCard onProgress={setSymbolPct}>
              <PinDigits>
                {panicPin.split("").map((digit, i) => (
                  <PinDigit key={i}>{digit}</PinDigit>
                ))}
              </PinDigits>
            </ScratchCard>
          </CredentialField>
        </CredentialsCard>
        <DestroyText>DESTROY WHEN MEMORIZED - DO NOT WRITE DOWN</DestroyText>
      </CredentialsSectionWrapper>
    );
  }

  return (
    <CredentialsSectionWrapper>
      <CredentialsSectionTitle>
        Scratch to reveal your PIN and Symbol
      </CredentialsSectionTitle>
      <CredentialsCard>
        <CredentialField>
          <CredentialLabel>This is your PIN code</CredentialLabel>
          <ScratchCard onProgress={setPinPct}>
            <PinDigits>
              {REGULAR_PIN_V1.split("").map((digit, i) => (
                <PinDigit key={i}>{digit}</PinDigit>
              ))}
            </PinDigits>
          </ScratchCard>
        </CredentialField>
        <CredentialField>
          <CredentialLabel>This is your symbol</CredentialLabel>
          <ScratchCard onProgress={setSymbolPct}>
            <CredentialIcon src={elephantIcon} alt="elephant" />
          </ScratchCard>
        </CredentialField>
      </CredentialsCard>
      <DestroyText>DESTROY WHEN MEMORIZED - DO NOT WRITE DOWN</DestroyText>
    </CredentialsSectionWrapper>
  );
}
