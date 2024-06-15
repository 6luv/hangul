import { GridItem, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";

interface SaleNftCardProps {
  tokenId: number;
  saleId: number;
  price: string;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId, saleId, price }) => {
  const [nftMetadata, setNftMetadata] = useState<IHangulPriceNftMetadata>();
  const [amount, setAmount] = useState<number>(1);
  const { mintContract, saleContract } = useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      const uri = await mintContract?.uri(tokenId);
      const metadataResponse = await axios.get<INftMetadata>(uri);
      const priceResponse = await saleContract?.getTokenPrice(tokenId);

      setNftMetadata({
        ...metadataResponse.data,
        tokenId,
        amount,
        price: priceResponse,
        saleId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mintContract || !saleContract || !tokenId) return;

    getNftMetadata();
    setAmount(1);
  }, [mintContract, saleContract, tokenId]);

  useEffect(() => console.log(nftMetadata), [nftMetadata]);

  return (
    <GridItem display="flex" flexDir="column" w={[40, 48, 48, 48]}>
      <Image
        src={nftMetadata?.image}
        alt={nftMetadata?.name}
        bgColor="white"
        rounded="lg"
        border="1px"
        boxShadow="xl"
        p={4}
        cursor="pointer"
        _hover={{ bgColor: "gray.200", opacity: "150%" }}
      />
      <Text mt={4} fontSize={20} fontWeight="bold" textAlign="center">
        #{nftMetadata?.tokenId} {nftMetadata?.name}
      </Text>
      <Text mt={4} fontSize={20} fontWeight="bold" textAlign="center">
        {price} ETH
      </Text>
    </GridItem>
  );
};

export default SaleNftCard;
