import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FiXCircle } from "react-icons/fi";

const LoginNotice: FC = () => {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Flex
        w="2xl"
        h={40}
        rounded="2xl"
        border="2px"
        boxShadow="lg"
        alignItems="center"
        justifyContent="center"
      >
        <FiXCircle size={72} color="red" />
        <Text fontSize={[16, 20, 24, 36, 48]} fontWeight="bold" ml={[2, 4, 8]}>
          로그인 후 이용해 주세요!
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginNotice;
