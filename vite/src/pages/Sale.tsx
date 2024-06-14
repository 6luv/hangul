import { Flex } from "@chakra-ui/react";
import { FC } from "react";

const Sale: FC = () => {
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
        flexDir="column"
      >
        Sale
      </Flex>
    </Flex>
  );
};

export default Sale;
