import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface QuizTabsProps {
  quizList: IQuizData[];
  choices: string[];
}

const QuizTabs: FC<QuizTabsProps> = ({ quizList, choices }) => {
  return (
    <Tabs>
      <TabList justifyContent="center">
        {quizList.map((v, i) => (
          <Tab key={i}>
            <Text
              fontSize={32}
              fontWeight="bold"
              textColor={
                v.correctAnswer === choices[i] ? "blue.500" : "red.500"
              }
            >
              {choices[i]}
            </Text>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {quizList.map((v, i) => (
          <TabPanel key={i} w="100%" justifyContent="center">
            <Text fontWeight="bold" fontSize={28} mb={4}>
              {v.correctAnswer}
            </Text>
            <Text className="description" fontWeight="semibold" fontSize={20}>
              {v.description}
            </Text>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default QuizTabs;
