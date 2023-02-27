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
  sizeChart?: string;
  isOpen: boolean;
  onClose: () => void;
};

const SizeDialog: React.FC<SizeDialogType> = ({ sizeChart, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Size Chart</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody width="fit-content">
          <Image src={sizeChart} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SizeDialog;
