import {
  REGULAR_PIN_V1,
  REGULAR_PIN_V2,
  PANIC_PIN_V2,
  REGULAR_PIN_V3,
  PANIC_PIN_PREFIX_V3,
} from "../../lib/pinConstants";

const CORRECT_ICON_INDEX = 4;

export function determineRegularOrPanicAccess(variant, pin, selectedIconIndex) {
  if (variant === "1") {
    if (pin !== REGULAR_PIN_V1 || selectedIconIndex === null) return null;
    return selectedIconIndex === CORRECT_ICON_INDEX ? "regular" : "panic";
  }
  if (variant === "2") {
    if (pin === REGULAR_PIN_V2) return "regular";
    if (pin === PANIC_PIN_V2) return "panic";
    return null;
  }
  if (variant === "3") {
    if (pin.slice(0, 3) !== PANIC_PIN_PREFIX_V3) return null;
    return pin === REGULAR_PIN_V3 ? "regular" : "panic";
  }
  return null;
}

export function isEnterButtonReady(pin, variant, selectedIconIndex) {
  return pin.length === 4 && (variant !== "1" || selectedIconIndex !== null);
}

export function isPinBelowMaxDigits(pin, successBlink) {
  if (successBlink) return false;
  if (pin.length >= 4) return false;
  return true;
}

export function isPinCompleteForIconSelect(pin, successBlink) {
  if (successBlink) return false;
  if (pin.length !== 4) return false;
  return true;
}

export function hasExceededMaxInvalidAttempts(invalidAttempts) {
  return invalidAttempts >= 3;
}

export function hasTimerExpired(elapsedSeconds) {
  return elapsedSeconds >= 59;
}
