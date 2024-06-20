import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiCoinLine } from "react-icons/ri";
import { BiStore } from "react-icons/bi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import SlideNfts from "../components/SlideNfts";

const HomeMenuData = [
  {
    title: "환영합니다!",
    description: `학습과 보상을 결합하여 사용자들이 한글 맞춤법을 배우고
    NFT를 통해 디지털 자산을 경험할 수 있습니다.
    또한 창의적으로 활용할 수 있는 다목적 공간을 제공합니다.`,
    icon: (
      <Text fontSize={36} fontWeight="bold">
        한글
      </Text>
    ),
  },
  {
    title: "문제",
    description: "한글 맞춤법 문제를 풀고 NFT 발행 기회를 얻을 수 있습니다.",
    icon: <HiOutlineClipboardList size="72px" />,
  },
  {
    title: "발행",
    description: "한글 자모로 이루어진 NFT를 획득할 수 있습니다.",
    icon: <RiCoinLine size="72px" />,
  },
  {
    title: "가게",
    description: "획득한 NFT를 거래할 수 있습니다.",
    icon: <BiStore size="72px" />,
  },
  {
    title: "창작",
    description: "획득한 NFT로 자신만의 독특한 단어를 만들 수 있습니다.",
    icon: <IoExtensionPuzzleOutline size="72px" />,
  },
  {
    title: "내 자산",
    description: "획득한 NFT를 확인하고 판매 등록할 수 있습니다.",
    icon: <FaRegUser size="72px" />,
  },
];

const Home: FC = () => {
  return (
    <Flex flexDir="column" w="100%" minH="50vh">
      <Flex
        className="mainFlexStyle"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Tabs mt={20} size="md" isFitted variant="enclosed" colorScheme="white">
          <Flex>
            <TabList gap={2}>
              {HomeMenuData.map((v, i) => (
                <Tab key={i}>
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    px={3}
                    py={3}
                    w={24}
                    h={24}
                    rounded="lg"
                    justifyContent="center"
                    boxShadow="0 4px 6px darkgray"
                  >
                    {v.icon}
                  </Flex>
                </Tab>
              ))}
            </TabList>
          </Flex>
          <Flex>
            <TabPanels>
              {HomeMenuData.map((v, i) => (
                <TabPanel key={i} mt={8} border="2px" rounded="2xl">
                  <Text
                    fontSize={[16, 20, 24]}
                    fontWeight="bold"
                    borderBottom="2px"
                  >
                    {v.title}
                  </Text>
                  <Text
                    className="description"
                    fontSize={[12, 16, 20]}
                    fontWeight="semibold"
                    textAlign="center"
                    pt={4}
                  >
                    {v.description}
                  </Text>
                </TabPanel>
              ))}
            </TabPanels>
          </Flex>
        </Tabs>
        <SlideNfts />
      </Flex>
    </Flex>
  );
};

export default Home;
