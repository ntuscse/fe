import React from "react";
import { Flex, Skeleton, Divider, GridItem, Grid } from "@chakra-ui/react";

const MerchSkeleton: React.FC = () => {
  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }} columnGap={16} rowGap={4}>
      <GridItem colSpan={2}>
        <Skeleton height="300px" width="100%" />
      </GridItem>
      <GridItem colSpan={3}>
        <Flex gap={2} flexDirection="column">
          <Skeleton height="42px" />
          <Skeleton height="28px" />
        </Flex>
        <Divider mt={4} mb={6} />
        <Skeleton height="42px" />
        <Skeleton height="42px" />
        <Divider my={6} />
        <Skeleton height="42px" />
        <Divider my={6} />
        <Skeleton width="100%" height="150px" />
      </GridItem>
    </Grid>
  );
};

export default MerchSkeleton;
