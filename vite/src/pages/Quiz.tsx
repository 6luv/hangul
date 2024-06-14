import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import quizData from "../data/quizData.json";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

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
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * (22 - 0 + 1)) + 0;
      tempQuiz.push(quizData[randomIndex]);
      tempQuizIndex.push(randomIndex);
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

  const onClickReplay = () => {
    setStart(false);
    setCurrentQuizIndex(0);
    setChoices([]);
    setCorrectCount(0);
    setQuizList([]);
  };

  useEffect(() => {
    if (correctCount >= 4) {
      setIsPassed(true);
    }
  }, [correctCount]);

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
        {start ? (
          <>
            {currentQuizIndex < 5 ? (
              <QuizCard
                quiz={quizList[currentQuizIndex]}
                currentQuizIndex={currentQuizIndex}
                onClickChoice={onClickChoice}
              />
            ) : (
              <>
                <Text
                  fontSize={[20, 24, 32]}
                  textColor="blue.500"
                  fontWeight="bold"
                >
                  {correctCount} / 5
                </Text>
                <Text fontSize={[20, 32, 40]} fontWeight="bold">
                  {correctCount >= 4
                    ? "한글 NFT를 발행해 보세요!"
                    : "다시 도전해보세요!"}
                </Text>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  border="2px"
                  borderColor="gray.200"
                  boxShadow="md"
                  rounded="lg"
                  w={["90%", "70%", "40%"]}
                  h={[200, 300, 400]}
                  my={4}
                >
                  <Flex flexDir="column" alignItems="start">
                    {quizList.map((v, i) => {
                      return v.correctAnswer === choices[i] ? (
                        <Text
                          key={i}
                          fontSize={[24, 32, 40]}
                          fontWeight="bold"
                          textColor="blue.500"
                          w="100%"
                        >
                          {choices[i]}{" "}
                        </Text>
                      ) : (
                        <Flex
                          key={i}
                          fontSize={[24, 32, 40]}
                          fontWeight="bold"
                          gap={4}
                          w="100%"
                        >
                          <Text textDecor="line-through" w="50%">
                            {choices[i]}
                          </Text>
                          <Text textColor="red" textAlign="start" w="50%">
                            {" "}
                            {v.correctAnswer}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
                <Button
                  mt={8}
                  h={12}
                  w={["90%", "70%", "25%"]}
                  bgColor="blue.300"
                  _hover={{ bgColor: "blue.500" }}
                  onClick={onClickReplay}
                >
                  <Text
                    fontSize={[16, 18, 20]}
                    textColor="white"
                    fontWeight="bold"
                  >
                    다시 풀어보기
                  </Text>
                </Button>
              </>
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
            <Text fontSize={[20, 32, 32]} fontWeight="semibold">
              나의 한글 맞춤법 실력은?
            </Text>
            <Text fontSize={[20, 32, 32]} fontWeight="semibold">
              문제 풀고 NFT 받아가세요!
            </Text>
            {signer ? (
              <Button
                mt={8}
                h={12}
                w={["60%", "60%", "25%"]}
                onClick={onClickStart}
                bgColor="blue.300"
                _hover={{ bgColor: "blue.500" }}
              >
                <Text fontSize={20} textColor="white" fontWeight="bold">
                  시작
                </Text>
              </Button>
            ) : (
              <Button
                mt={8}
                h={12}
                w="25%"
                bgColor="blue.500"
                isDisabled={true}
                _hover={{ bgColor: "blue.500" }}
              >
                <Text fontSize={20} textColor="white" fontWeight="bold">
                  로그인 후 이용해 주세요!
                </Text>
              </Button>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Quiz;
