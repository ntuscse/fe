import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Image, Text, GridItem, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import routes from "../../utils/constants/routes";

type card = {
  productId: string;
  imgSrc: string;
  text: string;
  price: number;
  sizeRange: string;
};

const Card = ({ productId, imgSrc, text, price, sizeRange }: card) => {
  return (
    <GridItem role="group" cursor="pointer" mt={4}>
      <Link to={`${routes.HOME}/${productId}`}>
        <Box
          boxShadow="sm"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          _groupHover={{ boxShadow: "xl" }}
        >
          <Image src={imgSrc} w="100%" maxHeight="300" fallbackSrc="https://via.placeholder.com/150" />
          <Box p={2}>
            <Flex
              justifyContent="space-between"
              gap={2}
              fontWeight={500}
              textColor="primary.600"
              fontSize={["sm", "md"]}
            >
              <Text noOfLines={2}>{text}</Text>
              <Text align="center">${price.toFixed(2)}</Text>
            </Flex>
            <Flex textColor="gray.400" justifyContent="space-between" mt={1} alignItems="center">
              <Text fontWeight={600} textTransform="uppercase" fontSize={["xs", "sm"]}>
                {sizeRange}
              </Text>
              <ArrowForwardIcon />
            </Flex>
          </Box>
        </Box>
      </Link>
    </GridItem>
  );
};

export default Card;
