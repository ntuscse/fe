import React, { useEffect } from "react";
import { Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import routes from "../../utils/constants/routes";

const MerchEmptyView: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = routes.MERCHANDISE_LIST;
    }, 3000);
  }, []);

  return (
    <Center minH="50vh" width="100%">
      <Flex flexDirection="column" gap={8} alignItems="center">
        <Heading fontSize="2xl">The item does not exist...</Heading>
        <Spinner />
        <Text>Redirecting you in 3 seconds...</Text>
      </Flex>
    </Center>
  );
};
export default MerchEmptyView;
