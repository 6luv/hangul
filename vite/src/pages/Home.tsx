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

const Home: FC = () => {
  return (
    <Flex flexDir="column" w="100%">
      <Flex
        className="mainFlexStyle"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex h="70%" flexDir="column" alignItems="center">
          <Text
            fontWeight="bold"
            fontSize={[28, 32, 56]}
            textAlign="center"
            w="full"
          >
            한글
          </Text>
          <Tabs mt={4}>
            <TabList gap={4}>
              <Tab>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  p={2}
                  rounded="lg"
                  boxShadow="0 4px 6px darkgray"
                >
                  <HiOutlineClipboardList size={"80px"} />
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  p={2}
                  rounded="lg"
                  boxShadow="0 4px 6px darkgray"
                >
                  <RiCoinLine size="80px" />
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  p={2}
                  rounded="lg"
                  boxShadow="0 4px 6px darkgray"
                >
                  <BiStore size="80px" />
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  p={2}
                  rounded="lg"
                  boxShadow="0 4px 6px darkgray"
                >
                  <IoExtensionPuzzleOutline size="80px" />
                </Flex>
              </Tab>
              <Tab>
                <Flex
                  flexDir="column"
                  alignItems="center"
                  p={2}
                  rounded="lg"
                  boxShadow="0 4px 6px darkgray"
                >
                  <FaRegUser size="80px" />
                </Flex>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text fontSize={[16, 20, 28]} fontWeight="bold">
                  문제
                </Text>
                <Text fontSize={[12, 16, 20]} fontWeight="semibold">
                  한글 맞춤법 문제를 풀고 NFT 발행 기회를 얻어보세요.
                </Text>
              </TabPanel>
              <TabPanel>
                <Text fontSize={[16, 20, 20]}>발행</Text>
                <Text fontSize={[12, 16, 20]}>
                  한글 자모로 이루어진 NFT를 획득할 수 있습니다.
                </Text>
              </TabPanel>
              <TabPanel>
                <Text fontSize={[16, 20, 20]}>가게</Text>
                <Text fontSize={[12, 16, 20]}>
                  내가 소유한 NFT를 거래할 수 있습니다.
                </Text>
              </TabPanel>
              <TabPanel>
                <Text fontSize={[16, 20, 20]}>창작</Text>
                <Text fontSize={[12, 16, 20]}>
                  내가 소유한 NFT로 자신만의 독특한 단어를 만들 수 있습니다.
                </Text>
              </TabPanel>
              <TabPanel>
                <Text fontSize={[16, 20, 20]}>내 페이지</Text>
                <Text fontSize={[12, 16, 20]}>
                  내가 소유한 NFT를 확인하고 판매 등록할 수 있습니다.
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <SlideNfts />
      </Flex>
    </Flex>
  );
};

export default Home;
