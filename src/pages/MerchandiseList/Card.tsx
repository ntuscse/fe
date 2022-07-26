import { Box, Image, Text, GridItem, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type card = {
  itemId: string;
  imgSrc: string;
  text: string;
  price: number;
  sizeRange: string;
};

const Card = ({ itemId, imgSrc, text, price, sizeRange }: card) => {
  return (
    <GridItem role="group" cursor="pointer" textAlign="center" mt={4}>
      <Link to={`/merch/${itemId}`}>
        <Box _groupHover={{ boxShadow: "xl" }} boxShadow="md" borderRadius={5}>
          <Image src={imgSrc} w="100%" borderRadius={5} fallbackSrc="https://via.placeholder.com/150" />
        </Box>
        <Text align="center" noOfLines={2} textColor="primary.600" fontWeight={600} mt={4}>
          {text}
        </Text>
        <Flex justifyContent="space-between" mt={2}>
          <Text textColor="gray.400" fontWeight={700} textTransform="uppercase" fontSize={["sm", "md"]}>
            {sizeRange}
          </Text>
          <Text align="center" fontSize={["sm", "md"]} fontWeight="600" textColor="primary.600">
            ${price.toFixed(2)}
          </Text>
        </Flex>
      </Link>
    </GridItem>
  );
};

export default Card;
