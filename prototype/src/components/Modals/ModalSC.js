import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
`;

export const ModalPanel = styled.div`
  position: relative;
  width: min(960px, 100%);
  max-height: 90vh;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #ececec;
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  line-height: 1.2;
  color: #1f1f1f;
`;

export const CloseButton = styled.button`
  border: none;
  background: #f3f3f3;
  color: #222;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: #e7e7e7;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const ModalSection = styled.div`
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #ececec;
`;
