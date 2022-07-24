import { ReactNode } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
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
      {children}
      <Footer />
    </Flex>
  );
};

export default Page;
