import { ReactNode } from "react";
import { Flex, FlexProps, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

type PageProps = FlexProps & {
  children: ReactNode;
  hideHeader?: boolean;
  contentWidth?: string;
};

const Page = ({ children, hideHeader = false, contentWidth = "1400px", ...props }: PageProps) => {
  return (
    <Flex flexDirection="column" {...props}>
      {!hideHeader && <Header />}
      <Box w="100%" flexDir="column" mt={14} mx="auto" maxWidth={contentWidth}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Page;
