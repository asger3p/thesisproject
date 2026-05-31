import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTimer } from "../../lib/usePageTimer";
import {
  ButtonRow,
  InstructionPageLayout,
  PaperWrapper,
} from "./InstructionPageSC";
import PrimaryButton from "../../components/buttons/PrimaryButton/PrimaryButton";
import BackButton from "../../components/buttons/BackButton/BackButton";
import PaperA4Top from "../../components/PaperA4/PaperA4Top";
import PaperA4Bottom from "../../components/PaperA4/PaperA4Bottom";
import IntroSection from "./IntroSection";
import InstructionsSection from "./InstructionsSection";
import CredentialsSection from "./CredentialsSection";
import ScissorLine from "./ScissorLine";
import ConfirmDestroyModal from "../../components/Modals/ConfirmDestroyModal";

export default function InstructionPage() {
  const navigate = useNavigate();
  const { saveElapsedTime } = usePageTimer();
  const [isCutting, setIsCutting] = useState(false);
  const [credentialsDestroyed, setCredentialsDestroyedState] = useState(false);
  const [scratchUnlocked, setScratchUnlocked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("credentials_destroyed") === "true") {
      setCredentialsDestroyedState(true);
    }
  }, []);

  function handleDestroyAndContinue() {
    setIsCutting(true);
    localStorage.setItem("credentials_destroyed", "true");
    setTimeout(() => {
      saveElapsedTime("instructionsTime");
      navigate("/ScenarioEveryday");
    }, 1400);
  }

  function handleContinue() {
    saveElapsedTime("instructionsTime");
    navigate("/ScenarioEveryday");
  }

  function handleBack() {
    saveElapsedTime("instructionsTime");
    navigate("/");
  }

  return (
    <InstructionPageLayout>
      <PaperWrapper>
        <PaperA4Top
          isCutting={isCutting}
          credentialsDestroyed={credentialsDestroyed}
        >
          <IntroSection />
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #cbd5e1",
              margin: "0",
              width: "100%",
            }}
          />
          <InstructionsSection />
          <ScissorLine isCutting={isCutting} />
        </PaperA4Top>
        {!credentialsDestroyed && (
          <PaperA4Bottom isCutting={isCutting}>
            <CredentialsSection
              isCutting={isCutting}
              onUnlocked={() => setScratchUnlocked(true)}
            />
          </PaperA4Bottom>
        )}
      </PaperWrapper>

      {!isCutting && (
        <ButtonRow>
          <BackButton onClick={handleBack}>Back</BackButton>
          {credentialsDestroyed ? (
            <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => setShowConfirmModal(true)}
              disabled={!scratchUnlocked}
            >
              Destroy and continue
            </PrimaryButton>
          )}
        </ButtonRow>
      )}
      <ConfirmDestroyModal
        isOpen={showConfirmModal}
        onBack={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          handleDestroyAndContinue();
        }}
      />
    </InstructionPageLayout>
  );
}
