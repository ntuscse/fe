import React from "react";
import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductListSkeleton: React.FC = () => {
  return (
    <Flex wrap="wrap" justifyContent="space-evenly" mb={5} px={[0, 10]} width="100%">
      {new Array(8).fill(null).map((item: any) => (
        <Flex p={3} flexDir="column" textAlign="center" w={{ base: 190, lg: "24%" }}>
          <Skeleton h={{ base: 200 }} width="100%" />
          <SkeletonText mt={4} noOfLines={3} spacing="4" />
          {item}
        </Flex>
      ))}
    </Flex>
  );
};

export default ProductListSkeleton;
