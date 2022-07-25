import { Flex, Image, Text } from "@chakra-ui/react";

const PayLahForm = () => {
  return (
    <Flex
      mt={6}
      alignItems="center"
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      flexDirection="column"
    >
      <Image
        maxWidth={60}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
      />
      <Text fontWeight="bold">SCSE Club QR Code</Text>
    </Flex>
  );
};
export default PayLahForm;
