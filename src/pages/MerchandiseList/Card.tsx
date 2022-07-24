import { Box, Image, Text, GridItem } from "@chakra-ui/react";
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
    <GridItem w="100%" role="group" cursor="pointer" textAlign="center" mt={4}>
      <Link to={`/merch/${itemId}`}>
        <Box _groupHover={{ boxShadow: "xl" }} boxShadow="md" borderRadius={5}>
          <Image src={imgSrc} w="100%" borderRadius={5} />
        </Box>
        <Text visibility="hidden">{sizeRange}</Text>
        <a href="/" style={{ textDecoration: "none" }}>
          <Text align="center" textStyle={["sm", "h6"]} textColor="primary.600" fontWeight={700}>
            {text}
          </Text>
        </a>
        <Text textColor="gray.400" fontWeight={700} fontSize={["sm", "lg"]}>
          {sizeRange}
        </Text>
        <Text align="center" fontSize={["sm", "md"]} textColor="primary.600">
          ${price.toFixed(2)}
        </Text>
      </Link>
    </GridItem>
  );
};

export default Card;
