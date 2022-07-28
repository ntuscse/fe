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
  Box,
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
        <ModalBody p={8} width="fit-content">
          <Image src="https://uniqlo.scene7.com/is/image/UNIQLO/us2_graph_bodysize_uq_m" />
          <Box my={4} />
          <Image src="http://uniqlo.scene7.com/is/image/UNIQLO/us2_graph_bodysize_uq_w" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SizeDialog;
