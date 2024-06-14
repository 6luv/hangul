import { Button, Flex, Text } from "@chakra-ui/react";
import { FC, useState } from "react";

const My: FC = () => {
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);

  const onClickApprove = () => {
    setIsApprovedForAll(!isApprovedForAll);
  };

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
        <Flex
          h={20}
          borderBottom="2px solid black"
          w="100%"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Text fontSize="32" fontWeight="bold">
            판매 등록 권한
          </Text>
          <Button
            colorScheme={isApprovedForAll ? "red" : "green"}
            onClick={onClickApprove}
          >
            {isApprovedForAll ? "거부" : "승인"}
          </Button>
        </Flex>
        <Flex>내 NFT</Flex>
      </Flex>
    </Flex>
  );
};

export default My;
