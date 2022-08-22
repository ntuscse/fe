import {
  Flex,
  Box,
  Text,
  Divider,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSmartphone } from "react-icons/fi";

const PayNowForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDir="column">
      <Flex borderRadius="lg" borderWidth="1px" flexDirection="column" py={3} px={2}>
        <Box
          backgroundRepeat="no-repeat"
          bgPos="center"
          bgSize="cover"
          backgroundImage="/images/Paynow-logo.png"
          w={32}
          h={8}
        />
        <Text fontSize="sm" fontWeight={500} mt={2} ml={1}>
          PayNow is supported by bank apps and payment apps such as DBS, POSB, OCBC, UOB and GrabPay
        </Text>
        <Divider my={3} />
        <Flex color="gray.600" gap={2} alignItems="center">
          <Icon as={FiSmartphone} w={8} h={8} />
          <Text fontSize="sm" fontWeight={500}>
            After submitting your order, scan the QR code using your preferred banking or payment app.
          </Text>
        </Flex>
      </Flex>
      <Button mt={4} onClick={onOpen}>
        Pay
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalCloseButton />
          <ModalBody>
            <Flex py={8} textAlign="center" justifyContent="center" alignItems="center" flexDir="column">
              <Text fontSize="lg" fontWeight={500}>
                Scan with your bank app or payment app
              </Text>
              <Image
                width={60}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
              />
              <Text color="gray.400" fontSize={["sm"]}>
                Payments collected via Stripe. Payee name may appear as Stripe Payments Singapore Pte. Ltd.
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default PayNowForm;
