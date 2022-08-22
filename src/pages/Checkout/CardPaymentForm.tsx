import React, { useState } from "react";
import { Button, Flex, Text, Input, Image, InputGroup, InputRightElement } from "@chakra-ui/react";

const CardPaymentForm = () => {
  const [cn, setCN] = useState<string | undefined>("");
  const [cvc, setCVC] = useState<string | undefined>("");
  const [expiry, setExpiry] = useState<string | undefined>("");

  const expiryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll("/", "");
    // Allow only numeric inputs.
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      // Interval 4 integer, add  two white space.
      setExpiry(value?.match(/.{1,2}/g)?.join("/"));
    }
  };

  const cnOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove white spaces.
    const value = e.target.value.replace(/\s+/g, "");
    // Allow only numeric inputs.
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      // Interval 4 integer, add  two white space.
      setCN(value?.match(/.{1,4}/g)?.join("  "));
    }
  };

  return (
    <Flex flexDir="column">
      <Text fontWeight={500} fontSize={["md", "l"]}>
        Card information
      </Text>
      <Input
        mt={2}
        size="lg"
        value={cn}
        maxLength={22}
        onChange={cnOnChange}
        pattern="^[0-9\b]+$"
        placeholder="1234  1234  1234  1234"
      />
      <Flex gap={6} mt={4}>
        <Input size="lg" maxLength={5} value={expiry} placeholder="MM/YY" onChange={expiryOnChange} />
        <InputGroup>
          <Input
            size="lg"
            value={cvc}
            maxLength={3}
            placeholder="CVC"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCVC(e.target.value)}
          />
          <InputRightElement pointerEvents="none">
            <Image mr={2} height={6} src="https://icon-library.com/images/cvv-icon/cvv-icon-28.jpg" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Button mt={4}>Pay</Button>
    </Flex>
  );
};

export default CardPaymentForm;
