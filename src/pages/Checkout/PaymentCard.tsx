import React from "react";
import { Flex } from "@chakra-ui/react";

type PaymentCardProps = {
  onClick: () => void;
  isFocused: boolean;
  children: React.ReactNode;
};

const PaymentCard: React.FC<PaymentCardProps> = (props) => {
  const { onClick, isFocused, children } = props;
  return (
    <Flex
      onClick={onClick}
      flexBasis="25%"
      cursor="pointer"
      borderRadius="lg"
      borderWidth={isFocused ? "2px" : "1px"}
      borderColor={isFocused ? "#3187FA" : ""}
      flexDirection="column"
      gap={2}
      p={3}
      w={130}
      justifyContent="center"
    >
      {children}
    </Flex>
  );
};

export default PaymentCard;
