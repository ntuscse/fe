import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";

type SizeDialogType = {
  isOpen: boolean;
  onClose: () => void;
};

const SizeDialog: React.FC<SizeDialogType> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Size Chart</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody width="fit-content">
          <Image src="/images/size-chart.png" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SizeDialog;
