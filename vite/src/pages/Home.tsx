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
import SlideNfts from "../components/SlideNfts";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiCoinLine } from "react-icons/ri";
import { BiStore } from "react-icons/bi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const HomeMenu = [
  {
    title: "환영합니다!",
    description: `한글 맞춤법 문제를 통해 NFT를 얻을 수 있는 공간입니다.
    맞춤법 문제를 풀고 한글 자모 NFT를 발행해보세요.
    발행한 NFT는 가게에서 거래할 수 있으며,
    창작 탭에서는 보유한 NFT를 직접 조합하여 자신만의 단어를 만들 수 있습니다.
    함께 한글을 더욱 아름답게 만들어보세요!`,
    icon: (
      <Text fontSize={40} fontWeight="bold">
        한글
      </Text>
    ),
  },
  {
    title: "문제",
    description: "한글 맞춤법 문제를 풀고 NFT 발행 기회를 얻어보세요.",
    icon: <HiOutlineClipboardList size={"80px"} />,
  },
  {
    title: "발행",
    description: "한글 자모로 이루어진 NFT를 획득할 수 있습니다.",
    icon: <RiCoinLine size="80px" />,
  },
  {
    title: "가게",
    description: "내가 소유한 NFT를 거래할 수 있습니다.",
    icon: <BiStore size="80px" />,
  },
  {
    title: "창작",
    description: "내가 소유한 NFT로 자신만의 독특한 단어를 만들 수 있습니다.",
    icon: <IoExtensionPuzzleOutline size="80px" />,
  },
  {
    title: "내 페이지",
    description: "내가 소유한 NFT를 확인하고 판매 등록할 수 있습니다.",
    icon: <FaRegUser size="80px" />,
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
        <Tabs mt={12} size="md" isFitted variant="enclosed" colorScheme="white">
          <Flex>
            <TabList gap={2}>
              {HomeMenu.map((v, i) => (
                <Tab key={i}>
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    px={3}
                    py={4}
                    rounded="lg"
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
              {HomeMenu.map((v, i) => (
                <TabPanel key={i} mt={16} border="2px" rounded="2xl">
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
