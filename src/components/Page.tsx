import { ReactNode } from "react";
import { Flex, FlexProps, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

type PageProps = FlexProps & {
  children: ReactNode;
  hideHeader?: boolean;
};

const Page = ({ children, hideHeader = false, ...props }: PageProps) => {
  return (
    <Flex flexDirection="column" {...props}>
      {!hideHeader && <Header />}
      <Flex flexDir="column" gap={8} mx="auto" maxWidth="1400px" p={{ base: 8, lg: 12 }}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Page;
