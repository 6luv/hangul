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
      <TabList>
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
          <TabPanel key={i}>
            <Text>{v.correctAnswer}</Text>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default QuizTabs;
