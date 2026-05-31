import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScenarioContainer,
  TextTyping,
  TypedText,
  ButtonWrapper,
} from "./ScenarioSC";
import PrimaryButton from "../../components/buttons/PrimaryButton/PrimaryButton";
import { usePageTimer } from "../../lib/usePageTimer";
import { useBlockBrowserBack } from "../../lib/useBlockBrowserBack";
import openDoorSound from "../../assets/sounds/OpenDoor.mp3";
import outDoorAmbient from "../../assets/sounds/Outdoors.mp3";

export default function ScenarioEveryday() {
  const navigate = useNavigate();
  const { saveElapsedTime } = usePageTimer();
  useBlockBrowserBack();

  const fullText = "You are coming home. There's no one else present.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(timer);
    }, 2200 / fullText.length);
    return () => clearInterval(timer);
  }, []);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(outDoorAmbient);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio.play().catch((err) => {
      console.warn("Ambient autoplay failed:", err);
    });

    let volume = 0;
    fadeIntervalRef.current = setInterval(() => {
      volume += 0.02;

      if (volume >= 0.25) {
        volume = 0.25;
        clearInterval(fadeIntervalRef.current);
      }

      audio.volume = volume;
    }, 100);

    return () => {
      clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  function goNext() {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    navigate("/panel");
  }

  function handleNext() {
    const audio = audioRef.current;

    saveElapsedTime("scenarioEverydayTime");
    sessionStorage.setItem("attempt", "1");

    const doorAudio = new Audio(openDoorSound);
    doorAudio.volume = 1;
    doorAudio.onended = goNext;

    doorAudio.play().catch((err) => {
      console.warn("Door sound failed:", err);
      goNext();
    });

    if (audio) {
      clearInterval(fadeIntervalRef.current);

      let volume = audio.volume;

      const fadeOut = setInterval(() => {
        volume -= 0.01;

        if (volume <= 0) {
          audio.volume = 0;
          clearInterval(fadeOut);
          audio.pause();
          audio.currentTime = 0;
          return;
        }

        audio.volume = volume;
      }, 100);
    }

    setTimeout(goNext, 1500);
  }

  return (
    <ScenarioContainer>
      <TextTyping>
        <TypedText>{displayed}</TypedText>
      </TextTyping>

      <ButtonWrapper>
        <PrimaryButton onClick={handleNext}>Open door</PrimaryButton>
      </ButtonWrapper>
    </ScenarioContainer>
  );
}
