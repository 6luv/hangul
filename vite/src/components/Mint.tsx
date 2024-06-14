import { Button, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import MintModal from "./MintModal";
import axios from "axios";

const nftMin: number = 1;
const nftMax: number = 38;
const nftAmount: number = 1;

const Mint: FC = () => {
  const [tokenId, setTokenId] = useState<number>();
  const [hangulNftMetadata, setHangulNftMetadata] =
    useState<IHangulNftMetadata>();
  const [randomValue, setRandomValue] = useState<number>();
  const { isPassed, mintContract } = useOutletContext<OutletContext>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickMint = async () => {
    try {
      getRandomValue();
      if (!mintContract || !tokenId) return;

      console.log("tokenid : ", tokenId);
      const response = await mintContract?.mintNft(tokenId, nftAmount);
      await response.wait();
      console.log("response : ", response);

      const axiosResponse = await axios.get<INftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      console.log(axiosResponse);
      setHangulNftMetadata({ ...axiosResponse.data, tokenId, nftAmount });

      onOpen();
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomValue = () => {
    setRandomValue(Math.floor(Math.random() * 100));
  };

  const getRandomTokenId = () => {
    setTokenId(Math.floor(Math.random() * (nftMax - nftMin + 1)) + nftMin);
  };

  useEffect(() => getRandomTokenId(), [randomValue]);

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
        <Image
          w={80}
          opacity="0.7"
          rounded="2xl"
          src="/images/random.png"
          alt="랜덤"
        />
        <Button
          mt={8}
          h={12}
          w="28%"
          isDisabled={!isPassed}
          bgColor="blue.300"
          _hover={{ bgColor: "blue.500" }}
          onClick={onClickMint}
        >
          <Text fontSize={20} textColor="white" fontWeight="bold">
            발행하기
          </Text>
        </Button>
      </Flex>
      <MintModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Mint;
