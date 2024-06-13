import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";

const Mint: FC = () => {
  const { isPassed } = useOutletContext<OutletContext>();

  return (
    <Flex flexDir="column" w="100%">
      <Flex
        m={12}
        p={4}
        flexGrow={1}
        bgColor="white"
        rounded="lg"
        boxShadow="md"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Image
          w={80}
          opacity="0.7"
          rounded="2xl"
          src="/images/random.png"
          alt="랜덤"
        />
        <Button
          mt={8}
          h={12}
          w="28%"
          isDisabled={isPassed}
          bgColor="blue.300"
          _hover={{ bgColor: "blue.500" }}
        >
          <Text fontSize={20} textColor="white" fontWeight="bold">
            발행하기
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Mint;
