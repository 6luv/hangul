import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import SlideNfts from "../components/SlideNfts";

const Home: FC = () => {
  return (
    <Flex flexDir="column" w="100%">
      <Flex
        className="mainFlexStyle"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          h="70%"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <Text fontWeight="bold" fontSize={48}>
            한글
          </Text>
          <Text>프로젝트 설명</Text>
        </Flex>
        <SlideNfts />
      </Flex>
    </Flex>
  );
};

export default Home;
