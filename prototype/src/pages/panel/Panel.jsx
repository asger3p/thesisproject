import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BackgroundWrapper,
  LivingroomImage,
  Wall,
  PadsContainer,
} from "./PanelSC";
import NumPad from "../../components/Pads/NumPad";
import ThemePad, { themeIcons } from "../../components/Pads/ThemePad";
import livingroomImg from "../../assets/livingroom_COLOURBOX27470480.webp";
import { usePageTimer } from "../../lib/usePageTimer";
import { useBlockBrowserBack } from "../../lib/useBlockBrowserBack";

import fail from "../../assets/sounds/Fail.mp3";
import success from "../../assets/sounds/Success.mp3";
import timer from "../../assets/sounds/Timer.mp3";
import alarm from "../../assets/sounds/Alarm.mp3";

import {
  determineRegularOrPanicAccess,
  isEnterButtonReady,
  isPinBelowMaxDigits,
  isPinCompleteForIconSelect,
  hasExceededMaxInvalidAttempts,
  hasTimerExpired,
} from "./panelLogic";

const createAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
};

export default function Panel() {
  const navigate = useNavigate();
  const { getElapsedTime, saveElapsedTime } = usePageTimer();
  useBlockBrowserBack();

  let variant = sessionStorage.getItem("variant");
  if (!variant) {
    variant = "1";
    sessionStorage.setItem("variant", variant);
  }

  let attempt = sessionStorage.getItem("attempt");
  if (!attempt) {
    attempt = "1";
    sessionStorage.setItem("attempt", attempt);
  }

  const nextRoute = attempt === "1" ? "/ScenarioDuress" : "/survey";

  const [pin, setPin] = useState("");
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [errorBlink, setErrorBlink] = useState(false);
  const [successBlink, setSuccessBlink] = useState(false);
  const [enterBlinkKey, setEnterBlinkKey] = useState(0);
  const enterArmed = isEnterButtonReady(pin, variant, selectedIconIndex);
  const [beepTick, setBeepTick] = useState(0);
  const [alarmActive, setAlarmActive] = useState(false);

  const timerInterval = useRef(null);
  const timerStart = useRef(null);
  const hasFinished = useRef(false);
  const alarmStarted = useRef(false);
  const invalidAttempts = useRef(0);

  const failSound = useMemo(() => createAudio(fail), []);
  const successSound = useMemo(() => createAudio(success), []);
  const timerSound = useMemo(() => createAudio(timer), []);
  const alarmSound = useMemo(() => createAudio(alarm), []);

  const playAudio = (audio) => {
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const resetSystem = () => {
    setPin("");
    setSelectedIconIndex(null);
    setEnterBlinkKey(0);
  };

  const triggerError = () => {
    invalidAttempts.current += 1;
    playAudio(failSound);
    setErrorBlink(true);

    setTimeout(() => {
      setErrorBlink(false);
      resetSystem();
      if (hasExceededMaxInvalidAttempts(invalidAttempts.current)) {
        triggerAlarm();
      }
    }, 600);
  };

  const triggerAlarm = () => {
    if (alarmStarted.current) return;
    alarmStarted.current = true;
    clearInterval(timerInterval.current);

    const existing = JSON.parse(localStorage.getItem("session_data") || "{}");
    localStorage.setItem(
      "session_data",
      JSON.stringify({
        ...existing,
        [`panelTime${attempt}`]:
          (existing[`panelTime${attempt}`] || 0) + getElapsedTime(),
        [`accessType${attempt}`]: "alarm",
      }),
    );

    setAlarmActive(true);
    alarmSound.currentTime = 0;
    alarmSound.play().catch(() => {});

    setTimeout(() => finishAndNavigate(), 7000);
  };

  const finishAndNavigate = () => {
    if (hasFinished.current) return;

    hasFinished.current = true;
    alarmStarted.current = true;

    clearInterval(timerInterval.current);
    alarmSound.pause();
    alarmSound.currentTime = 0;

    navigate(nextRoute);
  };

  const handleDigit = (digit) => {
    if (!isPinBelowMaxDigits(pin, successBlink)) return;

    setPin((prev) => prev + digit);
    setEnterBlinkKey(0);
  };

  const handleDelete = () => {
    if (successBlink) return;
    setPin((prev) => prev.slice(0, -1));
    setEnterBlinkKey(0);
  };

  const handleIconClick = (index) => {
    if (!isPinCompleteForIconSelect(pin, successBlink)) return;

    setSelectedIconIndex(index);
    setEnterBlinkKey((prev) => prev + 1);
  };

  const handleEnter = () => {
    const accessType = determineRegularOrPanicAccess(
      variant,
      pin,
      selectedIconIndex,
    );
    if (accessType === null) {
      triggerError();
      return;
    }

    playAudio(successSound);
    setSuccessBlink(true);

    const existing = JSON.parse(localStorage.getItem("session_data") || "{}");
    const data = {
      ...existing,
      [`panelTime${attempt}`]:
        (existing[`panelTime${attempt}`] || 0) + getElapsedTime(),
      [`accessType${attempt}`]: accessType,
    };

    if (variant === "1") {
      data[`selectedAnimal${attempt}`] = themeIcons[selectedIconIndex]?.name;
      data[`selectedAnimalIndex${attempt}`] = selectedIconIndex;
    }

    localStorage.setItem("session_data", JSON.stringify(data));

    setTimeout(() => {
      setSuccessBlink(false);
      finishAndNavigate();
    }, 2000);
  };

  useEffect(() => {
    timerStart.current = Date.now();

    timerInterval.current = setInterval(() => {
      if (hasFinished.current) return;

      const elapsed = (Date.now() - timerStart.current) / 1000;

      if (elapsed < 45) {
        playAudio(timerSound);
        setBeepTick((t) => t + 1);
      } else if (elapsed < 59) {
        playAudio(timerSound);
        setBeepTick((t) => t + 1);
        setTimeout(() => {
          if (!hasFinished.current) {
            playAudio(timerSound);
            setBeepTick((t) => t + 1);
          }
        }, 500);
      } else if (hasTimerExpired(elapsed) && !alarmStarted.current) {
        triggerAlarm();
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval.current);
      alarmSound.pause();
      alarmSound.currentTime = 0;
    };
  }, []);

  const maskedPin = "•".repeat(pin.length).padEnd(4, "–");

  if (variant === "2" || variant === "3") {
    return (
      <BackgroundWrapper>
        <LivingroomImage src={livingroomImg} alt="" />
        <Wall>
          <PadsContainer>
            <NumPad
              pinDisplay={maskedPin}
              $error={errorBlink}
              $success={successBlink}
              onDigit={handleDigit}
              onDelete={handleDelete}
              onEnter={handleEnter}
              $armed={enterArmed}
              enterKey={enterBlinkKey}
              beepTick={beepTick}
              $alarm={alarmActive}
            />
          </PadsContainer>
        </Wall>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <LivingroomImage src={livingroomImg} alt="" />
      <Wall>
        <PadsContainer>
          <NumPad
            pinDisplay={maskedPin}
            $error={errorBlink}
            $success={successBlink}
            onDigit={handleDigit}
            onDelete={handleDelete}
            beepTick={beepTick}
            $alarm={alarmActive}
          />
          <ThemePad
            onIconClick={handleIconClick}
            onEnter={handleEnter}
            $armed={enterArmed}
            enterKey={enterBlinkKey}
          />
        </PadsContainer>
      </Wall>
    </BackgroundWrapper>
  );
}
