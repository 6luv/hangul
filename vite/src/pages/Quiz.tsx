import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import QuizCard from "../components/QuizCard";
import quizData from "../data/quizData.json";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const Quiz: FC = () => {
  const [start, setStart] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [choices, setChoices] = useState<string[]>([]);
  const { signer } = useOutletContext<OutletContext>();

  const onClickReplay = () => {
    setStart(false);
    setCurrentQuizIndex(0);
    setChoices([]);
  };

  const onClickChoice = (v: string) => {
    setChoices([...choices, v]);
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  const currentQuiz = quizData[currentQuizIndex];

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
            {currentQuizIndex != 2 ? (
              <QuizCard
                quiz={currentQuiz}
                currentQuizIndex={currentQuizIndex}
                onClickChoice={onClickChoice}
              />
            ) : (
              <>
                <Text fontSize={40} fontWeight="bold">
                  문제를 모두 풀었습니다!
                </Text>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  border="2px"
                  borderColor="gray.200"
                  boxShadow="md"
                  rounded="lg"
                  w="33%"
                  h={400}
                  my={4}
                >
                  <Flex flexDir="column" alignItems="start">
                    {quizData.map((v, i) => {
                      return v.correctAnswer === choices[i] ? (
                        <Text key={i} fontSize={40} fontWeight="bold">
                          {choices[i]}
                        </Text>
                      ) : (
                        <Flex>
                          <Text
                            key={i}
                            fontSize={40}
                            fontWeight="bold"
                            textDecor="line-through"
                          >
                            {choices[i]}
                          </Text>
                          <Text
                            key={i}
                            fontSize={40}
                            fontWeight="bold"
                            textColor="red"
                            ml={4}
                          >
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
                  w="25%"
                  bgColor="blue.300"
                  _hover={{ bgColor: "blue.500" }}
                  onClick={onClickReplay}
                >
                  <Text fontSize={20} textColor="white" fontWeight="bold">
                    다시 풀어보기
                  </Text>
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <Image src="/images/quiz-image.png" alt="한글" w={300} mb={16} />
            <Text fontSize={32} fontWeight="semibold">
              나의 한글 맞춤법 실력은?
            </Text>
            <Text fontSize={32} fontWeight="semibold">
              문제 풀고 NFT 받아가세요!
            </Text>
            {signer ? (
              <Button
                mt={8}
                h={12}
                w="25%"
                onClick={() => setStart(true)}
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
