import { Button, Flex, Text } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const onClickReplay = () => {
    setStart(false);
    setCurrentQuizIndex(0);
    setChoices([]);
    setCorrectCount(0);
    setQuizList([]);
  };

  return (
    <Flex flexDir="column" w="100%" h="100%" gap={4}>
      <Flex
        flexDir="column"
        w="100%"
        alignItems="center"
        borderBottom="2px solid black"
        py={2}
      >
        <Text fontSize={[20, 32, 40]} fontWeight="bold">
          {correctCount >= 4
            ? "한글 NFT를 발행해 보세요!"
            : "다시 도전해보세요!"}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        flexGrow={1}
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Flex alignItems="center" justifyContent="center" mx={8} w="100%">
          <QuizTabs quizList={quizList} choices={choices} />
        </Flex>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="center" gap={4}>
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
        {correctCount >= 4 && (
          <Button
            mt={8}
            h={12}
            w={["90%", "70%", "25%"]}
            bgColor="green.500"
            _hover={{ bgColor: "green.700" }}
            onClick={() => navigate("/mint")}
          >
            <Text fontSize={[16, 18, 20]} textColor="white" fontWeight="bold">
              발행하기
            </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default QuizResult;
