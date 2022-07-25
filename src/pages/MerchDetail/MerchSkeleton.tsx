import React from "react";
import { Flex, Skeleton, Divider } from "@chakra-ui/react";

const MerchSkeleton: React.FC = () => {
  return (
    <>
      <Flex flex={1} justifyContent="center">
        <Skeleton height="300px" width="95%" />
      </Flex>
      <Flex flex={1} flexDirection="column">
        <Flex gap={2} flexDirection="column">
          <Skeleton width="90%" height="42px" />
          <Skeleton width="35%" height="28px" />
        </Flex>
        <Divider mt={4} mb={6} />
        <Skeleton width="90%" height="42px" />
        <Skeleton width="90%" height="42px" />
        <Divider my={6} />
        <Skeleton width="90%" height="42px" />
        <Divider my={6} />
        <Skeleton width="90%" height="150px" />
      </Flex>
    </>
  );
};

export default MerchSkeleton;
