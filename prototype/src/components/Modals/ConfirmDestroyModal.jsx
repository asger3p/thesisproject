import { createPortal } from "react-dom";
import {
  ModalOverlay,
  ModalPanel,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "./ModalSC";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import BackButton from "../buttons/BackButton/BackButton";

export default function ConfirmDestroyModal({ isOpen, onBack, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay>
      <ModalPanel onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⚠️</div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                lineHeight: 1.6,
              }}
            >
              <li>You cannot navigate back after this step.</li>
              <li>
                Make sure you have memorised the information before continuing.
              </li>
              <li>Do not write down your credentials.</li>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter style={{ gap: "12px", justifyContent: "flex-end" }}>
          <BackButton onClick={onBack}>Go back</BackButton>
          <PrimaryButton onClick={onConfirm}>Continue</PrimaryButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>,
    document.body,
  );
}
