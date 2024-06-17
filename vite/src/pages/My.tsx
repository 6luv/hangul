import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import MyNftCard from "../components/MyNftCard";
import { saleContractAddress } from "../lib/contractAddress";
import LoginNotice from "../components/LoginNotice";

const My: FC = () => {
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);
  const [mintedList, setMintedList] = useState<number[]>();
  const [isApproveLoading, setIsApproveLoading] = useState<boolean>(false);
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const onClickSetApprovalForAll = async () => {
    try {
      setIsApproveLoading(true);
      const response = await mintContract?.setApprovalForAll(
        saleContractAddress,
        !isApprovedForAll
      );
      await response.wait();

      setIsApprovedForAll(!isApprovedForAll);
      setIsApproveLoading(false);
    } catch (error) {
      console.error(error);
      setIsApproveLoading(false);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintContract?.isApprovedForAll(
        signer?.address,
        saleContractAddress
      );

      setIsApprovedForAll(response);
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    if (!signer || !mintContract) return;

    getIsApprovedForAll();
  }, [signer, mintContract]);

  useEffect(() => console.log(mintedList), [mintedList]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex className="mainFlexStyle">
        {signer ? (
          <>
            <Flex
              h={20}
              borderBottom="2px solid black"
              w="100%"
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              <Text fontSize={["20", "32", "32"]} fontWeight="bold">
                판매 등록 권한
              </Text>
              <Button
                colorScheme={isApprovedForAll ? "red" : "green"}
                onClick={onClickSetApprovalForAll}
                isDisabled={isApproveLoading}
                isLoading={isApproveLoading}
                loadingText={isApprovedForAll ? "거부중" : "승인중"}
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
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ]}
                justifyContent="center"
                gap={16}
                maxH={[375, 420, 520]}
                overflowY="auto"
                mt={[2, 2, 2, 2]}
              >
                {mintedList?.map((v, i) => {
                  if (v > 0) {
                    return (
                      <MyNftCard
                        key={i}
                        tokenId={i + 1}
                        amount={v}
                        isApprovedForAll={isApprovedForAll}
                      />
                    );
                  }
                })}
              </Grid>
            </Flex>
          </>
        ) : (
          <LoginNotice />
        )}
      </Flex>
    </Flex>
  );
};

export default My;
