import { FC } from "react";
import { Center, Flex, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import routes from "../../utils/constants/routes";

const HistoryEmptyView: FC = () => {
  return (
    <Center minH="50vh" width="100%">
      <Flex flexDirection="column" gap={8} alignItems="center">
        <Heading fontSize="2xl"> You have no past purchases</Heading>
        <Link to={routes.HOME}>
          <Button>Continue Shopping</Button>
        </Link>
      </Flex>
    </Center>
  );
};
export default HistoryEmptyView;
