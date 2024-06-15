import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import SlideNfts from "../components/SlideNfts";

const Home: FC = () => {
  return (
    <Flex flexDir="column" w="100%">
      <Flex
        m={12}
        p={4}
        flexGrow={1}
        bgColor="white"
        rounded="lg"
        boxShadow="md"
        alignItems="center"
      >
        <SlideNfts />
      </Flex>
    </Flex>
  );
};

export default Home;
