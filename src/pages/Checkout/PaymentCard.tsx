import React from "react";
import { Flex, Text } from "@chakra-ui/react";

type PaymentMethodProps = {
  onClick: () => void;
  isFocused: boolean;
  icon: React.ReactNode;
  text: String;
};

const PaymentMethod: React.FC<PaymentMethodProps> = (props) => {
  const { onClick, isFocused, icon, text } = props;
  return (
    <Flex
      py={1}
      pl={2}
      flex={1}
      onClick={onClick}
      cursor="pointer"
      borderRadius="md"
      boxShadow={isFocused ? "md" : "none"}
      borderWidth={isFocused ? "2px" : "1px"}
      borderColor={isFocused ? "#3187FA" : ""}
      flexDirection="column"
      justifyContent="center"
    >
      {icon}
      <Text fontSize="sm" fontWeight={500} color={isFocused ? "gray.700" : "gray.500"}>
        {text}
      </Text>
    </Flex>
  );
};

export default PaymentMethod;
