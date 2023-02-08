import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <Container maxW="5xl">
      <Flex
        h="100vh"
        gap={8}
        flexDir="column"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          <Text as="span" color="orange.400">
            <WarningTwoIcon w={20} h={20} />
          </Text>
          <Text mt={12}>Error 404</Text>
          <Text> Page Not Found.</Text>
        </Heading>

        <Stack spacing={6} direction="row">
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </Stack>
      </Flex>
    </Container>
  );
};
