import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Image, Text, GridItem, Flex, Badge, AspectRatio, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import routes from "../../utils/constants/routes";
import { displayPrice } from "../../utils/functions/currency";

type CardProps = {
  productId: string;
  imgSrc?: string;
  text: string;
  price: number;
  sizeRange: string;
  isOutOfStock?: boolean;
};

const Card = ({ productId, imgSrc, text, price, sizeRange, isOutOfStock }: CardProps) => {
  return (
    <GridItem role="group" cursor="pointer" mt={4}>
      <Link to={`${routes.PRODUCT}/${productId}`}>
        <Box
          boxShadow="sm"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          _groupHover={{ boxShadow: "xl" }}
        >
          <Center>
            <Image 
              src={imgSrc} 
              fallbackSrc="https://via.placeholder.com/300" 
              boxSize="300"
              objectFit='contain'
            />
          </Center>
          <Box p={2}>
            <Flex
              justifyContent="space-between"
              gap={2}
              fontWeight={500}
              textColor="primary.600"
              fontSize={["sm", "md"]}
            >
              <Text noOfLines={2}>{text}</Text>
              <Text align="center">{displayPrice(price)}</Text>
            </Flex>
            {!isOutOfStock && (
            <Flex textColor="gray.400" justifyContent="space-between" mt={1} alignItems="center">
              <Text fontWeight={600} textTransform="uppercase" fontSize={["xs", "sm"]}>
                {sizeRange}
              </Text>
              <ArrowForwardIcon />
            </Flex>
            )}
            {isOutOfStock && (
              <Flex justifyContent="left" mt={1} alignItems="center">
                <Badge color="grey" mr={2} variant="outline" display="inline">
                  out of stock
                </Badge>
              </Flex>
            )}
          </Box>
        </Box>
      </Link>
    </GridItem>
  );
};

export default Card;
