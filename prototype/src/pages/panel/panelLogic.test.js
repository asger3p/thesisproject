import { describe, it, expect } from "vitest";
import {
  determineRegularOrPanicAccess,
  isEnterButtonReady,
  isPinBelowMaxDigits,
  isPinCompleteForIconSelect,
  hasExceededMaxInvalidAttempts,
  hasTimerExpired,
} from "./panelLogic";

describe("determineRegularOrPanicAccess", () => {
  describe("variant 1", () => {
    it("correctPinAndCorrectIcon_returns_regular", () => {
      const variant = "1";
      const pin = "1864";
      const iconIndex = 4;

      const result = determineRegularOrPanicAccess(variant, pin, iconIndex);

      expect(result).toBe("regular");
    });

    it("correctPinAndWrongIcon_returns_panic", () => {
      const variant = "1";
      const pin = "1864";
      const iconIndex = 0;

      const result = determineRegularOrPanicAccess(variant, pin, iconIndex);

      expect(result).toBe("panic");
    });

    it("wrongPinAndCorrectIcon_returns_null", () => {
      const variant = "1";
      const pin = "0000";
      const iconIndex = 4;

      const result = determineRegularOrPanicAccess(variant, pin, iconIndex);

      expect(result).toBeNull();
    });
  });

  describe("variant 2", () => {
    it("regularPin_returns_regular", () => {
      const variant = "2";
      const pin = "1864";

      const result = determineRegularOrPanicAccess(variant, pin, null);

      expect(result).toBe("regular");
    });

    it("panicPin_returns_panic", () => {
      const variant = "2";
      const pin = "7693";

      const result = determineRegularOrPanicAccess(variant, pin, null);

      expect(result).toBe("panic");
    });

    it("wrongPin_returns_null", () => {
      const variant = "2";
      const pin = "0000";

      const result = determineRegularOrPanicAccess(variant, pin, null);

      expect(result).toBeNull();
    });
  });

  describe("variant 3", () => {
    it("regularPin_returns_regular", () => {
      const variant = "3";
      const pin = "1864";

      const result = determineRegularOrPanicAccess(variant, pin, null);

      expect(result).toBe("regular");
    });

    it("correctPrefixButDifferentLastDigit_returns_panic", () => {
      const variant = "3";
      const pin = "1867";

      const result = determineRegularOrPanicAccess(variant, pin, null);

      expect(result).toBe("panic");
    });

    it("wrongPrefix_returns_null", () => {
      const variant = "3";
      const pin = "0004";

      const result = determineRegularOrPanicAccess(variant, pin, null);

      expect(result).toBeNull();
    });
  });
});

describe("isEnterButtonReady", () => {
  it("fourDigitPinOnVariant1WithIcon_returns_true", () => {
    const pin = "1234";
    const variant = "1";
    const iconIndex = 3;

    const result = isEnterButtonReady(pin, variant, iconIndex);

    expect(result).toBe(true);
  });

  it("fourDigitPinOnVariant1WithoutIcon_returns_false", () => {
    const pin = "1234";
    const variant = "1";
    const iconIndex = null;

    const result = isEnterButtonReady(pin, variant, iconIndex);

    expect(result).toBe(false);
  });

  it("fourDigitPinOnVariant2_returns_true", () => {
    const pin = "1234";
    const variant = "2";
    const iconIndex = null;

    const result = isEnterButtonReady(pin, variant, iconIndex);

    expect(result).toBe(true);
  });

  it("fourDigitPinOnVariant3_returns_true", () => {
    const pin = "1234";
    const variant = "3";
    const iconIndex = null;

    const result = isEnterButtonReady(pin, variant, iconIndex);

    expect(result).toBe(true);
  });

  it("incompletePin_returns_false", () => {
    const pin = "12";
    const variant = "2";
    const iconIndex = null;

    const result = isEnterButtonReady(pin, variant, iconIndex);

    expect(result).toBe(false);
  });

  it("emptyPin_returns_false", () => {
    const pin = "";
    const variant = "2";
    const iconIndex = null;

    const result = isEnterButtonReady(pin, variant, iconIndex);

    expect(result).toBe(false);
  });
});

describe("isPinBelowMaxDigits", () => {
  it("emptyPinAndNoSuccessBlink_returns_true", () => {
    const pin = "";
    const successBlink = false;

    const result = isPinBelowMaxDigits(pin, successBlink);

    expect(result).toBe(true);
  });

  it("threeDigitPinAndNoSuccessBlink_returns_true", () => {
    const pin = "123";
    const successBlink = false;

    const result = isPinBelowMaxDigits(pin, successBlink);

    expect(result).toBe(true);
  });

  it("fourDigitPin_returns_false", () => {
    const pin = "1234";
    const successBlink = false;

    const result = isPinBelowMaxDigits(pin, successBlink);

    expect(result).toBe(false);
  });
});

describe("isPinCompleteForIconSelect", () => {
  it("fourDigitPinAndNoSuccessBlink_returns_true", () => {
    const pin = "1234";
    const successBlink = false;

    const result = isPinCompleteForIconSelect(pin, successBlink);

    expect(result).toBe(true);
  });

  it("incompletePinAndNoSuccessBlink_returns_false", () => {
    const pin = "12";
    const successBlink = false;

    const result = isPinCompleteForIconSelect(pin, successBlink);

    expect(result).toBe(false);
  });

  it("emptyPinAndNoSuccessBlink_returns_false", () => {
    const pin = "";
    const successBlink = false;

    const result = isPinCompleteForIconSelect(pin, successBlink);

    expect(result).toBe(false);
  });
});

describe("hasExceededMaxInvalidAttempts", () => {
  it("twoInvalidAttempts_returns_false", () => {
    const invalidAttempts = 2;

    const result = hasExceededMaxInvalidAttempts(invalidAttempts);

    expect(result).toBe(false);
  });

  it("threeInvalidAttempts_returns_true", () => {
    const invalidAttempts = 3;

    const result = hasExceededMaxInvalidAttempts(invalidAttempts);

    expect(result).toBe(true);
  });

  it("zeroInvalidAttempts_returns_false", () => {
    const invalidAttempts = 0;

    const result = hasExceededMaxInvalidAttempts(invalidAttempts);

    expect(result).toBe(false);
  });
});

describe("hasTimerExpired", () => {
  it("fiftyNineSeconds_returns_true", () => {
    const elapsed = 59;

    const result = hasTimerExpired(elapsed);

    expect(result).toBe(true);
  });

  it("sixtySeconds_returns_true", () => {
    const elapsed = 60;

    const result = hasTimerExpired(elapsed);

    expect(result).toBe(true);
  });

  it("fiftyEightSeconds_returns_false", () => {
    const elapsed = 58;

    const result = hasTimerExpired(elapsed);

    expect(result).toBe(false);
  });

  it("zeroSeconds_returns_false", () => {
    const elapsed = 0;

    const result = hasTimerExpired(elapsed);

    expect(result).toBe(false);
  });
});
