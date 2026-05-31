import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  ModalOverlay,
  ModalPanel,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalSection,
  ModalFooter,
} from "./ModalSC";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";

const modalTexts = {
  1: {
    everyday: {
      title: "Everyday use",
      body: "In normal situations, you enter your usual PIN together with your given symbol. These credentials are found on the buttom part of this page. This works as your standard way of disarming the alarm and does not send any alert.",
    },
    threatened: {
      title: "When being threatened",
      body: "If you are being threatened, enter your PIN found on the buttom of this page with a different symbol than the one your normal one. This makes it appear that the alarm was disarmed normally, while the system silently sends an alert to the monitoring station.",
    },
  },
  2: {
    everyday: {
      title: "Everyday use",
      body: "In normal situations, you enter your regular 4-digit PIN to disarm the system as usual.",
    },
    threatened: {
      title: "When being threatened",
      body: "If you are under threat, you enter your panic PIN instead of your regular PIN. The system appears to disarm normally, but it silently sends an alert.",
    },
  },
  3: {
    everyday: {
      title: "Everyday use",
      body: "In normal situations, you enter your regular 4-digit PIN to disarm the system as usual.",
    },
    threatened: {
      title: "When being threatened",
      body: "If you are under threat, you enter a PIN that ends with a different last digit. This makes the system appear to disarm normally while silently triggering an alert.",
    },
  },
};

export default function ManualModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const variant = sessionStorage.getItem("variant") || "1";
  const texts = modalTexts[variant] ?? modalTexts["1"];

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalPanel onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Manual</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalSection>
            <h3 style={{ margin: "0 0 8px" }}>{texts.everyday.title}</h3>
            <p style={{ margin: 0 }}>{texts.everyday.body}</p>
          </ModalSection>
          <ModalSection>
            <h3 style={{ margin: "0 0 8px" }}>{texts.threatened.title}</h3>
            <p style={{ margin: 0 }}>{texts.threatened.body}</p>
          </ModalSection>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>,
    document.body,
  );
}
