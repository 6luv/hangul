import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import NftCard from "../components/NftCard";

const My: FC = () => {
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);
  const [mintedList, setMintedList] = useState<number[]>();
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const onClickApprove = () => {
    setIsApprovedForAll(!isApprovedForAll);
  };

  const getBalanceOfNfts = async () => {
    try {
      const response = await mintContract?.balanceOfNfts(signer?.address);
      const temp = response.map((v: bigint) => Number(v));
      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBalanceOfNfts();
  }, [signer, mintContract]);

  useEffect(() => console.log(mintedList), [mintedList]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex
        m={12}
        p={4}
        flexGrow={1}
        bgColor="white"
        rounded="lg"
        boxShadow="md"
        alignItems="center"
        flexDir="column"
      >
        <Flex
          h={20}
          borderBottom="2px solid black"
          w="100%"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Text fontSize="32" fontWeight="bold">
            판매 등록 권한
          </Text>
          <Button
            colorScheme={isApprovedForAll ? "red" : "green"}
            onClick={onClickApprove}
          >
            {isApprovedForAll ? "거부" : "승인"}
          </Button>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          overflowY="auto"
        >
          <Grid
            templateColumns="repeat(4, 1fr)"
            justifyContent="center"
            gap={16}
            maxH={520}
            overflowY="auto"
          >
            {mintedList?.map((v, i) => {
              if (v > 0) {
                return <NftCard key={i} tokenId={i + 1} amount={v} />;
              }
            })}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default My;
