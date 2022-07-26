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
        <ModalBody p={8}>
          <Image src="https://lh4.googleusercontent.com/1lDMIBCmQuCU1FXFCKcuXnPZi6NssGRwQ7pMevNCsIM_C2Wjd6CXBPEimotMEVlqDmum9_yBzXP8-hLmSR-i1MLL56q2mG9f5bGvDRuQGC9j8ZN1OPhWomR1bBv1RC4kKO6MOSwz" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SizeDialog;
