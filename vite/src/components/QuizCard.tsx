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
      <Text fontSize={32} mb="60px">
        {quiz.quiz}
      </Text>
      <Flex flexDir="column" gap={4} w={500}>
        {quiz.choices.map((v, i) => (
          <Button
            key={i}
            fontSize={36}
            p={10}
            rounded="2xl"
            bgColor="blue.100"
            _hover={{ bgColor: "blue.300", textColor: "white" }}
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
