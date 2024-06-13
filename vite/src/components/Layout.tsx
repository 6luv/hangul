import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <Flex
      maxW={1280}
      mx="auto"
      minH="95vh"
      flexDir="column"
      my={4}
      rounded="lg"
      border="2px"
      borderColor="teal.800"
      boxShadow="2xl"
    >
      <Header />
      <Flex flexGrow={1} bgColor="blue.100" roundedBottom="lg">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
