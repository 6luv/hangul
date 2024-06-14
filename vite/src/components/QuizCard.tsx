import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

interface QuizCardProps {
  quiz: IQuizData;
  currentQuizIndex: number;
  onClickChoice: (choice: string) => void;
}

const QuizCard: FC<QuizCardProps> = ({
  quiz,
  currentQuizIndex,
  onClickChoice,
}) => {
  return (
    <>
      <Text fontSize={20} mb={4}>
        {currentQuizIndex + 1} / 5
      </Text>
      <Text fontSize={[20, 32, 48]} fontWeight="bold" pos="relative" mb="40px">
        다음 중 <Text as="span">맞는 것</Text>
        <Box
          bgColor="blue.300"
          pos="absolute"
          rounded="lg"
          w={[14, 24, 36]}
          top={[5, 7, 12]}
          left={[16, 98, 145]}
          p={[1, 2, 2]}
          zIndex={1}
          opacity={0.4}
        />
        을 고르세요.
      </Text>
      <Text fontSize={[16, 20, 32]} mb="60px">
        {quiz?.quiz}
      </Text>
      <Flex flexDir="column" gap={[2, 2, 4]} w={[200, 300, 500]}>
        {quiz?.choices.map((v, i) => (
          <Button
            key={i}
            fontSize={[16, 20, 36]}
            p={[4, 8, 10]}
            rounded="2xl"
            bgColor="blue.100"
            _hover={{ bgColor: "blue.300" }}
            onClick={() => onClickChoice(v)}
          >
            {v}
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default QuizCard;
