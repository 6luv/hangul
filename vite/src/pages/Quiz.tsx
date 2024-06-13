import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

const Quiz: FC = () => {
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
        <Text fontSize={48} fontWeight="bold" pos="relative" mb="40px">
          다음 중 <Text as="span">맞는 것</Text>
          <Box
            bgColor="blue.300"
            pos="absolute"
            rounded="lg"
            w={36}
            top={12}
            left={145}
            p={2}
            zIndex={1}
            opacity={0.4}
          />
          을 고르세요.
        </Text>
        <Text fontSize={32} mb="40px">
          그는 ________가 납작하다.
        </Text>
        <Flex flexDir="column" gap={4} w={500}>
          <Button fontSize={36} p={10} rounded="2xl">
            뒤통수
          </Button>
          <Button fontSize={36} p={10} rounded="2xl">
            뒷통수
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Quiz;
