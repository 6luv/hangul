import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import quizData from "../data/quizData.json";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import QuizResult from "../components/QuizResult";

const maxQuizIndex = 29;
const minQuizIndex = 0;

const Quiz: FC = () => {
  const [start, setStart] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizList, setQuizList] = useState<IQuizData[]>([]);
  const [quizIndexList, setQuizIndexList] = useState<number[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const { signer, setIsPassed } = useOutletContext<OutletContext>();

  const onClickStart = () => {
    setStart(true);
    getCurrentQuizList();
  };

  const getCurrentQuizList = () => {
    const tempQuiz = [];
    const tempQuizIndex = [];
    const tempIndex = new Set();

    while (tempQuiz.length < 5) {
      const randomIndex =
        Math.floor(Math.random() * (maxQuizIndex - minQuizIndex + 1)) +
        minQuizIndex;

      if (!tempIndex.has(randomIndex)) {
        tempQuiz.push(quizData[randomIndex]);
        tempQuizIndex.push(randomIndex);
        tempIndex.add(randomIndex);
      }
    }

    setQuizList(tempQuiz);
    setQuizIndexList(tempQuizIndex);
  };

  const onClickChoice = (v: string) => {
    if (v === quizData[quizIndexList[currentQuizIndex]].correctAnswer) {
      setCorrectCount(correctCount + 1);
    }

    setChoices([...choices, v]);
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  useEffect(() => {
    if (correctCount >= 4) {
      setIsPassed(true);
    }
  }, [correctCount]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex
        className="mainFlexStyle"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="full"
      >
        {start ? (
          <>
            {currentQuizIndex < 5 ? (
              <QuizCard
                quiz={quizList[currentQuizIndex]}
                currentQuizIndex={currentQuizIndex}
                onClickChoice={onClickChoice}
              />
            ) : (
              <QuizResult
                setStart={setStart}
                setCurrentQuizIndex={setCurrentQuizIndex}
                choices={choices}
                setChoices={setChoices}
                correctCount={correctCount}
                setCorrectCount={setCorrectCount}
                quizList={quizList}
                setQuizList={setQuizList}
              />
            )}
          </>
        ) : (
          <>
            <Image
              src="/images/quiz-image.png"
              alt="한글"
              w={[200, 300, 300]}
              mb={[8, 16, 16]}
            />
            <Text
              fontSize={[20, 32, 32]}
              fontWeight="semibold"
              textAlign="center"
            >
              나의 한글 맞춤법 실력은? <br /> 문제 풀고 NFT 받아가세요!
            </Text>
            <Button
              mt={8}
              h={12}
              w={["60%", "60%", "25%"]}
              onClick={onClickStart}
              isDisabled={!signer}
              bgColor="blue.300"
              _hover={{ bgColor: "blue.500" }}
            >
              <Text fontSize={20} textColor="white" fontWeight="bold">
                {signer ? "시작" : "로그인 후 이용해 주세요!"}
              </Text>
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Quiz;
