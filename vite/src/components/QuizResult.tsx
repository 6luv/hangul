import { Button, Flex, Text } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import QuizTabs from "./QuizTabs";

interface QuizResultProps {
  setStart: Dispatch<SetStateAction<boolean>>;
  setCurrentQuizIndex: Dispatch<SetStateAction<number>>;
  choices: string[];
  setChoices: Dispatch<SetStateAction<string[]>>;
  correctCount: number;
  setCorrectCount: Dispatch<SetStateAction<number>>;
  quizList: IQuizData[];
  setQuizList: Dispatch<SetStateAction<IQuizData[]>>;
}

const QuizResult: FC<QuizResultProps> = ({
  setStart,
  setCurrentQuizIndex,
  choices,
  setChoices,
  correctCount,
  setCorrectCount,
  quizList,
  setQuizList,
}) => {
  const onClickReplay = () => {
    setStart(false);
    setCurrentQuizIndex(0);
    setChoices([]);
    setCorrectCount(0);
    setQuizList([]);
  };

  return (
    <Flex flexDir="column" w="100%" h="100%" py={4}>
      <Flex flexDir="column" w="100%" alignItems="center" my={4}>
        <Text fontSize={[20, 32, 40]} fontWeight="bold">
          {correctCount >= 4
            ? "한글 NFT를 발행해 보세요!"
            : "다시 도전해보세요!"}
        </Text>
      </Flex>
      <Flex flexDir="column" flexGrow={1} w="100%" alignItems="center">
        <Text
          fontSize={[20, 24, 28]}
          textColor="blue.500"
          fontWeight="bold"
          borderBottom="4px"
          mb={8}
        >
          {correctCount} / 5
        </Text>
        <Flex alignItems="center" justifyContent="center" mx={8} w="100%">
          <QuizTabs quizList={quizList} choices={choices} />
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%" alignItems="center">
        <Button
          mt={8}
          h={12}
          w={["90%", "70%", "25%"]}
          bgColor="blue.300"
          _hover={{ bgColor: "blue.500" }}
          onClick={onClickReplay}
        >
          <Text fontSize={[16, 18, 20]} textColor="white" fontWeight="bold">
            다시 풀어보기
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuizResult;
