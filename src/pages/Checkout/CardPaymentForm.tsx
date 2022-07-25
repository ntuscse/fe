import React, { useState } from "react";

import {
  Button,
  Flex,
  Heading,
  Input,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
    <Flex mt={10} flexDirection="column" gap={4}>
      <Heading fontSize="lg">Card Information</Heading>
      <Input
        size="lg"
        value={cn}
        maxLength={22}
        onChange={cnOnChange}
        pattern="^[0-9\b]+$"
        placeholder="1234  1234  1234  1234"
      />

      <Flex gap={6}>
        <Input
          size="lg"
          maxLength={5}
          value={expiry}
          placeholder="MM/YY"
          onChange={expiryOnChange}
        />
        <InputGroup>
          <Input
            size="lg"
            value={cvc}
            maxLength={3}
            placeholder="CVC"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCVC(e.target.value)
            }
          />
          <InputRightElement pointerEvents="none">
            <Image
              mr={2}
              height={6}
              src="https://icon-library.com/images/cvv-icon/cvv-icon-28.jpg"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Button maxW={150} borderRadius="none" mt={2}>
        <Link to="/summary">CONTINUE</Link>
      </Button>
    </Flex>
  );
};

export default CardPaymentForm;
