import { Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";

interface NftCardProps {
  tokenId: number;
  amount: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId, amount }) => {
  const [hangulNftMetadata, setHangulNftMetadata] =
    useState<IHangulNftMetadata>();
  const { mintContract } = useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      if (!mintContract || !tokenId) return;
      const response = await axios.get<INftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setHangulNftMetadata({ ...response.data, tokenId, amount });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  return (
    <GridItem display="flex" flexDir="column" w={48} alignItems="center">
      <Image
        src={hangulNftMetadata?.image}
        alt={hangulNftMetadata?.name}
        bgColor="white"
        rounded="lg"
        border="1px"
        boxShadow="xl"
        p={4}
      />
      <Text mt={4} fontSize={20} fontWeight="bold">
        #{hangulNftMetadata?.tokenId} {hangulNftMetadata?.name}
      </Text>
    </GridItem>
  );
};

export default NftCard;
